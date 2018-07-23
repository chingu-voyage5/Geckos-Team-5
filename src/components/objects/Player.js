import Bullet from './Bullet';
import { checkGamepad } from '../../util/constants';
import { soundPlay } from './Sound';

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);
    this.body.setCollideWorldBounds(true);
    this.scene = config.scene;

    // ===== Player Setup ===== //
    this.isSliding = false;
    this.isAttacking = false;
    this.isAttackingUp = false;
    this.body.setGravityY(300);
    this.slideTimer = 100;
    this.slideDistance = 250;
    this.jumpDistance = -330;
    this.fireButtonDown = false;
    this.attackButtonDown = false;
    this.isInvincible = false;

    this.emitter = this.scene.add.particles('bullet').createEmitter({
      x: this.x,
      y: this.y,
      speed: { min: -800, max: 800 },
      angle: { min: 180, max: 360 },
      scale: { start: 0.5, end: 0 },
      blendMode: 'SCREEN',
      lifespan: 300,
      active: false,
      gravityY: 800
    });
  }

  create() {
    // When this is called, you need to bind it to whichever scene you're calling from.
    // The bullets need to be created per level
    // So something like `this.player.create.call(this)` if you were inside Level_1
    // `this` points to Level_1, therefore creating `Level_1.bullets = ......`
    this.bullets = this.add.group({
      classType: Bullet,
      runChildUpdate: true
    });
  }

  update(keys, time, delta) {
    if( this.scene.isGameOver ) return this.anims.play('turn');
    let pad = checkGamepad.call(this.scene);
    let input = {
      left:
        keys.left.isDown || pad.buttons[14].pressed || pad.axes[0].value < 0,
      right:
        keys.right.isDown || pad.buttons[15].pressed || pad.axes[0].value > 0.1,
      down:
        keys.down.isDown || pad.buttons[13].pressed || pad.axes[1].value > 0,
      slide:
        Phaser.Input.Keyboard.JustDown(keys.slide) || pad.buttons[0].pressed,
      attack:
        Phaser.Input.Keyboard.JustDown(keys.attack) ||
        pad.buttons[2].pressed ||
        pad.buttons[6].pressed,
      fire: keys.fire.isDown || pad.buttons[1].pressed,
      bomb: keys.bomb.isDown || pad.buttons[3].pressed,
      esc: keys.esc.isDown || pad.buttons[9].pressed,
      attackIsUp: keys.attack.isUp,
      fireIsUp: keys.fire.isUp
    };

    // ===== Attack Up if no arrow keys are pressed while attacking ===== //
    if (input.attack && !this.attackButtonDown) {
      this.emitter.active = true;
      this.emitter.explode(5, this.x, this.y - 15);
      this.anims.play('sword', true);
      soundPlay('sound_sword', this.scene);
      this.isAttackingUp = true;
      this.on('animationcomplete', () => (this.isAttackingUp = false), this);
      this.attackButtonDown = true;
    }

    if (input.attackIsUp) {
      this.attackButtonDown = false;
    }

    if (input.fireIsUp) {
      this.fireButtonDown = false;
    }

    // ===== Move left ===== //
    if (input.left && !this.attackButtonDown) {
      this.playAnimationDirection.call(this, input, false, -160);
    }

    // ===== Move right ===== //
    // ===== Need to flip frames on x axis. Sprites dont have moving to the right frames ===== //
    // ===== All same logic as above, but backwards ===== //
    else if (input.right && !this.attackButtonDown) {
      this.playAnimationDirection.call(this, input, true, 160);
    }
    // ===== Jump ===== //
    else if (input.jump && this.body.onFloor()) {
      this.body.setVelocityY(this.jumpDistance);
    } else if (input.bomb) {
      console.log('bomb fired');
    }
    // Do nothing, 0 frame sprite ===== //
    else {
      if (!this.isAttackingUp) {
        this.body.setVelocityX(0);
        this.anims.play('turn');
      }
    }
  }

  /**
   * Checks Logic to render the direction of player animation
   * @param {input}     object  Input keys object
   * @param {flipX}     boolean Flip player animations from left to right
   * @param {velocityX} number  Player speed on X axis. Negatives move player left
   */
  playAnimationDirection(input, flipX, velocityX) {
    this.body.setVelocityX(velocityX);
    this.flipX = flipX;

    // ===== Check to see if we should swing sword ===== //
    if (input.attack) {
      // ===== Check if player is currently attacking. ===== //
      // ===== Do sword attack, stop animation after 3/10ths of a second ===== //
      if (!this.isAttacking) {
        this.playerAnimate(this.body, {
          animation: 'sword',
          setVelocityX: velocityX
        });
        this.emitter.active = true;
        this.emitter.explode(1, this.x, this.y - 15);
        soundPlay('sound_sword', this.scene);
        this.scene.time.delayedCall(
          this.slideTimer,
          () => (this.isAttacking = true)
        );
      }
      // ===== Slide, add speed ===== //
    } else if (input.slide && this.body.onFloor()) {
      // ===== Check if player is currently sliding. ===== //
      // ===== Do slide, stop animation after 3/10ths of a second ===== //
      if (!this.isSliding) {
        this.playerAnimate(this.body, {
          animation: 'slide',
          setVelocityX: flipX ? this.slideDistance : -this.slideDistance
        });
        this.scene.time.delayedCall(
          this.slideTimer,
          () => (this.isSliding = true)
        );
      }

      // ===== Once the player releases the space bar, reset slide ===== //
    } else if (!input.slide || !input.attack) {
      this.cancelSlideAndAttack();
    } else {
      this.anims.play('run', true);
    }
  }

  /**
   *
   * Reusable Player animation function.
   * @param {player object} player  Player Object
   * @param {animation}     string  What animation to play
   * @param {setVelocity}   number  Player speed on X axis. Negatives move player left
   * @param {flipX}         boolean Flip player animations from left to right
   */
  playerAnimate(
    player,
    { animation = 'run', setVelocityX = 0, flipX = false } = {}
  ) {
    this.body.setVelocityX(setVelocityX);
    player.flipX = flipX;
    this.anims.play(animation, true);
  }

  /**
   * Cancel attack or sliding animation. Reset to running
   */
  cancelSlideAndAttack() {
    this.isSliding = false;
    this.isAttacking = false;
    this.on(
      'animationcomplete',
      () => {
        this.anims.play('run', true);
      },
      this
    );
  }

  setTemporaryInvincibility() {
    // === Can probably make flashing sprite here, but it's expensve === //
    // === Have to do some nesting with setInterval/Timeout

    let originalTint = 16777215;
    this.setTint(0xff9955);
    this.scene.cameras.main.shake(100);
    this.isInvincible = true;

    setTimeout(() => {
      this.setTint(originalTint);
    }, 300);

    setTimeout(() => {
      this.isInvincible = false;
    }, 900);
  }

  triggerBulletCooldown() {
    this.bulletsOnCooldown = true;
    setTimeout(() => (this.bulletsOnCooldown = false), 200);
  }
}
