// Simple JavaScript for the QuickLoad website
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let valid = true;
            const inputs = contactForm.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    valid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (valid) {
                // In a real implementation, this would send the form data to a server
                // For now, just show a success message
                const formElements = contactForm.elements;
                for (let i = 0; i < formElements.length; i++) {
                    formElements[i].disabled = true;
                }
                
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Thank you for your message! We will contact you shortly.';
                
                contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
                
                // Reset form after 5 seconds
                setTimeout(() => {
                    contactForm.reset();
                    for (let i = 0; i < formElements.length; i++) {
                        formElements[i].disabled = false;
                    }
                    successMessage.remove();
                }, 5000);
            }
        });
    }

    // Add animation classes when elements come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .blood-puddle, .bleeding-server-large');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    };

    // Run once on page load
    animateOnScroll();
    
    // Then run on scroll
    window.addEventListener('scroll', animateOnScroll);
});
