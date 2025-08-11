// Performance optimization: Use requestIdleCallback for non-critical initializations
const initializeNonCritical = () => {
    // Initialize AOS with optimized settings
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        disable: 'mobile' // Disable on mobile for better performance
    });

    // Initialize other non-critical features
    initializeParallax();
    initializeGallery();
    initializeStats();
};

// Use requestIdleCallback or fallback to setTimeout
const requestIdleCallback = window.requestIdleCallback || function(cb) {
    const start = Date.now();
    return setTimeout(function() {
        cb({
            didTimeout: false,
            timeRemaining: function() {
                return Math.max(0, 50 - (Date.now() - start));
            }
        });
    }, 1);
};

// Performance optimization: Debounce scroll events
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Mobile Navigation with performance optimization
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (!burger || !nav) return;

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links with requestAnimationFrame
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                requestAnimationFrame(() => {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                });
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });
};

// Smooth Scrolling with performance optimization
const initializeSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
};

// Optimized Parallax Effect
const initializeParallax = () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    let ticking = false;
    const updateParallax = debounce(() => {
        const scrolled = window.pageYOffset;
        requestAnimationFrame(() => {
            hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
            ticking = false;
        });
    }, 10);

    window.addEventListener('scroll', () => {
        if (!ticking) {
            ticking = true;
            updateParallax();
        }
    }, { passive: true });
};

// Optimized Menu Item Hover Effect
const initializeMenuItems = () => {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        const overlay = item.querySelector('.menu-overlay');
        if (!overlay) return;

        item.addEventListener('mouseenter', () => {
            requestAnimationFrame(() => {
                overlay.style.opacity = '1';
            });
        });

        item.addEventListener('mouseleave', () => {
            requestAnimationFrame(() => {
                overlay.style.opacity = '0';
            });
        });
    });
};

// Optimized Stats Counter
const initializeStats = () => {
    const stats = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.stats');
    if (!statsSection || !stats.length) return;

    let started = false;
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !started) {
            started = true;
            stats.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateValue(stat, 0, target, 2000);
            });
        }
    });

    observer.observe(statsSection);
};

// Optimized value animator
const animateValue = (obj, start, end, duration) => {
    if (!obj) return;

    const step = (timestamp) => {
        if (!obj.startTimestamp) obj.startTimestamp = timestamp;
        const progress = Math.min((timestamp - obj.startTimestamp) / duration, 1);
        
        requestAnimationFrame(() => {
            obj.innerHTML = Math.floor(progress * (end - start) + start) + '+';
        });

        if (progress < 1) {
            requestAnimationFrame(step);
        }
    };
    requestAnimationFrame(step);
};

// Optimized Form Submission
const initializeForm = () => {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('.submit-btn');
        if (!submitBtn) return;

        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
            submitBtn.style.backgroundColor = '#2ecc71';
            contactForm.reset();

            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.backgroundColor = '';
                submitBtn.disabled = false;
            }, 3000);
        }, 2000);
    });
};

// Initialize Gallery with lazy loading
const initializeGallery = () => {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    
    const loadImage = (img) => {
        const src = img.getAttribute('data-src');
        if (!src) return;
        
        img.src = src;
        img.removeAttribute('data-src');
    };

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadImage(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });

        galleryItems.forEach(img => imageObserver.observe(img));
    } else {
        galleryItems.forEach(loadImage);
    }
};

// Social Links Hover Effect
const initializeSocialLinks = () => {
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transition = 'transform 0.3s ease';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transition = 'transform 0.3s ease';
        });
    });
};

// Initialize all critical features
const initializeCriticalFeatures = () => {
    navSlide();
    initializeSmoothScroll();
    initializeMenuItems();
    initializeForm();
};

// Initialize non-critical features when browser is idle
document.addEventListener('DOMContentLoaded', () => {
    // Initialize critical features immediately
    initializeCriticalFeatures();

    // Initialize non-critical features when idle
    requestIdleCallback(() => {
        initializeNonCritical();
    });
});

// Add error handling for image loading
document.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
        e.target.src = 'images/placeholder.jpg'; // Fallback image
    }
}, true);

// Cache images using Service Worker if browser supports it
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}
