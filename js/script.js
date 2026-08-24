// Back-to-top: reveal button after scrolling threshold, scroll to top on click
const backToTopButton = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
    backToTopButton.style.display = document.documentElement.scrollTop > 200 ? "flex" : "none";
});
backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Contact form: send via EmailJS
emailjs.init('k-OW5Z5AEgecgKPBy');

const btn = document.getElementById('button');
document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();

    btn.textContent = 'Sending...';

    const serviceID = 'service_g2d5g4e';
    const templateID = 'template_5o8v3ko';

    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            btn.textContent = 'Send Message →';
            alert('Sent!');
            document.getElementById('contact-form').reset();
        }, (err) => {
            btn.textContent = 'Send Message →';
            console.error('Error details:', err);
            alert('Something went wrong. Please try again later.');
        });
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();