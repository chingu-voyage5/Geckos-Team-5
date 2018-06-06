import phaser from 'phaser';

export default class Player extends phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);
    this.body.setCollideWorldBounds(true);

    // this.player;
    this.type = 'player';
    this.isSliding = false;
    this.isAttacking = false;
    // ===== Player Setup ===== //
    // this.setCollideWorldBounds(true);
    this.body.setGravityY(300);
    this.slideTimer = 0;
    this.jumping = false;
  }

  update(keys, time, delta) {
    let input = {
      left: keys.left.isDown,
      right: keys.right.isDown,
      down: keys.down.isDown,
      jump: keys.jump.isDown || keys.jump2.isDown,
      attack: keys.attack.isDown,
      fire: keys.fire.isDown
    };

    this.slideTimer -= delta;

    // ===== Move left ===== //
    if (input.left) {
      this.body.setVelocityX(-160);
      this.flipX = false;
      //   this.playerCanJump();
      if (input.jump && this.body.onFloor()) {
        this.body.setVelocityY(-330);
      }

      // ===== Check to see if we should swing sword ===== //
      if (input.attack) {
        // ===== Check if player is currently attacking. ===== //
        // ===== Do sword attack, stop animation after 3/10ths of a second ===== //
        if (!this.isAttacking) {
          //   this.playerAnimate(this.body, {
          //     animation: 'sword',
          //     setVelocityX: -160
          //   });
          if (this.slideTimer > 0) {
            this.isAttacking = true;
          }
          this.scene.time.delayedCall(200, () => (this.isAttacking = true));
        }
        // ===== Slide, add speed ===== //
      } else if (input.jump) {
        // ===== Check if player is currently sliding. ===== //
        // ===== Do slide, stop animation after 3/10ths of a second ===== //
        if (!this.isSliding) {
          //   this.playerAnimate(this.body, {
          //     animation: 'slide',
          //     setVelocityX: -250
          //   });
          this.scene.time.delayedCall(200, () => (this.isSliding = true));
        }

        // ===== Once the player releases the space bar, reset slide ===== //
      } else if (!input.attack || !input.jump) {
        this.cancelSlideAndAttack();
      } else {
        // this.anims.play('run', true);
      }
    }

    // ===== Move right ===== //
    // ===== Need to flip frames on x axis. Sprites dont have moving to the right frames ===== //
    // ===== All same logic as above, but backwards ===== //
    else if (input.right) {
      this.body.setVelocityX(160);
      this.flipX = true;
      //   this.playerCanJump();
      if (input.jump && this.body.onFloor()) {
        this.body.setVelocityY(-330);
      }

      if (input.attack) {
        if (!this.isAttacking) {
          //   this.playerAnimate(this.body, {
          //     animation: 'sword',
          //     setVelocityX: 160,
          //     flipX: true
          //   });
          this.scene.time.delayedCall(200, () => (this.isAttacking = true));
        }
      } else if (input.jump) {
        if (!this.isSliding) {
          //   this.playerAnimate(this.body, {
          //     animation: 'slide',
          //     setVelocityX: 250,
          //     flipX: true
          //   });
          this.scene.time.delayedCall(200, () => (this.isSliding = true));
        }
      } else if (!input.attack || !input.jump) {
        this.cancelSlideAndAttack();
      } else {
        // this.anims.play('run', true);
      }
    }
    // ===== Jump ===== //
    else if (input.jump && this.body.onFloor()) {
      this.body.setVelocityY(-330);
    }
    // Do nothing, 0 frame sprite ===== //
    else {
      this.body.setVelocityX(0);
      //   this.anims.play('turn');
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
  //   playerAnimate(
  //     player,
  //     { animation = 'run', setVelocityX = 0, flipX = false } = {}
  //   ) {
  //     this.body.setVelocityX(setVelocityX);
  //     player.flipX = flipX;
  //     this.anims.play(animation, true);
  //   }

  /**
   *Check to see if player is allowed to jump
   *
   */
  playerCanJump() {
    if (input.jump && this.body.onFloor()) {
      this.body.setVelocityY(-330);
    }
  }

  /**
   * Cancel attack or sliding animation. Reset to running
   */
  cancelSlideAndAttack() {
    this.isSliding = false;
    this.isAttacking = false;
    // this.anims.play('run', true);
  }
}
