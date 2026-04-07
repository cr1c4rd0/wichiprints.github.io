const WA_NUMBER = '573332830125';

function buildWaLink(e) {
    e.preventDefault();
    if (!currentProduct) return;

    const qty  = parseInt(document.getElementById('qtyInput').value) || 1;
    const note = document.getElementById('extraNote').value.trim();

    let msg = `Hola Wichi Prints! 👋\n\nEstoy interesado/a en:\n\n🖨️ *${currentProduct.title}*\n📝 ${currentProduct.desc}\n🔢 Cantidad: *${qty}*`;
    if (currentProduct.price != null) msg += `\n💰 Precio unitario: *${formatPrice(currentProduct.price)}*`;
    if (note) msg += `\n📌 Especificaciones: ${note}`;
    msg += `\n\n¿Me pueden confirmar disponibilidad? 😊`;

    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
}

function changeQty(delta) {
    const input = document.getElementById('qtyInput');
    input.value = Math.max(1, (parseInt(input.value) || 1) + delta);
}
