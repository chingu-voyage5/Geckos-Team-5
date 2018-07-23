export default class Pointdrop extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(config, 0, 0, 'pointdrop');
    const {
      scene: { scene }
    } = config;
    this.scene = scene;
    this.scene.physics.world.enable(this);

    //check for collision between point drop and player
    this.scene.physics.add.overlap(
      this,
      this.scene.player,
      this.hitPoint,
      null,
      this
    );

    this.scaleX = 1.3;
    this.scaleY = 1.3;
    //saves the timeout for when the fade animation gets triggered
    this.tweenTimeout;
  }

  //"fires" the bullet, what actually happens, it drops under the gravity of the game
  fire(x, y) {
    this.setPosition(x, y);
    this.setActive(true);
    this.setVisible(true);
    this.body.setCollideWorldBounds(true);

    //after 2 sec, fading out in 0.5sec
    this.tweenTimeout = setTimeout(() => {
      this.scene.tweens.add({
        targets: this,
        alpha: 0,
        duration: 500
      });
    }, 2000);

    //destroys the point drop after 2,5 sec
    setTimeout(() => {
      this.destroy();
    }, 2500);
    
  }

  hitPoint(point, player) {
    this.destroy();
    clearTimeout(this.tweenTimeout);
    //adds to the score through the ball file
    player.scene.ball.addScore(false);
  }
}
