const gameSettings = {
  playerSpeed: 500
}

const config = {
  width: innerWidth,
  height: innerHeight,
  // scale: { 
  //   mode: Phaser.Scale.ScaleModes.RESIZE,
  //   width: innerWidth,
  //   height: innerHeight,
  //  },
  backgroundColor: 0x000000,
  scene: [Scene1, Scene2, GameOver, Pause],
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  }
}

window.addEventListener('resize', () => {
  window.location.reload();
})



const game = new Phaser.Game(config);