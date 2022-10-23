class Scene2 extends Phaser.Scene {
  constructor() {
    super('playGame');
  }

  create() {
    this.background = this.add.tileSprite(0, 0, config.width, config.height,'background');
    this.background.setOrigin(0, 0);

    // this.add.text(20, 20, 'Playing game ...', { font: '25px Arial', fill: 'yellow' });

    this.ship1 = this.add.sprite(config.width/2, config.height/2, 'ship');
    this.ship2 = this.add.sprite(config.width/2 - 50, config.height/2, 'ship2');
    this.ship3 = this.add.sprite(config.width/2 + 50, config.height/2, 'ship3');
    this.ship4 = this.add.sprite(config.width/2 + 80, config.height/2, 'ship4');
    this.ship5 = this.add.sprite(config.width/2 - 150, config.height/2, 'ship5');
    this.ship6 = this.add.sprite(config.width/2 + 150, config.height/2, 'ship6');
    this.ship7 = this.add.sprite(config.width/2 - 120, config.height/2, 'ship7');
    this.ship8 = this.add.sprite(config.width/2 - 250, config.height/2, 'ship8');
    this.ship9 = this.add.sprite(config.width/2 + 250, config.height/2, 'ship9');
    this.ship10 = this.add.sprite(config.width/2 + 400, config.height/2, 'ship10');

    // scale enemies
    this.ship1.setScale(2.5);
    this.ship2.setScale(2.5);
    this.ship3.setScale(2);
    this.ship4.setScale(1.5);
    this.ship5.setScale(1.5);
    this.ship6.setScale(1.5);

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

    this.ship1.setInteractive();
    this.ship2.setInteractive();
    this.ship3.setInteractive();
    this.ship4.setInteractive();
    this.ship5.setInteractive();
    this.ship6.setInteractive();
    this.ship6.setInteractive();
    this.ship6.setInteractive();
    this.ship6.setInteractive();
    this.ship6.setInteractive();
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

    this.player = this.physics.add.sprite(config.width/2 - 8, config.height/2 + 64, 'player');
    this.player.setScale(2.5);
    this.player.play('thrust');
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.player.setCollideWorldBounds(true);

    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.missiles = this.add.group();
    this.physics.add.collider(this.missiles, this.powerUps, function (missile, powerUp) {
      missile.destroy();
    });
    this.physics.add.overlap(this.player, this.powerUps, this.pickPowerUp, null, this);

    this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, null, this);
    this.physics.add.overlap(this.missiles, this.enemies, this.hitEnemies, null, this);

    let graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.beginPath();
    graphics.moveTo(0, 0);
    graphics.lineTo(config.width, 0);
    graphics.lineTo(config.width, 30  );
    graphics.lineTo(0, 30);
    graphics.lineTo(0, 30);
    graphics.closePath();
    graphics.fillPath();
    this.score = 0;
    this.scoreLabel = this.add.bitmapText(10, 5, 'pixelFont', 'SCORE', 32);

    // add sounds
    this.beamSound = this.sound.add('audio_beam');
    this.explosionSound = this.sound.add('audio_explosion');
    this.pickupSound = this.sound.add('audio_pickup');
    this.music = this.sound.add('music');
    
    const musicConfig = {
      mute: false,
      volume: 1,
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
    // this.movePlayermanagerAlternative();
    // 'JustDown' it's event
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)){
      // call a function to create a beam instance
      // this.shootBeam();
      if(this.player.active) {
        this.shootBeam();
      }

      for(let i = 0; i < this.missiles.getChildren().length; i++) {
        let beam = this.missiles.getChildren()[i];
        beam.update();
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
  // movePlayermanagerAlternative() {
  //   if(this.cursorKeys.A.isDown) {
  //     this.player.setVelocityX(-gameSettings.playerSpeed);
  //   } else if(this.cursorKeys.D.isDown) {
  //     this.player.setVelocityX(gameSettings.playerSpeed);
  //   } else if(this.cursorKeys.W.isDown) {
  //     this.player.setVelocityY(-gameSettings.playerSpeed);
  //   }else if(this.cursorKeys.S.isDown) {
  //     this.player.setVelocityY(gameSettings.playerSpeed);
  //   } else {
  //     this.player.setVelocity(0);
  //   }
  // }

  shootBeam(){
    // add the beam to the group
    console.log('Fire');
    const beam = new Beam(this);
    this.beamSound.play();  
  }

  pickPowerUp(player, powerUp) {
    powerUp.disableBody(true, true);
    this.pickupSound.play();
  }

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
    })
  }
  // restart player
  resetPlayer() {
    let x = config.width / 2 - 8;
    let y = config.height + 64;
    this.player.enableBody(true, x, y, true, true);
    // makes 'player' transparent
    this.player.alpha = 0.5;
    // move the ship from outside the screen to its original position
    const tween = this.tweens.add({
      targets: this.player,
      y: config.height - 64,
      ease: 'Power1',
      duration: 1500,
      repeat: 0,
      onComplete: function() {
        this.player.alpha = 1;
      },
      callbackScope: this
    })
  }

  hitEnemies(missile, enemy) {
    const explosion = new Explosion(this, enemy.x, enemy.y);

    missile.destroy();
    this.resetShipPos(enemy);

    this.score += 15;
    // this.scoreLabel.text = 'SCORE ' + this.score;
    const scoreFormated = this.zeroPad(this.score, 6);
    this.scoreLabel.text = 'SCORE ' + scoreFormated;
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

