let canvas;
let world;
let keyboard = new Keybord();
let intervalIDs = [];

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  document.getElementById("canvas").classList.remove("d-none");
  document.getElementById("start-screen").classList.add("d-none");
  console.log("My Character is", world.character);
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
    // Only call preventDefault if the event is cancelable
    if (e.cancelable) {
      e.preventDefault();
    }
    handleButtonPress(key, isPressed);
  }

  function setupButtonEvents(button, key) {
    button.addEventListener("touchstart", (e) => handleTouchEvent(e, key, true));
    button.addEventListener("touchend", (e) => handleTouchEvent(e, key, false));
    button.addEventListener("mousedown", (e) => handleTouchEvent(e, key, true));
    button.addEventListener("mouseup", (e) => handleTouchEvent(e, key, false));
  }

  setupButtonEvents(leftButton, "LEFT");
  setupButtonEvents(rightButton, "RIGHT");
  setupButtonEvents(jumpButton, "SPACE");
  setupButtonEvents(throwButton, "D");
}

window.addEventListener("load", setupMobileControls);

function stopGame() {
  // Stop all running intervals
  intervalIDs.forEach((intervalID) => {
    clearInterval(intervalID);
  });

  // Empty the array after stopping the intervals
  intervalIDs = [];
}

function restartGame() {
  // Logic to reset the game and start over
  console.log("Game is restarting...");
  document.getElementById("game-over").classList.add("d-none");
  document.getElementById("canvas").classList.remove("d-none");
  document.getElementById("canvas").classList.remove("fade-out");

  // Example logic:
  // 1. Stop any running intervals or animations
  stopGame();
  // 2. Reset game state or reload the page

  init(); // Re-initialize the game
}

function fullscreen() {
  let fullscreen = document.getElementById("fullscreen");
  enterFullscreen(fullscreen);
}

function closeFullscreen() {
  let fullscreen = document.getElementById("fullscreen");
  exitFullscreen(fullscreen);
}

function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    // for IE11 (remove June 15, 2022)
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    // iOS Safari
    element.webkitRequestFullscreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const icons = document.querySelectorAll(".icon-mobile");
  icons.forEach((icon) => {
    icon.addEventListener("contextmenu", function (event) {
      event.preventDefault(); // Prevent the context menu from appearing
    });
  });
});
