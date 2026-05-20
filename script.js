document.addEventListener('DOMContentLoaded', () => {

    // --- MOBILE HAMBURGER MENU INTERACTIVE TRANSITIONS ---
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = hamburgerBtn.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });

        // Close mobile dropdown container drawers upon navigation link selection clicks
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburgerBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
            });
        });
    }


    // --- CYCLE CAROUSEL SLIDER ENGINE SYSTEM ---
    const slides = document.querySelectorAll('.slide-item');
    const pips = document.querySelectorAll('.pip');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    let currentIdx = 0;
    let slideInterval;

    if (slides.length > 0) {
        function showSlide(index) {
            // Edge constraint loop bounds normalization
            if (index >= slides.length) currentIdx = 0;
            else if (index < 0) currentIdx = slides.length - 1;
            else currentIdx = index;

            // Strip active indicators from structural nodes
            slides.forEach(slide => slide.classList.remove('active'));
            pips.forEach(pip => pip.classList.remove('active'));

            // Map current visibility flags to structural arrays
            slides[currentIdx].classList.add('active');
            if (pips[currentIdx]) pips[currentIdx].classList.add('active');
        }

        function nextSlide() {
            showSlide(currentIdx + 1);
        }

        function prevSlide() {
            showSlide(currentIdx - 1);
        }

        // Event listener hooks for manual slider controls
        if (nextBtn) nextBtn.addEventListener('click', () => { resetAutoCycle(); nextSlide(); });
        if (prevBtn) prevBtn.addEventListener('click', () => { resetAutoCycle(); prevSlide(); });

        pips.forEach((pip, index) => {
            pip.addEventListener('click', () => {
                resetAutoCycle();
                showSlide(index);
            });
        });

        // Loop automation callback hooks
        function startAutoCycle() {
            slideInterval = setInterval(nextSlide, 5000); // Transitions automatically every 5 seconds
        }

        function resetAutoCycle() {
            clearInterval(slideInterval);
            startAutoCycle();
        }

        // Initialize active configuration loop tracks
        startAutoCycle();
    }


    // --- HIGH-UTILITY DYNAMIC SECTION SCROLL SPY TRACKER ---
    const scrollSections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function scrollSpyEngine() {
        const currentScrollY = window.scrollY + 120; // Structural offset matching custom stick header thickness definitions

        scrollSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (currentScrollY >= sectionTop && currentScrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    window.addEventListener('scroll', scrollSpyEngine);


    // --- BACKEND WEB APP FORM SUBMISSION LOGIC INTERFACES ---
    const contactForm = document.getElementById('studioContactForm');
    const formFeedback = document.getElementById('formFeedback');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Collect values from the DOM
            const clientName = document.getElementById('clientName').value;
            const clientEmail = document.getElementById('clientEmail').value;
            const clientMessage = document.getElementById('clientMessage').value;

            // Provide visual loading confirmation cues
            formFeedback.style.color = 'var(--cta-yellow)';
            formFeedback.textContent = 'Processing request transmission...';

            // Google Apps Script Web App Deployment endpoint configuration
            const webAppURL = 'REPL_WITH_APPS_SCRIPT_WEB_APP_URL';

            // Convert regular JS parameters into URL-encoded search layout blocks
            const dataPayload = new URLSearchParams({
                'name': clientName,
                'email': clientEmail,
                'message': clientMessage
            });

            fetch(webAppURL, {
                method: 'POST',
                mode: 'no-cors', // Bypasses cross-domain validation requirements for directly hitting Google App script engines
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: dataPayload
            })
            .then(() => {
                formFeedback.style.color = 'var(--accent-lime)';
                formFeedback.textContent = 'Message delivered! Our consulting team will contact you shortly.';
                contactForm.reset();
            })
            .catch(error => {
                console.error('Transmission Failure:', error);
                formFeedback.style.color = '#ff4d4d';
                formFeedback.textContent = 'Network communication error. Please check your connection and retry.';
            });
        });
    }
});
