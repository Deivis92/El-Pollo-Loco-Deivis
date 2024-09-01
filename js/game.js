let canvas;
let world;
let keyboard = new Keybord();
let intervalIDs = [];




function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);

  console.log("My Charackter is", world.character);
}

window.addEventListener("keydown", (e) => {
  if (e.keyCode === 39) keyboard.RIGHT = true;
  if (e.keyCode === 37) keyboard.LEFT = true;
  if (e.keyCode === 38) keyboard.UP = true;
  if (e.keyCode === 40) keyboard.DOWN = true;
  if (e.keyCode === 32) keyboard.SPACE = true;
  if (e.keyCode === 68) keyboard.D = true;
});

window.addEventListener("keyup", (e) => {
  if (e.keyCode === 39) keyboard.RIGHT = false;
  if (e.keyCode === 37) keyboard.LEFT = false;
  if (e.keyCode === 38) keyboard.UP = false;
  if (e.keyCode === 40) keyboard.DOWN = false;
  if (e.keyCode === 32) keyboard.SPACE = false;
  if (e.keyCode === 68) keyboard.D = false;
});

// Handle touch and click events for mobile controls
function setupMobileControls() {
  const leftButton = document.querySelector('.icon-mobile[src="./icons/left_icon.png"]');
  const rightButton = document.querySelector('.icon-mobile[src="./icons/right_icon.png"]');
  const jumpButton = document.querySelector('.icon-mobile[src="./icons/jump_icon.png"]');
  const throwButton = document.querySelector('.icon-mobile[src="./icons/throw_icon.png"]');

  function handleButtonPress(key, isPressed) {
    keyboard[key] = isPressed;
  }

  function handleTouchEvent(e, key, isPressed) {
    e.preventDefault();
    handleButtonPress(key, isPressed);
  }

  function setupButtonEvents(button, key) {
    button.addEventListener('touchstart', (e) => handleTouchEvent(e, key, true));
    button.addEventListener('touchend', (e) => handleTouchEvent(e, key, false));
    button.addEventListener('click', (e) => handleTouchEvent(e, key, true));
    button.addEventListener('mouseup', (e) => handleTouchEvent(e, key, false));
  }

  setupButtonEvents(leftButton, 'LEFT');
  setupButtonEvents(rightButton, 'RIGHT');
  setupButtonEvents(jumpButton, 'SPACE');
  setupButtonEvents(throwButton, 'D');
}

// Call setupMobileControls when the page loads
window.addEventListener('load', setupMobileControls);






function stopGame() {
  // Alle gespeicherten Intervalle beenden
  intervalIDs.forEach(intervalID => {
    clearInterval(intervalID);
  });

  // Leere das Array nach dem Stoppen der Intervalle
  intervalIDs = [];
}
  