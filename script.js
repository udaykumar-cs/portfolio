// --- PREMIUM INITIALIZATION ---
window.addEventListener('load', () => {
    // Loader handling
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                // Trigger GSAP entrance animations after loader is gone
                initGSAPAnimations();
            }, 500);
        }, 1500);
    } else {
        // If no loader, initialize animations right away
        initGSAPAnimations();
    }

    // Add Aura Blobs dynamically
    const blob1 = document.createElement('div');
    blob1.className = 'aura-blob';
    blob1.style.top = '-10%'; blob1.style.left = '-10%';
    document.body.appendChild(blob1);

    const blob2 = document.createElement('div');
    blob2.className = 'aura-blob';
    blob2.style.bottom = '-10%'; blob2.style.right = '-10%';
    blob2.style.background = 'radial-gradient(circle, var(--violet-glow) 0%, transparent 70%)';
    document.body.appendChild(blob2);
});

// --- HEADER SCROLL EFFECT ---
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// --- CUSTOM CURSOR ---
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (cursorDot && cursorOutline && !isTouchDevice) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Slight delay for outline
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 100, fill: "forwards" });
    });

    // Cursor hover effect on interactive elements
    const interactables = document.querySelectorAll('a, button, .face');
    interactables.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('hover');
        });
        link.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('hover');
        });
    });
}

// --- NAVIGATION MENU ---
const menuIcon = document.querySelector('.menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('active');
    menuIcon.querySelector('i').classList.toggle('fa-bars');
    menuIcon.querySelector('i').classList.toggle('fa-times');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        const icon = menuIcon.querySelector('i');
        if (icon) {
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    });
});

// --- THEME TOGGLE (Placeholder logic) ---
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    themeToggle.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// --- TYPED.JS ---
if (document.querySelector('.typing')) {
    const typed = new Typed('.typing', {
        strings: ["Computer Science Engineer", "Data Analyst", "Python FullStack Developer", "Machine Learning Engineer", "Problem Solver"],
        typeSpeed: 60,
        backSpeed: 40,
        loop: true,
        backDelay: 2500,
        showCursor: true,
        cursorChar: '|'
    });
}

// --- PARTICLES.JS ---
if (document.getElementById('particles-js')) {
    particlesJS("particles-js", {
        particles: {
            number: { value: 60, density: { enable: true, value_area: 800 } },
            color: { value: "#0ea5e9" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#8b5cf6", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 2, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "grab" },
                onclick: { enable: true, mode: "push" },
                resize: true
            },
            modes: {
                grab: { distance: 140, line_linked: { opacity: 1 } },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    });
}

// --- GSAP REVEAL ANIMATIONS ---
function initGSAPAnimations() {
    if (typeof gsap === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    // Fade Up Animation
    gsap.utils.toArray('.fade-up').forEach((element) => {
        gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 90%",
                toggleActions: "play none none none"
            },
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out"
        });
    });

    // Staggered lists/grids
    const staggerConfigs = [
        { selector: '.services-grid .service-card', delay: 0.15 },
        { selector: '.skill-tag', delay: 0.08 },
        { selector: '.glass-card', delay: 0.15 }
    ];

    staggerConfigs.forEach(config => {
        const elements = document.querySelectorAll(config.selector);
        if (elements.length > 0) {
            gsap.to(elements, {
                scrollTrigger: {
                    trigger: elements[0],
                    start: "top 90%"
                },
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: config.delay,
                ease: "power2.out"
            });
        }
    });
}

// --- MAGNETIC BUTTONS ---
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = `translate(0, 0)`;
    });
});

// Initial style setup removed as GSAP handles it via CSS classes or to() calls


// --- PROJECT FILTERING ---
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.mix');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.classList.contains(filterValue)) {
                card.style.display = 'block';
                setTimeout(() => card.style.opacity = '1', 50);
            } else {
                card.style.opacity = '0';
                setTimeout(() => card.style.display = 'none', 300);
            }
        });
    });
});

