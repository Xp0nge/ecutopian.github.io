// 1. Mobile Menu Toggle Control System
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navMenu = document.getElementById('navMenu');

hamburgerBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = hamburgerBtn.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.replace('fa-bars', 'fa-times');
    } else {
        icon.classList.replace('fa-times', 'fa-bars');
    }
});

// Close nav drawer on click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburgerBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
    });
});

// 2. Interactive Portfolio Carousel Logic
const track = document.getElementById('carouselTrack');
const slides = Array.from(track.children);
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const dotContainer = document.getElementById('carouselDots');

let currentIndex = 0;

// Programmatically construct tracking dot indicators
slides.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (idx === 0) dot.classList.add('active');
    dot.addEventListener('click', () => moveSlide(idx));
    dotContainer.appendChild(dot);
});

const dots = Array.from(dotContainer.children);

function moveSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    
    track.style.transform = `translateX(-${index * 100}%)`;
    dots[currentIndex].classList.remove('active');
    dots[index].classList.add('active');
    currentIndex = index;
}

nextBtn.addEventListener('click', () => moveSlide(currentIndex + 1));
prevBtn.addEventListener('click', () => moveSlide(currentIndex - 1));

// Auto-run carousel slide presentation sequence loop
let slideInterval = setInterval(() => moveSlide(currentIndex + 1), 5000);
document.getElementById('work').addEventListener('mouseenter', () => clearInterval(slideInterval));
document.getElementById('work').addEventListener('mouseleave', () => {
    slideInterval = setInterval(() => moveSlide(currentIndex + 1), 5000);
});

// 3. Google Apps Script Lead Submission Integration Handler
const contactForm = document.getElementById('ecutopianContactForm');
const formFeedback = document.getElementById('formFeedback');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    formFeedback.style.color = '#ffb703';
    formFeedback.textContent = 'Sending message...';
    
    // REPLACE WITH YOUR ACTUAL DEPLOYED GOOGLE APPS SCRIPT MACRO LINK STRING
    const webAppUrl = 'REPL_WITH_APPS_SCRIPT_WEB_APP_URL';
    
    const formData = new URLSearchParams();
    formData.append('name', document.getElementById('clientName').value);
    formData.append('email', document.getElementById('clientEmail').value);
    formData.append('message', document.getElementById('clientMsg').value);
    
    fetch(webAppUrl, {
        method: 'POST',
        mode: 'no-cors', // Direct validation rule configuration layer for Google web apps cross-origin parsing
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData
    })
    .then(() => {
        formFeedback.style.color = '#70e000';
        formFeedback.textContent = 'Thank you! Your message was delivered successfully.';
        contactForm.reset();
    })
    .catch(err => {
        console.error('Data Submission Error Log:', err);
        formFeedback.style.color = '#ff4d4d';
        formFeedback.textContent = 'Submission unexpected fault. Verify your API link configuration parameter.';
    });
});
