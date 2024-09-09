/**
 * Adds hover event listeners to show and hide containers.
 *
 *
 */
function addHoverEvent(button, container) {
  button.addEventListener("mouseenter", () => {
    container.classList.add("active");
  });

  button.addEventListener("mouseleave", () => {
    container.classList.remove("active");
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const controlsButton = document.getElementById("controls-button");
  const controlsContainer = document.getElementById("controls-container");
  const helpButton = document.getElementById("help");
  const helpContainer = document.getElementById("help-container");

  // Apply hover events to controls if elements exist
  if (controlsButton && controlsContainer) {
    addHoverEvent(controlsButton, controlsContainer);
  }

  // Apply hover events to help if elements exist
  if (helpButton && helpContainer) {
    addHoverEvent(helpButton, helpContainer);
  }
});
