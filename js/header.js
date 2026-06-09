// Load the shared header fragment and insert it at the top of the document
function loadHeader() {
    fetch('extras/header.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);
            highlightCurrentPage();
        });
}

// Add an "active" class to the matching nav link for the current page
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('a.navbar-item');
     navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Initialize header once the DOM is parsed so shared navigation is available to scripts
document.addEventListener('DOMContentLoaded', loadHeader);

// Toggle navigation menu visibility for small screens
function toggleNav() {
    const navMenu = document.getElementById('nav-links');
    if (navMenu) {
        navMenu.classList.toggle('is-active');
    }
}