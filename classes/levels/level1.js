/**
 * @type {Level} - The level object for the game.
 */
let level1;

/**
 * Initializes the game level by creating instances of various game objects and assigning them to the level1 variable.
 * 
 * Creates and configures the following objects:
 * - **Chickens**: A list of `Chicken` and `SmallChicken` instances.
 * - **Endboss**: A single `Endboss` instance.
 * - **Ground Bottles**: A list of `GroundBottles` instances.
 * - **Clouds**: A list of `Cloud` instances.
 * - **Background Objects**: A list of `BackgroundObject` instances for different layers.
 * - **Coins**: A list of `Coins` instances.
 */
function initLevel() {
  level1 = new Level(
    [
      // new Chicken(),
      // new Chicken(),
      // new Chicken(),
      // new Chicken(),
      // new Chicken(),
      new SmallChicken(),
      new SmallChicken(),
      new SmallChicken(),
      new SmallChicken(),
      new SmallChicken()
    ],
  
    [new Endboss()],
  
    [
      new GroundBottles(),
      new GroundBottles(),
      new GroundBottles(),
      new GroundBottles(),
      new GroundBottles(),
      new GroundBottles(),
      new GroundBottles(),
      new GroundBottles(),
      new GroundBottles(),
      new GroundBottles(),
      new GroundBottles()
    ],
  
    [new Cloud(), new Cloud(), new Cloud(), new Cloud(), new Cloud()],
  
    [
      new BackgroundObject("./img/5_background/layers/air.png", -719),
      new BackgroundObject("./img/5_background/layers/3_third_layer/2.png", -719),
      new BackgroundObject(
        "./img/5_background/layers/2_second_layer/2.png",
        -719
      ),
      new BackgroundObject("./img/5_background/layers/1_first_layer/2.png", -719),
  
      new BackgroundObject("./img/5_background/layers/air.png", 0),
      new BackgroundObject("./img/5_background/layers/3_third_layer/1.png", 0),
      new BackgroundObject("./img/5_background/layers/2_second_layer/1.png", 0),
      new BackgroundObject("./img/5_background/layers/1_first_layer/1.png", 0),
  
      new BackgroundObject("./img/5_background/layers/air.png", 719),
      new BackgroundObject("./img/5_background/layers/3_third_layer/2.png", 719),
      new BackgroundObject("./img/5_background/layers/2_second_layer/2.png", 719),
      new BackgroundObject("./img/5_background/layers/1_first_layer/2.png", 719),
  
      new BackgroundObject("./img/5_background/layers/air.png", 719 * 2),
      new BackgroundObject(
        "./img/5_background/layers/3_third_layer/1.png",
        719 * 2
      ),
      new BackgroundObject(
        "./img/5_background/layers/2_second_layer/1.png",
        719 * 2
      ),
      new BackgroundObject(
        "./img/5_background/layers/1_first_layer/1.png",
        719 * 2
      ),
  
      new BackgroundObject("./img/5_background/layers/air.png", 719 * 3),
      new BackgroundObject(
        "./img/5_background/layers/3_third_layer/2.png",
        719 * 3
      ),
      new BackgroundObject(
        "./img/5_background/layers/2_second_layer/2.png",
        719 * 3
      ),
      new BackgroundObject(
        "./img/5_background/layers/1_first_layer/2.png",
        719 * 3
      ),
    ],
    [
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
      new Coins(),
    ]
  );
}