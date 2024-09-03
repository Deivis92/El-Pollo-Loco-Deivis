/**
 * Represents a status bar for the endboss in the game, displaying the boss's health percentage.
 * 
 * @extends DrawableObject
 */
class StatusBarEndboss extends DrawableObject {

  /**
   * The health percentage of the endboss.
   * @type {number}
   */
  percentage = 100;

  /**
   * Visibility state of the status bar.
   * @type {boolean}
   */
  isVisible = false;

  /**
   * Array of image paths representing different health percentage levels for the endboss.
   * @type {string[]}
   */
  IMAGES_ENDBOSSBAR = [
      "./img/7_statusbars/2_statusbar_endboss/blue/blue0.png",
      "./img/7_statusbars/2_statusbar_endboss/blue/blue20.png",
      "./img/7_statusbars/2_statusbar_endboss/blue/blue40.png",
      "./img/7_statusbars/2_statusbar_endboss/blue/blue60.png",
      "./img/7_statusbars/2_statusbar_endboss/blue/blue80.png",
      "./img/7_statusbars/2_statusbar_endboss/blue/blue100.png"
  ];

  /**
   * Creates an instance of the StatusBarEndboss.
   * Initializes the status bar with the starting percentage and sets its position.
   */
  constructor() {
      super();
      this.loadImages(this.IMAGES_ENDBOSSBAR);
      this.x = 500;
      this.y = 8;
      this.width = 200;
      this.height = 50;
      this.makeVisible();
      this.setPercentage(100);
  }

  /**
   * Makes the status bar visible when the character reaches a certain position in the world.
   */
  makeVisible() {
      let statusBarBoss = setInterval(() => {
          intervalIDs.push(statusBarBoss);
          if (world && world.character.x >= 2000) {
              this.isVisible = true;
          }
      }, 100);
  }

  /**
   * Updates the percentage of the endboss's health and sets the appropriate image for the status bar.
   * 
   * @param {number} percentage - The health percentage of the endboss.
   */
  setPercentage(percentage) {
      this.percentage = percentage;
      let path = this.IMAGES_ENDBOSSBAR[this.resolveImageIndex()];
      this.img = this.imageCache[path];
  }

  /**
   * Determines the index of the image to use based on the endboss's health percentage.
   * 
   * @returns {number} The index of the image corresponding to the current health percentage.
   */
  resolveImageIndex() {
      if (this.percentage == 100) {
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

  /**
   * Draws the status bar on the canvas if it is visible.
   * 
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
      if (this.isVisible) {
          ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
      }
  }
}