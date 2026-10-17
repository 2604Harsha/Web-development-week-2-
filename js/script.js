
document.addEventListener("DOMContentLoaded", () => {
    // =====================================
    // 1. Mobile Navigation
    // =====================================
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links a");

    function closeMenu() {
        navLinks?.classList.remove("open");

        menuToggle?.setAttribute("aria-expanded", "false");
        menuToggle?.setAttribute("aria-label", "Open navigation menu");
    }

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );
        });

        navItems.forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMenu();
                menuToggle.focus();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 760) {
                closeMenu();
            }
        });
    }

    // =====================================
    // 2. Typing Animation
    // =====================================
    const typingText = document.getElementById("typing-text");

    if (typingText) {
        const words = [
            "Web Developer",
            "Software Developer",
            "Python Developer"
        ];

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (reducedMotion) {
            typingText.textContent = words[0];
        } else {
            let wordIndex = 0;
            let characterIndex = words[0].length;
            let deleting = true;

            function typeEffect() {
                const currentWord = words[wordIndex];

                if (deleting) {
                    characterIndex--;
                } else {
                    characterIndex++;
                }

                typingText.textContent = currentWord.slice(
                    0,
                    characterIndex
                );

                let delay = deleting ? 55 : 95;

                if (characterIndex === 0) {
                    deleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                    delay = 350;
                } else if (
                    characterIndex === words[wordIndex].length &&
                    !deleting
                ) {
                    deleting = true;
                    delay = 1400;
                }

                setTimeout(typeEffect, delay);
            }

            setTimeout(typeEffect, 1400);
        }
    }

    // =====================================
    // 3. Scroll Reveal Animations
    // =====================================
    const revealElements = document.querySelectorAll(
        ".about-content, .skill-card, .table-wrapper, " +
        ".project-card, .contact-info, .contact-form"
    );

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
        "IntersectionObserver" in window &&
        !reducedMotion
    ) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach((element) => {
            element.classList.add("reveal");
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add("visible");
        });
    }

    // =====================================
    // 4. Active Navigation Link
    // =====================================
    const sections = document.querySelectorAll(
        "main section[id]"
    );

    function updateActiveNavigation() {
        let currentSection = "home";

        sections.forEach((section) => {
            const sectionTop =
                section.getBoundingClientRect().top;

            if (sectionTop <= 160) {
                currentSection = section.id;
            }
        });

        navItems.forEach((link) => {
            const active =
                link.getAttribute("href") === `#${currentSection}`;

            link.classList.toggle("active", active);

            if (active) {
                link.setAttribute("aria-current", "location");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }

    // =====================================
    // 5. Back To Top Button
    // =====================================
    const backToTop = document.getElementById("back-to-top");

    function handleScroll() {
        updateActiveNavigation();

        if (backToTop) {
            backToTop.classList.toggle(
                "show",
                window.scrollY > 400
            );
        }
    }

    window.addEventListener("scroll", handleScroll, {
        passive: true
    });

    handleScroll();

    if (backToTop) {
        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: reducedMotion ? "auto" : "smooth"
            });
        });
    }

    // =====================================
    // 6. Contact Form Validation
    // =====================================
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    if (contactForm && formStatus) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            formStatus.classList.remove("error");
            formStatus.textContent = "";

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const subject = document.getElementById("subject").value.trim();
            const message = document.getElementById("message").value.trim();

            if (
                !name ||
                !email ||
                !subject ||
                !message
            ) {
                formStatus.textContent =
                    "Please complete all required fields.";

                formStatus.classList.add("error");
                return;
            }

            formStatus.textContent =
                "Validation successful! To send your message, " +
                "connect this form to a backend or email service.";

            // This form does not send or store messages.
            // Connect a backend or email service to enable delivery.
        });
    }

    // =====================================
    // 7. Automatic Copyright Year
    // =====================================
    const currentYear = document.getElementById("current-year");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
});
