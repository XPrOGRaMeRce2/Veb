// Product data
const products = [
    {
        id: 1,
        name: "Модерна Столица",
        description: "Елегантна столица со метална рамка и удобна седишна површина. Перфектна за современи домови и канцеларии. Дизајнирана за максимален комфорт и стил.",
        price: 4500,
        image: "images/chair1.jpg",
        colors: ["#2c3e50", "#e74c3c", "#3498db", "#2ecc71"],
        material: "Метална рамка, Полиестер ткаенина",
        dimensions: "60 x 60 x 85 см",
        weight: "8 кг"
    },
    {
        id: 2,
        name: "Класична Столица",
        description: "Традиционален дизајн со дрвена рамка и висококвалитетна ткаенина. Идеална за класични и елегантни простори. Комбинира вечна елеганција со современ комфорт.",
        price: 3800,
        image: "images/chair2.jpg",
        colors: ["#8B4513", "#A0522D", "#CD853F", "#DEB887"],
        material: "Дрвена рамка, Велвет ткаенина",
        dimensions: "55 x 55 x 80 см",
        weight: "7 кг"
    },
    {
        id: 3,
        name: "Скандинавска Столица",
        description: "Минималистички дизајн со природни материјали. Инспирирана од скандинавската традиција, оваа столица носи топлина и стил во секој простор.",
        price: 5200,
        image: "images/chair3.jpg",
        colors: ["#F5F5F5", "#E0E0E0", "#BDBDBD", "#9E9E9E"],
        material: "Брезова рамка, Лен ткаенина",
        dimensions: "58 x 58 x 82 см",
        weight: "6.5 кг"
    },
    {
        id: 4,
        name: "Индустриска Столица",
        description: "Робусен дизајн со метални детали. Перфектна за современи простори и лофт стил. Комбинира индустриска естетика со максимален комфорт.",
        price: 4800,
        image: "images/chair4.jpg",
        colors: ["#2C3E50", "#34495E", "#7F8C8D", "#95A5A6"],
        material: "Челична рамка, Кожа",
        dimensions: "62 x 62 x 88 см",
        weight: "9 кг"
    },
    {
        id: 5,
        name: "Ергономска Столица",
        description: "Професионална столица за долготрајна употреба. Дизајнирана со фокус на здравје и комфорт. Идеална за канцеларии и домашни работни места.",
        price: 6500,
        image: "images/chair5.jpg",
        colors: ["#1ABC9C", "#16A085", "#2ECC71", "#27AE60"],
        material: "Алуминиумска рамка, Мрежа",
        dimensions: "65 x 65 x 90 см",
        weight: "10 кг"
    },
    {
        id: 6,
        name: "Бар Столица",
        description: "Висока столица со модерен дизајн. Перфектна за кујнски остров или бар. Комбинира стил со функционалност.",
        price: 4200,
        image: "images/chair6.jpg",
        colors: ["#E74C3C", "#C0392B", "#D35400", "#E67E22"],
        material: "Метална рамка, Пластика",
        dimensions: "45 x 45 x 75 см",
        weight: "5 кг"
    },
    {
        id: 7,
        name: "Викторијанска Столица",
        description: "Луксузна столица со детални резби. Носи викторијанска елеганција во современиот дом. Секој детал е внимателно изработен.",
        price: 7800,
        image: "images/chair7.jpg",
        colors: ["#8B4513", "#A0522D", "#CD853F", "#DEB887"],
        material: "Дрвена рамка, Велвет ткаенина",
        dimensions: "58 x 58 x 85 см",
        weight: "8.5 кг"
    },
    {
        id: 8,
        name: "Минерва Столица",
        description: "Модерна столица со геометриски форми. Инспирирана од класичната архитектура, но со современ пресврт. Идеална за современи простори.",
        price: 5500,
        image: "images/chair8.jpg",
        colors: ["#9B59B6", "#8E44AD", "#3498DB", "#2980B9"],
        material: "Метална рамка, Полиестер ткаенина",
        dimensions: "60 x 60 x 85 см",
        weight: "7.5 кг"
    }
];

