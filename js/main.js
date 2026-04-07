function formatPrice(price) {
    return price.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
}

document.addEventListener('DOMContentLoaded', () => {
    initModal();
    renderCards();
});
