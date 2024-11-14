document.addEventListener("DOMContentLoaded", function () {
    // Function to initialize animations
    function initAnimations() {
        // Animate the landing title
        gsap.from("#landing h1", {
            opacity: 0,
            y: 50,
            duration: 2,
            ease: "power4.out",
            delay: 0.3
        });

        // Animate the landing paragraph
        gsap.from("#landing p", {
            opacity: 0,
            y: 30,
            duration: 1.5,
            ease: "power4.out",
            delay: 0.5
        });

        // Animate the "View Projects" button
        gsap.from("#landing .button", {
            opacity: 0,
            scale: 0.5,
            duration: 1,
            ease: "power2.out",
            delay: 0.7
        });

        // Animate each section with scrollTrigger
        gsap.utils.toArray("section").forEach((section) => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                    once: true, // Trigger only once when the section comes into view
                },
                opacity: 0,
                y: 30,
                duration: 1.5,
                ease: "power4.out",
                delay: 0.3
            });
        });

        // Animate project cards with stagger effect
        gsap.utils.toArray(".project-card").forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                    once: true,
                },
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power4.out",
                delay: 0.2 * index, // Stagger delay based on the card index
            });
        });

        // Animate the footer (fade in)
        gsap.from("footer", {
            opacity: 0,
            y: 50,
            duration: 1.5,
            ease: "power4.out",
            delay: 1
        });

        // Add a fade-in effect for navbar links (for a polished look)
        gsap.from(".navbar-item", {
            opacity: 0,
            x: -30,
            duration: 1,
            ease: "power3.out",
            stagger: 0.3,
            delay: 0.7, // Delay for smooth sequential animation
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

    // Menu toggle functionality
    const menuToggle = document.querySelector('.navbar-burger');
    const navLinks = document.getElementById('nav-links');

    // Toggle menu on burger icon click
    menuToggle.addEventListener('click', function () {
        navLinks.classList.toggle('is-active'); // Toggle Bulma's 'is-active' class
        menuToggle.classList.toggle('is-active'); // Toggle burger icon
    });

    // Close the menu when a link is clicked (for mobile)
    navLinks.addEventListener('click', function () {
        navLinks.classList.remove('is-active'); // Remove 'is-active' class
        menuToggle.classList.remove('is-active'); // Close the burger icon
    });

    // Smooth scroll for links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                navLinks.classList.remove('is-active'); // Close menu on link click
                menuToggle.classList.remove('is-active'); // Close burger icon
            }
        });
    });

    // Call animations on page load
    initAnimations();

    // Function to check screen size and adjust layout
    function checkScreenSize() {
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        const navLinks = document.querySelector(".nav-links");

        // Adjust styles based on screen width
        navLinks.style.flexDirection = isMobile ? "column" : "row";
    }

    // Call the function on page load and on window resize
    window.addEventListener("load", checkScreenSize);
    window.addEventListener("resize", checkScreenSize);

    // Scroll progress bar (adds a visual indication of page scrolling)
    const progressBar = document.createElement('div');
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.height = '5px';
    progressBar.style.backgroundColor = '#FFD700'; // Gold color for progress
    progressBar.style.zIndex = '9999';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function () {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPosition = window.scrollY;
        const scrollPercentage = (scrollPosition / scrollHeight) * 100;
        progressBar.style.width = `${scrollPercentage}%`;
    });

    // Lazy load images for performance (optional)
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        img.src = img.getAttribute('data-src');
    });
});
