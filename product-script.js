// Navigation scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const item = this.closest('.accordion-item');
            const isActive = item.classList.contains('active');
            
            // Close all accordion items
            document.querySelectorAll('.accordion-item').forEach(i => {
                i.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Open first accordion item by default
    const firstAccordion = document.querySelector('.accordion-item');
    if (firstAccordion) {
        firstAccordion.classList.add('active');
    }
});

// Smooth scroll for page navigation
document.querySelectorAll('.page-nav-item').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const pageNavHeight = document.querySelector('.page-nav') ? document.querySelector('.page-nav').offsetHeight : 0;
            const targetPosition = targetSection.offsetTop - navbarHeight - pageNavHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
        const requiredFields = this.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#f44336';
            } else {
                field.style.borderColor = '#ddd';
            }
        });
        
        if (isValid) {
            alert('Thank you for your message! We will contact you shortly.');
            this.reset();
        } else {
            alert('Please fill in all required fields.');
        }
    });
}

// Dropdown menu functionality
document.querySelectorAll('.dropdown').forEach(dropdown => {
    dropdown.addEventListener('mouseenter', function() {
        this.querySelector('.dropdown-menu').style.display = 'block';
    });
    
    dropdown.addEventListener('mouseleave', function() {
        this.querySelector('.dropdown-menu').style.display = 'none';
    });
});
