class StatusBarEndboss extends DrawableObject {

  percentage = 100;
  isVisible = false;

    IMAGES_ENDBOSSBAR = [
        "./img/7_statusbars/2_statusbar_endboss/blue/blue0.png",
        "./img/7_statusbars/2_statusbar_endboss/blue/blue20.png",
        "./img/7_statusbars/2_statusbar_endboss/blue/blue40.png",
        "./img/7_statusbars/2_statusbar_endboss/blue/blue60.png",
        "./img/7_statusbars/2_statusbar_endboss/blue/blue80.png",
        "./img/7_statusbars/2_statusbar_endboss/blue/blue100.png"
       
    ];


    constructor() {
        super();
        this.loadImages(this.IMAGES_ENDBOSSBAR);
        this.x = 500;
        this.y = 8;
        this.width = 200;
        this.height = 50;
        this.makeVisible();
        this.setPercentage(100);
        
    }

    makeVisible() {
       let statusBarBoss =  setInterval(() => {
        intervalIDs.push(statusBarBoss);
        if(world && world.character.x >= 2000) {
          this.isVisible = true;
        }
      }, 100);
        
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_ENDBOSSBAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
          return 5;
        } else if (this.percentage >= 80) {
          return 4;
        } else if (this.percentage >= 60) {
          return 3;
        } else if (this.percentage >= 40) {
          return 2;
        } else if (this.percentage >= 20) {
          return 1;
        } else {
          return 0;
        }
      }

  
    
      draw(ctx) {
        if (this.isVisible) {
          ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
      }
    }
