// Scroll animations
document.addEventListener('DOMContentLoaded', function () {
    // Navigation menu toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navMenu && navMenu.classList.contains('active') && 
            !event.target.closest('.nav-menu') && 
            !event.target.closest('.nav-toggle')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
    
    // Change navbar background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Animate sections on scroll
    const sections = document.querySelectorAll('section');
    const scrollToTop = document.querySelector('.scroll-to-top');

    function checkSections() {
        const triggerBottom = window.innerHeight * 0.8;

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < triggerBottom) {
                section.classList.add('visible');
            }
        });

        // Show/hide scroll to top button
        if (window.scrollY > 300) {
            scrollToTop.classList.add('visible');
        } else {
            scrollToTop.classList.remove('visible');
        }
    }

    // Initial check
    checkSections();

    // Check on scroll
    window.addEventListener('scroll', checkSections);

    // Scroll to top functionality
    if (scrollToTop) {
        scrollToTop.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smooth scroll for navigation
    document.getElementById('learn-more-btn').addEventListener('click', function () {
        document.getElementById('about').scrollIntoView({
            behavior: 'smooth'
        });
    });

    // Animate stat numbers
    const stats = document.querySelectorAll('.stat-number');

    function animateStats() {
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const count = +stat.innerText;
            const increment = target / 100;

            if (count < target) {
                stat.innerText = Math.ceil(count + increment);
                setTimeout(animateStats, 50);
            } else {
                stat.innerText = target;
            }
        });
    }

    // Tech stack interactions
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach(item => {
        item.addEventListener('click', function () {
            alert(`${this.textContent}: ${this.getAttribute('data-tooltip')}`);
        });
    });

    // Progress bars animation
    const progressBars = document.querySelectorAll('.progress');
    setTimeout(() => {
        progressBars.forEach(bar => {
            bar.style.width = bar.getAttribute('data-width');
        });
    }, 500);

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    const thankYouMessage = document.getElementById('thankYouMessage');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Simulate form submission
        setTimeout(() => {
            contactForm.style.display = 'none';
            thankYouMessage.style.display = 'block';
        }, 1000);
    });

    // Add a simple loading effect
    document.getElementById('contactBtn').addEventListener('click', function (e) {
        if (!contactForm.checkValidity()) return;

        e.preventDefault();
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        setTimeout(() => {
            contactForm.style.display = 'none';
            thankYouMessage.style.display = 'block';
        }, 1500);
    });

    // Start animations
    animateStats();

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        });
    });

    // Form Submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Show success message
                const successMessage = form.nextElementSibling;
                if (successMessage && successMessage.classList.contains('success-message')) {
                    successMessage.style.display = 'block';
                    form.reset();
                    
                    // Hide success message after 3 seconds
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                    }, 3000);
                }
            }
        });
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        
        if (question && answer && toggle) {
            question.addEventListener('click', function() {
                // Close all other answers
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        const otherToggle = otherItem.querySelector('.faq-toggle');
                        if (otherAnswer && otherToggle) {
                            otherAnswer.style.maxHeight = null;
                            otherToggle.innerHTML = '<i class="fas fa-plus"></i>';
                        }
                    }
                });
                
                // Toggle current answer
                if (answer.style.maxHeight) {
                    answer.style.maxHeight = null;
                    toggle.innerHTML = '<i class="fas fa-plus"></i>';
                } else {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    toggle.innerHTML = '<i class="fas fa-minus"></i>';
                }
            });
        }
    });
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    
    if (testimonials.length > 0) {
        let currentSlide = 0;
        
        function showSlide(n) {
            testimonials.forEach(testimonial => testimonial.style.display = 'none');
            dots.forEach(dot => dot.classList.remove('active'));
            
            testimonials[n].style.display = 'block';
            dots[n].classList.add('active');
            currentSlide = n;
        }
        
        // Initialize slider
        showSlide(0);
        
        // Auto-advance slides every 5 seconds
        setInterval(() => {
            currentSlide = (currentSlide + 1) % testimonials.length;
            showSlide(currentSlide);
        }, 5000);
        
        // Next/previous controls
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', function() {
                currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
                showSlide(currentSlide);
            });
            
            nextBtn.addEventListener('click', function() {
                currentSlide = (currentSlide + 1) % testimonials.length;
                showSlide(currentSlide);
            });
        }
        
        // Dot controls
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                showSlide(index);
            });
        });
    }
    
    // Lazy Loading Images
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
    
    // Add loading animation to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('no-loading')) {
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 1000);
            }
        });
    });
});