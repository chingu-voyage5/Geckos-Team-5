export default class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(config, 0, 0, 'bullet');
    const {
      scene: { scene }
    } = config;
    this.scene = scene;
    this.speed = Phaser.Math.GetSpeed(200, 1);
    this.player = this.scene.player;
    this.scene.physics.world.enable(this);

    this.scene.physics.add.collider(
      this,
      this.scene.ball,
      this.hitBall,
      null,
      this
    );

    this.scene.physics.add.collider(
      this,
      this.scene.enemyBullets,
      this.hitBullets,
      null,
      this
    );

    this.setAccelerationY(-300);
    this.particles = this.scene.add.particles('bullet');
  }

  fire(x, y) {
    if (!this.player.fireButtonDown) {
      this.setPosition(x, y);
      this.setActive(true);
      this.setVisible(true);
      this.player.fireButtonDown = true;
    }
    let emitter = this.particles.createEmitter({
      speed: 100,
      lifespan: 200,
      scale: { start: 1, end: 0 },
      tint: 0xf44253,
      blendMode: 'ADD'
    });
    emitter.startFollow(this.scene.bullets.getChildren()[0]);
    this.scene.time.delayedCall(300, function() {
      emitter.visible = false;
      emitter.killAll();
    });
    console.log(this.particles);
    console.log(emitter);
  }

  update(time, delta) {
    this.y -= this.speed * 50;

    if (this.y < 0) {
      this.setActive(false);
      this.setVisible(false);
      this.destroy();
    }
  }

  hitBall(bullet, ball) {
    this.destroy();
    ball.setVelocityY(-220);
  }

  hitBullets(bullet, enemyBullet) {
    bullet.destroy();
    enemyBullet.destroy();
  }
}
