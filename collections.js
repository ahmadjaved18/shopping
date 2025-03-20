// Product data
const products = {
    clothing: [
        {
            id: 'c1',
            name: 'Silk Evening Gown',
            price: 2499,
            description: 'Elegant silk evening gown with delicate embroidery.',
            category: 'clothing',
            images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1983']
        },
        {
            id: 'c2',
            name: 'Designer Cocktail Dress',
            price: 1299,
            description: 'Stunning cocktail dress perfect for special occasions.',
            category: 'clothing',
            images: ['https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=987']
        }
    ],
    accessories: [
        {
            id: 'a1',
            name: 'Leather Designer Bag',
            price: 1899,
            description: 'Luxurious leather bag with gold hardware.',
            category: 'accessories',
            images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=870']
        },
        {
            id: 'a2',
            name: 'Crystal Evening Clutch',
            price: 899,
            description: 'Elegant crystal-embellished evening clutch.',
            category: 'accessories',
            images: ['https://images.unsplash.com/photo-1594633313593-bab3825d0caf?q=80&w=987']
        }
    ],
    perfumes: [
        {
            id: 'p1',
            name: 'Midnight Rose Parfum',
            price: 299,
            description: 'An enchanting blend of Bulgarian rose and midnight jasmine.',
            category: 'perfumes',
            images: ['https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=868']
        },
        {
            id: 'p2',
            name: 'Golden Hour Perfume',
            price: 259,
            description: 'A warm and luxurious fragrance for special moments.',
            category: 'perfumes',
            images: ['https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?q=80&w=987']
        }
    ]
};

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    loadProducts('all');
    initializeFilters();
});

// Load products based on category
function loadProducts(category) {
    const productsGrid = document.querySelector('.products-grid');
    let productsToShow = [];

    if (category === 'all') {
        Object.values(products).forEach(categoryProducts => {
            productsToShow = productsToShow.concat(categoryProducts);
        });
    } else {
        productsToShow = products[category] || [];
    }

    productsGrid.innerHTML = productsToShow.map(product => `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">
                <img src="${product.images[0]}" alt="${product.name}">
                <div class="product-overlay">
                    <button onclick="quickView('${product.id}')">Quick View</button>
                    <button onclick="addToCart('${product.id}')">Add to Cart</button>
                </div>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price">$${product.price.toLocaleString()}</p>
            </div>
        </div>
    `).join('');

    // Initialize animations for new products
    animateProducts();
}

// Initialize filters
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            // Load products for selected category
            loadProducts(button.dataset.category);
        });
    });
}

// Animate products when they load
function animateProducts() {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Quick View functionality
function quickView(productId) {
    const product = findProduct(productId);
    if (!product) return;

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <div class="product-details">
                <div class="product-image">
                    <img src="${product.images[0]}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h2>${product.name}</h2>
                    <p class="price">$${product.price.toLocaleString()}</p>
                    <p class="description">${product.description}</p>
                    <button onclick="addToCart('${product.id}')" class="add-to-cart-btn">Add to Cart</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);
}

// Helper function to find product by ID
function findProduct(productId) {
    for (const category in products) {
        const product = products[category].find(p => p.id === productId);
        if (product) return product;
    }
    return null;
}
