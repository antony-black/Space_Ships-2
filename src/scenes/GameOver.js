class GameOver extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  create() {
    console.log('CREATE GameOver >>>');
    this.gameOver = this.add.tileSprite(0, 0, config.width, config.height, 'gameOver');
    this.gameOver.setOrigin(0, 0);
    this.input.once('pointerdown', function() {
      console.log('From GameOver to playScene');
      this.scene.start('playGame');
    }, this);
  }

  // restart() {
  //   setTimeout(() => {
  //     this.scene.start('playGame');
  //   }, 3000);
  // }
}