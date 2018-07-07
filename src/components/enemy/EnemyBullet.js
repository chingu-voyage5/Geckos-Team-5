import { HEIGHT } from '../../util/constants';
import { soundPlay } from '../objects/Sound';

export default class EnemyBullet extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(config, 0, 0, 'enemy-bullet');
    config.scene.scene.physics.world.enable(this);

    this.speedX = 0;
    this.speedY = 0;
    this.targetX = 0;
    this.startingX = 0;
    this.startingY = 0;
    this.scene = config.scene.scene;
    this.player = this.scene.player;
    this.speed = Phaser.Math.GetSpeed(HEIGHT, 1.5);
    this.particles = this.scene.add.particles('bullet');
    this.setTint(0x50f200);

    this.scene.physics.add.collider(
      this,
      this.player,
      this.hitPlayer,
      null,
      this
    );
  }

  fire(startingX, startingY, targetX, targetY) {
    this.setAccelerationY(-300);
    this.setPosition(startingX, startingY);
    this.targetX = targetX;
    this.startingX = startingX;
    this.startingY = startingY;
    const distanceY = HEIGHT - startingY;
    const distanceX = this.targetX - this.startingX;
    let targetAngle = Phaser.Math.Angle.Between(
      this.startingX,
      this.startingY,
      this.targetX,
      HEIGHT
    );
    let emitter = this.particles.createEmitter({
      speed: 100,
      lifespan: 200,
      scale: { start: 1, end: 0 },
      tint: 0x50f200,
      blendMode: 'ADD'
    });
    this.scene.enemyBullets
      .getChildren()
      .forEach(bullet => emitter.startFollow(bullet));

    this.scene.time.delayedCall(1000, function() {
      emitter.visible = false;
      emitter.pause();
      emitter.killAll();
    });

    this.speedY = this.speed * Math.sin(targetAngle);
    this.speedX = this.speed * Math.cos(targetAngle);

    this.setActive(true);
    this.setVisible(true);
  }

  update(time, delta) {
    this.y += this.speedY * 10;
    this.x += this.speedX * 10;

    if (this.y > HEIGHT) {
      this.setActive(false);
      this.setVisible(false);
      this.destroy();
    }
  }

  hitPlayer() {
    if (
      !(
        this.player.anims.currentAnim.key == 'sword' ||
        this.player.anims.currentAnim.key === 'attackUp' ||
        this.player.isInvincible
      )
    ) {
      //makes the sound of player loosing a life
      soundPlay('sound_life', this.scene);
      this.scene.registry.set('lives', this.scene.registry.list.lives - 1);
      this.player.setTemporaryInvincibility();
    }
    this.destroy();
  }
}
