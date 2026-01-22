document.addEventListener('DOMContentLoaded', () => {
    // Force scroll to top on page load
    if (window.location.hash === '') {
        window.scrollTo(0, 0);
    }

    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    /* --- Mobile Menu Logic --- */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');

    function closeMenu() {
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        }
    }

    if (hamburger && navLinks) {
        // Toggle menu on hamburger click
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent document click from immediately closing it
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                closeMenu();
            }
        });
    }

    /* --- Navbar Scroll Effect --- */
    // Optimization: separate scroll handler or use requestAnimationFrame if really heavy, 
    // but for simple box-shadow toggle, this is usually fine.
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 15px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    /* --- Sidebar Filter Logic --- */
    const sidebar = document.getElementById('sidebarFilters');
    const toggleBtn = document.getElementById('toggleFilters');
    const closeBtn = document.getElementById('closeFilters');
    const applyBtn = sidebar ? sidebar.querySelector('.btn-primary') : null;

    function closeSidebar() {
        if (sidebar) {
            sidebar.classList.remove('active');
            sidebar.classList.remove('collapsed'); // if utilizing the collapsed state logic for desktop
        }
    }

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (window.innerWidth <= 992) {
                sidebar.classList.toggle('active');
            } else {
                sidebar.classList.toggle('collapsed');
            }
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeSidebar();
        });
    }

    // Close when "Apply Filter" is clicked
    if (applyBtn) {
        applyBtn.addEventListener('click', () => {
            // Add filtering logic here if needed in future
            closeSidebar();
        });
    }

    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
        if (sidebar && sidebar.classList.contains('active')) {
            // If click is outside sidebar and outside the toggle button
            if (!sidebar.contains(e.target) && (!toggleBtn || !toggleBtn.contains(e.target))) {
                closeSidebar();
            }
        }
    });

    /* --- Scroll Animations --- */
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section, .scroll-trigger').forEach(el => {
        observer.observe(el);
    });
});
