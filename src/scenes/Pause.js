class Pause extends Phaser.Scene {
  constructor() {
    super('Pause');
  }

  create() {
    console.log('CREATE pause >>>');
    
    this.clickText = this.add.bitmapText(this.renderer.width/2 - 240, this.renderer.height/2, 
    'pixelFont', 'PAUSE ...', 180); 

    this.clickText = this.add.bitmapText(this.renderer.width/2 - 240, this.renderer.height/2 + 280, 
    'pixelFont', 'Click the mouse to continue', 55); 
    
    this.input.once('pointerdown', function() {
      console.log('From Pause to playScene');
      this.scene.start('playGame');
    }, this);
  }
}