// Navigation toggle: manage the mobile menu state for accessibility and UX
const birthDate = new Date("2008-04-02T00:00:00Z");

function toggleNav() {
    const navLinks = document.getElementById('nav-links');
    const menuToggle = document.querySelector('.navbar-burger');

    // Toggle the 'is-active' class to show or hide the navigation menu on small screens
    navLinks.classList.toggle('is-active');
    menuToggle.classList.toggle('is-active');
}

// Initialize AOS (Animate On Scroll) with a sensible default duration for entrance animations
AOS.init({
    duration: 1000,
});

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

// Live age display: compute and update age in years and fractional months
function updateLiveAge() {
    const birthDate = new Date("2010-04-02T00:00:00Z");
    const now = new Date();

    const diffMs = now - birthDate;

    const msPerYear = 1000 * 60 * 60 * 24 * 365.2425; // average Gregorian year
    const msPerMonth = msPerYear / 12;

    const years = Math.floor(diffMs / msPerYear);
    const monthsDecimal = (diffMs % msPerYear) / msPerMonth;

    // Present age as whole years plus months with two decimals for clarity
    const displayText = `${years} years and ${monthsDecimal.toFixed(2)} months`;

    document.getElementById("live-age").textContent = displayText;
}

// Keep the displayed age current
setInterval(updateLiveAge, 1000);
updateLiveAge();

// Adjust layout-related styles depending on viewport width to maintain responsive behavior
function checkScreenSize() {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const navLinks = document.querySelector(".navbar-menu");

    // Use column layout on narrow viewports to preserve readable navigation
    navLinks.style.flexDirection = isMobile ? "column" : "row";
}

// Run responsive adjustments on load and when the window resizes
window.addEventListener("load", checkScreenSize);
window.addEventListener("resize", checkScreenSize);

// Back-to-top control: show button after scrolling a bit, and animate scrolling to top when clicked
const backToTopButton = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
    backToTopButton.style.display = document.documentElement.scrollTop > 100 ? "block" : "none";
});
backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Ensure AOS is initialized after the DOM is ready so animations bind to elements correctly
document.addEventListener("DOMContentLoaded", () => {
    AOS.init(); // Attach entrance animations (AOS)
});

// Improve mobile performance by disabling smooth scrolling on narrow screens
if (window.innerWidth <= 768) {
    document.documentElement.style.scrollBehavior = 'auto';
} else {
    document.documentElement.style.scrollBehavior = 'smooth';
}

// Update the year in the footer dynamically
document.getElementById("year").textContent = new Date().getFullYear();