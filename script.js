document.addEventListener('DOMContentLoaded', () => {
    // Lucide Icons
    lucide.createIcons();

    // FAQ Interaction
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all items
            faqItems.forEach(faq => faq.classList.remove('active'));

            // If it wasn't active before, open it
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Mobile Menu
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Optional: Change icon
            const icon = mobileBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileBtn.querySelector('i').setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            });
        });
    }

    // ============================================
    // SCROLL REVEAL (INTERSECTION OBSERVER)
    // ============================================
    const revealElements = document.querySelectorAll('.animate-on-scroll, .footer-animate, .image-zoom-scroll');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Don't unobserve immediately if we want re-trigger (optional),
                // but for "once" effect like Porsche, unobserve is fine.
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Trigger early
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ============================================
    // PARALLAX SCROLL EFFECT (MOVES WITH SCROLL)
    // ============================================
    // Add '.parallax-item' class to elements you want to move slower than scroll
    const parallaxItems = document.querySelectorAll('.parallax-item');

    if (parallaxItems.length > 0) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;

            parallaxItems.forEach(item => {
                // Calculate position relative to viewport
                const rect = item.getBoundingClientRect();
                const itemTop = rect.top + scrollY;

                // Only animate if near viewport
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    // Standard parallax: move 20% of scroll speed
                    // Adjust speed factor (0.1 to 0.3) for intensity
                    const speed = 0.1;
                    const yPos = (scrollY - itemTop) * speed;

                    // Apply check to avoid jitters
                    if (Math.abs(yPos) < 100) { // Limit movement
                        item.style.transform = `translateY(${yPos}px)`;
                    }
                }
            });
        }, { passive: true }); // Passive for performance
    }


});
