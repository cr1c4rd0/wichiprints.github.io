let cart = [];
try {
    cart = JSON.parse(localStorage.getItem('wichiCart') || '[]');
    if (!Array.isArray(cart)) cart = [];
} catch (e) {
    console.error('Error parsing wichiCart:', e);
}

function escapeHTML(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[tag] || tag));
}

function addToCart(productId, qty = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            category: product.category,
            tag: product.tag,
            images: product.images,
            icon: product.icon,
            price: product.price,
            qty: qty
        });
    }

    persistCart();
    updateCartBadge();
    showAddedToast(product.title);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    persistCart();
    updateCartBadge();
    renderCartItems();
}

function updateCartQty(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;
    const newQty = item.qty + delta;
    if (newQty < 1) {
        removeFromCart(productId);
        return;
    }
    item.qty = newQty;
    persistCart();
    updateCartBadge();
    renderCartItems();
}

function persistCart() {
    localStorage.setItem('wichiCart', JSON.stringify(cart));
}

function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    if (!badge) return;
    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    badge.textContent = total;
    badge.style.display = total > 0 ? 'flex' : 'none';
}

function openCart() {
    renderCartItems();
    document.getElementById('cartPanel').classList.add('open');
    document.getElementById('cartOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    document.getElementById('cartPanel').classList.remove('open');
    document.getElementById('cartOverlay').classList.remove('open');
    document.body.style.overflow = '';
}

function renderCartItems() {
    const itemsEl   = document.getElementById('cartItems');
    const totalEl   = document.getElementById('cartTotal');
    const emptyEl   = document.getElementById('cartEmpty');
    const contentEl = document.getElementById('cartContent');
    if (!itemsEl) return;

    if (cart.length === 0) {
        emptyEl.style.display  = 'flex';
        contentEl.style.display = 'none';
        return;
    }

    emptyEl.style.display  = 'none';
    contentEl.style.display = 'flex';

    itemsEl.innerHTML = cart.map(item => {
        const imgHtml = item.images?.length
            ? `<img src="${item.images[0]}" alt="${escapeHTML(item.title)}">`
            : `<div class="cart-item-placeholder">${item.icon || '🖨️'}</div>`;

        return `
        <div class="cart-item">
            <div class="cart-item-img">${imgHtml}</div>
            <div class="cart-item-info">
                <div class="cart-item-title">${escapeHTML(item.title)}</div>
                ${item.price != null ? `<div class="cart-item-price">${formatPrice(item.price)}</div>` : ''}
                <div class="cart-qty-ctrl">
                    <button class="cart-qty-btn" onclick="updateCartQty(${item.id}, -1)">−</button>
                    <span class="cart-qty-val">${item.qty}</span>
                    <button class="cart-qty-btn" onclick="updateCartQty(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="cart-remove-btn" onclick="removeFromCart(${item.id})" title="Eliminar">
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>`;
    }).join('');

    const total = cart.reduce((sum, item) => sum + ((item.price || 0) * item.qty), 0);
    totalEl.textContent = formatPrice(total);
}

function sendCartToWhatsApp() {
    if (cart.length === 0) return;

    let msg = `Hola Wichi Prints! 👋\n\nQuiero hacer el siguiente pedido:\n\n`;
    cart.forEach((item, i) => {
        msg += `${i + 1}. 🖨️ *${item.title}*\n   🔢 Cantidad: *${item.qty}*`;
        if (item.price != null) msg += `\n   💰 Subtotal: *${formatPrice(item.price * item.qty)}*`;
        msg += '\n\n';
    });

    const total = cart.reduce((sum, item) => sum + ((item.price || 0) * item.qty), 0);
    msg += `💳 *TOTAL DEL PEDIDO: ${formatPrice(total)}*\n\n¿Me pueden confirmar disponibilidad y tiempo de entrega? 😊`;

    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
}

function showAddedToast(title) {
    const toast = document.getElementById('cartToast');
    if (!toast) return;
    toast.querySelector('.toast-msg').textContent = `"${title}" agregado al carrito`;
    toast.classList.add('show');
    clearTimeout(toast._tid);
    toast._tid = setTimeout(() => toast.classList.remove('show'), 2800);
}

function goToCheckout() {
    if (cart.length === 0) return;
    window.location.href = 'order-summary.html';
}

document.addEventListener('DOMContentLoaded', updateCartBadge);
