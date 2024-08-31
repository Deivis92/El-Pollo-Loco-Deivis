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


    const helpButton = document.getElementById('help');
    const helpContainer = document.getElementById('help-container');

    if (helpButton && helpContainer) {
        helpButton.addEventListener('mouseenter', () => {
            helpContainer.classList.add('active');
            console.log('help mouseenter');
        });

        helpButton.addEventListener('mouseleave', () => {
            helpContainer.classList.remove('active');
            console.log('help mouseleave');
        });
    }

});


