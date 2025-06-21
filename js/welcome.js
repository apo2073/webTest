var overlay = document.getElementById('mosaic-overlay');
if (overlay) {
    overlay.addEventListener('animationend', function () {
        overlay.remove();
    });
}
else {
    console.warn('mosaic-overlay element not found');
}
