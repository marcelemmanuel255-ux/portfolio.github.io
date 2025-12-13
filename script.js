// Performance optimization: Throttle scroll events
let scrollTimeout;
let isScrolling = false;

// Navigation highlighting with throttling
const sections = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('nav a');
const dots = document.querySelectorAll('.page-indicator .dot');

function updateActiveNav() {
    if (isScrolling) return;
    
    isScrolling = true;
    requestAnimationFrame(() => {
        let current = '';
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');

                // Update dots
                dots.forEach(dot => dot.classList.remove('active'));
                if (dots[index]) dots[index].classList.add('active');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
        
        isScrolling = false;
    });
}

// Throttled scroll listener
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateActiveNav, 50);
}, { passive: true });

// Dot navigation
dots.forEach(dot => {
    dot.addEventListener('click', () => {
        const pageIndex = dot.getAttribute('data-page');
        if (sections[pageIndex]) {
            sections[pageIndex].scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Smooth scroll for nav links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Design details data
const designDetails = {
    design1: {
        title: "Luxury Watch Advertisement",
        about: "A premium product advertisement design showcasing a luxury wristwatch.",
        client: "DFJ Déjolux Jewellery",
        description: "This design highlights a high-end luxury wristwatch with an elegant and minimal layout. The focus is on elegance, craftsmanship, and brand sophistication, using a clean composition and refined typography to attract premium buyers."
    },
    design2: {
        title: "Event Academy Promotional Poster",
        about: "A promotional flyer for an event academy.",
        client: "Chrisbel Events Academy",
        description: "This poster showcases the services and training programs offered by Chrisbel Event Academy. The design combines vibrant event photography with a structured layout to communicate professionalism and creativity within the event industry."
    },
    design3: {
        title: "Restaurant Menu Design",
        about: "A fully illustrated food and menu design for a local kitchen.",
        client: "Idoma Kitchen",
        description: "A bold, appetizing menu design featuring various categories of meals such as soups, swallows, rice dishes, small chops, and pepper soups. The layout uses vibrant colors and a structured menu format for easy navigation and strong visual appeal."
    },
    design4: {
        title: "School Election Campaign Poster",
        about: "A school election promotional design for a student candidate.",
        client: "Humming Stars International School",
        description: "A clean and youth-friendly campaign poster created to support Juanita A.'s candidacy for Assistant Headgirl. The design uses school colors, iconography, and a strong portrait to communicate leadership and readiness."
    },
    design5: {
        title: "Cultural Praise Night Poster",
        about: "A vibrant event flyer for a church cultural program.",
        client: "Youth Alive, LFC Wumba",
        description: "This flyer promotes a cultural praise night featuring music, dance, competitions, and special ministrations. The design uses traditional African patterns and earthy colors to reflect cultural identity and celebration."
    },
    design6: {
        title: "Customized Jewelry Advertisement",
        about: "A product promotional design for branded custom bracelets.",
        client: "DFJ Déjolux Jewellery",
        description: "An elegant product showcase for customized bracelets, highlighting personalization and craftsmanship. The design features lifestyle product photography and a clean layout to attract buyers looking for custom-made jewelry."
    },
    design7: {
        title: "Clothing Mockup Design",
        about: "A minimalist sweatshirt mockup showcasing bold typography and brand identity.",
        client: "ASD Empire",
        description: "This design features a clean, high-quality clothing mockup with strong, modern typography that emphasizes the brand message: 'First Rule of the Game – Aura Farm'. The layout focuses on visual impact, using clear contrast and a monochrome aesthetic to highlight the design on the garment. Ideal for apparel branding, merchandise presentation, and fashion catalog displays."
    },
    design8: {
        title: "Event Training Class Poster",
        about: "A promotional flyer for an intensive event-planning class.",
        client: "Chrisbel Events",
        description: "A visually engaging flyer announcing a two-week intensive course in event management and decorations. The design uses modern geometric layouts, event imagery, and bold typography to highlight registration details and course modules."
    },
    design9: {
        title: "Talent Hunt Event Poster",
        about: "A talent competition promotional flyer.",
        client: "Wumba Youth Alive / Church Program",
        description: "A bold and energetic design created to promote a talent hunt for young creatives. It highlights categories such as music, drama, spoken word, and instruments, using vibrant colors and spotlight effects to create excitement and engagement."
    }
};

// Modal functionality - Optimized
const modal = document.getElementById('designModal');
const closeBtn = document.querySelector('.close-modal');
const designItems = document.querySelectorAll('.design-item');

// Optimized click handler with event delegation
designItems.forEach((item, index) => {
    item.addEventListener('click', function(e) {
        e.stopPropagation();
        const designKey = `design${index + 1}`;
        const details = designDetails[designKey];
        
        if (details) {
            // Use requestAnimationFrame for smooth modal opening
            requestAnimationFrame(() => {
                document.getElementById('modalImage').src = `assets/designs/${designKey}.jpg`;
                document.getElementById('modalTitle').textContent = details.title;
                document.getElementById('modalAbout').textContent = details.about;
                document.getElementById('modalClient').textContent = details.client;
                document.getElementById('modalDescription').textContent = details.description;
                
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        }
    }, { passive: true });
});

// Close modal function
function closeModal() {
    requestAnimationFrame(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}

// Close modal when X is clicked
if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
});

// Lazy load images when they come into view
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px'
    });

    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Debounce resize events
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Any resize-specific code goes here
        updateActiveNav();
    }, 250);
}, { passive: true });
