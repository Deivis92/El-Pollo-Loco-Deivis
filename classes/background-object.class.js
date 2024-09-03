/**
 * Represents a background object in the game.
 * 
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
    /**
     * The width of the background object.
     * @type {number}
     */
    width = 720;

    /**
     * The height of the background object.
     * @type {number}
     */
    height = 480;

    /**
     * Creates an instance of the BackgroundObject.
     * 
     * @param {string} imagePath - The path to the image to be used for the background object.
     * @param {number} x - The x-coordinate position of the background object.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.y = 480 - this.height;
        this.x = x;
    }
}