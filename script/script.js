// Scroll animations
document.addEventListener('DOMContentLoaded', function () {
    // Navigation menu toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
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
    scrollToTop.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

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
});