class Coins extends MovableObject {
    y = 60;
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


    IMAGES_COINS = [
        "./img/8_coin/coin_1.png",
        "./img/8_coin/coin_2.png"
    ];

    constructor() {
        super().loadImage("./img/8_coin/coin_1.png");
        this.loadImages(this.IMAGES_COINS);
        this.playAnimation(this.IMAGES_COINS);
        this.x = 300 + Math.random() * 1700;
        this.animate();
    }

    animate() {
        setInterval(() => {
          this.playAnimation(this.IMAGES_COINS);
        }, 500);
      }
}