import { HEIGHT } from '../../util/constants';

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
  }

  fire(x, y) {
    if (!this.player.bulletsOnCooldown) {
      this.setPosition(x, y);
      this.setActive(true);
      this.setVisible(true);
      this.player.triggerBulletCooldown();
    }
  }

  update(time, delta) {
    this.y -= this.speed * 30;

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
