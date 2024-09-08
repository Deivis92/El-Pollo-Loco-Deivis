/**
 * Represents a cloud object in the game.
 *
 * @extends MovableObject
 */
class Cloud extends MovableObject {
  y = 20;
  height = 240;
  width = 500;
  speed;
  static betweenClouds = 60;

  /**
   * Creates an instance of the Cloud.
   */
  constructor() {
    super().loadImage("./img/5_background/layers/4_clouds/1.png");
    this.handleCloudsPosition();
    this.speed = 0.15; // Set the speed for the cloud to move left
    this.animate();
  }

  /**
   * Calculates and sets the position of the cloud.
   * Updates the static `betweenClouds` property for spacing of future clouds.
   */
  handleCloudsPosition() {
    this.x = Cloud.betweenClouds + 150;
    Cloud.betweenClouds += this.width + 50 + Math.random() * 70;
  }

  /**
   * Starts the animation for the cloud, making it move left continuously.
   * Uses `setInterval` to update the cloud's position.
   */
  animate() {
    let cloudInterval = setInterval(() => {
      intervalIDs.push(cloudInterval);
      this.moveLeft();
    }, 1000 / 60);
  }
}
