class Coins extends MovableObject {
 y = 50;
  height = 120;
  width = 120;
  currentImageIndex = 0;
  img;

  offset = {
    top: 0,
    bottom: 150,
    left: 0,
    right: 0,
  };

  IMAGES_COINS = ["./img/8_coin/coin_1.png", "./img/8_coin/coin_2.png"];

  constructor() {
    super().loadImage("./img/8_coin/coin_1.png");
    this.loadImages(this.IMAGES_COINS);
    this.playAnimation(this.IMAGES_COINS);
    this.coinsPosition();
    
    
    this.animate();
  }

  coinsPosition() {
    this.x = 300 + Math.random() * 1500;
    this.y = 60 + Math.random() * 100;
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COINS);
    }, 500);
  }
}
