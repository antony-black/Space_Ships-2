class Scene2 extends Phaser.Scene {
  constructor() {
    super('playGame');
  }

  create() {
    this.background = this.add.tileSprite(0, 0, config.width, config.height,'background');
    this.background.setOrigin(0, 0);

    // this.add.text(20, 20, 'Playing game ...', { font: '25px Arial', fill: 'yellow' });

    const WIDTH = this.renderer.width;
    const HEIGHT = this.renderer.height;

    // const ships = [
    //   'ship', 'ship2', 'ship3', 'ship4', 'ship5', 
    //   'ship6', 'ship7', 'ship8', 'ship9', 'ship10'
    // ]

// !Create a loop  
    this.ship1 = this.add.sprite(WIDTH/2, HEIGHT/2, 'ship');
    this.ship2 = this.add.sprite(WIDTH/2 - 50, HEIGHT/2, 'ship2');
    this.ship3 = this.add.sprite(WIDTH/2 + 50, HEIGHT/2, 'ship3');
    this.ship4 = this.add.sprite(WIDTH/2 + 80, HEIGHT/2, 'ship4');
    this.ship5 = this.add.sprite(WIDTH/2 - 150, HEIGHT/2, 'ship5');
    this.ship6 = this.add.sprite(WIDTH/2 + 150, HEIGHT/2, 'ship6');
    this.ship7 = this.add.sprite(WIDTH/2 - 120, HEIGHT/2, 'ship7');
    this.ship8 = this.add.sprite(WIDTH/2 - 250, HEIGHT/2, 'ship8');
    this.ship9 = this.add.sprite(WIDTH/2 + 250, HEIGHT/2, 'ship9');
    this.ship10 = this.add.sprite(WIDTH/2 + 400, HEIGHT/2, 'ship10');

    // !Create a loop
    // scale enemies
    this.ship1.setScale(2.5);
    this.ship2.setScale(2.5);
    this.ship3.setScale(2);
    this.ship4.setScale(1.5);
    this.ship5.setScale(1.5);
    this.ship6.setScale(1.5);

    // !Create a loop
    this.enemies = this.physics.add.group();
    this.enemies.add(this.ship1);
    this.enemies.add(this.ship2);
    this.enemies.add(this.ship3);
    this.enemies.add(this.ship4);
    this.enemies.add(this.ship5);
    this.enemies.add(this.ship6);
    this.enemies.add(this.ship7);
    this.enemies.add(this.ship8);
    this.enemies.add(this.ship9);
    this.enemies.add(this.ship10);

    // !Create a loop
    // run animations
    this.ship1.play('ship1_anim');
    this.ship2.play('ship2_anim');
    this.ship3.play('ship3_anim');
    this.ship4.play('ship4_anim');
    this.ship5.play('ship5_anim');
    this.ship6.play('ship6_anim');
    this.ship7.play('ship7_anim');
    this.ship8.play('ship8_anim');
    this.ship9.play('ship9_anim');
    this.ship10.play('ship10_anim');

    // !Create a loop
    this.ship1.setInteractive();
    this.ship2.setInteractive();
    this.ship3.setInteractive();
    this.ship4.setInteractive();
    this.ship5.setInteractive();
    this.ship6.setInteractive();
    this.ship7.setInteractive();
    this.ship8.setInteractive();
    this.ship9.setInteractive();
    this.ship10.setInteractive();
    // event on 'ships'/explosion
    this.input.on('gameobjectdown', this.destroyShip, this);

    this.physics.world.setBoundsCollision();
    this.powerUps = this.physics.add.group();
    // Add multiple objects
    let maxObjects = 4;
    for (let i = 0; i <= maxObjects; i++) {
      let powerUp = this.physics.add.sprite(16, 16, 'power-up');
      // add 'power-up' to 'group'
      this.powerUps.add(powerUp);
      // puts each one at random position
      powerUp.setRandomPosition(0, 0, game.config.width, game.config.height);
        // set random animation
     if (Math.random() > 0.5) {
      powerUp.play("red");
    } else {
      powerUp.play("gray");
    }
    powerUp.setVelocity(100, 100);
    powerUp.setCollideWorldBounds(true);
    powerUp.setBounce(1);
    } 
    // The first player settings
    this.player = this.physics.add.sprite(WIDTH/2 + 300, HEIGHT/2 + 300, 'player');
    this.player.setScale(2.5);
    this.player.play('thrust');

    // Keyboard settings 'player'
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.player.setBounce(0.5);
    this.player.setCollideWorldBounds(true);
 
    // The second player settings
    this.player2 = this.physics.add.sprite(WIDTH/2 - 300, HEIGHT/2 + 300, 'player')
    this.player2.setScale(2.5);
    this.player2.play('thrust');
    this.player2.setBounce(0.5);
    this.player2.setCollideWorldBounds(true);

  // Keyboard settings 'player2'
  this.controls = [
    this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
    this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
    this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
  ]; 
  // Collision between 'players'
  this.physics.add.collider(this.player, this.player2);

    // Fire button 'player'
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // Fire button 'player2'
    this.key_ALT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ALT);

    //Missiles group
    this.missiles = this.add.group();

    // The first player overlaps
    this.physics.add.overlap(this.player, this.powerUps, this.pickPowerUp, null, this);
    this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, null, this);

    // The second player overlaps
    this.physics.add.overlap(this.player2, this.powerUps, this.pickPowerUp, null, this);
    this.physics.add.overlap(this.player2, this.enemies, this.hurtPlayer2, null, this);

     // Destroy missiles by powerUps
     this.physics.add.collider(this.missiles, this.powerUps, function (missile, powerUp) {
      missile.destroy();
    });
    
    // Missiles destroy enemies
    this.physics.add.overlap(this.missiles, this.enemies, this.hitEnemies, null, this);

    // Add 'SCORE'
    let graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.beginPath();
    graphics.moveTo(0, 0);
    graphics.lineTo(WIDTH, 0);
    graphics.lineTo(WIDTH, 90  );
    graphics.lineTo(0, 90);
    graphics.closePath();
    graphics.fillPath();

    this.score = 0;
    this.livesPlayer = 4;
    this.livesPlayer2 = 4;
    // this.livesPlayer3 = 4;

    this.scoreLabel = this.add.bitmapText(10, 5, 'pixelFont', 'SCORE: 0', 32);
    this.livesLabel = this.add.bitmapText(10, 30, 'pixelFont', 'PLAYER-1: 4', 32);
    this.livesLabel2 = this.add.bitmapText(10, 55, 'pixelFont', 'PLAYER-2: 4', 32);
    // this.livesLabel3 = this.add.bitmapText(10, 85, 'pixelFont', 'PLAYER-3: 4', 32);

    // Add sounds
    this.beamSound = this.sound.add('audio_beam');
    this.explosionSound = this.sound.add('audio_explosion');
    this.pickupSound = this.sound.add('audio_pickup');
    this.music = this.sound.add('music');

    // Add background music
    const musicConfig = {
      mute: false,
      volume: 0,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0
    }
    this.music.play(musicConfig);
  }

  update() {
    this.moveShip(this.ship1, 1);
    this.moveShip(this.ship2, 2);
    this.moveShip(this.ship3, 3);
    this.moveShip(this.ship4, 1);
    this.moveShip(this.ship5, 2);
    this.moveShip(this.ship6, 3);
    this.moveShip(this.ship7, 3);
    this.moveShip(this.ship8, 1);
    this.moveShip(this.ship9, 2);
    this.moveShip(this.ship10, 3);


    this.background.tilePositionY -= 0.5;

    this.movePlayermanager();

    this.movePlayermanagerAlternative();

    // Fire settings 'player'
    // 'JustDown' it's event
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      // call a function to create a beam instance
      // this.shootBeam();
      if(this.player.active) {
        this.shootBeam();
      }
      for (let i = 0; i < this.missiles.getChildren().length; i++) {
        let beam = this.missiles.getChildren()[i];
        beam.update();
      }
  }

  // Fire settings 'player2'
  if (Phaser.Input.Keyboard.JustDown(this.key_ALT)) {
    if (this.player2.active) {
      this.shootBeam2();
    }
    for (let i = 0; i < this.missiles.getChildren().length; i++) {
      let beam2 = this.missiles.getChildren()[i];
      beam2.update();
    }
  }
  }

  resetShipPos(ship) {
    ship.y = 0;
    let randomX = Phaser.Math.Between(0, config.width);
    ship.x = randomX;
  }

  moveShip(ship, speed) {
    ship.y += speed;
    if (ship.y > config.height) {
      this.resetShipPos(ship);
    }
  }

  destroyShip(pointer, gameObject) {
    gameObject.setTexture('explosion');
    gameObject.play('explode');
  }

