class BeamDouble2 extends Phaser.GameObjects.Sprite {
  constructor(scene){
    let x = scene.player2.x - 20;
    let y = scene.player2.y - 16;

    super(scene, x, y, "beam2");
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