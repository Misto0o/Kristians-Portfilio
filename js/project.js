// Navigation toggle: manage mobile menu state for accessibility and UX
function toggleNav() {
  const navLinks = document.getElementById('nav-links');
  const menuToggle = document.querySelector('.navbar-burger');

  // Toggle the 'is-active' class to show or hide the navigation menu on small screens
  navLinks.classList.toggle('is-active');
  menuToggle.classList.toggle('is-active');
}

// Initialize AOS (Animate On Scroll) with a default animation duration
AOS.init({
  duration: 1000,
});

// Smooth scrolling for anchor links to improve in-page navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetElement = document.querySelector(this.getAttribute('href'));
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Responsive layout helper: sets navigation layout depending on viewport width
function checkScreenSize() {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const navLinks = document.querySelector(".navbar-menu");

  // Use a column layout for narrow screens for better touch navigation
  navLinks.style.flexDirection = isMobile ? "column" : "row";
}

// Run responsive adjustments on load and resize
window.addEventListener("load", checkScreenSize);
window.addEventListener("resize", checkScreenSize);

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

// Disable smooth scroll on small viewports to improve perceived performance
if (window.innerWidth <= 768) {
  document.documentElement.style.scrollBehavior = 'auto';
} else {
  document.documentElement.style.scrollBehavior = 'smooth';
}

// Project card click behavior: open linked project in a new tab when cards or overlays are clicked
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

  // Refresh AOS after all assets load to ensure animations apply correctly
  window.addEventListener('load', function () {
    AOS.refresh();
  });
});

document.getElementById("year").textContent = new Date().getFullYear();