const WA_NUMBER = '573332830125';

function formatPrice(p) {
    return p.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
}

function escapeHTML(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[tag] || tag));
}

let cart = [];
try {
    cart = JSON.parse(localStorage.getItem('wichiCart') || '[]');
    if (!Array.isArray(cart)) cart = [];
} catch (e) {
    console.error('Error parsing wichiCart:', e);
}

// Variables that need to be accessed by sendCartToWA
let discountPct = 0;
let discountAmount = 0;
let finalTotal = 0;
let shippingText = '';

if (cart.length === 0) {
    window.location.href = 'index.html';
} else {
    // Date
    document.getElementById('invoiceDate').textContent = new Date().toLocaleDateString('es-CO', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    // Render items
    let grandTotal = 0;
    document.getElementById('invoiceItems').innerHTML = cart.map(item => {
        const sub = (item.price || 0) * item.qty;
        grandTotal += sub;
        const thumb = item.images?.length
            ? `<img class="product-thumb" src="${item.images[0]}" alt="${item.title}">`
            : `<div class="product-icon">${item.icon || '🖨️'}</div>`;
        return `
        <tr>
            <td>
                <div class="product-cell">
                    ${thumb}
                    <div>
                        <div class="product-name">${escapeHTML(item.title)}</div>
                        <div class="product-cat">${escapeHTML(item.tag || item.category)}</div>
                    </div>
                </div>
            </td>
            <td><span class="qty-pill">× ${item.qty}</span></td>
            <td class="td-price">${item.price != null ? formatPrice(item.price) : '—'}</td>
            <td class="td-subtotal">${item.price != null ? formatPrice(sub) : '—'}</td>
        </tr>`;
    }).join('');

    // Discount logic
    if (grandTotal >= 300000) discountPct = 10;
    else if (grandTotal >= 200000) discountPct = 5;

    discountAmount = Math.round(grandTotal * discountPct / 100);
    finalTotal = grandTotal - discountAmount;

    // Shipping logic
    let totalQty = cart.reduce((acc, item) => acc + item.qty, 0);
    let shippingCost = 0;

    if (finalTotal >= 150000) {
        shippingCost = 0;
        shippingText = 'Gratis';
    } else {
        shippingCost = 22000;
        shippingText = formatPrice(shippingCost);
    }

    finalTotal += shippingCost;

    if (discountPct > 0 || shippingCost >= 0) {
        document.getElementById('subtotalLine').style.display = 'flex';
        document.getElementById('invoiceSubtotal').textContent = formatPrice(grandTotal);
        document.getElementById('totalLabel').textContent = 'Total a pagar';
    }

    if (discountPct > 0) {
        document.getElementById('discountBanner').style.display = 'inline-flex';
        document.getElementById('discountBannerText').textContent =
            `¡Descuento del ${discountPct}% aplicado automáticamente!`;
        document.getElementById('discountLine').style.display = 'flex';
        document.getElementById('discountLineLabel').textContent = `Descuento ${discountPct}%`;
        document.getElementById('discountLineAmount').textContent = `− ${formatPrice(discountAmount)}`;
    }

    document.getElementById('shippingLine').style.display = 'flex';
    document.getElementById('shippingLineAmount').textContent = shippingText;

    document.getElementById('invoiceTotal').textContent = formatPrice(finalTotal);
}

// Copy phone
window.copyPhone = function() {
    navigator.clipboard.writeText('3004443567').then(() => {
        const btn = document.getElementById('copyBtn');
        btn.innerHTML = '<i class="fas fa-check"></i> ¡Copiado!';
        btn.classList.add('copied');
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-copy"></i> Copiar';
            btn.classList.remove('copied');
        }, 2200);
    }).catch(err => console.error('Error al copiar', err));
};

// Send to WhatsApp
window.sendCartToWA = function() {
    const name = document.getElementById('userName').value.trim();
    const docType = document.getElementById('userDocType').value;
    const docId = document.getElementById('userDocId').value.trim();
    const phone = document.getElementById('userPhone').value.trim();
    const email = document.getElementById('userEmail').value.trim();
    const address = document.getElementById('userAddress').value.trim();
    const dept = document.getElementById('userDept').value.trim();
    const city = document.getElementById('userCity').value.trim();

    if (!name || !docId || !phone || !email || !address || !dept || !city) {
        alert("Por favor, completa todos los datos de envío y facturación antes de confirmar.");
        return;
    }

    let msg = `Hola Wichi Prints! 👋\n\nAquí tienes los datos de mi pedido:\n\n`;
    msg += `👤 *DATOS DEL CLIENTE*\n`;
    msg += `- Nombre: ${name}\n`;
    msg += `- Documento: ${docType} ${docId}\n`;
    msg += `- Celular: ${phone}\n`;
    msg += `- Correo: ${email}\n`;
    msg += `- Dirección: ${address}\n`;
    msg += `- Ciudad/Depto: ${city}, ${dept}\n\n`;

    msg += `🛒 *DETALLE DEL PEDIDO*\n`;
    cart.forEach((item, i) => {
        msg += `${i + 1}. 🖨️ *${item.title}*\n   🔢 Cantidad: *${item.qty}*`;
        if (item.price != null) msg += `\n   💰 Subtotal: *${formatPrice(item.price * item.qty)}*`;
        msg += '\n\n';
    });
    if (discountPct > 0) {
        msg += `🏷️ *Descuento ${discountPct}%: − ${formatPrice(discountAmount)}*\n`;
    }
    if (shippingText) {
        msg += `🚚 *Envío: ${shippingText}*\n`;
    }
    msg += `💳 *TOTAL A PAGAR: ${formatPrice(finalTotal)}*\n\n¿Me pueden confirmar disponibilidad y tiempo de entrega? 😊`;
    
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
};
