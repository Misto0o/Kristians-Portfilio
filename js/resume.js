// Back-to-top: reveal button after scrolling threshold, scroll to top on click
const backToTopButton = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
    backToTopButton.style.display = document.documentElement.scrollTop > 200 ? "flex" : "none";
});
backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();