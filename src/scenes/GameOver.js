class GameOver extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  create() {
    console.log('CREATE GameOver >>>');
    this.gameOver = this.add.tileSprite(0, 0, this.renderer.width, this.renderer.height, 'gameOver');
    this.gameOver.setOrigin(0, 0);
    
    this.clickText = this.add.bitmapText(this.renderer.width/2 - 240, this.renderer.height/2 + 280, 
    'pixelFont', 'Click the mouse to continue', 55); 
    
    this.input.once('pointerdown', function() {
      console.log('From GameOver to playScene');
      this.scene.start('playGame');
    }, this);
  }
}