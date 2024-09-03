/**
 * Represents a status bar for bottles in the game, displaying the number of bottles available.
 * 
 * @extends MovableObject
 */
class StatusBarBottle extends MovableObject {
  /**
   * The number of bottles currently available.
   * @type {number}
   */
  bottles;

  /**
   * Array of image paths representing different bottle status levels.
   * @type {string[]}
   */
  IMAGES_BOTTLEBAR = [
      "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
      "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
      "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
      "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
      "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
      "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
  ];

  /**
   * Creates an instance of the StatusBarBottle.
   * Initializes the status bar with the starting number of bottles and sets its position.
   */
  constructor() {
      super();
      this.loadImages(this.IMAGES_BOTTLEBAR);
      this.x = 12;
      this.y = 0;
      this.width = 200;
      this.height = 50;
      this.setBottles(2);
  }

  /**
   * Updates the number of bottles and sets the appropriate image for the status bar.
   * 
   * @param {number} bottles - The number of bottles to display.
   */
  setBottles(bottles) {
      this.bottles = bottles;
      let path = this.IMAGES_BOTTLEBAR[this.resolveImageIndexBottles()];
      this.img = this.imageCache[path];
  }

  /**
   * Determines the index of the image to use based on the number of bottles.
   * 
   * @returns {number} The index of the image corresponding to the current number of bottles.
   */
  resolveImageIndexBottles() {
      if (this.bottles >= 10) {
          return 5; // 100% image
      } else if (this.bottles >= 8) {
          return 4; // 80% image
      } else if (this.bottles >= 6) {
          return 3; // 60% image
      } else if (this.bottles >= 4) {
          return 2; // 40% image
      } else if (this.bottles >= 2) {
          return 1; // 20% image
      } else {
          return 0; // 0% image
      }
  }

  /**
   * Decreases the number of bottles by one and creates a new throwable bottle if there are bottles left.
   */
  throwBottle() {
      if (this.bottles > 0) {
          this.bottles--;
          this.setBottles(this.bottles);
          let throwableBottle = new ThrowableObject(this.x, this.y);
          throwableBottle.throw();
      }
  }
}