// The right gun for 'player'
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene){
      let x = scene.player.x;
      let y = scene.player.y - 50;

      super(scene, x, y, 'rocket');
      scene.add.existing(this);

      // this.play('beam_anim');
      scene.physics.world.enableBody(this);
      this.body.velocity.y = -850;

      scene.missiles.add(this);
    }

    update(){
      if(this.y < 32 ){
        this.destroy();
      }
    }
}

