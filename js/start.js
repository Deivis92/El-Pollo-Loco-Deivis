/**
 * Add event listeners to display help and controls containers on hover.
 */
document.addEventListener('DOMContentLoaded', function() {
    const controlsButton = document.getElementById('controls-button');
    const controlsContainer = document.getElementById('controls-container');

    // Check if both elements exist
    if (controlsButton && controlsContainer) {
        /**
         * Show the controls container when the mouse enters the controls button.
         */
        controlsButton.addEventListener('mouseenter', () => {
            controlsContainer.classList.add('active');
        });

        /**
         * Hide the controls container when the mouse leaves the controls button.
         */
        controlsButton.addEventListener('mouseleave', () => {
            controlsContainer.classList.remove('active');
        });
    }

    const helpButton = document.getElementById('help');
    const helpContainer = document.getElementById('help-container');

    // Check if both elements exist
    if (helpButton && helpContainer) {
        /**
         * Show the help container when the mouse enters the help button.
         */
        helpButton.addEventListener('mouseenter', () => {
            helpContainer.classList.add('active');
        });

        /**
         * Hide the help container when the mouse leaves the help button.
         */
        helpButton.addEventListener('mouseleave', () => {
            helpContainer.classList.remove('active');
        });
    }
});