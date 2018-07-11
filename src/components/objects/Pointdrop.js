export default class Pointdrop extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(config, 0, 0, 'pointdrop');
    const {
      scene: { scene }
    } = config;
    this.scene = scene;
    this.scene.physics.world.enable(this);

    this.scene.physics.add.overlap(
      this,
      this.scene.player,
      this.hitPoint,
      null,
      this
    );

    this.scaleX = 1.3;
    this.scaleY = 1.3;
    this.tweenTimeout;
  }

  fire(x, y) {
    this.setPosition(x, y);
    this.setActive(true);
    this.setVisible(true);
    this.body.setCollideWorldBounds(true);

    this.tweenTimeout = setTimeout(() => {
      this.scene.tweens.add({
        targets: this,
        alpha: 0,
        duration: 500
      });
    }, 2000);

    setTimeout(() => {
      this.destroy();
    }, 2500);
    
  }

  hitPoint(point, player) {
    this.destroy();
    clearTimeout(this.tweenTimeout);
    player.scene.ball.addScore(false);
  }
}
