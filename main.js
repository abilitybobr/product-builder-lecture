import './lotto-generator.js';

document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Load saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);

    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            let currentTheme = htmlElement.getAttribute('data-theme');
            let newTheme = currentTheme === 'light' ? 'dark' : 'light';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // --- Side Navigation and Smooth Scrolling Logic (miniGameOne.html) ---
    const hamburgerMenu = document.querySelector('.hamburger-menu'); // Local hamburger in miniGameOne.html
    const sideNavigation = document.querySelector('.side-navigation'); // Local side nav in miniGameOne.html
    const navLinks = document.querySelectorAll('.side-navigation a'); // Local nav links in miniGameOne.html
    const sections = document.querySelectorAll('.main-content section'); // Local sections in miniGameOne.html

    // Global hamburger menu and side navigation for index.html
    const globalHamburgerMenu = document.querySelector('.hamburger-menu-global');
    const globalSideNavigation = document.querySelector('.global-side-navigation');
    const globalNavLinks = document.querySelectorAll('.global-side-navigation a');

    // Toggle global side navigation on hamburger menu click
    if (globalHamburgerMenu && globalSideNavigation) {
        globalHamburgerMenu.addEventListener('click', () => {
            console.log('Hamburger menu clicked!');
            console.log('Before toggle - globalSideNavigation classes:', globalSideNavigation.classList.value);
            console.log('Before toggle - body classes:', document.body.classList.value);

            globalSideNavigation.classList.toggle('active');
            globalHamburgerMenu.classList.toggle('active'); // Optional: for animating hamburger icon
            document.body.classList.toggle('global-nav-active'); // Toggle body class

            console.log('After toggle - globalSideNavigation classes:', globalSideNavigation.classList.value);
            console.log('After toggle - body classes:', document.body.classList.value);
        });
    }

    // Close global side navigation when a link is clicked
    if (globalNavLinks) {
        globalNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (globalSideNavigation && globalSideNavigation.classList.contains('active')) {
                    globalSideNavigation.classList.remove('active');
                    if (globalHamburgerMenu) globalHamburgerMenu.classList.remove('active');
                    document.body.classList.remove('global-nav-active'); // Remove body class
                }
                // The browser will handle navigation to the href
            });
        });
    }

    // Toggle side navigation on hamburger menu click (for miniGameOne.html)
    if (hamburgerMenu && sideNavigation) {
        hamburgerMenu.addEventListener('click', () => {
            sideNavigation.classList.toggle('active');
            hamburgerMenu.classList.toggle('active'); // Optional: for animating hamburger icon
        });
    }

    // Close side navigation when a link is clicked (for miniGameOne.html mobile)
    if (navLinks) {
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent default anchor jump

                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });

                    // Close side nav on link click if it's active (mobile)
                    if (sideNavigation && sideNavigation.classList.contains('active')) {
                        sideNavigation.classList.remove('active');
                        if (hamburgerMenu) hamburgerMenu.classList.remove('active');
                    }
                }
            });
        });
    }

    // Highlight active link on scroll (for miniGameOne.html)
    const highlightActiveNavLink = () => {
        let currentActive = null;
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Adjust offset as needed
            const sectionBottom = sectionTop + section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentActive = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentActive) {
                link.classList.add('active');
            }
        });
    };

    if (sections.length > 0 && navLinks.length > 0) {
        window.addEventListener('scroll', highlightActiveNavLink);
        window.addEventListener('resize', highlightActiveNavLink); // Re-evaluate on resize
        highlightActiveNavLink(); // Initial call to set active link
    }
});