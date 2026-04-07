function formatPrice(price) {
    return price.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
}

function toggleNav(btn) {
    btn.classList.toggle('open');
    document.getElementById('catNav').classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', () => {
    initModal();
    renderCards();
});
