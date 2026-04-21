// Wrap the fetch logic in the actual function
function loadHeader() {
    fetch('extras/header.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);
            highlightCurrentPage();
        });
}

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

// Now this works because loadHeader actually exists
document.addEventListener('DOMContentLoaded', loadHeader);

function toggleNav() {
    const navMenu = document.getElementById('nav-links');
    if (navMenu) {
        navMenu.classList.toggle('is-active');
    }
}