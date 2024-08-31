class StatusBarCoins extends MovableObject {
  coins = 0;
  

  IMAGES_COINBAR = [
    "./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];

  constructor() {
    super();
    this.loadImages(this.IMAGES_COINBAR);
    this.x = 12;
    this.y = 80;
    this.width = 200;
    this.height = 50;

    this.setCoins(0);
  }

  setCoins(coins) {
    this.coins = coins;
    let path = this.IMAGES_COINBAR[this.resolveImageIndexCoins()];
    this.img = this.imageCache[path];
  }

  resolveImageIndexCoins() {
    // Map coin values to the correct image index
    if (this.coins >= 10) {
      return 5; // 100% image
    } else if (this.coins >= 8) {
      return 4; // 80% image
    } else if (this.coins >= 6) {
      return 3; // 60% image
    } else if (this.coins >= 4) {
      return 2; // 40% image
    } else if (this.coins >= 2) {
      return 1; // 20% image
    } else {
      return 0; // 0% image
    }
  }
}

