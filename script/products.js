// Products functionality
document.addEventListener('DOMContentLoaded', function() {
    // Handle product filters
    const filterButtons = document.querySelectorAll('.filter-button');
    const products = document.querySelectorAll('.product');
    
    if (filterButtons.length > 0 && products.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                
                // Update active filter button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter products
                products.forEach(product => {
                    const productCategory = product.getAttribute('data-category');
                    
                    if (category === 'all' || category === productCategory) {
                        product.style.display = 'block';
                        setTimeout(() => {
                            product.classList.add('visible');
                        }, 50);
                    } else {
                        product.classList.remove('visible');
                        setTimeout(() => {
                            product.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Handle product search
    const searchInput = document.querySelector('.product-search-input');
    
    if (searchInput && products.length > 0) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            products.forEach(product => {
                const title = product.querySelector('.product-title').textContent.toLowerCase();
                const description = product.querySelector('.product-description').textContent.toLowerCase();
                const category = product.getAttribute('data-category').toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm) || category.includes(searchTerm)) {
                    product.style.display = 'block';
                    setTimeout(() => {
                        product.classList.add('visible');
                    }, 50);
                } else {
                    product.classList.remove('visible');
                    setTimeout(() => {
                        product.style.display = 'none';
                    }, 300);
                }
            });
        });
    }
    
    // Handle product sorting
    const sortSelect = document.querySelector('.product-sort-select');
    
    if (sortSelect && products.length > 0) {
        sortSelect.addEventListener('change', function() {
            const sortBy = this.value;
            const productsArray = Array.from(products);
            
            // Sort products
            productsArray.sort((a, b) => {
                if (sortBy === 'price-asc') {
                    const priceA = parseFloat(a.getAttribute('data-price'));
                    const priceB = parseFloat(b.getAttribute('data-price'));
                    return priceA - priceB;
                } else if (sortBy === 'price-desc') {
                    const priceA = parseFloat(a.getAttribute('data-price'));
                    const priceB = parseFloat(b.getAttribute('data-price'));
                    return priceB - priceA;
                } else if (sortBy === 'name-asc') {
                    const nameA = a.querySelector('.product-title').textContent;
                    const nameB = b.querySelector('.product-title').textContent;
                    return nameA.localeCompare(nameB);
                } else if (sortBy === 'name-desc') {
                    const nameA = a.querySelector('.product-title').textContent;
                    const nameB = b.querySelector('.product-title').textContent;
                    return nameB.localeCompare(nameA);
                } else if (sortBy === 'popularity') {
                    const popularityA = parseInt(a.getAttribute('data-popularity'));
                    const popularityB = parseInt(b.getAttribute('data-popularity'));
                    return popularityB - popularityA;
                }
            });
            
            // Reorder products in DOM
            const productsContainer = products[0].parentNode;
            productsArray.forEach(product => {
                productsContainer.appendChild(product);
            });
        });
    }
    
    // Handle product quick view
    const quickViewButtons = document.querySelectorAll('.quick-view-button');
    const quickViewModal = document.querySelector('.quick-view-modal');
    
    if (quickViewButtons.length > 0 && quickViewModal) {
        quickViewButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-product-id');
                
                // Fetch product details
                fetch(`/api/products/${productId}`)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        const product = data.product;
                        
                        // Update modal content
                        quickViewModal.querySelector('.product-image').src = product.image;
                        quickViewModal.querySelector('.product-title').textContent = product.title;
                        quickViewModal.querySelector('.product-price').textContent = `$${product.price}`;
                        quickViewModal.querySelector('.product-description').textContent = product.description;
                        
                        // Show modal
                        quickViewModal.classList.add('active');
                        document.body.classList.add('modal-open');
                    }
                })
                .catch(error => {
                    console.error('Error fetching product details:', error);
                });
            });
        });
        
        // Close modal when clicking outside
        quickViewModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.classList.remove('modal-open');
            }
        });
        
        // Close modal when clicking close button
        const closeButton = quickViewModal.querySelector('.close-button');
        if (closeButton) {
            closeButton.addEventListener('click', function() {
                quickViewModal.classList.remove('active');
                document.body.classList.remove('modal-open');
            });
        }
    }
    
    // Handle product image gallery
    const productGalleries = document.querySelectorAll('.product-gallery');
    
    productGalleries.forEach(gallery => {
        const mainImage = gallery.querySelector('.main-image');
        const thumbnails = gallery.querySelectorAll('.thumbnail');
        
        if (mainImage && thumbnails.length > 0) {
            thumbnails.forEach(thumbnail => {
                thumbnail.addEventListener('click', function() {
                    // Update main image
                    mainImage.src = this.getAttribute('data-image');
                    
                    // Update active thumbnail
                    thumbnails.forEach(thumb => thumb.classList.remove('active'));
                    this.classList.add('active');
                });
            });
        }
    });
    
    // Handle product quantity
    const quantityInputs = document.querySelectorAll('.quantity-input');
    
    quantityInputs.forEach(input => {
        const decreaseButton = input.querySelector('.decrease-button');
        const increaseButton = input.querySelector('.increase-button');
        
        if (decreaseButton && increaseButton) {
            decreaseButton.addEventListener('click', function() {
                const currentValue = parseInt(input.value);
                if (currentValue > 1) {
                    input.value = currentValue - 1;
                    input.dispatchEvent(new Event('change'));
                }
            });
            
            increaseButton.addEventListener('click', function() {
                const currentValue = parseInt(input.value);
                const maxValue = parseInt(input.getAttribute('max')) || 99;
                if (currentValue < maxValue) {
                    input.value = currentValue + 1;
                    input.dispatchEvent(new Event('change'));
                }
            });
            
            input.addEventListener('change', function() {
                const value = parseInt(this.value);
                const min = parseInt(this.getAttribute('min')) || 1;
                const max = parseInt(this.getAttribute('max')) || 99;
                
                if (value < min) {
                    this.value = min;
                } else if (value > max) {
                    this.value = max;
                }
            });
        }
    });
    
    // Handle product reviews
    const reviewForm = document.querySelector('.review-form');
    
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const reviewData = {
                name: formData.get('name'),
                email: formData.get('email'),
                rating: formData.get('rating'),
                review: formData.get('review'),
                productId: formData.get('productId')
            };
            
            // Send review
            fetch('/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reviewData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Add review to DOM
                    const reviewsList = document.querySelector('.reviews-list');
                    const newReview = document.createElement('div');
                    newReview.classList.add('review');
                    newReview.innerHTML = `
                        <div class="review-header">
                            <h4>${data.review.name}</h4>
                            <div class="rating">
                                ${'★'.repeat(data.review.rating)}${'☆'.repeat(5 - data.review.rating)}
                            </div>
                            <span class="review-date">${new Date().toLocaleDateString()}</span>
                        </div>
                        <div class="review-content">
                            ${data.review.review}
                        </div>
                    `;
                    
                    reviewsList.insertBefore(newReview, reviewsList.firstChild);
                    
                    // Reset form
                    reviewForm.reset();
                    
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.classList.add('success-message');
                    successMessage.textContent = 'Review added successfully!';
                    reviewForm.appendChild(successMessage);
                    
                    setTimeout(() => {
                        successMessage.remove();
                    }, 3000);
                } else {
                    // Show error message
                    const errorMessage = document.createElement('div');
                    errorMessage.classList.add('error-message');
                    errorMessage.textContent = data.message || 'An error occurred. Please try again.';
                    reviewForm.appendChild(errorMessage);
                    
                    setTimeout(() => {
                        errorMessage.remove();
                    }, 3000);
                }
            })
            .catch(error => {
                console.error('Error adding review:', error);
                
                // Show error message
                const errorMessage = document.createElement('div');
                errorMessage.classList.add('error-message');
                errorMessage.textContent = 'Network error. Please check your connection and try again.';
                reviewForm.appendChild(errorMessage);
                
                setTimeout(() => {
                    errorMessage.remove();
                }, 3000);
            });
        });
    }
    
    // Handle product rating
    const ratingInputs = document.querySelectorAll('.rating-input');
    
    ratingInputs.forEach(input => {
        const stars = input.querySelectorAll('.star');
        
        stars.forEach((star, index) => {
            star.addEventListener('mouseenter', function() {
                // Update stars on hover
                stars.forEach((s, i) => {
                    if (i <= index) {
                        s.classList.add('active');
                    } else {
                        s.classList.remove('active');
                    }
                });
            });
            
            star.addEventListener('click', function() {
                // Set rating value
                input.value = index + 1;
                
                // Update stars
                stars.forEach((s, i) => {
                    if (i <= index) {
                        s.classList.add('active');
                    } else {
                        s.classList.remove('active');
                    }
                });
            });
        });
        
        input.addEventListener('mouseleave', function() {
            // Reset stars on mouse leave
            const value = parseInt(this.value) || 0;
            stars.forEach((star, index) => {
                if (index < value) {
                    star.classList.add('active');
                } else {
                    star.classList.remove('active');
                }
            });
        });
    });
    
    // Handle product comparison
    const compareButtons = document.querySelectorAll('.compare-button');
    const compareModal = document.querySelector('.compare-modal');
    
    if (compareButtons.length > 0 && compareModal) {
        const compareList = [];
        
        compareButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-product-id');
                
                if (this.classList.contains('active')) {
                    // Remove from comparison
                    const index = compareList.indexOf(productId);
                    if (index > -1) {
                        compareList.splice(index, 1);
                    }
                    this.classList.remove('active');
                } else {
                    // Add to comparison
                    if (compareList.length < 3) {
                        compareList.push(productId);
                        this.classList.add('active');
                    } else {
                        // Show error message
                        const errorMessage = document.createElement('div');
                        errorMessage.classList.add('error-message');
                        errorMessage.textContent = 'You can compare up to 3 products at a time.';
                        this.appendChild(errorMessage);
                        
                        setTimeout(() => {
                            errorMessage.remove();
                        }, 3000);
                    }
                }
                
                // Update compare button text
                const compareButton = document.querySelector('.compare-button');
                if (compareButton) {
                    compareButton.textContent = `Compare (${compareList.length})`;
                    compareButton.disabled = compareList.length < 2;
                }
            });
        });
        
        // Handle compare button click
        const compareButton = document.querySelector('.compare-button');
        if (compareButton) {
            compareButton.addEventListener('click', function() {
                if (compareList.length >= 2) {
                    // Fetch product details
                    Promise.all(compareList.map(id => 
                        fetch(`/api/products/${id}`).then(response => response.json())
                    ))
                    .then(results => {
                        const products = results.map(result => result.product);
                        
                        // Update modal content
                        let comparisonHTML = '<div class="comparison-table">';
                        
                        // Headers
                        comparisonHTML += '<div class="comparison-row header">';
                        comparisonHTML += '<div class="comparison-cell"></div>';
                        products.forEach(product => {
                            comparisonHTML += `
                                <div class="comparison-cell">
                                    <img src="${product.image}" alt="${product.title}">
                                    <h3>${product.title}</h3>
                                    <div class="price">$${product.price}</div>
                                </div>
                            `;
                        });
                        comparisonHTML += '</div>';
                        
                        // Features
                        const features = ['Description', 'Category', 'Rating', 'Reviews', 'Availability'];
                        features.forEach(feature => {
                            comparisonHTML += '<div class="comparison-row">';
                            comparisonHTML += `<div class="comparison-cell">${feature}</div>`;
                            products.forEach(product => {
                                let value = '';
                                switch (feature) {
                                    case 'Description':
                                        value = product.description;
                                        break;
                                    case 'Category':
                                        value = product.category;
                                        break;
                                    case 'Rating':
                                        value = `${product.rating} / 5`;
                                        break;
                                    case 'Reviews':
                                        value = `${product.reviews} reviews`;
                                        break;
                                    case 'Availability':
                                        value = product.inStock ? 'In Stock' : 'Out of Stock';
                                        break;
                                }
                                comparisonHTML += `<div class="comparison-cell">${value}</div>`;
                            });
                            comparisonHTML += '</div>';
                        });
                        
                        comparisonHTML += '</div>';
                        compareModal.querySelector('.comparison-content').innerHTML = comparisonHTML;
                        
                        // Show modal
                        compareModal.classList.add('active');
                        document.body.classList.add('modal-open');
                    })
                    .catch(error => {
                        console.error('Error fetching product details:', error);
                    });
                }
            });
        }
        
        // Close modal when clicking outside
        compareModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.classList.remove('modal-open');
            }
        });
        
        // Close modal when clicking close button
        const closeButton = compareModal.querySelector('.close-button');
        if (closeButton) {
            closeButton.addEventListener('click', function() {
                compareModal.classList.remove('active');
                document.body.classList.remove('modal-open');
            });
        }
    }
    
    // Handle product wishlist
    const wishlistButtons = document.querySelectorAll('.wishlist-button');
    
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            
            // Send wishlist request
            fetch(`/api/wishlist/${productId}`, {
                method: 'POST'
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Update button state
                    this.classList.toggle('active');
                    
                    // Show success message
                    const message = this.classList.contains('active') ? 
                        'Added to wishlist!' : 'Removed from wishlist!';
                    
                    const successMessage = document.createElement('div');
                    successMessage.classList.add('success-message');
                    successMessage.textContent = message;
                    this.appendChild(successMessage);
                    
                    setTimeout(() => {
                        successMessage.remove();
                    }, 3000);
                }
            })
            .catch(error => {
                console.error('Error updating wishlist:', error);
            });
        });
    });
    
    // Handle product share
    const shareButtons = document.querySelectorAll('.share-button');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productUrl = this.getAttribute('data-url');
            const productTitle = this.getAttribute('data-title');
            const platform = this.getAttribute('data-platform');
            
            let shareUrl = '';
            
            switch (platform) {
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(productUrl)}&text=${encodeURIComponent(productTitle)}`;
                    break;
                case 'pinterest':
                    shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(productUrl)}&description=${encodeURIComponent(productTitle)}`;
                    break;
                case 'email':
                    shareUrl = `mailto:?subject=${encodeURIComponent(productTitle)}&body=${encodeURIComponent(productUrl)}`;
                    break;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
}); 