// Keyboard settings 'player'
  movePlayermanager() {
    if(this.cursorKeys.left.isDown) {
      this.player.setVelocityX(-gameSettings.playerSpeed);
    } else if(this.cursorKeys.right.isDown) {
      this.player.setVelocityX(gameSettings.playerSpeed);
    } else if(this.cursorKeys.up.isDown) {
      this.player.setVelocityY(-gameSettings.playerSpeed);
    }else if(this.cursorKeys.down.isDown) {
      this.player.setVelocityY(gameSettings.playerSpeed);
    } else {
      this.player.setVelocity(0);
    }
  }
// Keyboard settings 'player2'
  movePlayermanagerAlternative() {
    if(this.key_W.isDown) {
      this.player2.setVelocityY(-gameSettings.playerSpeed);
    }
    else if(this.key_S.isDown){
      this.player2.setVelocityY(gameSettings.playerSpeed);
    }
    else if(this.key_A.isDown){
      this.player2.setVelocityX(-gameSettings.playerSpeed);
    }
    else if(this.key_D.isDown){
      this.player2.setVelocityX(gameSettings.playerSpeed);
    }
    else {
      this.player2.setVelocity(0);
    }
  }
// 'player' fire function
  shootBeam(){
    // add the beam to the group
    console.log('Fire');
    const beam = new Beam(this);
    const beamDouble = new BeamDouble(this);
    this.beamSound.play();  
  }
