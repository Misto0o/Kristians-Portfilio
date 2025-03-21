// Toggle the navigation menu
function toggleNav() {
    const navLinks = document.getElementById('nav-links');
    const menuToggle = document.querySelector('.navbar-burger');

    // Toggle the 'is-active' class to open/close the menu
    navLinks.classList.toggle('is-active');
    menuToggle.classList.toggle('is-active');
}


// Smooth scroll for links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});


// Back to Top Button functionality
const backToTopButton = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
    backToTopButton.style.display = document.documentElement.scrollTop > 100 ? "block" : "none";
});
backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Call animations on page load (AOS Init)
document.addEventListener("DOMContentLoaded", () => {
    AOS.init(); // Initialize AOS (animation on scroll)
});

// Function to adjust layout based on screen size
function checkScreenSize() {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const navLinks = document.querySelector(".navbar-menu");

    // Adjust layout styles based on screen width
    navLinks.style.flexDirection = isMobile ? "column" : "row";
}

// Call the function on page load and on window resize
window.addEventListener("load", checkScreenSize);
window.addEventListener("resize", checkScreenSize);

if (window.innerWidth <= 768) {
    // Disable or adjust smooth scrolling on mobile for better performance
    document.documentElement.style.scrollBehavior = 'auto'; // Reset smooth scrolling if needed
} else {
    document.documentElement.style.scrollBehavior = 'smooth';
}

emailjs.init('k-OW5Z5AEgecgKPBy'); // Replace with your actual EmailJS user ID

const btn = document.getElementById('button');
document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();  // Prevents the form from submitting traditionally

    btn.value = 'Sending...';  // Change button text to indicate sending

    const serviceID = 'service_g2d5g4e';  // Replace with your EmailJS service ID
    const templateID = 'template_5o8v3ko';  // Replace with your EmailJS template ID

    emailjs.sendForm(serviceID, templateID, this)  // Send the form data to EmailJS
        .then(() => {
            btn.value = 'Send Email';  // Reset button text on success
            alert('Sent!');  // Alert on success
            document.getElementById('contact-form').reset();
        }, (err) => {
            btn.value = 'Send Email';  // Reset button text on error
            console.error('Error details:', err);  // Log error details for debugging
            alert('Something went wrong. Please try again later.');
        });
});