// Иницијализација на кошничката
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const productsGrid = document.querySelector('.products-grid');
const cartModal = document.getElementById('cart');
const cartItems = document.querySelector('.cart-items');
const totalAmount = document.getElementById('total-amount');
const cartCount = document.querySelector('.cart-count');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const contactForm = document.getElementById('contact-form');

// Loading animation
window.addEventListener('load', () => {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.classList.add('hidden');
    }
    // Display products when page loads
    if (productsGrid) {
        displayProducts();
    }
});

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
    mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
});

// Display products
function displayProducts() {
    if (!productsGrid) return;
    
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card fade-in">
            <a href="product.html?id=${product.id}" class="product-link">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p>${product.description}</p>
                    <p class="product-price">${product.price} ден.</p>
                    <button class="add-to-cart" onclick="event.preventDefault(); addToCart(${product.id})">
                        Додади во кошничка
                    </button>
                </div>
            </a>
        </div>
    `).join('');
}

// Функција за додавање на производ во кошничката
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    saveCart();
    updateCartCount();
    showCartNotification(product.name);
}

// Функција за отстранување на производ од кошничката
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    
    if (window.location.pathname.includes('cart.html')) {
        displayCartItems();
    }
}

// Функција за зачувување на кошничката во localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Функција за ажурирање на бројот на производи во кошничката
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Функција за прикажување на известување при додавање во кошничка
function showCartNotification(productName) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = `${productName} е додаден во кошничката`;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Функција за пресметување на вкупната сума
function calculateSubtotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// Функција за ажурирање на трошоците за достава
function updateDeliveryCost() {
    const subtotal = calculateSubtotal();
    const deliverySelect = document.getElementById('delivery-city');
    const deliveryCostElement = document.getElementById('delivery-cost');
    const totalElement = document.getElementById('total-amount');
    
    if (deliverySelect && deliveryCostElement && totalElement) {
        let deliveryCost = 0;
        
        if (subtotal < 10000) {
            deliveryCost = deliverySelect.value === 'skopje' ? 300 : 500;
        }
        
        deliveryCostElement.textContent = `${deliveryCost} ден.`;
        totalElement.textContent = `${subtotal + deliveryCost} ден.`;
    }
}

// Функција за прикажување на производите во кошничката
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalElement = document.getElementById('subtotal-amount');
    
    if (!cartItemsContainer || !subtotalElement) return;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart">Вашата кошничка е празна</div>';
        return;
    }
    
    const subtotal = calculateSubtotal();
    subtotalElement.textContent = `${subtotal} ден.`;
    
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>${item.price} ден. x ${item.quantity}</p>
            </div>
            <div class="cart-item-actions">
                <button onclick="removeFromCart(${item.id})" class="remove-item">✕</button>
            </div>
        </div>
    `).join('');
    
    updateDeliveryCost();
}

// Функција за завршување на нарачката
function proceedToCheckout() {
    const paymentMethod = document.getElementById('payment-method').value;
    const totalAmount = document.getElementById('total-amount').textContent;
    
    alert(`Вашата нарачка е успешна!\nНачин на плаќање: ${paymentMethod}\nВкупна сума: ${totalAmount}`);
    
    // Ресетирање на кошничката
    cart = [];
    localStorage.removeItem('cart');
    displayCartItems();
    updateCartCount();
    
    // Редирект кон почетната страница
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// Иницијализација при вчитување на страницата
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    
    if (window.location.pathname.includes('cart.html')) {
        displayCartItems();
        
        const deliverySelect = document.getElementById('delivery-city');
        if (deliverySelect) {
            deliverySelect.addEventListener('change', updateDeliveryCost);
        }
    }
});

// Show/hide cart
function showCart() {
    if (cartModal) cartModal.classList.add('active');
}

function hideCart() {
    if (cartModal) cartModal.classList.remove('active');
}

// Close cart when clicking outside
document.addEventListener('click', (e) => {
    if (cartModal && !cartModal.contains(e.target) && !e.target.closest('.cart-icon')) {
        hideCart();
    }
});

// Form validation
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (!name || !email || !message) {
        alert('Ве молиме пополнете ги сите полиња');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('Ве молиме внесете валидна емаил адреса');
        return;
    }
    
    // Simulate form submission
    alert('Вашата порака е успешно испратена!');
    contactForm.reset();
});

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Initialize
if (productsGrid) {
    displayProducts();
} 