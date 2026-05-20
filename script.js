// Mobile Hamburger Menu Handler
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navMenu = document.getElementById('navMenu');

hamburgerBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Toggle menu icon between bars and X close sign
    const icon = hamburgerBtn.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.replace('fa-bars', 'fa-times');
    } else {
        icon.classList.replace('fa-times', 'fa-bars');
    }
});

// Close mobile navigation menu layout on clicking any link items
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburgerBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
    });
});

// Tab Panel Controller System
function switchTab(event, tabId) {
    // Remove active status from all current tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Hide all panel element variants
    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    
    // Assign active statuses to target objects
    event.currentTarget.classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

// Backend Connection: Form Handling to Google Apps Script Macro API Endpoint
const emailForm = document.getElementById('emailCaptureForm');
const feedbackMsg = document.getElementById('formFeedback');

emailForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const emailValue = document.getElementById('userEmail').value;
    feedbackMsg.style.color = '#ffb703';
    feedbackMsg.textContent = 'Submitting email...';
    
    // REPL_WITH_APPS_SCRIPT_WEB_APP_URL is a placeholder for your actual Google Web App deployment link
    const scriptURL = 'REPL_WITH_APPS_SCRIPT_WEB_APP_URL';
    
    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors', // Essential option rule setting for direct cross-domain Google Apps Script POST validation requests
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({ 'email': emailValue })
    })
    .then(() => {
        feedbackMsg.style.color = '#70e000';
        feedbackMsg.textContent = 'Success! Your space transformation journey begins now.';
        emailForm.reset();
    })
    .catch(error => {
        console.error('Error!', error.message);
        feedbackMsg.style.color = '#ff4d4d';
        feedbackMsg.textContent = 'Submission error. Please verify connections and try again.';
    });
});
