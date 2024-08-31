class StatusBarBottle extends MovableObject {
  bottles;

  IMAGES_BOTTLEBAR = [
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
  ];

  constructor() {
    super();
    this.loadImages(this.IMAGES_BOTTLEBAR);
    this.x = 12;
    this.y = 0;
    this.width = 200;
    this.height = 50;
    this.setBottles(2);
  }

  setBottles(bottles) {
    this.bottles = bottles;
    let path = this.IMAGES_BOTTLEBAR[this.resolveImageIndexBottles()];
    this.img = this.imageCache[path];
  }

  resolveImageIndexBottles() {
   
   
   
    
    if (this.bottles >= 10) {
      return 5; // 100% image
    } else if (this.bottles >= 8) {
      return 4; // 80% image
    } else if (this.bottles >= 6) {
      return 3; // 60% image
    } else if (this.bottles >= 4) {
      return 2; // 40% image
    } else if (this.bottles >= 2) {
      return 1; // 20% image
    } else {
      return 0; // 0% image
    }
  }

  
  throwBottle() {
    if (this.bottles > 0) {
      this.bottles--;
      this.setBottles(this.bottles);
      let throwableBottle = new ThrowableObject(this.x, this.y);
      throwableBottle.throw();
      // Add throwableBottle to the game world or handle it as needed
    }
  }
}
