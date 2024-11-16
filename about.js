document.addEventListener("DOMContentLoaded", function () {
    function initAnimations() {
        // Animate each section with initial opacity of 0
        gsap.utils.toArray("section").forEach((section) => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
                opacity: 0, // Start from invisible
                y: 20,
                duration: 1,
                ease: "ease-in-out",
                onComplete: () => {
                    gsap.to(section, { opacity: 1 }); // Set opacity to 1 after animation
                }
            });
        });
    }

    // Initialize AOS (Animate On Scroll)
    setTimeout(() => {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
        });
    }, 100);

    function initMenuToggle() {
        const menuToggle = document.querySelector(".navbar-burger");
        const navLinks = document.getElementById("nav-links");

        // Toggle menu on burger icon click
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("is-active"); // Toggle 'is-active' class for menu
            menuToggle.classList.toggle("is-active"); // Toggle 'is-active' for burger icon
        });

        // Close the menu when a link is clicked
        navLinks.addEventListener("click", () => {
            navLinks.classList.remove("is-active");
            menuToggle.classList.remove("is-active");
        });
    }

    /**
     * Smooth scroll for anchor links
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener("click", (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute("href");
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: "smooth" });
                    // Close menu on link click (for mobile)
                    const navLinks = document.getElementById("nav-links");
                    navLinks.classList.remove("is-active");
                }
            });
        });
    }

    /**
     * Adjust layout based on screen size
     */
    function checkScreenSize() {
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        const navLinks = document.getElementById("nav-links");

        // Adjust styles based on screen width
        navLinks.style.flexDirection = isMobile ? "column" : "row";
    }

    /**
     * Initialize all functionality
     */
    function init() {
        initAnimations();
        initMenuToggle();
        initSmoothScroll();
        // Check screen size on load and resize
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
    }

    // Initialize everything on DOMContentLoaded
    init();
});