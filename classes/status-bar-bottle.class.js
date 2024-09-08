/**
 * Represents a status bar for bottles in the game, displaying the number of bottles available.
 *
 * @extends MovableObject
 */
class StatusBarBottle extends MovableObject {
  bottles;

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
   */
  setBottles(bottles) {
    this.bottles = bottles;
    let path = this.IMAGES_BOTTLEBAR[this.resolveImageIndexBottles()];
    this.img = this.imageCache[path];
  }

  /**
   * Determines the index of the image to use based on the number of bottles.
   *
   */
  resolveImageIndexBottles() {
    if (this.bottles >= 10) {
      return 5;
    } else if (this.bottles >= 8) {
      return 4;
    } else if (this.bottles >= 6) {
      return 3;
    } else if (this.bottles >= 4) {
      return 2;
    } else if (this.bottles >= 2) {
      return 1;
    } else {
      return 0;
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
