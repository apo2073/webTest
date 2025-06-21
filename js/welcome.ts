const overlay = document.getElementById('mosaic-overlay') as HTMLDivElement | null;

if (overlay) {
    overlay.addEventListener('animationend', () => {
        overlay.remove();
    });
} else {
    console.warn('mosaic-overlay element not found');
}
