// NEXUS Global Holdings - Main JavaScript
// ===================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // === Navigation Scroll Effect ===
    const mainNav = document.getElementById('mainNav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add shadow when scrolled
        if (currentScroll > 50) {
            mainNav.classList.add('scrolled');
        } else {
            mainNav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // === Dropdown Menu Enhancement ===
    // Add click support for mobile devices
    const dropdownItems = document.querySelectorAll('.has-dropdown');
    
    dropdownItems.forEach(item => {
        const link = item.querySelector('a');
        const dropdown = item.querySelector('.mega-dropdown');
        
        if (link && dropdown) {
            // For touch devices, toggle on click
            link.addEventListener('click', function(e) {
                // Only prevent default if it's a hash link or on mobile
                if (this.getAttribute('href').startsWith('#') || window.innerWidth <= 768) {
                    e.preventDefault();
                    
                    // Close other dropdowns
                    dropdownItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('dropdown-active');
                        }
                    });
                    
                    // Toggle current dropdown
                    item.classList.toggle('dropdown-active');
                }
            });
        }
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.has-dropdown')) {
            dropdownItems.forEach(item => {
                item.classList.remove('dropdown-active');
            });
        }
    });
    
    // === Mobile Menu Toggle ===
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // === Smooth Scrolling for Anchor Links ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or if it's a dropdown parent
            if (href === '#' || this.closest('.has-dropdown') === this.parentElement) {
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    if (mobileMenuToggle) {
                        mobileMenuToggle.classList.remove('active');
                    }
                }
                
                // Smooth scroll to target
                const navHeight = mainNav ? mainNav.offsetHeight : 0;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(href);
            }
        });
    });
    
    // === Update Active Navigation Link ===
    function updateActiveNavLink(href) {
        document.querySelectorAll('.nav-menu > li > a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === href) {
                link.classList.add('active');
            }
        });
    }
    
    // === Scroll Spy for Navigation ===
    const sections = document.querySelectorAll('section[id]');
    
    function scrollSpy() {
        const scrollPosition = window.pageYOffset + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                updateActiveNavLink('#' + sectionId);
            }
        });
    }
    
    if (sections.length > 0) {
        window.addEventListener('scroll', scrollSpy);
    }
    
    // === Intersection Observer for Animations ===
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.advantage-card, .product-card, .solution-card, .solution-featured, .news-card, .contact-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // === Hero Slider ===
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        const slides = heroSlider.querySelectorAll('.hero-slide');
        let currentSlide = 0;
        
        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (i === index) {
                    slide.classList.add('active');
                }
            });
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
        
        // Auto advance slides
        if (slides.length > 1) {
            setInterval(nextSlide, 5000);
        }
    }
    
    // === Button Click Handlers ===
    
    // CTA Buttons
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-cta');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Check if it's not a link button
            if (!this.closest('a') && this.textContent.includes('Quote')) {
                e.preventDefault();
                // Scroll to contact section or open contact page
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                    window.location.href = 'contact.html';
                }
            }
        });
    });
    
    // === Language Selector ===
    const languageSelector = document.querySelector('.language-selector');
    if (languageSelector) {
        languageSelector.addEventListener('change', function() {
            const selectedLang = this.value;
            if (selectedLang === 'zh') {
                window.location.href = 'index-zh.html';
            } else if (selectedLang === 'en') {
                window.location.href = 'index.html';
            }
            // Add more language redirects as needed
        });
    }
    
    // === Form Validation ===
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#e74c3c';
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (isValid) {
                // Show success message
                alert('Thank you for your submission! We will contact you soon.');
                form.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    });
    
    // === News Filter ===
    const newsFilters = document.querySelectorAll('.news-filter');
    if (newsFilters.length > 0) {
        newsFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                // Remove active class from all filters
                newsFilters.forEach(f => f.classList.remove('active'));
                // Add active class to clicked filter
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                const newsCards = document.querySelectorAll('.news-card');
                
                newsCards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(30px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // === Product Category Filter ===
    const productFilters = document.querySelectorAll('.product-filter');
    if (productFilters.length > 0) {
        productFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                productFilters.forEach(f => f.classList.remove('active'));
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                const productCards = document.querySelectorAll('.product-card');
                
                productCards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // === Accordion Functionality ===
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const item = this.parentElement;
            const content = item.querySelector('.accordion-content');
            
            // Toggle active class
            item.classList.toggle('active');
            
            // Slide toggle content
            if (item.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = '0';
            }
        });
    });
    
    // === Back to Top Button ===
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.style.display = 'flex';
            } else {
                backToTopButton.style.display = 'none';
            }
        });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // === Initialize AOS (Animate On Scroll) if available ===
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
    }
    
    console.log('NEXUS Global Holdings - Website Loaded Successfully');
});
