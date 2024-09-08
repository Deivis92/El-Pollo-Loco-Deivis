/**
 * Represents a bottle object on the ground that can be animated.
 *
 * @extends MovableObject
 */
class GroundBottles extends MovableObject {
  y = 360;
  height = 60;
  width = 50;
  currentImageIndex = 0;
  img;

  /**
   * The offset values for collision detection.
   * @type {Object}
   * @property {number} top - The top offset.
   * @property {number} bottom - The bottom offset.
   * @property {number} left - The left offset.
   * @property {number} right - The right offset.
   */
  offset = {
    top: 0,
    bottom: 0,
    left: 45,
    right: 45,
  };

  /**
   * Array of image paths for the bottle animation.
   * @type {string[]}
   */
  IMAGES_GROUND_BOTTLES = [
    "./img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "./img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  /**
   * Creates an instance of the GroundBottles.
   * Initializes the bottle's image and sets its position.
   */
  constructor() {
    super().loadImage("./img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.loadImages(this.IMAGES_GROUND_BOTTLES);
    this.playAnimation(this.IMAGES_GROUND_BOTTLES);
    this.x = 300 + Math.random() * 1700;
    this.animate();
  }

  /**
   * Starts the animation for the bottle, changing images at regular intervals.
   * Uses `setInterval` to update the animation every 500 milliseconds.
   */
  animate() {
    let GroundBottlesInterval = setInterval(() => {
      intervalIDs.push(GroundBottlesInterval);
      this.playAnimation(this.IMAGES_GROUND_BOTTLES);
    }, 500);
  }
}
