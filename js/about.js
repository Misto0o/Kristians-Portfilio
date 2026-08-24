// Live age display: compute and update age in years and fractional months
const BIRTH_DATE = new Date("2010-04-02T00:00:00Z");

function updateLiveAge() {
    const now = new Date();
    const diffMs = now - BIRTH_DATE;

    const msPerYear = 1000 * 60 * 60 * 24 * 365.2425; // average Gregorian year
    const msPerMonth = msPerYear / 12;

    const years = Math.floor(diffMs / msPerYear);
    const monthsDecimal = (diffMs % msPerYear) / msPerMonth;

    document.getElementById("live-age").textContent =
        `${years} years and ${monthsDecimal.toFixed(2)} months`;
}

setInterval(updateLiveAge, 1000);
updateLiveAge();

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