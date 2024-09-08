let canvas;
let world;
let keyboard = new Keybord();
let intervalIDs = [];
let soundIcon;
let sounds = [];
let isMuted = false;

/**
 * Initializes the game, including setting up the canvas and world, and showing the start screen.
 */
function init() {
  document.getElementById("loader").style.display = "flex";
  initLevel();
  canvas = document.getElementById("canvas");
  showIconsCanvas();
  world = new World(canvas, keyboard);
  setTimeout(() => {
    document.getElementById("canvas").classList.remove("d-none");
    document.getElementById("start-screen").classList.add("d-none");
    showMobileControls();
    document.getElementById("loader").style.display = "none";
  }, 4000);
}

/**
 * Toggles sound on and off.
 */
function toggleSound() {
  isMuted = !isMuted;
  sounds.forEach((sound) => {
    sound.muted = isMuted;
  });
  updateSoundIcon();
}

/**
 * Updates the sound icon based on the mute state.
 */
function updateSoundIcon() {
  let soundIcon = document.getElementById("sound-icon");
  if (isMuted) {
    soundIcon.src = "./icons/mute.svg";
  } else {
    soundIcon.src = "./icons/sound_on.svg";
  }
}

/**
 * Handles keydown events to update the keyboard state.
 * @param {KeyboardEvent} e - The keydown event.
 */
window.addEventListener("keydown", (e) => {
  if (e.keyCode === 39) keyboard.RIGHT = true;
  if (e.keyCode === 37) keyboard.LEFT = true;
  if (e.keyCode === 38) keyboard.UP = true;
  if (e.keyCode === 40) keyboard.DOWN = true;
  if (e.keyCode === 32) keyboard.SPACE = true;
  if (e.keyCode === 68) keyboard.D = true;
});

/**
 * Handles keyup events to update the keyboard state.
 * @param {KeyboardEvent} e - The keyup event.
 */
window.addEventListener("keyup", (e) => {
  if (e.keyCode === 39) keyboard.RIGHT = false;
  if (e.keyCode === 37) keyboard.LEFT = false;
  if (e.keyCode === 38) keyboard.UP = false;
  if (e.keyCode === 40) keyboard.DOWN = false;
  if (e.keyCode === 32) keyboard.SPACE = false;
  if (e.keyCode === 68) keyboard.D = false;
});

/**
 * Sets up mobile controls by adding event listeners to buttons.
 */
function setupMobileControls() {
  const leftButton = document.querySelector(
    '.icon-mobile[src="./icons/left_icon.png"]'
  );
  const rightButton = document.querySelector(
    '.icon-mobile[src="./icons/right_icon.png"]'
  );
  const jumpButton = document.querySelector(
    '.icon-mobile[src="./icons/jump_icon.png"]'
  );
  const throwButton = document.querySelector(
    '.icon-mobile[src="./icons/throw_icon.png"]'
  );

  /**
   * Updates the keyboard state based on button press.
   * @param {string} key - The key to update.
   * @param {boolean} isPressed - Whether the button is pressed.
   */
  function handleButtonPress(key, isPressed) {
    keyboard[key] = isPressed;
  }

  /**
   * Handles touch events and updates the keyboard state.
   * @param {TouchEvent|MouseEvent} e - The touch or mouse event.
   * @param {string} key - The key to update.
   * @param {boolean} isPressed - Whether the button is pressed.
   */
  function handleTouchEvent(e, key, isPressed) {
    // Only call preventDefault if the event is cancelable
    if (e.cancelable) {
      e.preventDefault();
    }
    handleButtonPress(key, isPressed);
  }

  /**
   * Sets up touch and mouse events for a button.
   * @param {HTMLElement} button - The button element.
   * @param {string} key - The key to update.
   */
  function setupButtonEvents(button, key) {
    // touchstart and touchend events should not be passive if preventDefault is used
    button.addEventListener(
      "touchstart",
      (e) => handleTouchEvent(e, key, true),
      { passive: false }
    );
    button.addEventListener(
      "touchend",
      (e) => handleTouchEvent(e, key, false),
      { passive: false }
    );

    // mousedown and mouseup events remain the same
    button.addEventListener("mousedown", (e) => handleTouchEvent(e, key, true));
    button.addEventListener("mouseup", (e) => handleTouchEvent(e, key, false));
  }

  setupButtonEvents(leftButton, "LEFT");
  setupButtonEvents(rightButton, "RIGHT");
  setupButtonEvents(jumpButton, "SPACE");
  setupButtonEvents(throwButton, "D");
}

