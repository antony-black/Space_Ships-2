class Scene2 extends Phaser.Scene {
  constructor() {
    super('playGame');

    this.resetCounter = 0;
    this.resetCounter2 = 0;
  }

  create() {
    this.key_G = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
    this.key_P = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);


    this.background = this.add.tileSprite(0, 0, config.width, config.height,'background');
    this.background.setOrigin(0, 0);    

    const WIDTH = this.renderer.width;
    const HEIGHT = this.renderer.height;

    // const ships = [
    //   'ship', 'ship2', 'ship3', 'ship4', 'ship5', 
    //   'ship6', 'ship7', 'ship8', 'ship9', 'ship10'
    // ]

    this.ship1 = this.add.sprite(WIDTH/2, HEIGHT * 0, 'ship');
    this.ship2 = this.add.sprite(WIDTH/2 - 50, HEIGHT * 0, 'ship2');
    this.ship3 = this.add.sprite(WIDTH/2 + 50, HEIGHT * 0, 'ship3');
    this.ship4 = this.add.sprite(WIDTH/2 + 80, HEIGHT * 0, 'ship4');
    this.ship5 = this.add.sprite(WIDTH/2 - 150, HEIGHT * 0, 'ship5');
    this.ship6 = this.add.sprite(WIDTH/2 + 150, HEIGHT * 0, 'ship6');
    this.ship7 = this.add.sprite(WIDTH/2 - 120, HEIGHT * 0, 'ship7');
    this.ship8 = this.add.sprite(WIDTH/2 - 250, HEIGHT * 0, 'ship8');
    this.ship9 = this.add.sprite(WIDTH/2 + 250, HEIGHT * 0, 'ship9');
    this.ship10 = this.add.sprite(WIDTH/2 + 400, HEIGHT * 0, 'ship10');

    // Scale enemies
    this.ship1.setScale(2.5);
    this.ship2.setScale(2.5);
    this.ship3.setScale(2);
    this.ship4.setScale(1.5);
    this.ship5.setScale(1.5);
    this.ship6.setScale(1.5);

    // Add enemies to the group
    this.createEnemies();

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
    
    // Set setInteractive() method
    const shipList = [
      this.ship1, this.ship2, this.ship3, this.ship4, this.ship5, 
      this.ship6, this.ship7, this.ship8, this.ship9, this.ship10
    ]
    for (let i = 0; i < shipList.length; i++) {
      shipList[i].setInteractive();
    }

    // event on 'ships'/explosion
    this.input.on('gameobjectdown', this.destroyShip, this);

    this.physics.world.setBoundsCollision();

    // The first player settings
    this.player = this.physics.add.sprite(WIDTH/2 + 300, HEIGHT/2 + 300, 'player');
    this.player.play('thrust');
    // Keyboard settings 'player'
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.player.setBounce(0.5);
    this.player.setCollideWorldBounds(true);
 
    // The second player settings
    this.player2 = this.physics.add.sprite(WIDTH/2 - 300, HEIGHT/2 + 300, 'player');
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
    // Fire rocket 'player'
    this.key_B = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
    // Fire rocket 'player2'
    this.key_SHIFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

    this.createMines();
    this.createPowerUps();
    this.createAsteroids1();
    this.createAsteroids2();
   
    //Missiles group
    this.missiles = this.add.group();
    // Rockets group
    // Hold all the 'rocket' instances
    this.rockets = this.add.group();

    // The first player overlaps
    this.physics.add.overlap(this.player, this.powerUps, this.pickPowerUp, null, this);
    this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, null, this);
    this.physics.add.overlap(this.player, this.mines, this.hurtPlayerByMine, null, this);
    this.physics.add.overlap(this.player, this.asteroids1, this.hurtPlayerByAsteroid, null, this);
    // this.physics.add.overlap(this.player, this.asteroids2, this.hurtPlayerByAsteroid2, null, this);

    // The second player overlaps
    this.physics.add.overlap(this.player2, this.powerUps, this.pickPowerUp, null, this);
    this.physics.add.overlap(this.player2, this.enemies, this.hurtPlayer2, null, this);
    this.physics.add.overlap(this.player2, this.mines, this.hurtPlayerByMine2, null, this);
    this.physics.add.overlap(this.player2, this.asteroids1, this.hurtPlayerByAsteroid, null, this);
    // this.physics.add.overlap(this.player2, this.asteroids2, this.hurtPlayerByAsteroid2, null, this);

     // Destroy missiles by powerUps
     this.physics.add.collider(this.missiles, this.powerUps, function (missile, powerUp) {
      missile.destroy();
    });
    // Destroy rockets by powerUps
     this.physics.add.collider(this.rockets, this.powerUps, function (rocket, powerUp) {
      rocket.destroy();
    });
      // Destroy mines by powerUps
      this.physics.add.collider(this.mines, this.powerUps, function (mine, powerUp) {
        mine.destroy();
      });
    
    // Missiles destroy enemies
    this.physics.add.overlap(this.missiles, this.enemies, this.hitEnemies, null, this);
    // Missiles destroy mines
    this.physics.add.overlap(this.missiles, this.mines, this.hitMines, null, this);
    // Missile destroy 'asteroids1'
    this.physics.add.overlap(this.missiles, this.asteroids1, this.hitAsteroids, null, this);
    this.physics.add.overlap(this.missiles, this.asteroids2, this.hitAsteroids, null, this);

    // // Mines destroy enemies
    // this.physics.add.overlap(this.mines, this.enemies, this.minesHitEnemies, null, this);
    // // Mines destroy asteroids
    // this.physics.add.overlap(this.mines, this.asteroids1, this.minesHitAsteroids, null, this);
    // // Asteroids destroy enemies
    // this.physics.add.overlap(this.asteroids1, this.enemies, this.asteroidsHitEnemies, null, this);


    // Add 'SCORE'
    let graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.beginPath();
    graphics.moveTo(0, 0);
    graphics.lineTo(WIDTH, 0);
    graphics.lineTo(WIDTH, 30);
    graphics.lineTo(0, 30);
    graphics.closePath();
    graphics.fillPath();

    this.score = 0;
    this.livesPlayer = 4;
    this.livesPlayer2 = 4;
    this.scoreLabel = this.add.bitmapText(10, 5, 'pixelFont', 'SCORE: 0', 32);
    this.livesText = this.add.bitmapText(310, 5, 'pixelFont', 'LIVES:', 32);
    this.livesLabel = this.add.bitmapText(1010, 5, 'pixelFont', 'PLAYER-1: 4', 32);
    this.livesLabel2 = this.add.bitmapText(410, 5, 'pixelFont', 'PLAYER-2: 4', 32);

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

    // this.scale.on(Phaser.Scale.Events.RESIZE, () => {
    //   this.background.setSize(this.renderer.width, this.renderer.height);
    // });
  }

  update() {
    if (this.key_G.isDown) {
      this.scene.start('GameOver');
    }

    if (this.key_P.isDown) {
      this.scene.start('Pause');
    }

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
    
    // Keyboard 'player'
    this.movePlayerManager();
    // Keyboard 'player2'
    this.movePlayerManagerAlternative();
  // Fire function 'player'
    this.getFire1();
  // Fire function 'player'
    this.getFire2();
  // Fire with the rocket 'player'
    this.getFireRocket1();
  // Fire with the rocket 'player2'
    this.getFireRocket2();
  // Start 'GameOver' scene
    this.setGameOver();
  }

  createEnemies() {
    this.enemies = this.physics.add.group();
    const enemyList2 = [
      this.ship1, this.ship2, this.ship3, this.ship4, this.ship5, 
      this.ship6, this.ship7, this.ship8, this.ship9, this.ship10
    ]
    for (let i = 0; i < enemyList2.length; i++) {
      this.enemies.add(enemyList2[i]);
    }
  }

   createAsteroids1(){
    this.asteroids1 = this.physics.add.group();
    let asteroidNumber = 3;
    for (let i = 0; i <= asteroidNumber; i++) {
      let asteroid = this.physics.add.sprite(0, 0, 'asteroid1');
      this.asteroids1.add(asteroid);
      
      asteroid.setRandomPosition(0, 0, Math.random() * config.width, Math.random() * config.height);
      asteroid.setVelocity(Math.random() * 100, Math.random() * 100);
      asteroid.setCollideWorldBounds(true);
      asteroid.setBounce(0.5);
      asteroid.play('asteroid_play');

      const tw = this.tweens.add({
        targets: asteroid,
        angle: 5000,
        duration: 60000,
        ease: 'Sine.easeOut',
        yoyo: true,
        repeat: -1,
      });
    }
   }
   createAsteroids2(){
    this.asteroids2 = this.physics.add.group();
    let asteroidNumber = 3;
    for (let i = 0; i <= asteroidNumber; i++) {
      let asteroid = this.physics.add.sprite(0, 0, 'asteroid2');
      this.asteroids2.add(asteroid);
      
      asteroid.setRandomPosition(0, 0, Math.random() * config.width, Math.random() * config.height);
      asteroid.setVelocity(Math.random() * 100, Math.random() * 100);
      asteroid.setCollideWorldBounds(true);
      asteroid.setBounce(0.5);
      asteroid.play('asteroid2_play');

      const tw = this.tweens.add({
        targets: asteroid,
        angle: -5000,
        duration: 60000,
        ease: 'Sine.easeOut',
        yoyo: true,
        repeat: -1,
      });
    }
   }

   createMines(){
    this.mines = this.physics.add.group();
    let mineNumber = 4;
    for (let i = 0; i <= mineNumber; i++) {
      let mine = this.physics.add.sprite(0, 0, 'mine');
      this.mines.add(mine);
      
      mine.setRandomPosition(0, 0, Math.random() * config.width, Math.random() * config.height);
      mine.setVelocity(Math.random() * 100, Math.random() * 100);
      mine.setCollideWorldBounds(true);
      mine.setBounce(0.5);
      mine.play('mine_play');

      const tw = this.tweens.add({
        targets: mine,
        angle: 5000,
        duration: 60000,
        ease: 'Sine.easeOut',
        yoyo: true,
        repeat: -1,
      });
    }
   }

   createPowerUps() {
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
    powerUp.setBounce(0.5);
    } 
   }

  resetShipPos(ship) {
    ship.y = 0;
    let randomX = Phaser.Math.Between(0, config.width);
    ship.x = randomX;
  }

  resetMinePos(mine) {
    mine.y = 0;
    mine.setRandomPosition(0, 0, Math.random() * config.width, Math.random() * config.height);
    mine.setVelocity(Math.random() * 100, Math.random() * 100);
  }

  resetAsteroidPos(asteroid) {
    asteroid.y = 0;
    asteroid.setRandomPosition(0, 0, Math.random() * config.width, Math.random() * config.height);
    asteroid.setVelocity(Math.random() * 100, Math.random() * 100);
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
  movePlayerManager() {
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
 // Fire settings 'player'
  // 'JustDown' it's event
  getFire1(){
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
  }

  // 'player' fire function
  shootBeam(){
    // add the beam to the group
    console.log('Fire');
    const beam = new Beam(this);
    const beamDouble = new BeamDouble(this);
    this.beamSound.play();  
  }

  getFireRocket1(){
    if (Phaser.Input.Keyboard.JustDown(this.key_B)) {
      console.log('B >>>');
      if (this.player.active) {
        console.log('active >>>');
        this.shootRocket1();
      }
      for (let i = 0; i < this.rockets.getChildren().length; i++) {
        let rocket = this.rockets.getChildren()[i];
        // Run the update for each 'rocket'
        rocket.update();
      }
    }
   }

   shootRocket1(){
    // add the rocket to the group
    console.log('Fire-Rocket');

    const beamThree = new Rocket(this);
    this.beamSound.play();
  }

// Keyboard settings 'player2'
  movePlayerManagerAlternative() {
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
   // Fire settings 'player2'
   getFire2(){
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
   // 'player2' fire function
  shootBeam2(){
    // add the beam to the group
    console.log('Fire2');
    const beam2 = new Beam2(this);
    const beamDouble2 = new BeamDouble2(this);
    this.beamSound.play();  
  }
   getFireRocket2(){
    if (Phaser.Input.Keyboard.JustDown(this.key_SHIFT)) {
      if (this.player2.active) {
        this.shootRocket2();
      }
      for (let i = 0; i < this.rockets.getChildren().length; i++) {
        let rocket2 = this.rockets.getChildren()[i];
        rocket2.update();
      }
    }
   }

   shootRocket2(){
    // add the beam to the group
    console.log('Fire-Rocket-2');
    const rocket2 = new Rocket2(this);
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
    this.getLives();
  }
  // 'player' demage by 'mine'
  hurtPlayerByMine(player, mine) {
    this.explosionSound.play();

    this.resetMinePos(mine);
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
    this.getLives();
  }
  // 'player' demage by 'asteroid1'
  hurtPlayerByAsteroid(player, asteroid) {
    console.log('ASTEROID >>>');
    this.explosionSound.play();

    this.resetAsteroidPos(asteroid);
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
    this.getLives();
  }
  // Restart 'player'
  resetPlayer() {
    // 'player' disabled
    this.resetCounter ++;

    if (this.resetCounter !== 4) {
      console.log('OK');

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
        duration: 500,
        repeat: 0,
        onComplete: function() {
          this.player.alpha = 1;
        },
        callbackScope: this
      });

    } else {
     console.log('GameOver');
     return;
    }
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
       this.getLives2();
  }
  // 'player2' dabege by 'mine'w
  hurtPlayerByMine2(player, mine) {
    this.explosionSound.play();
    this.resetMinePos(mine);
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
       this.getLives2();
  }
   // 'player2' demage by 'asteroid1'
   hurtPlayerByAsteroid2(player, asteroid) {
    this.explosionSound.play();

    this.resetAsteroidPos(asteroid);
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

    // 'player' lives
    this.getLives2();
  }
 // Restart 'player2'
  resetPlayer2() {
     // 'player' disabled
     this.resetCounter2 ++;

     if (this.resetCounter2 !== 4) {
       console.log('OK');

       let x = config.width / 2 - 300;
       let y = config.height + 64;
   
       this.player2.enableBody(true, x, y, true, true);
   
       // makes 'player' transparent
       this.player2.alpha = 0.5;
   
       // move the ship from outside the screen to its original position
       const tween = this.tweens.add({
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

     } else {
      console.log('GameOver');
      return;
     }
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

  // minesHitEnemies(mine, enemy) {
  //   console.log('HITENEMIES MINES >>>');
  //   const explosion = new Explosion(this, enemy.x, enemy.y);
  //   mine.destroy();
  //   this.resetShipPos(enemy);
  //   this.explosionSound.play();
  // }
  
  // asteroidsHitEnemies(asteroid, enemy) {
  //   console.log('asteroidsHitEnemies >>>');
  //   const explosion = new Explosion(this, enemy.x, enemy.y);
  //   mine.destroy();
  //   this.resetShipPos(enemy);
  //   this.explosionSound.play();
  // }

  // minesHitAsteroids(mine, asteroid) {
  //   console.log('HITasteroid MINES >>>');
  //   const explosion = new Explosion(this, asteroid.x, asteroid.y);
  //   mine.destroy();
  //   this.resetAsteroidPos(asteroid);
  //   this.explosionSound.play();
  // }

  hitAsteroids(missile, asteroid) {
    console.log('HITasteroidS >>>');
    const explosion = new Explosion(this, asteroid.x, asteroid.y);
    missile.destroy();
    this.resetAsteroidPos(asteroid);
    this.score += 5;
    // this.scoreLabel.text = 'SCORE ' + this.score;
    const scoreFormated = this.zeroPad(this.score, 6);
    this.scoreLabel.text = 'SCORE: ' + scoreFormated;

    this.explosionSound.play();
  }

  hitMines(missile, mine) {
    const explosion = new Explosion(this, mine.x, mine.y);
    missile.destroy();
    this.resetMinePos(mine);
    this.score += 5;
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

  getLives(){
    this.livesPlayer -= 1;
    this.livesLabel.text = 'PLAYER-1: ' + this.livesPlayer;
  }  
  getLives2(){
    this.livesPlayer2 -= 1;
    this.livesLabel2.text = 'PLAYER-2: ' + this.livesPlayer2;
  }  
  // Run 'GameOver'
  setGameOver() {
    if (this.resetCounter && this.resetCounter2 === 4) {
      console.log('setGameOver >>> working');
      this.scene.start('GameOver');
      this.resetCounter = 0;
      this.resetCounter2 = 0;
    }
  }
  // Run 'Pause'
  setPause() {
    if (this.key_P.isDown) {
      console.log('setPause >>> working');
      this.scene.start('Pause');
    }
  }
}

