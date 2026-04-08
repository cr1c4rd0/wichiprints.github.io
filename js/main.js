function formatPrice(price) {
    return price.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
}

function toggleNav(btn) {
    btn.classList.toggle('open');
    document.getElementById('catNav').classList.toggle('open');
}

function toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const next = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    const icon = document.querySelector('#themeToggle i');
    icon.className = next === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
    const icon = document.querySelector('#themeToggle i');
    if (icon) icon.className = saved === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

    initModal();
    renderCards();
});
