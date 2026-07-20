let requestBsModal = null;
let requestDataLoaded = false;

function openRequestModal() {
    if (!requestBsModal) {
        requestBsModal = new bootstrap.Modal(document.getElementById('requestModal'));
    }

    // Populate datalists if not loaded
    if (!requestDataLoaded) {
        // Populate Pokemon
        const datalistPokemon = document.getElementById('listPokemon');
        datalistPokemon.innerHTML = '';
        const uniquePokemon = [...new Set(pokemonList)].sort();
        uniquePokemon.forEach(poke => {
            const option = document.createElement('option');
            option.value = poke;
            datalistPokemon.appendChild(option);
        });

        // Populate Armeria
        const datalistArmeria = document.getElementById('listArmeria');
        datalistArmeria.innerHTML = '';
        const uniqueArmeria = [...new Set(armeriaList)].sort();
        uniqueArmeria.forEach(item => {
            const option = document.createElement('option');
            option.value = item;
            datalistArmeria.appendChild(option);
        });

        requestDataLoaded = true;
    }

    // Reset fields
    document.getElementById('reqPokemon').value = '';
    document.getElementById('reqArmeria').value = '';
    document.getElementById('reqEmail').value = '';

    requestBsModal.show();
}

function submitRequest() {
    const pokemon = document.getElementById('reqPokemon').value.trim();
    const armeria = document.getElementById('reqArmeria').value.trim();
    const email = document.getElementById('reqEmail').value.trim();

    if (!pokemon && !armeria) {
        alert('Por favor selecciona al menos un Pokémon o un artículo de Armería.');
        return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        alert('Por favor ingresa un correo electrónico válido.');
        return;
    }

    const WA_NUMBER = '573332830125'; // Wichi Prints number
    let msg = `Hola Wichi Prints! 👋\n\nQuiero solicitar una impresión personalizada que no está en el catálogo.\n\n`;

    if (pokemon) {
        msg += `⭐ *WichiBall:* ${pokemon}\n`;
    }
    if (armeria) {
        msg += `⚔️ *Armería:* ${armeria}\n`;
    }

    msg += `📧 *Mi correo:* ${email}\n\n`;
    msg += `¿Me pueden dar más información sobre disponibilidad y precio? 😊`;

    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
    requestBsModal.hide();
}
