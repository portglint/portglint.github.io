// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Animate elements when they come into view
document.addEventListener('DOMContentLoaded', function() {
    // Animate elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });
    
    // Animate elements with slide-in class
    document.querySelectorAll('.slide-in').forEach(element => {
        observer.observe(element);
    });
    
    // Animate elements with scale-in class
    document.querySelectorAll('.scale-in').forEach(element => {
        observer.observe(element);
    });
    
    // Animate elements with rotate-in class
    document.querySelectorAll('.rotate-in').forEach(element => {
        observer.observe(element);
    });
    
    // Animate elements with bounce-in class
    document.querySelectorAll('.bounce-in').forEach(element => {
        observer.observe(element);
    });
    
    // Animate elements with flip-in class
    document.querySelectorAll('.flip-in').forEach(element => {
        observer.observe(element);
    });
    
    // Animate elements with zoom-in class
    document.querySelectorAll('.zoom-in').forEach(element => {
        observer.observe(element);
    });
    
    // Animate elements with slide-up class
    document.querySelectorAll('.slide-up').forEach(element => {
        observer.observe(element);
    });
    
    // Animate elements with slide-down class
    document.querySelectorAll('.slide-down').forEach(element => {
        observer.observe(element);
    });
    
    // Animate elements with slide-left class
    document.querySelectorAll('.slide-left').forEach(element => {
        observer.observe(element);
    });
    
    // Animate elements with slide-right class
    document.querySelectorAll('.slide-right').forEach(element => {
        observer.observe(element);
    });
    
    // Animate elements with fade-up class
    document.querySelectorAll('.fade-up').forEach(element => {
        observer.observe(element);
    });
    
    // Animate elements with fade-down class
    document.querySelectorAll('.fade-down').forEach(element => {
        observer.observe(element);
    });
    
    // Animate elements with fade-left class
    document.querySelectorAll('.fade-left').forEach(element => {
        observer.observe(element);
    });
    
    // Animate elements with fade-right class
    document.querySelectorAll('.fade-right').forEach(element => {
        observer.observe(element);
    });
    
    // Animate elements with fade-scale class
    document.querySelectorAll('.fade-scale').forEach(element => {
        observer.observe(element);
    });
    
    // Animate elements with fade-rotate class
    document.querySelectorAll('.fade-rotate').forEach(element => {
        observer.observe(element);
    });
    
    // Animate elements with fade-flip class
    document.querySelectorAll('.fade-flip').forEach(element => {
        observer.observe(element);
    });
    
    // Animate elements with fade-bounce class
    document.querySelectorAll('.fade-bounce').forEach(element => {
        observer.observe(element);
    });
    
    // Animate elements with fade-zoom class
    document.querySelectorAll('.fade-zoom').forEach(element => {
        observer.observe(element);
    });
    
    // Animate elements with fade-slide-up class
    document.querySelectorAll('.fade-slide-up').forEach(element => {
        observer.observe(element);
    });
    
    // Animate elements with fade-slide-down class
    document.querySelectorAll('.fade-slide-down').forEach(element => {
        observer.observe(element);
    });
    
    // Animate elements with fade-slide-left class
    document.querySelectorAll('.fade-slide-left').forEach(element => {
        observer.observe(element);
    });
    
    // Animate elements with fade-slide-right class
    document.querySelectorAll('.fade-slide-right').forEach(element => {
        observer.observe(element);
    });
    
    // Animate elements with fade-slide-scale class
    document.querySelectorAll('.fade-slide-scale').forEach(element => {
        observer.observe(element);
    });
    
    // Animate elements with fade-slide-rotate class
    document.querySelectorAll('.fade-slide-rotate').forEach(element => {
        observer.observe(element);
    });
    
    // Animate elements with fade-slide-flip class
    document.querySelectorAll('.fade-slide-flip').forEach(element => {
        observer.observe(element);
    });
    
    // Animate elements with fade-slide-bounce class
    document.querySelectorAll('.fade-slide-bounce').forEach(element => {
        observer.observe(element);
    });
    
    // Animate elements with fade-slide-zoom class
    document.querySelectorAll('.fade-slide-zoom').forEach(element => {
        observer.observe(element);
    });
    
    // Animate elements with fade-slide-up-scale class
    document.querySelectorAll('.fade-slide-up-scale').forEach(element => {
        observer.observe(element);
    });
    
    // Animate elements with fade-slide-up-rotate class
    document.querySelectorAll('.fade-slide-up-rotate').forEach(element => {
        observer.observe(element);
    });
    
    // Animate elements with fade-slide-up-flip class
    document.querySelectorAll('.fade-slide-up-flip').forEach(element => {
        observer.observe(element);
    });
    
    // Animate elements with fade-slide-up-bounce class
    document.querySelectorAll('.fade-slide-up-bounce').forEach(element => {
        observer.observe(element);
    });
    
    // Animate elements with fade-slide-up-zoom class
    document.querySelectorAll('.fade-slide-up-zoom').forEach(element => {
        observer.observe(element);
    });
    
    // Animate elements with fade-slide-down-scale class
    document.querySelectorAll('.fade-slide-down-scale').forEach(element => {
        observer.observe(element);
    });
    
    // Animate elements with fade-slide-down-rotate class
    document.querySelectorAll('.fade-slide-down-rotate').forEach(element => {
        observer.observe(element);
    });
    
    // Animate elements with fade-slide-down-flip class
    document.querySelectorAll('.fade-slide-down-flip').forEach(element => {
        observer.observe(element);
    });
    
    // Animate elements with fade-slide-down-bounce class
    document.querySelectorAll('.fade-slide-down-bounce').forEach(element => {
        observer.observe(element);
    });
    
    // Animate elements with fade-slide-down-zoom class
    document.querySelectorAll('.fade-slide-down-zoom').forEach(element => {
        observer.observe(element);
    });
    
    // Animate elements with fade-slide-left-scale class
    document.querySelectorAll('.fade-slide-left-scale').forEach(element => {
        observer.observe(element);
    });
    
    // Animate elements with fade-slide-left-rotate class
    document.querySelectorAll('.fade-slide-left-rotate').forEach(element => {
        observer.observe(element);
    });
    
    // Animate elements with fade-slide-left-flip class
    document.querySelectorAll('.fade-slide-left-flip').forEach(element => {
        observer.observe(element);
    });
    
    // Animate elements with fade-slide-left-bounce class
    document.querySelectorAll('.fade-slide-left-bounce').forEach(element => {
        observer.observe(element);
    });
    
    // Animate elements with fade-slide-left-zoom class
    document.querySelectorAll('.fade-slide-left-zoom').forEach(element => {
        observer.observe(element);
    });
    
    // Animate elements with fade-slide-right-scale class
    document.querySelectorAll('.fade-slide-right-scale').forEach(element => {
        observer.observe(element);
    });
    
    // Animate elements with fade-slide-right-rotate class
    document.querySelectorAll('.fade-slide-right-rotate').forEach(element => {
        observer.observe(element);
    });
    
    // Animate elements with fade-slide-right-flip class
    document.querySelectorAll('.fade-slide-right-flip').forEach(element => {
        observer.observe(element);
    });
    
    // Animate elements with fade-slide-right-bounce class
    document.querySelectorAll('.fade-slide-right-bounce').forEach(element => {
        observer.observe(element);
    });
    
    // Animate elements with fade-slide-right-zoom class
    document.querySelectorAll('.fade-slide-right-zoom').forEach(element => {
        observer.observe(element);
    });
});

