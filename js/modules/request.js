let requestBsModal = null;
let requestDataLoaded = false;

function openRequestModal() {
    if (!requestBsModal) {
        requestBsModal = new bootstrap.Modal(document.getElementById('requestModal'));
    }
    
    // Fetch JSONs if not loaded
    if (!requestDataLoaded) {
        // Fetch Pokemon
        fetch('js/data/pokemon.json')
            .then(res => res.json())
            .then(data => {
                const select = document.getElementById('reqPokemon');
                select.innerHTML = '<option value="">-- Selecciona un Pokémon --</option>';
                const uniquePokemon = [...new Set(data)].sort();
                uniquePokemon.forEach(poke => {
                    const option = document.createElement('option');
                    option.value = poke;
                    option.textContent = poke;
                    select.appendChild(option);
                });
            })
            .catch(err => {
                console.error("Error loading pokemon JSON:", err);
                document.getElementById('reqPokemon').innerHTML = '<option value="">Error al cargar</option>';
            });

        // Fetch Armeria
        fetch('js/data/armeria.json')
            .then(res => res.json())
            .then(data => {
                const select = document.getElementById('reqArmeria');
                select.innerHTML = '<option value="">-- Selecciona un Arma/Espada --</option>';
                const uniqueArmeria = [...new Set(data)].sort();
                uniqueArmeria.forEach(item => {
                    const option = document.createElement('option');
                    option.value = item;
                    option.textContent = item;
                    select.appendChild(option);
                });
            })
            .catch(err => {
                console.error("Error loading armeria JSON:", err);
                document.getElementById('reqArmeria').innerHTML = '<option value="">Error al cargar</option>';
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
    const pokemon = document.getElementById('reqPokemon').value;
    const armeria = document.getElementById('reqArmeria').value;
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
