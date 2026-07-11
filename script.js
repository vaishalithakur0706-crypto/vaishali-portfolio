// ================= SMOOTH ACTIVE NAVIGATION =================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");
const navbar = document.querySelector(".navbar");

// High-performance scroll handler using requestAnimationFrame throttle
let isScrolling = false;

window.addEventListener("scroll", () => {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            handleScrollEffects();
            isScrolling = false;
        });
        isScrolling = true;
    }
});

function handleScrollEffects() {
    const scrollPos = window.scrollY || window.pageYOffset;

    // 1. Navigation Active State on Scroll
    let currentSectionId = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;

        if (scrollPos >= sectionTop) {
            currentSectionId = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + currentSectionId) {
            link.classList.add("active");
        }
    });

    // 2. Navbar Floating Box Shadow Trigger
    if (scrollPos > 40) {
        navbar.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.25)";
        navbar.style.borderColor = "rgba(255, 255, 255, 0.08)";
    } else {
        navbar.style.boxShadow = "none";
        navbar.style.borderColor = "var(--border-color)";
    }
}

// ================= INTERSECTION OBSERVER ANIMATION =================

const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1
};

const entryObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            // Stop observing after item reveals to prevent redundant paint operations
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const elementsToAnimate = document.querySelectorAll(
    ".education-card, .experience-card, .skill-card, .about, .contact"
);

elementsToAnimate.forEach(el => entryObserver.observe(el));