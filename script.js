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

    window.addEventListener('scroll', function () {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPosition = window.scrollY;
        const scrollPercentage = (scrollPosition / scrollHeight) * 100;
        progressBar.style.width = `${scrollPercentage}%`;
    });
