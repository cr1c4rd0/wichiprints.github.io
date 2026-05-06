let bsModal = null;
let currentProduct = null;

function initModal() {
    bsModal = new bootstrap.Modal(document.getElementById('productModal'));
}

function openModal(id) {
    currentProduct = products.find(p => p.id === id);
    if (!currentProduct) return;

    buildGallery(currentProduct.images, currentProduct.icon);

    document.getElementById('modalTag').textContent   = currentProduct.tag;
    document.getElementById('modalTitle').textContent = currentProduct.title;
    document.getElementById('modalDesc').textContent  = currentProduct.desc;
    document.getElementById('qtyInput').value         = 1;
    document.getElementById('extraNote').value        = '';

    const priceEl = document.getElementById('modalPrice');
    if (currentProduct.price != null) {
        priceEl.textContent = formatPrice(currentProduct.price);
        priceEl.classList.remove('d-none');
    } else {
        priceEl.classList.add('d-none');
    }

    bsModal.show();
}

function addToCartFromModal() {
    if (!currentProduct) return;
    const qty = parseInt(document.getElementById('qtyInput').value) || 1;
    for (let i = 0; i < qty; i++) addToCart(currentProduct.id);
    bsModal.hide();
}

function shareProduct() {
    if (!currentProduct) return;
    const text = `¡Mira este producto de Wichi Prints! 🖨️\n*${currentProduct.title}*${currentProduct.price != null ? ' – ' + formatPrice(currentProduct.price) : ''}\n${currentProduct.desc}`;
    if (navigator.share) {
        navigator.share({ title: currentProduct.title, text });
    } else {
        navigator.clipboard.writeText(text).then(() => {
            const btn = document.querySelector('.btn-modal-share');
            btn.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => { btn.innerHTML = '<i class="fas fa-share-alt"></i>'; }, 2000);
        });
    }
}
