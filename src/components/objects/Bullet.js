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

    //check for a collision between the ball and the bullet
    this.scene.physics.add.overlap(
      this,
      this.scene.ball,
      this.hitBall,
      null,
      this
    );

    //check for a collision between the bullet and enemy bullets
    this.scene.physics.add.collider(
      this,
      this.scene.enemyBullets,
      this.hitBullets,
      null,
      this
    );

    this.setAccelerationY(-300);
    //adding visual particles effect
    this.particles = this.scene.add.particles('bullet');

    // make bullet collision box bigger
    this.setSize(14, 10, true);

    // make bullet display art bigger
    this.scaleX = 2;
    this.scaleY = 2;
  }

  fire(x, y) {
    if (!this.player.fireButtonDown) {
      this.setPosition(x, y);
      this.setActive(true);
      this.setVisible(true);
      this.player.fireButtonDown = true;
    }
    //the emmiter of the visual particles effect
    let emitter = this.particles.createEmitter({
      speed: 100,
      lifespan: 200,
      scale: { start: 1, end: 0 },
      blendMode: 'ADD'
    });
 
    emitter.startFollow(this);

    this.scene.time.delayedCall(300, function() {
      emitter.visible = false;
      emitter.pause();
      emitter.killAll();
    });
  }

  update(time, delta) {
    this.y -= this.speed * 50;

    //kill when out of the screen
    if (this.y < 0) {
      this.setActive(false);
      this.setVisible(false);
      this.destroy();
    }
  }

  hitBall(bullet, ball) {
    this.destroy();
    //triggers a change of velocity in the ball from the ball file
    ball.hitObject(ball, bullet);
  }

  hitBullets(bullet, enemyBullet) {
    bullet.destroy();
    enemyBullet.destroy();
  }
}
