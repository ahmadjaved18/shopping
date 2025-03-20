// Enhanced Product Interactions
document.addEventListener('DOMContentLoaded', () => {
    // Smooth loading animation
    const productsGrid = document.querySelector('.products-grid');
    productsGrid.style.opacity = '0';
    
    setTimeout(() => {
        productsGrid.style.opacity = '1';
        productsGrid.style.transform = 'translateY(0)';
    }, 300);

    // Filter animations
    const filters = document.querySelectorAll('.filter-group select');
    filters.forEach(filter => {
        filter.addEventListener('change', () => {
            animateFilterChange();
        });
    });

    // Quick view functionality
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openQuickView(btn.dataset.productId);
        });
    });
});

function animateFilterChange() {
    const products = document.querySelectorAll('.product-card');
    products.forEach((product, index) => {
        setTimeout(() => {
            product.style.opacity = '0';
            product.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                product.style.opacity = '1';
                product.style.transform = 'translateY(0)';
            }, 300);
        }, index * 100);
    });
}

function openQuickView(productId) {
    const modal = document.createElement('div');
    modal.className = 'quick-view-modal';
    // Add modal content based on product ID
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

// Intersection Observer for lazy loading and animations
const productObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            productObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

document.querySelectorAll('.product-card').forEach(card => {
    productObserver.observe(card);
});

// Premium hover effects
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