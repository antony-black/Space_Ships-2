const gameSettings = {
  playerSpeed: 500
}

const config = {
  width: innerWidth,
  height: innerHeight,
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

window.addEventListener('resize', () => {
  window.location.reload();
})



const game = new Phaser.Game(config);