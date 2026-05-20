// Waits for the HTML document to fully load before running scripts
document.addEventListener("DOMContentLoaded", () => {
    
    // Select elements for interactions
    const hamburger = document.getElementById("hamburger-btn");
    const navMenu = document.getElementById("nav-menu");
    const appointmentBtn = document.getElementById("appointment-btn");
    const modal = document.getElementById("appointment-modal");
    const closeModal = document.getElementById("close-modal");
    const subscribeForm = document.getElementById("subscribe-form");
    const statusMsg = document.getElementById("subscribe-status");

    // --- NEWSLETTER FORM SUBMISSION (GOOGLE SHEETS INTEGRATION) ---
    subscribeForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Stops the website from reloading
        
        const emailValue = document.getElementById("email-input").value;
        statusMsg.textContent = "Submitting... Please wait.";
        statusMsg.style.color = "#007bff";

        // 👇 PASTE YOUR GOOGLE WEB APP URL LINK INSIDE THE QUOTES BELOW 👇
        const googleAppUrl = "https://script.google.com/macros/s/AKfycbzzA-TSVGs7304QvmpyWPmUkD5Cqk-WRSHHz7n-dlp5dLE70biye2NWMVkSWtggTfXgaA/exec";

        // Package the dataset up safely as text/plain to prevent CORS blocks
        fetch(googleAppUrl, {
            method: "POST",
            mode: "no-cors", // Bypasses browser CORS policy restrictions
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify({ email: emailValue })
        })
        .then(() => {
            // Displays success message on your landing page
            statusMsg.textContent = `Thank you! ${emailValue} has been saved to our spreadsheet.`;
            statusMsg.style.color = "#28a745";
            subscribeForm.reset(); // Clears out your form field text box
        })
        .catch(err => {
            console.error("Submission error:", err);
            statusMsg.textContent = "Oops! Something went wrong. Please try again.";
            statusMsg.style.color = "#dc3545";
        });
    });

    // --- HAMBURGER INTERACTION ---
    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-item").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
        });
    });

    // --- MODAL POPUP INTERACTION ---
    appointmentBtn.addEventListener("click", () => {
        modal.style.display = "flex";
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});
