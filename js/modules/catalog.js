export function renderCards(products, filter = 'all') {
    const grid = document.getElementById('catalogGrid');
    const list = filter === 'all' ? products : products.filter(p => p.category === filter);

    if (!list.length) {
        grid.innerHTML = `
            <div class="col-12 text-center py-5 text-muted">
                <i class="fas fa-box-open fs-1 mb-3 d-block"></i>
                <p>No hay productos en esta categoría aún.<br><strong>¡Próximamente!</strong></p>
            </div>`;
        return;
    }

    grid.innerHTML = list.map(p => {
        const imgContent = p.images?.length
            ? `<img src="${p.images[0]}" class="card-img-top" alt="${p.title}" loading="lazy">`
            : `<div class="card-img-placeholder">${p.icon || '🖨️'}</div>`;

        return `
        <div class="col-sm-6 col-lg-4 col-xl-3">
            <div class="card product-card h-100" onclick="openModal(${p.id})">
                <div class="card-img-wrap">${imgContent}</div>
                <div class="card-body d-flex flex-column">
                    <span class="badge bg-secondary mb-2 align-self-start">${p.tag}</span>
                    <h5 class="card-title fw-bold">${p.title}</h5>
                    <p class="card-text text-muted small flex-grow-1">${p.desc}</p>
                    <button class="btn btn-whatsapp mt-3 w-100"
                            onclick="event.stopPropagation(); openModal(${p.id})">
                        <i class="fab fa-whatsapp me-2"></i>Solicitar por WhatsApp
                    </button>
                </div>
            </div>
        </div>`;
    }).join('');
}

export function filterCards(products, category, btn) {
    document.querySelectorAll('.btn-filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderCards(products, category);
}
