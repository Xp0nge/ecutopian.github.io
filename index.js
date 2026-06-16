document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. MOBILE RESPONSIVE NAVIGATION CONTROLLER
    // ==========================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Drops open menu on mobile clicking interactions
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Automatically collapses mobile slide drawer menu overlay if link is tapped
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks) navLinks.classList.remove('active');
        });
    });

    // ==========================================
    // 2. GOOGLE SHEETS FORM SUBMISSION PIPELINE
    // ==========================================
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevents the browser from flashing or reloading to a blank page

            // Find the submit button to display a loading visual indicator
            const submitBtn = contactForm.querySelector('.custom-submit-btn');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = "Sending...";
            submitBtn.disabled = true;

            // Automatically inject a unique numeric entry tracking code into your hidden HTML field
            const idField = document.getElementById('client-idNumber');
            if (idField) {
                idField.value = "ECU-" + Date.now();
            }

            // Package all the form input data into a clean key-value object matching your App Script keys
            const formData = {
                idNumber: document.getElementById('client-idNumber') ? document.getElementById('client-idNumber').value : "ECU-" + Date.now(),
                surname: document.getElementById('client-surname').value,
                firstName: document.getElementById('client-firstname').value,
                email: document.getElementById('client-email').value,
                contactNumber: document.getElementById('client-phone').value,
                message: document.getElementById('client-message').value
            };

            // ⚠️ CRITICAL STEP: Replace this dummy URL with your real Google Script Web App URL!
            // It must look like: https://google.com
            const googleScriptUrl = "https://script.google.com/macros/s/AKfycbyJPkqA8-ubKuEobUW8cD3-q-G3jujJ925LVQDhWLYGhEmQvoaLmqWw0ey7ZU1BUL5c/exec";

            // Dispatch a live asynchronous network request straight to your spreadsheet
            fetch(googleScriptUrl, {
                method: 'POST',
                mode: 'no-cors', // Essential bypass flag for standard cross-origin script redirects
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(() => {
                // Success response routine
                alert("Thank you! Your inquiry has been sent directly to our team.");
                contactForm.reset(); // Wipes out text boxes for the next client entry
            })
            .catch(error => {
                console.error('Error!', error.message);
                alert("Something went wrong. Please check your connection and try again.");
            })
            .finally(() => {
                // Restore submission button states
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            });
        });
    }

    // ==========================================
    // 3. FEATURED IMAGE CAROUSEL SCRIPT CONTROLLER
    // ==========================================
    const splideContainer = document.querySelector('.splide');
    if (splideContainer) {
        const splide = new Splide('.splide', {
            type: 'loop',        // Seamless infinite cycling mechanism
            perPage: 1,          // Focuses neatly on a single main project slide frame at a time
            autoplay: true,      // Automatically moves across slides
            interval: 4000,      // Changes slides every 4 seconds
            pauseOnHover: true,  // Freezes carousel tracking when hovered or held down on touchscreens
            arrows: true,        // Renders visual direction navigation controls
            pagination: true,    // Draws page progress indicator tracking pips at the bottom container margin
            speed: 800,          // Transition animation sweep velocity duration (0.8 seconds)
        });

        // Mount the splide instance safely inside the layout lifecycle load window
        splide.mount();

        // FIX: Intercept arrow clicks to flip the movement direction natively
        const prevArrow = splideContainer.querySelector('.splide__arrow--prev');
        const nextArrow = splideContainer.querySelector('.splide__arrow--next');

        if (prevArrow && nextArrow) {
            // Override the Left Arrow to step forward ('>') instead of backward
            prevArrow.addEventListener('click', (e) => {
                e.stopPropagation(); // Stops the default backward trigger
                splide.go('>');      // Forces the image sequence forward
            }, { capture: true });

            // Override the Right Arrow to step backward ('<') instead of forward
            nextArrow.addEventListener('click', (e) => {
                e.stopPropagation(); // Stops the default forward trigger
                splide.go('<');      // Forces the image sequence backward
            }, { capture: true });
        }
    }

}); // <-- ALL code blocks are now safely closed inside the load listener!
