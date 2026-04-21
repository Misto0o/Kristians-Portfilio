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

function addAnimatedDots(sectionId) {
    const section = document.getElementById(sectionId);
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:0.35;';
    section.style.position = 'relative';
    section.style.overflow = 'hidden';
    section.prepend(canvas);

    const ctx = canvas.getContext('2d');
    let dots = [];

    function resize() {
        canvas.width = section.offsetWidth;
        canvas.height = section.offsetHeight;
    }

    function initDots() {
        const count = Math.floor((canvas.width * canvas.height) / 10000);
        dots = Array.from({ length: count }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 2 + 1,
            vx: (Math.random() - 0.5) * 0.4, // drift speed X
            vy: (Math.random() - 0.5) * 0.4, // drift speed Y
        }));
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        dots.forEach(d => {
            d.x += d.vx;
            d.y += d.vy;
            // wrap around edges
            if (d.x < 0) d.x = canvas.width;
            if (d.x > canvas.width) d.x = 0;
            if (d.y < 0) d.y = canvas.height;
            if (d.y > canvas.height) d.y = 0;

            ctx.beginPath();
            ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
            ctx.fillStyle = 'white';
            ctx.fill();
        });
        requestAnimationFrame(animate);
    }

    resize();
    initDots();
    animate();

    window.addEventListener('resize', () => { resize(); initDots(); });
}

addAnimatedDots('timeline');
addAnimatedDots('contact');


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

document.getElementById("year").textContent = new Date().getFullYear();