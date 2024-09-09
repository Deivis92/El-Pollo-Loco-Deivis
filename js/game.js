let canvas;
let world;
let keyboard = new Keybord();
let intervalIDs = [];
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
  showMobileControls();
  setTimeout(() => {
    document.getElementById("canvas").classList.remove("d-none");
    document.getElementById("start-screen").classList.add("d-none");
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
  const soundIcon = document.getElementById("sound-icon");
  soundIcon.src = isMuted ? "./icons/mute.svg" : "./icons/sound_on.svg";
}

/**
 * Handles keydown events to update the keyboard state.
 * @param {KeyboardEvent} e - The keydown event.
 */
window.addEventListener("keydown", (e) => {
  switch (e.keyCode) {
    case 39:
      keyboard.RIGHT = true;
      break;
    case 37:
      keyboard.LEFT = true;
      break;
    case 38:
      keyboard.UP = true;
      break;
    case 40:
      keyboard.DOWN = true;
      break;
    case 32:
      keyboard.SPACE = true;
      break;
    case 68:
      keyboard.D = true;
      break;
  }
});

/**
 * Handles keyup events to update the keyboard state.
 * @param {KeyboardEvent} e - The keyup event.
 */
window.addEventListener("keyup", (e) => {
  switch (e.keyCode) {
    case 39:
      keyboard.RIGHT = false;
      break;
    case 37:
      keyboard.LEFT = false;
      break;
    case 38:
      keyboard.UP = false;
      break;
    case 40:
      keyboard.DOWN = false;
      break;
    case 32:
      keyboard.SPACE = false;
      break;
    case 68:
      keyboard.D = false;
      break;
  }
});

/**
 * Sets up mobile controls by adding event listeners to buttons.
 */
function setupMobileControls() {
  const leftButtons = document.querySelectorAll(
    '.icon-mobile[src="./icons/left_icon.png"]'
  );
  const rightButtons = document.querySelectorAll(
    '.icon-mobile[src="./icons/right_icon.png"]'
  );
  const jumpButtons = document.querySelectorAll(
    '.icon-mobile[src="./icons/jump_icon.png"]'
  );
  const throwButtons = document.querySelectorAll(
    '.icon-mobile[src="./icons/throw_icon.png"]'
  );

  /**
   * Updates the keyboard state based on button press.
   */
  function handleButtonPress(key, isPressed) {
    keyboard[key] = isPressed;
  }

  /**
   * Handles touch events and updates the keyboard state.
   */
  function handleTouchEvent(e, key, isPressed) {
    if (e.cancelable) {
      e.preventDefault();
    }
    handleButtonPress(key, isPressed);
  }

  /**
   * Sets up touch and mouse events for a list of buttons.
   */
  function setupButtonEvents(buttons, key) {
    buttons.forEach(button => {
      button.addEventListener("touchstart", e => handleTouchEvent(e, key, true), { passive: false });
      button.addEventListener("touchend", e => handleTouchEvent(e, key, false), { passive: false });
      button.addEventListener("mousedown", e => handleTouchEvent(e, key, true));
      button.addEventListener("mouseup", e => handleTouchEvent(e, key, false));
    });
  }
  
  setupButtonEvents(leftButtons, "LEFT");
  setupButtonEvents(rightButtons, "RIGHT");
  setupButtonEvents(jumpButtons, "SPACE");
  setupButtonEvents(throwButtons, "D");
}

/**
 * Sets up mobile controls once the window has loaded.
 */
window.addEventListener("load", setupMobileControls);

/**
 * Stops all running intervals and clears the interval IDs array.
 */
function stopGame() {
  intervalIDs.forEach((intervalID) => clearInterval(intervalID));
  intervalIDs = [];
}

/**
 * Restarts the game by stopping all sounds, hiding and showing icons, and reinitializing the game.
 */
function restartGame() {
  stopAllSounds();
  showIconsCanvas();
  stopGame();
  document.getElementById("sound-icon").src = "./icons/sound_on.svg";
  document.getElementById("game-over").classList.add("d-none");
  document.getElementById("canvas").classList.remove("d-none");
  init();
}

/**
 * Handles the play again scenario by stopping all sounds, hiding the win screen, and reinitializing the game.
 */
function playAgain() {
  stopAllSounds();
  document.getElementById("sound-icon").src = "./icons/sound_on.svg";
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
    sound.pause();
    sound.currentTime = 0;
  });
}

/**
 * Enters fullscreen mode for the canvas element.
 */
function fullscreen() {
  enterFullscreen(document.getElementById("canvas"));
}

/**
 * Exits fullscreen mode if currently in fullscreen.
 */
function closeFullscreen() {
  if (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement ||
    document.mozFullScreenElement
  ) {
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
  document.getElementById("mobile-controls-tablet").classList.add("d-none");
  document.getElementById("mobile-controls2-tablet").classList.add("d-none");
}

/**
 * Shows mobile controls.
 */
function showMobileControls() {
  document.getElementById("mobile-controls").classList.remove("d-none");
  document.getElementById("mobile-controls2").classList.remove("d-none");
  document.getElementById("mobile-controls-tablet").classList.remove("d-none");
  document.getElementById("mobile-controls2-tablet").classList.remove("d-none");
}

/**
 * Prevents the context menu from appearing on mobile control icons.
 */
document.addEventListener("DOMContentLoaded", () => {
  const icons = document.querySelectorAll(".icon-mobile");
  icons.forEach((icon) => {
    icon.addEventListener("contextmenu", (event) => {
      event.preventDefault();
    });
  });
});
