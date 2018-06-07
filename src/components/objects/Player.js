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
    if (input.slide || input.attack) {
      if (input.left) {
        this.playerAnimate(this.body, {
          animation: 'run',
          setVelocityX: -160,
          flipX: false
        });
      } else if (input.right) {
        this.playerAnimate(this.body, {
          animation: 'run',
          setVelocityX: 160,
          flipX: true
        });
      }
    }

    // ===== Move left ===== //
    if (input.left) {
      this.body.setVelocityX(-160);
      this.flipX = false;
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
            setVelocityX: -160
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
            setVelocityX: -this.slideDistance
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

    // ===== Move right ===== //
    // ===== Need to flip frames on x axis. Sprites dont have moving to the right frames ===== //
    // ===== All same logic as above, but backwards ===== //
    else if (input.right) {
      this.body.setVelocityX(160);
      this.flipX = true;
      if (input.jump && this.body.onFloor()) {
        this.body.setVelocityY(this.jumpDistance);
      }

      if (input.attack) {
        if (!this.isAttacking) {
          this.playerAnimate(this.body, {
            animation: 'sword',
            setVelocityX: 160,
            flipX: true
          });
          this.scene.time.delayedCall(
            this.slideTimer,
            () => (this.isAttacking = true)
          );
        }
      } else if (input.slide) {
        if (!this.isSliding) {
          this.playerAnimate(this.body, {
            animation: 'slide',
            setVelocityX: this.slideDistance,
            flipX: true
          });
          this.scene.time.delayedCall(
            this.slideTimer,
            () => (this.isSliding = true)
          );
        }
      } else if (!input.slide || !input.attack) {
        this.cancelSlideAndAttack();
      } else {
        this.anims.play('run', true);
      }
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
    this.anims.play('run', true);
  }
}