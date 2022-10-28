
// The right gun for 'player'
class BeamDouble extends Phaser.GameObjects.Sprite {
  constructor(scene){
    let x = scene.player.x - 20;
    let y = scene.player.y - 16;

    super(scene, x, y, "beam");
    scene.add.existing(this);

    this.play('beam_anim');
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