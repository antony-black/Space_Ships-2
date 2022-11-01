class Scene1 extends Phaser.Scene {
  constructor() {
    super('bootGame');
  }

  preload() {

    this.load.image('background', 'assets/background-3.png');
    // 'GameOver' background
    this.load.image('gameOver', 'assets/game-over.png');

    // this.load.image('player', 'assets/THE-SHIP.png');

    this.load.image('beam', 'assets/bullet5.png');
    this.load.image('beam2', 'assets/bullet4.png');
    this.load.image('rocket', 'assets/bullet10.png');
    // this.load.image('asteroid3', 'assets/asteroids/asteroid4.png');

    this.load.spritesheet('ship', 'assets/spritesheets/ship.png', {
      frameWidth: 16,
      frameHeight: 16
    });

    this.load.spritesheet('ship2', 'assets/spritesheets/ship2.png', {
      frameWidth: 32,
      frameHeight: 16
    });

    this.load.spritesheet('ship3', 'assets/spritesheets/ship3.png', {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet('ship4', 'assets/spritesheets/ship4.png', {
      frameWidth: 16,
      frameHeight: 16
    });

    this.load.spritesheet('ship5', 'assets/spritesheets/ship5.png', {
      frameWidth: 32,
      frameHeight: 16
    });

    this.load.spritesheet('ship6', 'assets/spritesheets/ship6.png', {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet('ship7', 'assets/spritesheets/ship7.png', {
      frameWidth: 16,
      frameHeight: 16
    });

    this.load.spritesheet('ship8', 'assets/spritesheets/ship8.png', {
      frameWidth: 32,
      frameHeight: 16
    });

    this.load.spritesheet('ship9', 'assets/spritesheets/ship9.png', {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet('ship10', 'assets/spritesheets/ship10.png', {
      frameWidth: 16,
      frameHeight: 16
    });

    this.load.spritesheet('explosion', 'assets/spritesheets/explosion.png', {
      frameWidth: 16,
      frameHeight: 16
    });

   this.load.spritesheet("power-up", "assets/spritesheets/power-up.png",{
      frameWidth: 16,
      frameHeight: 16
    });

    this.load.spritesheet('player', 'assets/spritesheets/newPlayer.png', {
      frameWidth: 64,
      frameHeight: 64
    });

    this.load.spritesheet('asteroid1', 'assets/spritesheets/asteroids.png', {
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.spritesheet('asteroid2', 'assets/spritesheets/asteroids2.png', {
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.spritesheet('mine', 'assets/spritesheets/mine.png', {
      frameWidth: 32,
      frameHeight: 32
    });

    // this.load.spritesheet('beam', 'assets/spritesheets/beam.png', {
    //   frameWidth: 16,
    //   frameHeight: 16
    // });



    this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");

    this.load.audio('audio_beam', ['assets/sounds/beam.ogg', 'assets/sounds/beam.mp3']);
    this.load.audio('audio_explosion', ['assets/sounds/explosion.ogg', 'assets/sounds/explosion.mp3']);
    this.load.audio('audio_pickup', ['assets/sounds/pickup.ogg', 'assets/sounds/pickup.mp3']);
    this.load.audio('music', ['assets/sounds/sci-fi_platformer12.ogg', 'assets/sounds/sci-fi_platformer12.mp3']);
  }

  create() {
    // this.loadingText = this.add.bitmapText(200, 200, 'pixelFont', 'Loading game...', 32);
    
    this.scene.start("playGame");
    this.anims.create({
      key: 'ship1_anim',
      frames: this.anims.generateFrameNumbers('ship'),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "ship2_anim",
      frames: this.anims.generateFrameNumbers("ship2"),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: 'ship3_anim',
      frames: this.anims.generateFrameNumbers('ship3'),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: 'ship4_anim',
      frames: this.anims.generateFrameNumbers('ship4'),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: 'ship5_anim',
      frames: this.anims.generateFrameNumbers('ship5'),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: 'ship6_anim',
      frames: this.anims.generateFrameNumbers('ship6'),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: 'ship7_anim',
      frames: this.anims.generateFrameNumbers('ship7'),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: 'ship8_anim',
      frames: this.anims.generateFrameNumbers('ship8'),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: 'ship9_anim',
      frames: this.anims.generateFrameNumbers('ship9'),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: 'ship10_anim',
      frames: this.anims.generateFrameNumbers('ship10'),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: 'explode',
      frames: this.anims.generateFrameNumbers('explosion'),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true
    });

    this.anims.create({
      key: 'red',
      frames: this.anims.generateFrameNumbers('power-up', {
        start: 0,
        end: 1
      }),
      frameRate: 20,
      repeat: -1
    });
  
    this.anims.create({
      key: 'gray',
      frames: this.anims.generateFrameNumbers('power-up', {
        start: 2,
        end: 3
      }),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: 'thrust',
      frames: this.anims.generateFrameNumbers('player'),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: 'asteroid_play',
      frames: this.anims.generateFrameNumbers('asteroid1'),
      frameRate: 0.8,
      repeat: 0
    });

    this.anims.create({
      key: 'asteroid2_play',
      frames: this.anims.generateFrameNumbers('asteroid2'),
      frameRate: 0.8,
      repeat: 0
    });
    
    this.anims.create({
      key: 'mine_play',
      frames: this.anims.generateFrameNumbers('mine'),
      frameRate: 3,
      repeat: -1
    });

    // this.anims.create({
    //   key:'beam_anim',
    //   frames: this.anims.generateFrameNumbers('beam'),
    //   frameRate: 20,
    //   repeat: -1
    // });
  }
}


