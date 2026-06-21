document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Navigation Highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });

        // Header scroll effect
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle & Click Outside to Close
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.querySelector('.navbar');
    const navLinksList = document.querySelectorAll('.nav-link');

    const closeNav = () => {
        navbar.classList.remove('active');
        menuIcon.classList.remove('active');
        menuIcon.setAttribute('aria-expanded', 'false');
    };

    menuIcon.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent document click from triggering immediately
        navbar.classList.toggle('active');
        const isActive = menuIcon.classList.toggle('active');
        menuIcon.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });

    // Close when clicking a nav link
    navLinksList.forEach(link => {
        link.addEventListener('click', () => {
            closeNav();
        });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && !menuIcon.contains(e.target)) {
            closeNav();
        }
    });

    // 3. Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply reveal animation to elements
    const revealElements = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .contact-info, .contact-form, .hero-content, .hero-image-container');
    
    // Set initial state
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        observer.observe(el);
    });

    // Handle Reveal on Scroll and Load
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            // Reveal if element is 20px into the viewport or already passed it
            if (rect.top < windowHeight - 20) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    // Run once on load to show elements already in viewport
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);

    // 4. Custom Cursor Effect (Optional Premium Feel)
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    if (cursor && follower) {
        document.body.classList.add('custom-cursor-enabled');
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                follower.style.left = e.clientX + 'px';
                follower.style.top = e.clientY + 'px';
            }, 50);
        });

        document.querySelectorAll('a, button, .btn, .clickable, .menu-icon, input, textarea, select').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
                follower.classList.add('active');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
                follower.classList.remove('active');
            });
        });
    }

    // 5. Form Handling — AJAX submit with reset + success feedback
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        // Create success/error toast element
        const toast = document.createElement('div');
        toast.id = 'form-toast';
        toast.style.cssText = `
            display: none;
            position: fixed;
            bottom: 3rem;
            right: 3rem;
            padding: 1.6rem 2.8rem;
            border-radius: 14px;
            font-size: 1.5rem;
            font-weight: 600;
            z-index: 99999;
            backdrop-filter: blur(12px);
            border: 1px solid;
            transition: opacity 0.4s ease;
            max-width: 36rem;
            box-shadow: 0 8px 30px rgba(0,0,0,0.4);
        `;
        document.body.appendChild(toast);

        const showToast = (message, success = true) => {
            toast.textContent = message;
            toast.style.display = 'block';
            toast.style.opacity = '1';
            toast.style.background = success
                ? 'rgba(34, 211, 238, 0.12)'
                : 'rgba(239, 68, 68, 0.12)';
            toast.style.borderColor = success ? 'rgba(34, 211, 238, 0.5)' : 'rgba(239, 68, 68, 0.5)';
            toast.style.color = success ? '#22d3ee' : '#f87171';

            setTimeout(() => {
                toast.style.opacity = '0';
                setTimeout(() => { toast.style.display = 'none'; }, 400);
            }, 4000);
        };

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Stop Formspree redirect

            const btn = contactForm.querySelector('button[type="submit"]');
            const originalHTML = btn.innerHTML;

            // Loading state
            btn.innerHTML = 'Sending... <i class="bx bx-loader-alt bx-spin"></i>';
            btn.disabled = true;

            try {
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    // ✅ Success — reset form and show toast
                    contactForm.reset();
                    showToast('✓ Message sent! I\'ll get back to you soon.', true);
                } else {
                    const data = await response.json();
                    const errMsg = data?.errors?.map(e => e.message).join(', ') || 'Something went wrong.';
                    showToast('✕ ' + errMsg, false);
                }
            } catch (err) {
                showToast('✕ Network error. Please try again.', false);
            } finally {
                // Restore button
                btn.innerHTML = originalHTML;
                btn.disabled = false;
            }
        });
    }

    // 6. Year Update
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 7. WhatsApp Link with Proper Message
    const whatsappLink = document.getElementById('whatsapp-float');
    if (whatsappLink) {
        const message = "Hi Ravi Teja! Saw your portfolio — really impressive work! I'd love to discuss an opportunity with you. Are you available for a quick chat?";
        const encodedMessage = encodeURIComponent(message);
        whatsappLink.href = `https://wa.me/918885674269?text=${encodedMessage}`;
    }
});