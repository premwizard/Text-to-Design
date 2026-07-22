const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');

navbarToggle.addEventListener('click', () => {
    navbarMenu.classList.toggle('active');
});

// Sticky navbar on scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
});

// Smooth scrolling for internal anchor links
const internalLinks = document.querySelectorAll('a[href^="#"]');

internalLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Accordion toggle for FAQs / details
const accordionToggles = document.querySelectorAll('.accordion-toggle');

accordionToggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
        const accordionContent = toggle.nextElementSibling;
        accordionContent.classList.toggle('active');
    });
});

// Tab switching logic
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

 tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        const tabId = tab.getAttribute('data-tab-id');
        const activeTabContent = document.querySelector(`.tab-content#${tabId}`);
        tabContents.forEach((content) => {
            content.classList.remove('active');
        });
        activeTabContent.classList.add('active');
        tabs.forEach((t) => {
            t.classList.remove('active');
        });
        tab.classList.add('active');
    });
});

// Theme toggle / Dark mode switch
const themeToggle = document.querySelector('#theme-toggle');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, { threshold: 0.5 });

const animateElements = document.querySelectorAll('.animate-on-scroll');

animateElements.forEach((element) => {
    observer.observe(element);
});

// Counter animations
const counters = document.querySelectorAll('.counter');

counters.forEach((counter) => {
    let count = 0;
    const targetCount = parseInt(counter.getAttribute('data-target-count'));
    const increment = targetCount / 100;

    function animateCounter() {
        count += increment;
        counter.textContent = Math.floor(count);
        if (count < targetCount) {
            requestAnimationFrame(animateCounter);
        }
    }

    animateCounter();
});