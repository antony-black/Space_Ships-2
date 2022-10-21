let gameSettings = {
  playerSpeed: 150
}

const config = {
  width: 250,
  height: 272,
  backgroundColor: 0xff0000,
  scene: [Scene1, Scene2],
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  }
}



const game = new Phaser.Game(config);