// 'player2' fire function
  shootBeam2(){
    // add the beam to the group
    console.log('Fire2');
    const beam2 = new Beam2(this);
    const beamDouble2 = new BeamDouble2(this);
    this.beamSound.play();  
  }

  pickPowerUp(player, powerUp) {
    powerUp.disableBody(true, true);
    this.pickupSound.play();
  }
// 'player' demage
  hurtPlayer(player, enemy) {
    // player.x = config.width/2 - 8;
    // player.y = config.height - 64;
    this.explosionSound.play();

    this.resetShipPos(enemy);
    // don't hurt 'player' if it is invisible
    if(this.player.alpha < 1) {
      return
    } 
    // run an explosion animation
    const explosion = new Explosion(this, player.x, player.y);
    // disables 'player' & hide it
    player.disableBody(true, true);
    // this.resetPlayer();
    this.time.addEvent({
      delay: 1000,
      callback: this.resetPlayer,
      callbackScope: this,
      loop: false
    });

    // 'player' lives
    this.livesPlayer--;
    this.livesLabel.text = 'PLAYER-1: ' + this.livesPlayer;
  }
// 'player2' demage
  hurtPlayer2(player, enemy) {
    this.explosionSound.play();
    this.resetShipPos(enemy);
    // don't hurt 'player' if it is invisible
    if(this.player2.alpha < 1) {
      return
    } 
    // run an explosion animation
    const explosion = new Explosion(this, player.x, player.y);
    // disables 'player' & hide it
    player.disableBody(true, true);
    // this.resetPlayer();
    this.time.addEvent({
      delay: 1000,
      callback: this.resetPlayer2,
      callbackScope: this,
      loop: false
    });

    // 'player2' lives
    this.livesPlayer2 -= 1;
    this.livesLabel2.text = 'PLAYER-2: ' + this.livesPlayer2;
  }
  // Restart 'player'
  resetPlayer() {
    let x = config.width / 2 + 300;
    let y = config.height + 64;

    this.player.enableBody(true, x, y, true, true);

    // makes 'player' transparent
    this.player.alpha = 0.5;

    // move the ship from outside the screen to its original position
    const tween = this.tweens.add({
      targets:this.player,
      y: config.height - 64,
      ease: 'Power1',
      duration: 1500,
      repeat: 0,
      onComplete: function() {
        this.player.alpha = 1;
      },
      callbackScope: this
    });
  }
 // Restart 'player2'
  resetPlayer2() {
    let x = config.width / 2 - 300;
    let y = config.height + 64;

    this.player2.enableBody(true, x, y, true, true);

    // makes 'player' transparent
    this.player2.alpha = 0.5;

    // move the ship from outside the screen to its original position
    const tween2 = this.tweens.add({
      targets:this.player2,
      y: config.height - 64,
      ease: 'Power1',
      duration: 1500,
      repeat: 0,
      onComplete: function() {
        this.player2.alpha = 1;
      },
      callbackScope: this
    });
  }

  hitEnemies(missile, enemy) {
    const explosion = new Explosion(this, enemy.x, enemy.y);

    missile.destroy();
    this.resetShipPos(enemy);

    this.score += 15;
    // this.scoreLabel.text = 'SCORE ' + this.score;
    const scoreFormated = this.zeroPad(this.score, 6);
    this.scoreLabel.text = 'SCORE: ' + scoreFormated;
    this.explosionSound.play();
  }

  zeroPad(number, size) {
    let stringNumber = String(number);
    while(stringNumber.length < (size || 2)) {
      stringNumber = '0' + stringNumber;
    }
    return stringNumber;
  }
}

