document.addEventListener('DOMContentLoaded', function() {
    const controlsButton = document.getElementById('controls-button');
    const controlsContainer = document.getElementById('controls-container');

    if (controlsButton && controlsContainer) {
        controlsButton.addEventListener('mouseenter', () => {
            controlsContainer.classList.add('active');
            console.log('mouseenter');
        });

        controlsButton.addEventListener('mouseleave', () => {
            controlsContainer.classList.remove('active');
            console.log('mouseleave');
        });
    }
});