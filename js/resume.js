// Navigation toggle: manage mobile menu state for accessibility and UX
function toggleNav() {
    const navLinks = document.getElementById('nav-links');
    const menuToggle = document.querySelector('.navbar-burger');

    // Toggle the 'is-active' class to show or hide the navigation menu on small screens
    navLinks.classList.toggle('is-active');
    menuToggle.classList.toggle('is-active');
}


// Smooth scrolling for in-page anchor links — improves navigation and preserves history behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});


// Back-to-top: reveal button after scrolling threshold and animate scroll to top when clicked
const backToTopButton = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
    backToTopButton.style.display = document.documentElement.scrollTop > 100 ? "block" : "none";
});
backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});


// Ensure AOS attaches animations after DOM content is ready
document.addEventListener("DOMContentLoaded", () => {
    AOS.init(); // Attach AOS animations
});


// Responsive helper: sets navigation layout depending on viewport width
function checkScreenSize() {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const navLinks = document.querySelector(".navbar-menu");

    // Use column layout on narrow viewports to preserve readable navigation
    navLinks.style.flexDirection = isMobile ? "column" : "row";
}

// Run responsive adjustments on load and resize
window.addEventListener("load", checkScreenSize);
window.addEventListener("resize", checkScreenSize);


// Adjust scroll behavior for performance on small devices
if (window.innerWidth <= 768) {
    document.documentElement.style.scrollBehavior = 'auto';
} else {
    document.documentElement.style.scrollBehavior = 'smooth';
}

// Update footer year dynamically
document.getElementById("year").textContent = new Date().getFullYear();