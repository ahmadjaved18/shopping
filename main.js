// Loading animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loading-overlay');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// Add image preloading
window.addEventListener('load', () => {
    const imagePaths = [
        'images/hero-bg.jpg',
        'images/clothing/dress1.jpg',
        'images/clothing/dress2.jpg',
        'images/perfumes/perfume1.jpg',
        'images/accessories/bag1.jpg',
        'images/collection/summer2024.jpg'
    ];

    // Preload images
    imagePaths.forEach(path => {
        const img = new Image();
        img.src = path;
    });
});

// Initialize animations when elements come into view
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const fadeUpObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeUpObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections for fade-up animation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    fadeUpObserver.observe(section);
});

// Enhanced hover effects for product cards
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = card.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        
        card.style.transform = `
            perspective(1000px)
            rotateY(${(x - 0.5) * 10}deg)
            rotateX(${(y - 0.5) * -10}deg)
            translateZ(10px)
        `;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'none';
    });
});

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        // Add your newsletter subscription logic here
        
        // Show success message
        const button = newsletterForm.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'Subscribed!';
        button.style.background = '#28a745';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 2000);
    });
}

// Navbar Scroll Effect
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Collection Items Animation
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'scaleIn 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.collection-item').forEach(item => {
        observer.observe(item);
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-image');
    const scrolled = window.pageYOffset;
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
});

// Enhanced shopping cart functionality
let cart = [];

function addToCart(product) {
    cart.push(product);
    updateCartUI();
    showCartNotification();
}

function updateCartUI() {
    const cartIcon = document.querySelector('.fa-shopping-bag');
    if (cart.length > 0) {
        cartIcon.setAttribute('data-count', cart.length);
        cartIcon.classList.add('bounce');
        setTimeout(() => cartIcon.classList.remove('bounce'), 300);
    }
}

function showCartNotification() {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = 'Item added to cart!';
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 2000);
    }, 100);
}

// Modify the existing click handlers for navigation
document.querySelector('.cta-button').addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'products.html';
});

// Add click handlers for category cards
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', (e) => {
        const category = e.currentTarget.querySelector('h3').textContent.toLowerCase();
        window.location.href = `collections.html?category=${category}`;
    });
});

// Update collection button
document.querySelector('.collection-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'collection.html';
});

// Newsletter form handling
document.querySelector('.newsletter-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    // Add your newsletter subscription logic here
    alert('Thank you for subscribing!');
    e.target.reset();
});

// Load Instagram Feed (example)
function loadInstagramFeed() {
    const instagramGrid = document.querySelector('.instagram-grid');
    if (!instagramGrid) return;

    // Example Instagram posts (replace with actual Instagram API integration)
    const posts = [
        'images/instagram/post1.jpg',
        'images/instagram/post2.jpg',
        'images/instagram/post3.jpg',
        'images/instagram/post4.jpg'
    ];

    instagramGrid.innerHTML = posts.map(post => `
        <div class="instagram-post">
            <img src="${post}" alt="Instagram Post">
        </div>
    `).join('');
}

// Initialize Instagram feed
document.addEventListener('DOMContentLoaded', () => {
    loadInstagramFeed();
});

// Simplified animation initialization
document.addEventListener('DOMContentLoaded', () => {
    // Remove all animation classes to ensure content visibility
    document.querySelectorAll('.fade-in, .scale-in, .stagger-fade-in, .animate-text').forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'none';
        element.classList.add('visible');
    });
});

// Ensure elements are visible if JavaScript fails to load
window.addEventListener('load', () => {
    setTimeout(() => {
        if (!document.querySelector('.visible')) {
            document.querySelectorAll('.fade-in, .scale-in, .stagger-fade-in').forEach(element => {
                element.classList.add('visible');
            });
        }
    }, 1000);
});

// Text animation function
function animateText(element) {
    const text = element.textContent;
    element.textContent = '';
    
    for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.textContent = text[i];
        span.style.animationDelay = `${i * 0.1}s`;
        element.appendChild(span);
    }
}

// Initialize text animations
document.querySelectorAll('.animate-text').forEach(animateText);

// Mobile Navigation
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const navbar = document.querySelector('.navbar');

    // Toggle mobile menu
    mobileMenuBtn?.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileNav.classList.remove('active');
        }
    });

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
});

// Lazy loading images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

