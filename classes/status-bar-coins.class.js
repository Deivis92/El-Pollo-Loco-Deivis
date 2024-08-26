class StatusBarCoins extends DrawableObject {
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
    if (this.coins > 5) {
      this.coins = 5;
    }
  
    if (this.coins == 5) {
      return 5;
    } else if (this.coins >= 4) {
      return 4;
    } else if (this.coins >= 3) {
      return 3;
    } else if (this.coins >= 2) {
      return 2;
    } else if (this.coins >= 1) {
      return 1;
    } else {
      return 0;
    }
  }
}
