// Toggle the navigation menu
function toggleNav() {
  const navLinks = document.getElementById('nav-links');
  const menuToggle = document.querySelector('.navbar-burger');

  // Toggle the 'is-active' class to open/close the menu
  navLinks.classList.toggle('is-active');
  menuToggle.classList.toggle('is-active');
}

AOS.init({
  duration: 1000,
});

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

if (window.innerWidth <= 768) {
  // Disable or adjust smooth scrolling on mobile for better performance
  document.documentElement.style.scrollBehavior = 'auto'; // Reset smooth scrolling if needed
} else {
  document.documentElement.style.scrollBehavior = 'smooth';
}

// Project Card Click Functionality
document.addEventListener('DOMContentLoaded', function () {
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    const projectLink = card.querySelector('.project-link');
    const overlay = card.querySelector('.card-overlay');
    const viewProjectBtn = card.querySelector('.view-project');

    if (viewProjectBtn && projectLink) {
      viewProjectBtn.addEventListener('click', function (e) {
        e.preventDefault();
        window.open(projectLink.href, '_blank');
      });
    }

    if (overlay) {
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay && projectLink) {
          window.open(projectLink.href, '_blank');
        }
      });
    }
  });

  // Make sure AOS animations work properly
  window.addEventListener('load', function () {
    AOS.refresh();
  });
});