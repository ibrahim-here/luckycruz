document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const header = document.querySelector('header');
    
    // Toggle mobile menu
    function toggleMobileMenu() {
        mobileNav.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        
        // Animate hamburger icon
        const spans = hamburger.querySelectorAll('span');
        spans.forEach(span => {
            span.classList.toggle('active');
        });
    }
    
    // Close mobile menu
    function closeMobileMenu() {
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
        const spans = hamburger.querySelectorAll('span');
        spans.forEach(span => {
            span.classList.remove('active');
        });
    }
    
    // Toggle menu on hamburger click
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMobileMenu();
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });

    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                closeMobileMenu();
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update URL without page jump
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Sticky Header on Scroll
    const headerHeight = header.offsetHeight;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > headerHeight) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Add active class to current section in navigation
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-nav a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Scroll Animation Observer for elements coming into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered animation delay
                const delay = index * 100;
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, delay);
                
                // Add special effects for different element types
                if (entry.target.classList.contains('achievement-card')) {
                    entry.target.style.animationDelay = `${delay}ms`;
                }
                
                if (entry.target.classList.contains('gallery-item')) {
                    entry.target.style.animationDelay = `${delay * 0.5}ms`;
                }
                
                // Unobserve once animated to prevent re-triggering
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Add scroll-triggered animations for specific elements
    const animateElements = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animated');
            }
        });
    };

    // Call on scroll
    window.addEventListener('scroll', animateElements);
    
    // Call on load
    animateElements();

    // Add parallax effect to background images
    const parallaxElements = document.querySelectorAll('.section-bg');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });

    // Add loading animation for images
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
        });
        
        // Set initial styles for loading animation
        img.style.opacity = '0';
        img.style.transform = 'scale(0.8)';
        img.style.transition = 'all 0.3s ease';
    });

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('.achievement-card, .business-card, .apparel-card, .media-card, .gallery-item, .sponsor-logo');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0,255,0,0.3)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });

    // Add typing effect for mission statement
    const missionStatement = document.querySelector('.mission-statement p');
    if (missionStatement) {
        const text = missionStatement.textContent;
        missionStatement.textContent = '';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let i = 0;
                    const typeInterval = setInterval(() => {
                        missionStatement.textContent += text.charAt(i);
                        i++;
                        if (i >= text.length) {
                            clearInterval(typeInterval);
                        }
                    }, 30);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(missionStatement);
    }

    // Add glowing cursor effect on hover for buttons and links
    const glowElements = document.querySelectorAll('a, button, .btn, .contact-button, .view-collection, .read-more');
    
    glowElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 20px rgba(0,255,0,0.5)';
            this.style.textShadow = '0 0 10px rgba(0,255,0,0.8)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
            this.style.textShadow = '';
        });
    });

    // Add dynamic background color change on scroll
    let ticking = false;
    
    function updateBackgroundOnScroll() {
        const scrollTop = window.pageYOffset;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = scrollTop / maxScroll;
        
        // Create a subtle gradient effect based on scroll position
        const greenIntensity = Math.sin(scrollPercent * Math.PI * 2) * 0.1 + 0.05;
        document.body.style.background = `radial-gradient(circle at center, rgba(0,255,0,${greenIntensity}) 0%, rgba(0,0,0,1) 100%)`;
        
        ticking = false;
    }
    
    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateBackgroundOnScroll);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestScrollUpdate);

    // Add matrix rain effect (optional - can be commented out if too intensive)
    const createMatrixEffect = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '-1';
        canvas.style.pointerEvents = 'none';
        canvas.style.opacity = '0.1';
        
        document.body.appendChild(canvas);
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const letters = '01';
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);
        
        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00FF00';
            ctx.font = fontSize + 'px monospace';
            
            drops.forEach((drop, i) => {
                const text = letters[Math.floor(Math.random() * letters.length)];
                ctx.fillText(text, i * fontSize, drop * fontSize);
                
                if (drop * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            });
        };
        
        // Uncomment the line below to enable matrix effect
        // setInterval(draw, 100);
    };
    
    // createMatrixEffect();

    console.log('🍀 LuckyCruz website loaded with enhanced animations and effects!');
});

// Add additional dynamic styles for the black/green theme
document.head.insertAdjacentHTML(
    'beforeend',
    `<style>
        .desktop-nav a.active:after, .mobile-nav a.active {
            width: 100% !important;
            background-color: #00ff00 !important;
        }
        
        .sticky {
            padding: 10px 0;
            background: linear-gradient(135deg, rgba(10, 53, 80, 0.95), rgba(21, 107, 148, 0.95)) !important;
            box-shadow: 0 5px 20px rgba(0,255,0,0.3) !important;
        }
        
        .hamburger span.active:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
            background-color: #00ff00 !important;
        }
        
        .hamburger span.active:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger span.active:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -5px);
            background-color: #00ff00 !important;
        }
        
        /* Glow effect for forensic green elements */
        .forensic-glow {
            box-shadow: 0 0 20px rgba(0,255,0,0.5);
            animation: pulse-glow 2s infinite;
        }
        
        @keyframes pulse-glow {
            0%, 100% { 
                box-shadow: 0 0 20px rgba(0,255,0,0.3);
            }
            50% { 
                box-shadow: 0 0 30px rgba(0,255,0,0.6);
            }
        }
        
        /* Enhanced scroll animations */
        .animate-on-scroll.animated {
            animation-duration: 0.8s;
            animation-fill-mode: both;
        }
        
        .fade-in-up.animated {
            animation-name: fadeInUpCustom;
        }
        
        .fade-in-left.animated {
            animation-name: fadeInLeftCustom;
        }
        
        .fade-in-right.animated {
            animation-name: fadeInRightCustom;
        }
        
        @keyframes fadeInUpCustom {
            from {
                opacity: 0;
                transform: translate3d(0, 50px, 0);
            }
            to {
                opacity: 1;
                transform: translate3d(0, 0, 0);
            }
        }
        
        @keyframes fadeInLeftCustom {
            from {
                opacity: 0;
                transform: translate3d(-50px, 0, 0);
            }
            to {
                opacity: 1;
                transform: translate3d(0, 0, 0);
            }
        }
        
        @keyframes fadeInRightCustom {
            from {
                opacity: 0;
                transform: translate3d(50px, 0, 0);
            }
            to {
                opacity: 1;
                transform: translate3d(0, 0, 0);
            }
        }
        
        /* Loading states */
        .loading {
            opacity: 0;
            transform: translateY(20px);
        }
        
        .loaded {
            opacity: 1;
            transform: translateY(0);
            transition: all 0.6s ease;
        }
    </style>`
);