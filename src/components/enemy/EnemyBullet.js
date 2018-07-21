import { HEIGHT } from '../../util/constants';
import { soundPlay } from '../objects/Sound';

export default class EnemyBullet extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(config, 0, 0, 'enemy-bullet');
    config.scene.scene.physics.world.enable(this);
    //bullet speed
    this.speedX = 0;
    this.speedY = 0;
    //player position
    this.targetX = 0;
    //starting position
    this.startingX = 0;
    this.startingY = 0;
    this.scene = config.scene.scene;
    this.player = this.scene.player;
    this.speed = Phaser.Math.GetSpeed(HEIGHT, 1.5);
    //creates a visible effect of particles behind bullets
    this.particles = this.scene.add.particles('bullet');
    //color for the bullet
    this.setTint(0xf44253);

    //checks for collision between bullet and player
    this.scene.physics.add.collider(
      this,
      this.player,
      this.hitPlayer,
      null,
      this
    );
  }

  fire(startingX, startingY, targetX) {
    this.setAccelerationY(-300);
    this.setPosition(startingX, startingY);
    this.targetX = targetX;
    this.startingX = startingX;
    this.startingY = startingY;
    let targetAngle = Phaser.Math.Angle.Between(
      this.startingX,
      this.startingY,
      this.targetX,
      HEIGHT
    );
    //emits the particle visual effect
    let emitter = this.particles.createEmitter({
      speed: 100,
      lifespan: 200,
      scale: { start: 1, end: 0 },
      tint: 0xf44253,
      blendMode: 'ADD'
    });
    //the particles are following the bullet
    emitter.startFollow(this);

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
    //the bullet travels over the screen via updates
    this.y += this.speedY * 10;
    this.x += this.speedX * 10;

    //if outside screen destroy
    if (this.y > HEIGHT) {
      this.setActive(false);
      this.setVisible(false);
      this.destroy();
    }
  }

  //if the player doesn't defend, take a live
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
