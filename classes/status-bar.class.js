class StatusBar extends DrawableObject {
  IMAGES = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png", //5
  ];

  percentage = 100;

  constructor() {
    this.loadImages(this.IMAGES);
}

setPercentage(percentage) {
    this.percentage = percentage; // => 0...5
    let imagePath = this.IMAGES[this.resolveImageIndex()];
    this.imageCache[path] = img;
    
  }

  resolveImageIndex() {
    if (this.percentage == 100) {
        this.currentImage = 5;
      } else if (this.percentage >= 80) {
        this.currentImage = 4;
      } else if (this.percentage >= 60) {
        this.currentImage = 3;
      } else if (this.percentage >= 40) {
        this.currentImage = 2;
      } else if (this.percentage >= 20) {
        this.currentImage = 1;
      } else {
        this.currentImage = 0;
      }
  }
}
