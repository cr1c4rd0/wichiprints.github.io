let currentSlide = 0;

function buildGallery(images, icon = '🖨️') {
    const container = document.getElementById('modalGallery');
    currentSlide = 0;

    if (!images || !images.length) {
        container.innerHTML = `<div class="gallery-slide active fs-1">${icon}</div>`;
        return;
    }

    const slides = images.map((src, i) => `
        <div class="gallery-slide ${i === 0 ? 'active' : ''}" data-index="${i}">
            <img src="${src}" alt="Foto ${i + 1}">
        </div>`
    ).join('');

    const arrows = images.length > 1 ? `
        <button class="gallery-arrow prev" onclick="slideGallery(-1)">
            <i class="fas fa-chevron-left"></i>
        </button>
        <button class="gallery-arrow next" onclick="slideGallery(1)">
            <i class="fas fa-chevron-right"></i>
        </button>` : '';

    const dots = images.length > 1
        ? `<div class="gallery-dots">${images.map((_, i) =>
            `<button class="gallery-dot ${i === 0 ? 'active' : ''}" onclick="goSlide(${i})"></button>`
          ).join('')}</div>`
        : '';

    container.innerHTML = slides + arrows + dots;
}

function slideGallery(dir) {
    const slides = document.querySelectorAll('.gallery-slide');
    const dots   = document.querySelectorAll('.gallery-dot');
    slides[currentSlide].classList.remove('active');
    dots[currentSlide]?.classList.remove('active');
    currentSlide = (currentSlide + dir + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide]?.classList.add('active');
}

function goSlide(index) {
    const slides = document.querySelectorAll('.gallery-slide');
    const dots   = document.querySelectorAll('.gallery-dot');
    slides[currentSlide].classList.remove('active');
    dots[currentSlide]?.classList.remove('active');
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    dots[currentSlide]?.classList.add('active');
}
