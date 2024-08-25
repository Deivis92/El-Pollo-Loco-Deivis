class GroundBottles extends MovableObject {
  y = 360;
  height = 60;
  width = 50;
  currentImageIndex = 0;
  img;

  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  IMAGES_GROUND_BOTTLES = [
    "./img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "./img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  constructor() {
    super().loadImage("./img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.loadImages(this.IMAGES_GROUND_BOTTLES);
    this.playAnimation(this.IMAGES_GROUND_BOTTLES);
    this.x = 300 + Math.random() * 1700;
    this.animate();
    
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_GROUND_BOTTLES);
    }, 500);
  }

}
