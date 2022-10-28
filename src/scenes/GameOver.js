class GameOver extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  // preload() {
  //   this.load.image('gameOver', 'assets/game-over.png');
  // }

  create() {
    console.log('CREATE GameOver >>>');
    this.gameOver = this.add.tileSprite(0, 0, config.width, config.height, 'gameOver');
    this.gameOver.setOrigin(0, 0);
  }

  update() {
    this.restart();
  }

  restart() {
    setTimeout(() => {
      this.scene.start('playGame');
    }, 3000);
  }
}