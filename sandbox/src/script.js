const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.site-header');

    // Mobile Navigation Toggle
    if (navbarToggle && navbarCollapse) {
        navbarToggle.addEventListener('click', () => {
            navbarCollapse.classList.toggle('active');
            navbarToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('active')) {
                navbarCollapse.classList.remove('active');
                navbarToggle.classList.remove('active');
            }
        });
    });

    // Sticky Navbar
    const stickyNav = () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    };
    window.addEventListener('scroll', stickyNav);

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for Scroll Animations (Example: fade-in)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Optional: stop observing once visible
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Add elements to observe (e.g., feature cards, testimonial cards)
    document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card').forEach(card => {
        observer.observe(card);
    });

    // Add a class to elements that should animate in
    document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card').forEach(el => {
        el.classList.add('fade-in');
    });

    // Counter Animations (Example: if you had numbers to animate)
    // const counters = document.querySelectorAll('.counter');
    // counters.forEach(counter => {
    //     const updateCount = () => {
    //         const target = +counter.getAttribute('data-target');
    //         const count = +counter.innerText;
    //         const increment = target / 200; // Adjust speed

    //         if (count < target) {
    //             counter.innerText = Math.ceil(count + increment);
    //             setTimeout(updateCount, 16);
    //         } else {
    //             counter.innerText = target;
    //         }
    //     };
    //     observer.observe(counter); // Observe the counter element
    //     // Add 'visible' class to trigger animation when observed
    //     const countObserverCallback = (entries, observer) => {
    //         entries.forEach(entry => {
    //             if (entry.isIntersecting) {
    //                 updateCount();
    //                 observer.unobserve(entry.target);
    //             }
    //         });
    //     };
    //     const countObserver = new IntersectionObserver(countObserverCallback, observerOptions);
    //     countObserver.observe(counter);
    // });

    // Theme Toggle (Example - requires a button with id="theme-toggle")
    // const themeToggle = document.getElementById('theme-toggle');
    // if (themeToggle) {
    //     themeToggle.addEventListener('click', () => {
    //         document.body.classList.toggle('dark-mode');
    //         // Optionally save preference to localStorage
    //         // localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    //     });

    //     // Check localStorage for saved theme preference on load
    //     // const savedTheme = localStorage.getItem('theme');
    //     // if (savedTheme === 'dark') {
    //     //     document.body.classList.add('dark-mode');
    //     // }
    // }