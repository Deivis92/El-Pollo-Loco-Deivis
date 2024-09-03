/**
 * Represents a status bar that displays the player's health percentage.
 *
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {
  /**
   * Array of image paths representing different health percentage levels.
   * @type {string[]}
   */
  IMAGES = [
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png", // 100% image
  ];

  /**
   * The health percentage of the player.
   * @type {number}
   */
  percentage = 100;

  /**
   * Creates an instance of the StatusBar.
   * Initializes the status bar with the starting percentage and sets its position.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 12;
    this.y = 40;
    this.width = 200;
    this.height = 50;
    this.setPercentage(100);
  }

  /**
   * Updates the health percentage and sets the appropriate image for the status bar.
   *
   * @param {number} percentage - The health percentage to display (0 to 100).
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Determines the index of the image to use based on the health percentage.
   *
   * @returns {number} The index of the image corresponding to the current health percentage.
   */
  resolveImageIndex() {
    if (this.percentage >= 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
