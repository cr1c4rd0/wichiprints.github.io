function renderCards(filter = 'all') {
    const grid = document.getElementById('catalogGrid');
    const list = filter === 'all' ? products : products.filter(p => p.category === filter);

    if (!list.length) {
        grid.innerHTML = `
            <div class="col-12 text-center empty-state">
                <i class="fas fa-box-open d-block"></i>
                <p class="mb-0">No hay productos en esta categoría aún.<br><strong>¡Próximamente!</strong></p>
            </div>`;
        return;
    }

    grid.innerHTML = list.map((p, i) => {
        const imgContent = p.images?.length
            ? `<img src="${p.images[0]}" class="card-img-top" alt="${p.title}" loading="lazy">`
            : `<div class="card-img-placeholder">${p.icon || '🖨️'}</div>`;

        const badgeClass = `badge-${p.category || 'default'}`;

        return `
        <div class="col-sm-6 col-lg-4 col-xl-3" style="animation-delay:${i * 0.08}s">
            <div class="card product-card h-100" data-category="${p.category}" onclick="openModal(${p.id})">
                <div class="card-img-wrap">${imgContent}</div>
                <div class="card-body d-flex flex-column">
                    <span class="badge ${badgeClass} mb-2 align-self-start">${p.tag}</span>
                    <h5 class="card-title">${p.title}</h5>
                    <p class="card-text flex-grow-1">${p.desc}</p>
                    ${p.price != null ? `<div class="product-price mt-2">${formatPrice(p.price)}</div>` : ''}
                    <button class="btn btn-whatsapp mt-3 w-100"
                            onclick="event.stopPropagation(); openModal(${p.id})">
                        <i class="fab fa-whatsapp me-2"></i>Solicitar por WhatsApp
                    </button>
                </div>
            </div>
        </div>`;
    }).join('');
}

function filterCards(category, btn) {
    document.querySelectorAll('.btn-filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderCards(category);
}
