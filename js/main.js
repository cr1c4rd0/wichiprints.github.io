import { products }          from './data/products.js';
import { renderCards, filterCards } from './modules/catalog.js';
import { initModal, openModal, getCurrentProduct } from './modules/modal.js';
import { slideGallery, goSlide } from './modules/gallery.js';
import { buildWaLink, changeQty } from './modules/whatsapp.js';

// Expose functions needed by inline handlers in dynamically-generated HTML
window.openModal    = (id)       => openModal(id, products);
window.filterCards  = (cat, btn) => filterCards(products, cat, btn);
window.slideGallery = slideGallery;
window.goSlide      = goSlide;
window.changeQty    = changeQty;
window.buildWaLink  = (e)        => buildWaLink(e, getCurrentProduct());

// Init
initModal();
renderCards(products);
