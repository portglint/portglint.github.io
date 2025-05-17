// Blog functionality
document.addEventListener('DOMContentLoaded', function() {
    // Handle blog post filters
    const filterButtons = document.querySelectorAll('.filter-button');
    const blogPosts = document.querySelectorAll('.blog-post');
    
    if (filterButtons.length > 0 && blogPosts.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                
                // Update active filter button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter blog posts
                blogPosts.forEach(post => {
                    const postCategory = post.getAttribute('data-category');
                    
                    if (category === 'all' || category === postCategory) {
                        post.style.display = 'block';
                        setTimeout(() => {
                            post.classList.add('visible');
                        }, 50);
                    } else {
                        post.classList.remove('visible');
                        setTimeout(() => {
                            post.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Handle blog post search
    const searchInput = document.querySelector('.blog-search-input');
    
    if (searchInput && blogPosts.length > 0) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            blogPosts.forEach(post => {
                const title = post.querySelector('.post-title').textContent.toLowerCase();
                const content = post.querySelector('.post-content').textContent.toLowerCase();
                const tags = post.querySelector('.post-tags').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || content.includes(searchTerm) || tags.includes(searchTerm)) {
                    post.style.display = 'block';
                    setTimeout(() => {
                        post.classList.add('visible');
                    }, 50);
                } else {
                    post.classList.remove('visible');
                    setTimeout(() => {
                        post.style.display = 'none';
                    }, 300);
                }
            });
        });
    }
    
    // Handle blog post sorting
    const sortSelect = document.querySelector('.blog-sort-select');
    
    if (sortSelect && blogPosts.length > 0) {
        sortSelect.addEventListener('change', function() {
            const sortBy = this.value;
            const postsArray = Array.from(blogPosts);
            
            // Sort posts
            postsArray.sort((a, b) => {
                if (sortBy === 'date') {
                    const dateA = new Date(a.getAttribute('data-date'));
                    const dateB = new Date(b.getAttribute('data-date'));
                    return dateB - dateA;
                } else if (sortBy === 'title') {
                    const titleA = a.querySelector('.post-title').textContent;
                    const titleB = b.querySelector('.post-title').textContent;
                    return titleA.localeCompare(titleB);
                } else if (sortBy === 'popularity') {
                    const viewsA = parseInt(a.getAttribute('data-views'));
                    const viewsB = parseInt(b.getAttribute('data-views'));
                    return viewsB - viewsA;
                }
            });
            
            // Reorder posts in DOM
            const postsContainer = blogPosts[0].parentNode;
            postsArray.forEach(post => {
                postsContainer.appendChild(post);
            });
        });
    }
    
    // Handle blog post sharing
    const shareButtons = document.querySelectorAll('.share-button');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const postUrl = this.getAttribute('data-url');
            const postTitle = this.getAttribute('data-title');
            const platform = this.getAttribute('data-platform');
            
            let shareUrl = '';
            
            switch (platform) {
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(postTitle)}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(postUrl)}&title=${encodeURIComponent(postTitle)}`;
                    break;
                case 'pinterest':
                    shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(postUrl)}&description=${encodeURIComponent(postTitle)}`;
                    break;
                case 'email':
                    shareUrl = `mailto:?subject=${encodeURIComponent(postTitle)}&body=${encodeURIComponent(postUrl)}`;
                    break;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
    
    // Handle blog post comments
    const commentForm = document.querySelector('.comment-form');
    
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const commentData = {
                name: formData.get('name'),
                email: formData.get('email'),
                comment: formData.get('comment'),
                postId: formData.get('postId')
            };
            
            // Send comment
            fetch('/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(commentData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Add comment to DOM
                    const commentsList = document.querySelector('.comments-list');
                    const newComment = document.createElement('div');
                    newComment.classList.add('comment');
                    newComment.innerHTML = `
                        <div class="comment-header">
                            <h4>${data.comment.name}</h4>
                            <span class="comment-date">${new Date().toLocaleDateString()}</span>
                        </div>
                        <div class="comment-content">
                            ${data.comment.comment}
                        </div>
                    `;
                    
                    commentsList.insertBefore(newComment, commentsList.firstChild);
                    
                    // Reset form
                    commentForm.reset();
                    
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.classList.add('success-message');
                    successMessage.textContent = 'Comment added successfully!';
                    commentForm.appendChild(successMessage);
                    
                    setTimeout(() => {
                        successMessage.remove();
                    }, 3000);
                } else {
                    // Show error message
                    const errorMessage = document.createElement('div');
                    errorMessage.classList.add('error-message');
                    errorMessage.textContent = data.message || 'An error occurred. Please try again.';
                    commentForm.appendChild(errorMessage);
                    
                    setTimeout(() => {
                        errorMessage.remove();
                    }, 3000);
                }
            })
            .catch(error => {
                console.error('Error adding comment:', error);
                
                // Show error message
                const errorMessage = document.createElement('div');
                errorMessage.classList.add('error-message');
                errorMessage.textContent = 'Network error. Please check your connection and try again.';
                commentForm.appendChild(errorMessage);
                
                setTimeout(() => {
                    errorMessage.remove();
                }, 3000);
            });
        });
    }
    
    // Handle blog post likes
    const likeButtons = document.querySelectorAll('.like-button');
    
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const postId = this.getAttribute('data-post-id');
            const likeCount = this.querySelector('.like-count');
            
            // Send like
            fetch(`/api/posts/${postId}/like`, {
                method: 'POST'
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Update like count
                    likeCount.textContent = data.likes;
                    
                    // Update button state
                    this.classList.toggle('liked');
                }
            })
            .catch(error => {
                console.error('Error liking post:', error);
            });
        });
    });
    
    // Handle blog post bookmarks
    const bookmarkButtons = document.querySelectorAll('.bookmark-button');
    
    bookmarkButtons.forEach(button => {
        button.addEventListener('click', function() {
            const postId = this.getAttribute('data-post-id');
            
            // Send bookmark
            fetch(`/api/posts/${postId}/bookmark`, {
                method: 'POST'
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Update button state
                    this.classList.toggle('bookmarked');
                }
            })
            .catch(error => {
                console.error('Error bookmarking post:', error);
            });
        });
    });
    
    // Handle blog post reading time
    const postContents = document.querySelectorAll('.post-content');
    
    postContents.forEach(content => {
        const text = content.textContent;
        const wordCount = text.trim().split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 200); // Assuming 200 words per minute
        
        const readingTimeElement = content.closest('.blog-post').querySelector('.reading-time');
        if (readingTimeElement) {
            readingTimeElement.textContent = `${readingTime} min read`;
        }
    });
    
    // Handle blog post table of contents
    const postContent = document.querySelector('.post-content');
    const tableOfContents = document.querySelector('.table-of-contents');
    
    if (postContent && tableOfContents) {
        const headings = postContent.querySelectorAll('h2, h3, h4');
        let tocHTML = '<ul>';
        
        headings.forEach((heading, index) => {
            const id = `heading-${index}`;
            heading.id = id;
            
            const level = parseInt(heading.tagName.charAt(1));
            const text = heading.textContent;
            
            tocHTML += `
                <li class="toc-level-${level}">
                    <a href="#${id}">${text}</a>
                </li>
            `;
        });
        
        tocHTML += '</ul>';
        tableOfContents.innerHTML = tocHTML;
        
        // Handle table of contents scrolling
        const tocLinks = tableOfContents.querySelectorAll('a');
        
        tocLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Update active table of contents item on scroll
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            
            headings.forEach((heading, index) => {
                const headingTop = heading.offsetTop - 100;
                const headingBottom = headingTop + heading.offsetHeight;
                
                if (scrollPosition >= headingTop && scrollPosition < headingBottom) {
                    tocLinks.forEach(link => link.classList.remove('active'));
                    tocLinks[index].classList.add('active');
                }
            });
        });
    }
    
    // Handle blog post related posts
    const relatedPosts = document.querySelector('.related-posts');
    
    if (relatedPosts) {
        const currentPostCategory = document.querySelector('.blog-post').getAttribute('data-category');
        const currentPostId = document.querySelector('.blog-post').getAttribute('data-post-id');
        
        // Fetch related posts
        fetch(`/api/posts/related?category=${currentPostCategory}&exclude=${currentPostId}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                let relatedPostsHTML = '';
                
                data.posts.forEach(post => {
                    relatedPostsHTML += `
                        <div class="related-post">
                            <a href="${post.url}">
                                <img src="${post.image}" alt="${post.title}">
                                <h3>${post.title}</h3>
                                <span class="post-date">${new Date(post.date).toLocaleDateString()}</span>
                            </a>
                        </div>
                    `;
                });
                
                relatedPosts.innerHTML = relatedPostsHTML;
            }
        })
        .catch(error => {
            console.error('Error fetching related posts:', error);
        });
    }
    
    // Handle blog post newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            // Send subscription
            fetch('/api/newsletter/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.classList.add('success-message');
                    successMessage.textContent = 'Successfully subscribed to newsletter!';
                    this.appendChild(successMessage);
                    
                    // Reset form
                    this.reset();
                    
                    setTimeout(() => {
                        successMessage.remove();
                    }, 3000);
                } else {
                    // Show error message
                    const errorMessage = document.createElement('div');
                    errorMessage.classList.add('error-message');
                    errorMessage.textContent = data.message || 'An error occurred. Please try again.';
                    this.appendChild(errorMessage);
                    
                    setTimeout(() => {
                        errorMessage.remove();
                    }, 3000);
                }
            })
            .catch(error => {
                console.error('Error subscribing to newsletter:', error);
                
                // Show error message
                const errorMessage = document.createElement('div');
                errorMessage.classList.add('error-message');
                errorMessage.textContent = 'Network error. Please check your connection and try again.';
                this.appendChild(errorMessage);
                
                setTimeout(() => {
                    errorMessage.remove();
                }, 3000);
            });
        });
    }
}); 