export const WA_NUMBER = '573332830125';

export function buildWaLink(e, product) {
    e.preventDefault();
    if (!product) return;

    const qty  = parseInt(document.getElementById('qtyInput').value) || 1;
    const note = document.getElementById('extraNote').value.trim();

    let msg = `Hola Wichi Prints! 👋\n\nEstoy interesado/a en:\n\n🖨️ *${product.title}*\n📝 ${product.desc}\n🔢 Cantidad: *${qty}*`;
    if (note) msg += `\n📌 Especificaciones: ${note}`;
    msg += `\n\n¿Me pueden dar más información y precio? 😊`;

    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
}

export function changeQty(delta) {
    const input = document.getElementById('qtyInput');
    input.value = Math.max(1, (parseInt(input.value) || 1) + delta);
}
