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

// Animated decorative dots overlay: creates a subtle animated background for a section
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

// Apply subtle animated dot overlays to timeline and contact sections for visual depth
addAnimatedDots('timeline');
addAnimatedDots('contact');


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

// Run responsive adjustments on load and when the window resizes
window.addEventListener("load", checkScreenSize);
window.addEventListener("resize", checkScreenSize);

// Adjust scroll behavior for performance on small devices
if (window.innerWidth <= 768) {
    document.documentElement.style.scrollBehavior = 'auto';
} else {
    document.documentElement.style.scrollBehavior = 'smooth';
}

emailjs.init('k-OW5Z5AEgecgKPBy'); // Initialize EmailJS with the public key

// Contact form: prevent default submission, show progress state, and send via EmailJS
const btn = document.getElementById('button');
document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();  // Prevent default form submission

    btn.value = 'Sending...';  // Provide immediate feedback to the user

    const serviceID = 'service_g2d5g4e';  // EmailJS service identifier
    const templateID = 'template_5o8v3ko';  // EmailJS template identifier

    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            btn.value = 'Send Email';  // Restore button label on success
            alert('Sent!');  // Notify user of success
            document.getElementById('contact-form').reset();
        }, (err) => {
            btn.value = 'Send Email';  // Restore button label on failure
            console.error('Error details:', err);  // Log error for debugging
            alert('Something went wrong. Please try again later.');
        });
});

// Update footer year dynamically
document.getElementById("year").textContent = new Date().getFullYear();