// --- VANILLA TILT Initialization ---
VanillaTilt.init(document.querySelectorAll(".tilt-effect"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
});

// --- SCROLL PROGRESS (Timeline & Navbar active state) ---
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');
const timelineLine = document.querySelector('.timeline-line');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (current && href && href.includes(current)) {
            link.classList.add('active');
        }
    });
    
    // Timeline progress filling
    if (timelineLine) {
        const expSection = document.getElementById('education');
        if (expSection) {
            const rect = expSection.getBoundingClientRect();
            const winHeight = window.innerHeight;
            
            // Calculate how far we've scrolled through the section
            if (rect.top < winHeight && rect.bottom > 0) {
                let progress = ((winHeight - rect.top) / (rect.height + winHeight)) * 100;
                // Clamp between 0 and 100
                progress = Math.max(0, Math.min(100, progress));
                timelineLine.style.setProperty('--scroll-progress', `${progress}%`);
            }
        }
    }
});

// --- CONTACT FORM CONFETTI ---
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span>Sending... <i class="fas fa-spinner fa-spin"></i></span><div class="liquid"></div>';
        
        // Simulate API call
        setTimeout(() => {
            btn.innerHTML = '<span>Sent Successfully! <i class="fas fa-check"></i></span><div class="liquid"></div>';
            btn.style.boxShadow = '0 0 20px #00ffff';
            btn.style.borderColor = '#00ffff';
            
            // Create minor confetti effect using a small DOM element burst
            createConfetti(btn);
            
            setTimeout(() => {
                contactForm.reset();
                btn.innerHTML = originalText;
                btn.style.boxShadow = '';
                btn.style.borderColor = '';
            }, 3000);
        }, 1500);
    });
}

function createConfetti(element) {
    const rect = element.getBoundingClientRect();
    const colors = ['#6366F1', '#A855F7', '#00FFFF', '#FFFFFF'];
    
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '8px';
        confetti.style.height = '8px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.top = `${rect.top + rect.height/2}px`;
        confetti.style.left = `${rect.left + rect.width/2}px`;
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        
        document.body.appendChild(confetti);
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = 5 + Math.random() * 10;
        const tx = Math.cos(angle) * velocity * 20;
        const ty = Math.sin(angle) * velocity * 20 - 50; // Bias upward
        
        confetti.animate([
            { transform: 'translate(0, 0) rotate(0)', opacity: 1 },
            { transform: `translate(${tx}px, ${ty}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
        ], {
            duration: 1000 + Math.random() * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            fill: 'forwards'
        }).onfinish = () => confetti.remove();
    }
}

// --- RESUME TAB SWITCHER ---
const resumeTabBtns = document.querySelectorAll('.tab-navigation .tab-btn');
const resumeTabPanes = document.querySelectorAll('.tab-pane');

function showTab(tabId) {
    // Find the button and pane
    const targetBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
    const targetPane = document.getElementById(tabId);
    
    if (targetBtn && targetPane) {
        // Remove active class from all buttons and panes
        resumeTabBtns.forEach(b => b.classList.remove('active'));
        resumeTabPanes.forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked button and target pane
        targetBtn.classList.add('active');
        targetPane.classList.add('active');

        // Scroll gracefully to the content area if navigated via hash
        if (window.location.hash) {
            const contentArea = document.querySelector('.resume-content-area');
            if (contentArea) {
                contentArea.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }
}

if (resumeTabBtns.length > 0) {
    // Add click event to buttons
    resumeTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-tab');
            showTab(target);
            // Update URL hash without jumping if desired, or keep as is
            window.location.hash = target;
        });
    });

    // Handle initial load with hash
    window.addEventListener('load', () => {
        const hash = window.location.hash.replace('#', '');
        if (hash) {
            showTab(hash);
        }
    });

    // Handle hash change (e.g. clicking navbar link while already on resume.html)
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.replace('#', '');
        if (hash) {
            showTab(hash);
        }
    });
}