// Parallax effect for elements with parallax class
document.addEventListener('scroll', function() {
    document.querySelectorAll('.parallax').forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(window.pageYOffset * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Smooth scroll for elements with smooth-scroll class
document.querySelectorAll('.smooth-scroll').forEach(element => {
    element.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Typing effect for elements with typing class
document.querySelectorAll('.typing').forEach(element => {
    const text = element.textContent;
    element.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    observer.observe(element);
    element.addEventListener('animate', typeWriter);
});

// Counter animation for elements with counter class
document.querySelectorAll('.counter').forEach(element => {
    const target = parseInt(element.dataset.target);
    const duration = parseInt(element.dataset.duration) || 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    function updateCounter() {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    observer.observe(element);
    element.addEventListener('animate', updateCounter);
});

// Progress bar animation for elements with progress class
document.querySelectorAll('.progress').forEach(element => {
    const target = parseInt(element.dataset.target);
    const duration = parseInt(element.dataset.duration) || 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    function updateProgress() {
        current += step;
        if (current < target) {
            element.style.width = `${current}%`;
            requestAnimationFrame(updateProgress);
        } else {
            element.style.width = `${target}%`;
        }
    }
    
    observer.observe(element);
    element.addEventListener('animate', updateProgress);
});

// Hover effect for elements with hover class
document.querySelectorAll('.hover').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.classList.add('hover-active');
    });
    
    element.addEventListener('mouseleave', function() {
        this.classList.remove('hover-active');
    });
});

// Click effect for elements with click class
document.querySelectorAll('.click').forEach(element => {
    element.addEventListener('click', function() {
        this.classList.add('click-active');
        setTimeout(() => {
            this.classList.remove('click-active');
        }, 300);
    });
});

// Focus effect for elements with focus class
document.querySelectorAll('.focus').forEach(element => {
    element.addEventListener('focus', function() {
        this.classList.add('focus-active');
    });
    
    element.addEventListener('blur', function() {
        this.classList.remove('focus-active');
    });
});

// Active effect for elements with active class
document.querySelectorAll('.active').forEach(element => {
    element.addEventListener('click', function() {
        this.classList.toggle('active-active');
    });
});

// Disabled effect for elements with disabled class
document.querySelectorAll('.disabled').forEach(element => {
    element.addEventListener('click', function(e) {
        e.preventDefault();
    });
});

// Loading effect for elements with loading class
document.querySelectorAll('.loading').forEach(element => {
    element.addEventListener('click', function() {
        this.classList.add('loading-active');
        setTimeout(() => {
            this.classList.remove('loading-active');
        }, 1000);
    });
});

// Success effect for elements with success class
document.querySelectorAll('.success').forEach(element => {
    element.addEventListener('click', function() {
        this.classList.add('success-active');
        setTimeout(() => {
            this.classList.remove('success-active');
        }, 1000);
    });
});

// Error effect for elements with error class
document.querySelectorAll('.error').forEach(element => {
    element.addEventListener('click', function() {
        this.classList.add('error-active');
        setTimeout(() => {
            this.classList.remove('error-active');
        }, 1000);
    });
});

// Warning effect for elements with warning class
document.querySelectorAll('.warning').forEach(element => {
    element.addEventListener('click', function() {
        this.classList.add('warning-active');
        setTimeout(() => {
            this.classList.remove('warning-active');
        }, 1000);
    });
});

// Info effect for elements with info class
document.querySelectorAll('.info').forEach(element => {
    element.addEventListener('click', function() {
        this.classList.add('info-active');
        setTimeout(() => {
            this.classList.remove('info-active');
        }, 1000);
    });
});

// Primary effect for elements with primary class
document.querySelectorAll('.primary').forEach(element => {
    element.addEventListener('click', function() {
        this.classList.add('primary-active');
        setTimeout(() => {
            this.classList.remove('primary-active');
        }, 1000);
    });
});

// Secondary effect for elements with secondary class
document.querySelectorAll('.secondary').forEach(element => {
    element.addEventListener('click', function() {
        this.classList.add('secondary-active');
        setTimeout(() => {
            this.classList.remove('secondary-active');
        }, 1000);
    });
});

// Tertiary effect for elements with tertiary class
document.querySelectorAll('.tertiary').forEach(element => {
    element.addEventListener('click', function() {
        this.classList.add('tertiary-active');
        setTimeout(() => {
            this.classList.remove('tertiary-active');
        }, 1000);
    });
});

// Quaternary effect for elements with quaternary class
document.querySelectorAll('.quaternary').forEach(element => {
    element.addEventListener('click', function() {
        this.classList.add('quaternary-active');
        setTimeout(() => {
            this.classList.remove('quaternary-active');
        }, 1000);
    });
});

// Quinary effect for elements with quinary class
document.querySelectorAll('.quinary').forEach(element => {
    element.addEventListener('click', function() {
        this.classList.add('quinary-active');
        setTimeout(() => {
            this.classList.remove('quinary-active');
        }, 1000);
    });
});

// Senary effect for elements with senary class
document.querySelectorAll('.senary').forEach(element => {
    element.addEventListener('click', function() {
        this.classList.add('senary-active');
        setTimeout(() => {
            this.classList.remove('senary-active');
        }, 1000);
    });
});

// Septenary effect for elements with septenary class
document.querySelectorAll('.septenary').forEach(element => {
    element.addEventListener('click', function() {
        this.classList.add('septenary-active');
        setTimeout(() => {
            this.classList.remove('septenary-active');
        }, 1000);
    });
});

// Octonary effect for elements with octonary class
document.querySelectorAll('.octonary').forEach(element => {
    element.addEventListener('click', function() {
        this.classList.add('octonary-active');
        setTimeout(() => {
            this.classList.remove('octonary-active');
        }, 1000);
    });
});

// Nonary effect for elements with nonary class
document.querySelectorAll('.nonary').forEach(element => {
    element.addEventListener('click', function() {
        this.classList.add('nonary-active');
        setTimeout(() => {
            this.classList.remove('nonary-active');
        }, 1000);
    });
});

// Denary effect for elements with denary class
document.querySelectorAll('.denary').forEach(element => {
    element.addEventListener('click', function() {
        this.classList.add('denary-active');
        setTimeout(() => {
            this.classList.remove('denary-active');
        }, 1000);
    });
}); 