/**
 * Sets up mobile controls once the window has loaded.
 */
window.addEventListener("load", setupMobileControls);

/**
 * Stops all running intervals and clears the interval IDs array.
 */
function stopGame() {
  // Stop all running intervals
  intervalIDs.forEach((intervalID) => {
    clearInterval(intervalID);
  });

  // Empty the array after stopping the intervals
  intervalIDs = [];
}

/**
 * Restarts the game by stopping all sounds, hiding and showing icons, and reinitializing the game.
 */
function restartGame() {
  stopAllSounds();
  showIconsCanvas();
  stopGame();

  document.getElementById("game-over").classList.add("d-none");

  document.getElementById("canvas").classList.remove("d-none");
  

  // Example logic:
  // 1. Stop any running intervals or animations

  // 2. Reset game state or reload the page

  init(); // Re-initialize the game
}

/**
 * Handles the play again scenario by stopping all sounds, hiding the win screen, and reinitializing the game.
 */
function playAgain() {
  stopAllSounds();
  document.getElementById("game-win").classList.add("d-none");
  document.getElementById("canvas").classList.remove("d-none");
  showIconsCanvas();
  stopGame();
  init();
}

/**
 * Stops all playing sounds and resets their position.
 */
function stopAllSounds() {
  sounds.forEach((sound) => {
    sound.pause(); // Stop playing the sound
    sound.currentTime = 0; // Reset sound position
  });
}

/**
 * Enters fullscreen mode for the canvas element.
 */
function fullscreen() {
  let canvas = document.getElementById("canvas");
  enterFullscreen(canvas);
}

/**
 * Exits fullscreen mode.
 */
function closeFullscreen() {
  if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement || document.mozFullScreenElement) {
    exitFullscreen();
  }
}

/**
 * Requests fullscreen mode for a given element.
 * @param {HTMLElement} element - The element to enter fullscreen mode.
 */
function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
}

/**
 * Exits fullscreen mode if currently in fullscreen.
 */
function exitFullscreen() {
  try {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  } catch (error) {
    console.error("Failed to exit fullscreen:", error);
  }
}

/**
 * Hides the sound and fullscreen icons.
 */
function hideIconsCanvas() {
  document.getElementById("sound-icon").classList.add("d-none");
  document.getElementById("fullscreen-icon").classList.add("d-none");
}

/**
 * Shows the sound and fullscreen icons.
 */
function showIconsCanvas() {
  document.getElementById("sound-icon").classList.remove("d-none");
  document.getElementById("fullscreen-icon").classList.remove("d-none");
}

/**
 * Hides mobile controls.
 */
function hideMobileControls() {
  document.getElementById("mobile-controls").classList.add("d-none");
  document.getElementById("mobile-controls2").classList.add("d-none");
}

/**
 * Shows mobile controls.
 */
function showMobileControls() {
  document.getElementById("mobile-controls").classList.remove("d-none");
  document.getElementById("mobile-controls2").classList.remove("d-none");
}

/**
 * Prevents the context menu from appearing on mobile control icons.
 */
document.addEventListener("DOMContentLoaded", function () {
  const icons = document.querySelectorAll(".icon-mobile");
  icons.forEach((icon) => {
    icon.addEventListener("contextmenu", function (event) {
      event.preventDefault(); // Prevent the context menu from appearing
    });
  });
});
