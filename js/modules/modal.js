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

    bsModal.show();
}
