const gameSettings = {
  playerSpeed: 500
}

const config = {
  
  backgroundColor: 0xff0000,
  // !The changing we are made
  scale: { 
  mode: Phaser.Scale.ScaleModes.RESIZE,
  width: innerWidth,
  height: innerHeight,
 },
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