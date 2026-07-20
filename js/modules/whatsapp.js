const WA_NUMBER = '573332830125';

// Removed unused buildWaLink function

function changeQty(delta) {
    const input = document.getElementById('qtyInput');
    input.value = Math.max(1, (parseInt(input.value) || 1) + delta);
}
