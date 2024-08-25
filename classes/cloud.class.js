class Cloud extends MovableObject {
  y = 20;
  height = 240;
  width = 500;
  speed;

  constructor() {
    super().loadImage("./img/5_background/layers/4_clouds/1.png");
    this.x = Math.random() * 1000;
    this.speed = 0.15; // Set the speed for the cloud to move left
    this.animate();

  }

  animate() {
    setInterval(() => {
      this.moveLeft(); 
    }, 1000 / 60); 
  }
}
