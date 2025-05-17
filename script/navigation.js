// Navigation and menu functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navDropdowns = document.querySelectorAll('.nav-dropdown');
    
    // Toggle mobile menu
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && navMenu.classList.contains('active') && 
            !e.target.closest('.nav-menu') && 
            !e.target.closest('.nav-toggle')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    // Handle dropdown menus
    navDropdowns.forEach(dropdown => {
        const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        if (dropdownToggle && dropdownMenu) {
            // Toggle dropdown on click
            dropdownToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Close other dropdowns
                navDropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                        otherDropdown.querySelector('.dropdown-menu').classList.remove('active');
                    }
                });
                
                // Toggle current dropdown
                dropdown.classList.toggle('active');
                dropdownMenu.classList.toggle('active');
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function(e) {
                if (!dropdown.contains(e.target)) {
                    dropdown.classList.remove('active');
                    dropdownMenu.classList.remove('active');
                }
            });
        }
    });
    
    // Handle mobile navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Close mobile menu when clicking a link
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
            
            // Close dropdown menus
            navDropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
                dropdown.querySelector('.dropdown-menu').classList.remove('active');
            });
        });
    });
    
    // Handle scroll events
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove navbar background
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.classList.add('navbar-hidden');
        } else {
            // Scrolling up
            navbar.classList.remove('navbar-hidden');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Handle active navigation items
    function setActiveNavItem() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current section's link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // Set active nav item on scroll
    window.addEventListener('scroll', setActiveNavItem);
    
    // Set active nav item on page load
    setActiveNavItem();
    
    // Handle smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId.startsWith('#')) {
                e.preventDefault();
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
            }
        });
    });
    
    // Handle search functionality
    const searchToggle = document.querySelector('.search-toggle');
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('.search-input');
    
    if (searchToggle && searchForm && searchInput) {
        // Toggle search form
        searchToggle.addEventListener('click', function(e) {
            e.preventDefault();
            searchForm.classList.toggle('active');
            
            if (searchForm.classList.contains('active')) {
                searchInput.focus();
            }
        });
        
        // Close search form when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchForm.contains(e.target) && !searchToggle.contains(e.target)) {
                searchForm.classList.remove('active');
            }
        });
        
        // Handle search form submission
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = searchInput.value.trim();
            
            if (searchTerm) {
                // Perform search
                window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
            }
        });
    }
    
    // Handle language switcher
    const languageToggle = document.querySelector('.language-toggle');
    const languageMenu = document.querySelector('.language-menu');
    
    if (languageToggle && languageMenu) {
        // Toggle language menu
        languageToggle.addEventListener('click', function(e) {
            e.preventDefault();
            languageMenu.classList.toggle('active');
        });
        
        // Close language menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!languageMenu.contains(e.target) && !languageToggle.contains(e.target)) {
                languageMenu.classList.remove('active');
            }
        });
        
        // Handle language selection
        languageMenu.querySelectorAll('.language-option').forEach(option => {
            option.addEventListener('click', function() {
                const lang = this.getAttribute('data-lang');
                const currentPath = window.location.pathname;
                const newPath = currentPath.replace(/^\/[a-z]{2}/, `/${lang}`);
                
                window.location.href = newPath;
            });
        });
    }
    
    // Handle theme switcher
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
        // Get saved theme
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        // Toggle theme
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
    
    // Handle scroll to top button
    const scrollToTop = document.querySelector('.scroll-to-top');
    
    if (scrollToTop) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTop.classList.add('visible');
            } else {
                scrollToTop.classList.remove('visible');
            }
        });
        
        // Scroll to top when clicked
        scrollToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Handle breadcrumbs
    const breadcrumbs = document.querySelector('.breadcrumbs');
    
    if (breadcrumbs) {
        const path = window.location.pathname;
        const pathParts = path.split('/').filter(part => part);
        let breadcrumbHTML = '<a href="/">Home</a>';
        let currentPath = '';
        
        pathParts.forEach((part, index) => {
            currentPath += `/${part}`;
            const isLast = index === pathParts.length - 1;
            
            if (isLast) {
                breadcrumbHTML += ` <span class="separator">/</span> <span class="current">${part}</span>`;
            } else {
                breadcrumbHTML += ` <span class="separator">/</span> <a href="${currentPath}">${part}</a>`;
            }
        });
        
        breadcrumbs.innerHTML = breadcrumbHTML;
    }
    
    // Handle pagination
    const pagination = document.querySelector('.pagination');
    
    if (pagination) {
        const currentPage = parseInt(pagination.getAttribute('data-current-page')) || 1;
        const totalPages = parseInt(pagination.getAttribute('data-total-pages')) || 1;
        
        let paginationHTML = '';
        
        // Previous button
        if (currentPage > 1) {
            paginationHTML += `<a href="?page=${currentPage - 1}" class="prev">Previous</a>`;
        }
        
        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === currentPage) {
                paginationHTML += `<span class="current">${i}</span>`;
            } else if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
                paginationHTML += `<a href="?page=${i}">${i}</a>`;
            } else if (i === currentPage - 3 || i === currentPage + 3) {
                paginationHTML += '<span class="ellipsis">...</span>';
            }
        }
        
        // Next button
        if (currentPage < totalPages) {
            paginationHTML += `<a href="?page=${currentPage + 1}" class="next">Next</a>`;
        }
        
        pagination.innerHTML = paginationHTML;
    }
}); 