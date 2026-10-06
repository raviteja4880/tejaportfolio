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
    const revealElements = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .contact-info, .contact-form, .hero-content, .hero-image-container, .cloud-card');
    
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

        document.addEventListener('mouseover', (e) => {
            if (e.target.closest('a, button, .btn, .clickable, .menu-icon, input, textarea, select, .cloud-cert-preview, .cert-modal-btn, .cert-modal-backdrop')) {
                cursor.classList.add('active');
                follower.classList.add('active');
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.closest('a, button, .btn, .clickable, .menu-icon, input, textarea, select, .cloud-cert-preview, .cert-modal-btn, .cert-modal-backdrop')) {
                cursor.classList.remove('active');
                follower.classList.remove('active');
            }
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

    // ----------------------------------------------------
    // Skill Network Visualization
    // ----------------------------------------------------
    const container = document.getElementById('skill-network-container');
    const nodesContainer = document.getElementById('network-nodes');
    const svg = document.getElementById('network-svg');
    const tooltip = document.getElementById('network-tooltip');
    
    if (container && nodesContainer && svg && tooltip) {
        const nodes = Array.from(document.querySelectorAll('.network-node'));
        const particlesCanvas = document.getElementById('network-particles');
        const ctx = particlesCanvas ? particlesCanvas.getContext('2d') : null;
        
        let width = container.clientWidth;
        let height = container.clientHeight;
        
        // Handle resizing
        const resize = () => {
            width = container.clientWidth;
            height = container.clientHeight;
            if (particlesCanvas) {
                particlesCanvas.width = width;
                particlesCanvas.height = height;
            }
        };
        resize();
        window.addEventListener('resize', resize);
        
        // Orbit and sizing setup
        const isMobile = () => window.innerWidth < 768;
        
        // Define base configurations (Python removed)
        const innerSkills = ['react', 'nodejs', 'mongodb', 'redis', 'aws'];
        const outerSkills = ['fastapi', 'ai-rag', 'pinecone', 'azure', 'git'];
        
        // Spotlight sequence info map (3 lines max per item)
        const spotlightInfo = {
            react: { line1: "React", line2: "Frontend", line3: "All Projects" },
            nodejs: { line1: "Node.js", line2: "Backend", line3: "All Projects" },
            mongodb: { line1: "MongoDB", line2: "Database", line3: "All Projects" },
            redis: { line1: "Redis", line2: "Caching", line3: "Ecommerce & RAG" },
            aws: { line1: "AWS", line2: "Cloud", line3: "Ecommerce & QuizApp" },
            fastapi: { line1: "FastAPI", line2: "APIs", line3: "RAG & SmartLink" },
            "ai-rag": { line1: "AI / RAG", line2: "Dual-LLM", line3: "SmartLink AI" },
            pinecone: { line1: "Pinecone", line2: "Vector DB", line3: "RAG Premium" },
            azure: { line1: "Azure", line2: "Cloud", line3: "SmartLink AI" },
            git: { line1: "Git", line2: "DevOps", line3: "All Projects" }
        };
        
        // Set base structure for each node
        const nodeStates = {};
        
        nodes.forEach(node => {
            const id = node.getAttribute('data-id');
            const isCentral = node.classList.contains('central-node');
            const isExpert = node.classList.contains('expert-node');
            
            // Random float parameters based on node expertise/importance
            nodeStates[id] = {
                element: node,
                id: id,
                isCentral: isCentral,
                isExpert: isExpert,
                baseX: 0,
                baseY: 0,
                x: 0,
                y: 0,
                // Floating wave properties
                phaseX: Math.random() * Math.PI * 2,
                phaseY: Math.random() * Math.PI * 2,
                freqX: 0.0008 + Math.random() * 0.0008,
                freqY: 0.0008 + Math.random() * 0.0008,
                ampX: isCentral ? 3 : (isExpert ? 6 : 9),
                ampY: isCentral ? 3 : (isExpert ? 6 : 9),
                // Parallax depth multiplier (deeper intermediate nodes move more)
                depth: isCentral ? 10 : (isExpert ? 18 : 26)
            };
        });
        
        // Parallax variables
        let targetParallaxX = 0;
        let targetParallaxY = 0;
        let currentParallaxX = 0;
        let currentParallaxY = 0;
        
        // Mouse move listener on hero section
        const heroSection = document.getElementById('home');
        if (heroSection) {
            heroSection.addEventListener('mousemove', (e) => {
                const rect = container.getBoundingClientRect();
                const mouseX = e.clientX - rect.left - rect.width / 2;
                const mouseY = e.clientY - rect.top - rect.height / 2;
                
                targetParallaxX = mouseX / (rect.width / 2);
                targetParallaxY = mouseY / (rect.height / 2);
            });
            
            heroSection.addEventListener('mouseleave', () => {
                targetParallaxX = 0;
                targetParallaxY = 0;
            });
        }
        
        // Create connection elements in SVG
        const connections = [];
        
        nodes.forEach(node => {
            const id = node.getAttribute('data-id');
            if (id !== 'mern') {
                // Background line
                const bgLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                bgLine.setAttribute('class', 'connection-line-bg');
                svg.appendChild(bgLine);
                
                // Flow particle line
                const flowLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                flowLine.setAttribute('class', 'connection-line-flow');
                svg.appendChild(flowLine);
                
                connections.push({
                    targetId: id,
                    bgLine: bgLine,
                    flowLine: flowLine
                });
            }
        });
        
        // Highlight logic helpers
        let hoveredNodeId = null;
        let isUserInteracting = false;
        
        const showHighlight = (id) => {
            hoveredNodeId = id;
            
            // Highlight path nodes & apply dim opacity to inactive nodes
            nodes.forEach(n => {
                const nId = n.getAttribute('data-id');
                if (nId === id) {
                    n.classList.remove('dimmed');
                    n.classList.add('highlighted');
                } else if (nId === 'mern') {
                    // Central node remains fully visible
                    n.classList.remove('dimmed');
                    n.classList.remove('highlighted');
                } else {
                    n.classList.add('dimmed');
                    n.classList.remove('highlighted');
                }
            });
            
            // Highlight paths connections
            connections.forEach(conn => {
                if (conn.targetId === id) {
                    conn.flowLine.classList.add('highlighted');
                } else {
                    conn.flowLine.classList.remove('highlighted');
                }
            });
            
            // Streamlined 3-line tooltip details population
            const info = spotlightInfo[id];
            if (info) {
                tooltip.querySelector('.tooltip-line-1').textContent = info.line1;
                tooltip.querySelector('.tooltip-line-2').textContent = info.line2;
                tooltip.querySelector('.tooltip-line-3').textContent = info.line3;
            } else {
                const node = nodeStates[id]?.element;
                if (node) {
                    tooltip.querySelector('.tooltip-line-1').textContent = node.getAttribute('data-name') || "";
                    tooltip.querySelector('.tooltip-line-2').textContent = node.getAttribute('data-level') || "";
                    const projectsStr = node.getAttribute('data-projects') || "";
                    tooltip.querySelector('.tooltip-line-3').textContent = projectsStr.split(',')[0] || "Portfolio";
                }
            }
            
            // Show tooltip (initiates 300ms CSS fade-in)
            tooltip.classList.add('active');
        };
        
        const clearHighlight = () => {
            hoveredNodeId = null;
            nodes.forEach(n => {
                n.classList.remove('dimmed');
                n.classList.remove('highlighted');
            });
            
            connections.forEach(conn => {
                conn.flowLine.classList.remove('highlighted');
            });
            
            tooltip.classList.remove('active');
        };
        
        // Guided Tour Spotlight system: strict ordered sequence cycling every 1.9 seconds
        const tourOrder = ['react', 'nodejs', 'mongodb', 'redis', 'aws', 'azure', 'fastapi', 'ai-rag', 'pinecone', 'git'];
        let tourIndex = 0;
        let tourInterval = null;
        let fadeOutTimeout = null;
        let clearHighlightTimeout = null;
        
        const showTourStep = () => {
            if (isUserInteracting) return;
            
            const id = tourOrder[tourIndex];
            
            // Step A: Highlight node and reveal tooltip (t=0ms)
            showHighlight(id);
            
            // Step B: Initiate tooltip fade-out (t=1300ms - leaves it visible for 1000ms post-fade)
            fadeOutTimeout = setTimeout(() => {
                if (!isUserInteracting) {
                    tooltip.classList.remove('active');
                }
            }, 1300);
            
            // Step C: Reset node highlights once tooltip fully fades out (t=1600ms - 300ms transition finishes)
            clearHighlightTimeout = setTimeout(() => {
                if (!isUserInteracting) {
                    clearHighlight();
                }
            }, 1600);
            
            // Increment pointer for next 1.9s loop step
            tourIndex = (tourIndex + 1) % tourOrder.length;
        };
        
        const startTour = () => {
            stopTour();
            showTourStep(); // execute first step immediately
            tourInterval = setInterval(showTourStep, 1900);
        };
        
        const stopTour = () => {
            clearInterval(tourInterval);
            clearTimeout(fadeOutTimeout);
            clearTimeout(clearHighlightTimeout);
        };
        
        // Manual Hover Interaction Listeners
        nodes.forEach(node => {
            const id = node.getAttribute('data-id');
            if (id === 'mern') return; // Central node is non-hover triggered for tour
            
            node.addEventListener('mouseenter', () => {
                isUserInteracting = true;
                stopTour();
                showHighlight(id);
            });
            
            node.addEventListener('mouseleave', () => {
                isUserInteracting = false;
                clearHighlight();
                startTour();
            });
        });
        
        // Background particles
        const stars = [];
        const numStars = 15;
        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.15,
                vy: (Math.random() - 0.5) * 0.15,
                size: Math.random() * 2 + 1,
                opacity: 0.15 + Math.random() * 0.2
            });
        }
        
        const updateParticles = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);
            stars.forEach(star => {
                star.x += star.vx;
                star.y += star.vy;
                
                if (star.x < 0) star.x = width;
                if (star.x > width) star.x = 0;
                if (star.y < 0) star.y = height;
                if (star.y > height) star.y = 0;
                
                ctx.fillStyle = `rgba(59, 130, 246, ${star.opacity})`;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
            });
        };
        
        // Main Animation Loop
        const tick = () => {
            const time = performance.now();
            const mobile = isMobile();
            
            // Base layouts
            const rInner = mobile ? 80 : 115;
            const rOuter = mobile ? 135 : 195;
            
            // Base layouts coordinates relative to center
            innerSkills.forEach((id, idx) => {
                const theta = (idx * Math.PI * 2) / innerSkills.length + Math.PI / 5;
                const state = nodeStates[id];
                if (state) {
                    state.baseX = Math.cos(theta) * rInner;
                    state.baseY = Math.sin(theta) * rInner;
                }
            });
            
            outerSkills.forEach((id, idx) => {
                const theta = (idx * Math.PI * 2) / outerSkills.length + Math.PI / 10;
                const state = nodeStates[id];
                if (state) {
                    state.baseX = Math.cos(theta) * rOuter;
                    state.baseY = Math.sin(theta) * rOuter;
                }
            });
            
            // Check prefers-reduced-motion
            const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            
            // Lerp parallax
            currentParallaxX += (targetParallaxX - currentParallaxX) * 0.08;
            currentParallaxY += (targetParallaxY - currentParallaxY) * 0.08;
            
            // Update node positions
            nodes.forEach(node => {
                const id = node.getAttribute('data-id');
                const state = nodeStates[id];
                if (!state) return;
                
                // Floating wave physics
                const floatX = reducedMotion ? 0 : Math.sin(time * state.freqX + state.phaseX) * state.ampX;
                const floatY = reducedMotion ? 0 : Math.cos(time * state.freqY + state.phaseY) * state.ampY;
                
                // Parallax displacement
                const paraX = reducedMotion ? 0 : currentParallaxX * state.depth;
                const paraY = reducedMotion ? 0 : currentParallaxY * state.depth;
                
                state.x = state.baseX + floatX + paraX;
                state.y = state.baseY + floatY + paraY;
                
                // Apply CSS translation
                node.style.transform = `translate(${state.x}px, ${state.y}px)`;
            });
            
            // Redraw SVG connection lines
            const cx = width / 2;
            const cy = height / 2;
            const mState = nodeStates['mern'];
            
            if (mState) {
                const mernX = cx + mState.x;
                const mernY = cy + mState.y;
                
                connections.forEach(conn => {
                    const targetState = nodeStates[conn.targetId];
                    if (targetState) {
                        const targetX = cx + targetState.x;
                        const targetY = cy + targetState.y;
                        
                        // Background line coordinates
                        conn.bgLine.setAttribute('x1', mernX);
                        conn.bgLine.setAttribute('y1', mernY);
                        conn.bgLine.setAttribute('x2', targetX);
                        conn.bgLine.setAttribute('y2', targetY);
                        
                        // Flow line coordinates
                        conn.flowLine.setAttribute('x1', mernX);
                        conn.flowLine.setAttribute('y1', mernY);
                        conn.flowLine.setAttribute('x2', targetX);
                        conn.flowLine.setAttribute('y2', targetY);
                    }
                });
                
                // Position tooltip dynamically in outward radial directions + constrained viewport clamping
                if (hoveredNodeId && hoveredNodeId !== 'mern') {
                    const hState = nodeStates[hoveredNodeId];
                    if (hState) {
                        const hx = hState.x;
                        const hy = hState.y;
                        const dist = Math.sqrt(hx * hx + hy * hy);
                        
                        // Radial direction unit vector away from central node
                        const ux = dist > 0 ? hx / dist : 0;
                        const uy = dist > 0 ? hy / dist : -1;
                        
                        // Offset distance outside the node boundary
                        const offsetDist = mobile ? 50 : 65;
                        
                        let tx = cx + hx + ux * offsetDist;
                        let ty = cy + hy + uy * offsetDist;
                        
                        // Prevent covering central MERN node by enforcing a minimum distance
                        const mernDist = Math.sqrt((tx - cx) * (tx - cx) + (ty - cy) * (ty - cy));
                        if (mernDist < 85) {
                            // Push radially further away
                            tx = cx + ux * 85;
                            ty = cy + uy * 85;
                        }
                        
                        // Constrain tooltip inside container boundaries
                        const marginWidth = mobile ? 65 : 80;
                        const marginHeight = mobile ? 55 : 65;
                        tx = Math.max(marginWidth, Math.min(width - marginWidth, tx));
                        ty = Math.max(marginHeight, Math.min(height - marginHeight, ty));
                        
                        tooltip.style.left = `${tx}px`;
                        tooltip.style.top = `${ty}px`;
                    }
                } else if (hoveredNodeId === 'mern') {
                    // Tooltip sits directly above central node if central is spotlighted/hovered
                    tooltip.style.left = `${cx + mState.x}px`;
                    tooltip.style.top = `${cy + mState.y - 75}px`;
                }
            }
            
            // Background Canvas particles
            if (!reducedMotion && !mobile) {
                updateParticles();
            }
            
            requestAnimationFrame(tick);
        };
        
        requestAnimationFrame(tick);
        
        // Start automatic spotlight cycle guided tour
        startTour();
    }

    // ----------------------------------------------------
    // Portfolio Appreciation System (Supabase)
    // ----------------------------------------------------
    const appreciationBtn = document.getElementById('appreciation-btn');
    const countVisitorsEl = document.getElementById('count-visitors');
    const countLikesEl = document.getElementById('count-likes');
    const appreciationMessage = document.getElementById('appreciation-message');

    if (appreciationBtn && countVisitorsEl && countLikesEl) {

        // --- Supabase REST API config (loaded from config.js) ---
        const SUPABASE_URL = (typeof CONFIG !== 'undefined' && CONFIG.SUPABASE_URL) || '';
        const SUPABASE_KEY = (typeof CONFIG !== 'undefined' && CONFIG.SUPABASE_ANON_KEY) || '';
        const TABLE = 'portfolio_stats';
        const ROW_ID = 1;

        const supabaseHeaders = {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
        };

        // --- Supabase helpers ---
        const fetchStats = async () => {
            try {
                const res = await fetch(
                    `${SUPABASE_URL}/rest/v1/${TABLE}?select=visitors,likes&id=eq.${ROW_ID}`,
                    { headers: supabaseHeaders }
                );
                if (!res.ok) throw new Error(`Supabase GET ${res.status}`);
                const rows = await res.json();
                return rows[0] || { visitors: 0, likes: 0 };
            } catch (err) {
                console.warn('[Appreciation] Failed to fetch stats:', err.message);
                return { visitors: 0, likes: 0 };
            }
        };

        const updateField = async (field, newValue) => {
            try {
                const body = {};
                body[field] = newValue;
                const res = await fetch(
                    `${SUPABASE_URL}/rest/v1/${TABLE}?id=eq.${ROW_ID}`,
                    {
                        method: 'PATCH',
                        headers: supabaseHeaders,
                        body: JSON.stringify(body)
                    }
                );
                if (!res.ok) throw new Error(`Supabase PATCH ${res.status}`);
                const rows = await res.json();
                return rows[0] || null;
            } catch (err) {
                console.warn(`[Appreciation] Failed to update ${field}:`, err.message);
                return null;
            }
        };

        // --- Format number with commas ---
        const formatNumber = (n) => {
            return Number(n).toLocaleString('en-US');
        };

        // --- Count-up animation ---
        const animateCountUp = (el, target) => {
            el.classList.remove('number-skeleton');
            const duration = 1200;
            const start = performance.now();
            const from = 0;
            const to = Number(target);

            const step = (now) => {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                // Ease-out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.round(from + (to - from) * eased);
                el.textContent = formatNumber(current);
                if (progress < 1) {
                    requestAnimationFrame(step);
                }
            };
            requestAnimationFrame(step);
        };

        // --- Remove skeleton and show number (instant, no animation) ---
        const revealCount = (el, count) => {
            el.classList.remove('number-skeleton');
            el.textContent = formatNumber(count);
        };

        // --- Animate count bump ---
        const bumpCount = (el) => {
            el.classList.remove('count-bump');
            void el.offsetWidth; // force reflow
            el.classList.add('count-bump');
            el.addEventListener('animationend', () => {
                el.classList.remove('count-bump');
            }, { once: true });
        };

        // --- Floating mini hearts ---
        const spawnFloatingHearts = () => {
            const container = document.querySelector('.portfolio-appreciation');
            if (!container) return;

            for (let i = 0; i < 6; i++) {
                const heart = document.createElement('span');
                heart.className = 'floating-heart';
                heart.textContent = '❤️';
                heart.style.left = `${40 + Math.random() * 20}%`;
                heart.style.top = '50%';
                heart.style.setProperty('--rotate', `${-30 + Math.random() * 60}deg`);
                heart.style.animationDelay = `${i * 0.08}s`;
                container.appendChild(heart);

                setTimeout(() => {
                    heart.remove();
                }, 1200);
            }
        };

        // --- Check localStorage for liked state ---
        const hasLiked = localStorage.getItem('portfolio_liked') === 'true';

        if (hasLiked) {
            appreciationBtn.classList.add('liked');
            appreciationBtn.querySelector('.btn-icon').textContent = '❤️';
            appreciationBtn.querySelector('.btn-text').textContent = 'Thanks for the appreciation!';
        }

        // --- Load stats on page load (lazy, non-blocking) ---
        const loadStats = async () => {
            const stats = await fetchStats();
            const alreadyVisited = localStorage.getItem('portfolio_visited') === 'true';

            let visitors = stats.visitors || 0;
            let likes = stats.likes || 0;

            // Increment visitors if this is the first visit ever from this browser
            if (!alreadyVisited) {
                visitors += 1;
                const result = await updateField('visitors', visitors);
                if (result) {
                    localStorage.setItem('portfolio_visited', 'true');
                }
            }

            // Animate count-up from 0 to actual values
            animateCountUp(countVisitorsEl, visitors);
            animateCountUp(countLikesEl, likes);
        };

        // Fire stats load without blocking render
        loadStats();

        // --- Like button click handler ---
        appreciationBtn.addEventListener('click', async () => {
            if (hasLiked || appreciationBtn.classList.contains('liked')) return;

            // Analytics events
            console.log('[Analytics] Like Button Clicked');
            console.log('[Analytics] Portfolio Liked');

            // Optimistic UI update
            const currentLikes = parseInt(countLikesEl.textContent.replace(/,/g, '')) || 0;
            revealCount(countLikesEl, currentLikes + 1);
            bumpCount(countLikesEl);

            // Heart pop animation
            appreciationBtn.classList.add('heart-pop');
            appreciationBtn.querySelector('.btn-icon').textContent = '❤️';
            appreciationBtn.addEventListener('animationend', () => {
                appreciationBtn.classList.remove('heart-pop');
            }, { once: true });

            // Spawn floating hearts
            spawnFloatingHearts();

            // Update button to liked state
            setTimeout(() => {
                appreciationBtn.querySelector('.btn-text').textContent = 'Thanks for the appreciation!';
                appreciationBtn.classList.add('liked');
            }, 600);

            // Show appreciation message
            if (appreciationMessage) {
                setTimeout(() => {
                    appreciationMessage.classList.add('visible');
                }, 800);
            }

            // Send increment to Supabase
            await updateField('likes', currentLikes + 1);
        });
    }

    // ----------------------------------------------------
    // 8.5 Credential Details Mobile Accordion
    // ----------------------------------------------------
    const credentialToggles = document.querySelectorAll('.credential-toggle');
    credentialToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            // Only toggle collapsible accordion on mobile (<= 768px)
            if (window.innerWidth <= 768) {
                const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
                const contentId = toggle.getAttribute('aria-controls');
                const content = document.getElementById(contentId);
                
                toggle.setAttribute('aria-expanded', String(!isExpanded));
                if (content) {
                    content.classList.toggle('active', !isExpanded);
                }
            }
        });
    });

    // ----------------------------------------------------
    // 9. Certificate Lightbox Modal System
    // ----------------------------------------------------
    const certModal = document.getElementById('cert-modal');
    const modalBackdrop = document.getElementById('cert-modal-backdrop');
    const modalCloseBtn = document.getElementById('modal-cert-close');
    const modalImg = document.getElementById('modal-cert-img');
    const modalTitle = document.getElementById('modal-cert-title');
    const modalDownload = document.getElementById('modal-cert-download');
    const modalVerify = document.getElementById('modal-cert-verify');

    if (certModal && modalImg && modalTitle) {
        const openModal = (src, title, verifyUrl) => {
            modalImg.src = src;
            modalImg.alt = title || 'Certificate Full Preview';
            modalTitle.textContent = title || 'Certificate Preview';
            if (modalDownload) {
                modalDownload.href = src;
            }
            if (modalVerify) {
                if (verifyUrl) {
                    modalVerify.href = verifyUrl;
                    modalVerify.classList.remove('hidden');
                } else {
                    modalVerify.classList.add('hidden');
                }
            }
            certModal.classList.add('active');
            certModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        };

        const closeModal = () => {
            certModal.classList.remove('active');
            certModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            setTimeout(() => {
                modalImg.src = '';
            }, 350);
        };

        // Attach to all view certificate triggers and previews
        const certTriggers = document.querySelectorAll('.btn-view-cert, .cloud-cert-preview, .cert-card img');
        certTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const src = trigger.getAttribute('data-cert-src') || trigger.getAttribute('src');
                const title = trigger.getAttribute('data-cert-title') ||
                    trigger.closest('.cloud-card')?.querySelector('h3')?.textContent ||
                    trigger.closest('.cert-card')?.querySelector('h4')?.textContent ||
                    'Certificate Preview';
                const verifyUrl = trigger.getAttribute('data-verify-url') ||
                    trigger.closest('.cloud-card')?.querySelector('[data-verify-url]')?.getAttribute('data-verify-url') ||
                    trigger.closest('.cloud-card')?.querySelector('.credential-link[href^="http"]')?.getAttribute('href') ||
                    trigger.closest('.cloud-card')?.querySelector('.detail-link[href^="http"]')?.getAttribute('href') ||
                    null;
                if (src) {
                    openModal(src, title, verifyUrl);
                }
            });

            // Keyboard accessibility for preview element
            if (trigger.classList.contains('cloud-cert-preview')) {
                trigger.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        trigger.click();
                    }
                });
            }
        });

        // Close events
        if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
        if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && certModal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // ----------------------------------------------------
    // 10. Ravi AI Chat Assistant
    // ----------------------------------------------------
    const aiLaunch = document.getElementById('ravi-ai-launch');
    const aiPanel = document.getElementById('ravi-ai-panel');
    const aiOverlay = document.getElementById('ravi-ai-overlay');
    const aiClose = document.getElementById('ravi-ai-close');
    const aiForm = document.getElementById('ravi-ai-form');
    const aiInput = document.getElementById('ravi-ai-input');
    const aiMessages = document.getElementById('ravi-ai-messages');

    const openAiChat = () => {
        if (!aiPanel || !aiOverlay) return;
        aiPanel.classList.add('active');
        aiPanel.setAttribute('aria-hidden', 'false');
        aiOverlay.hidden = false;
        document.body.classList.add('ai-panel-open');
        setTimeout(() => {
            aiInput?.focus();
        }, 100);
    };

    const closeAiChat = () => {
        if (!aiPanel || !aiOverlay) return;
        aiPanel.classList.remove('active');
        aiPanel.setAttribute('aria-hidden', 'true');
        aiOverlay.hidden = true;
        document.body.classList.remove('ai-panel-open');
    };

    if (aiLaunch && aiPanel && aiOverlay && aiForm && aiInput && aiMessages) {
        aiLaunch.addEventListener('click', openAiChat);
        aiOverlay.addEventListener('click', closeAiChat);
        aiClose?.addEventListener('click', closeAiChat);

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && aiPanel.classList.contains('active')) {
                closeAiChat();
            }
        });

        const addMessage = (text, sender = 'bot') => {
            const bubble = document.createElement('div');
            bubble.className = `ravi-ai-message ravi-ai-message--${sender}`;
            bubble.textContent = text;
            aiMessages.appendChild(bubble);
            aiMessages.scrollTop = aiMessages.scrollHeight;
        };

        const showTypingIndicator = () => {
            const indicator = document.createElement('div');
            indicator.className = 'ravi-ai-message ravi-ai-message--bot ravi-ai-message--typing';
            indicator.setAttribute('aria-live', 'polite');
            indicator.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
            aiMessages.appendChild(indicator);
            aiMessages.scrollTop = aiMessages.scrollHeight;
            return indicator;
        };

        aiForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const message = aiInput.value.trim();
            if (!message) return;

            addMessage(message, 'user');
            aiInput.value = '';
            aiInput.disabled = true;
            const submitButton = aiForm.querySelector('button[type="submit"]');
            const originalText = submitButton?.textContent || 'Send';
            const typingIndicator = showTypingIndicator();
            if (submitButton) {
                submitButton.textContent = 'Thinking...';
                submitButton.disabled = true;
            }

            try {
                const SUPABASE_URL = (typeof CONFIG !== 'undefined' && CONFIG.SUPABASE_URL) || '';
                const SUPABASE_KEY = (typeof CONFIG !== 'undefined' && CONFIG.SUPABASE_ANON_KEY) || '';

                if (!SUPABASE_URL || !SUPABASE_KEY) {
                    throw new Error('Supabase config missing');
                }

                                const response = await fetch(`${SUPABASE_URL}/functions/v1/portfolio-agent`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'apikey': SUPABASE_KEY,
                        'Authorization': `Bearer ${SUPABASE_KEY}`
                    },
                    body: JSON.stringify({ message })
                });

                const payload = await response.json();

                if (!response.ok || !payload.success) {
                    throw new Error(payload?.error?.message || 'Unable to respond right now.');
                }

                const answer = payload.answer || 'I can only answer based on Ravi\'s portfolio information.';
                typingIndicator.remove();
                addMessage(answer, 'bot');

                if (Array.isArray(payload.sources) && payload.sources.length > 0) {
                    addMessage(`Sources: ${payload.sources.join(', ')}`, 'bot');
                }
            } catch (error) {
                typingIndicator.remove();
                addMessage(error?.message || 'I’m unable to answer right now. Please try again shortly.', 'bot');
            } finally {
                aiInput.disabled = false;
                aiInput.focus();
                if (submitButton) {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }
            }
        });
    }
});