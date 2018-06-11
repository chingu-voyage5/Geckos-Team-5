import Bullet from './Bullet';

export default class Player extends Phaser.GameObjects.Sprite {

  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);
    this.body.setCollideWorldBounds(true);

    // ===== Player Setup ===== //
    this.isSliding = false;
    this.isAttacking = false;
    this.body.setGravityY(300);
    this.slideTimer = 200;
    this.slideDistance = 250;
    this.jumpDistance = -330;
  }


  create() {

    // When this is called, you need to bind it to whichever scene you're calling from.
    // The bullets need to be created per level 
    // So something like `this.player.create.call(this)` if you were inside Level_1
    // `this` points to 
    this.bullets = this.add.group({
      classType: Bullet,
      runChildUpdate: true
    });
  }

  update(keys, time, delta) {
    let input = {
      left: keys.left.isDown,
      right: keys.right.isDown,
      down: keys.down.isDown,
      jump: keys.jump.isDown,
      slide: keys.slide.isDown,
      attack: keys.attack.isDown,
      fire: keys.fire.isDown
    };

    // ===== If space or z key is held, add new logic to move direction ===== //
    // if (input.slide || input.attack) {
    //   if (input.left) {
    //     this.playerAnimate(this.body, {
    //       animation: 'run',
    //       setVelocityX: -160,
    //       flipX: false
    //     });
    //   } else if (input.right) {
    //     this.playerAnimate(this.body, {
    //       animation: 'run',
    //       setVelocityX: 160,
    //       flipX: true
    //     });
    //   }
    // }

    // ===== Move left ===== //
    if (input.left) {
      this.playAnimationDirection.call(this, input, false, -160);
    }

    // ===== Move right ===== //
    // ===== Need to flip frames on x axis. Sprites dont have moving to the right frames ===== //
    // ===== All same logic as above, but backwards ===== //
    else if (input.right) {
      this.playAnimationDirection.call(this, input, true, 160);
    }
    // ===== Jump ===== //
    else if (input.jump && this.body.onFloor()) {
      this.body.setVelocityY(this.jumpDistance);
    }
    // Do nothing, 0 frame sprite ===== //
    else {
      this.body.setVelocityX(0);
      this.anims.play('turn');
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
    if (input.jump && this.body.onFloor()) {
      this.body.setVelocityY(this.jumpDistance);
    }

    // ===== Check to see if we should swing sword ===== //
    if (input.attack) {
      // ===== Check if player is currently attacking. ===== //
      // ===== Do sword attack, stop animation after 3/10ths of a second ===== //
      if (!this.isAttacking) {
        this.playerAnimate(this.body, {
          animation: 'sword',
          setVelocityX: velocityX
        });
        this.scene.time.delayedCall(
          this.slideTimer,
          () => (this.isAttacking = true)
        );
      }
      // ===== Slide, add speed ===== //
    } else if (input.slide) {
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
}
