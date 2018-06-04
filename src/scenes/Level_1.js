import { Scene } from 'phaser';
import { WIDTH, HEIGHT } from '../util/constants';

export class Level_1 extends Scene {
  constructor() {
    super({
      key: 'Level_1'
    });

    // ===== Global Definitions For This FILE ===== //
    this.player;
    this.Bricks;
    this.cursors;
    this.isSliding   = false;
    this.isAttacking = false;
  }

  create() {
    this.image = this.add.sprite(400, 300, 'sky');

    // ===== CUSTOM KEYS ===== //
    this.Z_KEY = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    this.SPACE_KEY = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.cursors = this.input.keyboard.createCursorKeys();

    // ===== Player Setup ===== //
    this.player = this.physics.add.sprite(400, HEIGHT - 30, 'player');
    this.player.setCollideWorldBounds(true);
    this.player.body.setGravityY(300);

    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('player', { start: 1, end: 4 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'sword',
      frames: this.anims.generateFrameNumbers('player', { start: 14, end: 17 }),
      frameRate: 10
    });

    this.anims.create({
      key: 'slide',
      frames: this.anims.generateFrameNumbers('player', { start: 5, end: 6 }),
      frameRate: 10
    });

    this.anims.create({
      key: 'turn',
      frames: [ { key: 'player', frame: 0 } ],
      frameRate: 20
    });
  }


  
  update() {

    // ===== If space or z key is held, add new logic to move direction ===== //
    if( this.SPACE_KEY.isDown || this.Z_KEY.isDown ) {
      if( this.cursors.left.isDown ) {
          this.playerAnimate(this.player, { animation: 'run', setVelocityX: -160, flipX: false } );
      } else if( this.cursors.right.isDown ) {
          this.playerAnimate(this.player, { animation:'run', setVelocityX: 160, flipX: true } );
      }
    }

    // ===== Move left ===== //
    if (this.cursors.left.isDown) {

      this.player.setVelocityX(-160);
      this.player.flipX = false;
      this.playerCanJump();

      // ===== Check to see if we should swing sword ===== //
      if (this.Z_KEY.isDown) {

         // ===== Check if player is currently attacking. ===== //
        // ===== Do sword attack, stop animation after 3/10ths of a second ===== //
        if (!this.isAttacking) {
          this.playerAnimate(this.player, { animation: 'sword', setVelocityX: -160 } );
          this.time.delayedCall(200, () => this.isAttacking = true)
        }
        // ===== Slide, add speed ===== //
     } else if (this.SPACE_KEY.isDown) {


        // ===== Check if player is currently sliding. ===== //
        // ===== Do slide, stop animation after 3/10ths of a second ===== //
        if (!this.isSliding) {
          this.playerAnimate(this.player, { animation: 'slide', setVelocityX: -250 } );
          this.time.delayedCall(200, () => this.isSliding = true)
        }

        // ===== Once the player releases the space bar, reset slide ===== //
      } else if (this.SPACE_KEY.isUp || this.Z_KEY.isUp) {

        this.cancelSlideAndAttack();

      } else {
        this.player.anims.play('run', true);
      }
    }

    // ===== Move right ===== //
    // ===== Need to flip frames on x axis. Sprites dont have moving to the right frames ===== //
    // ===== All same logic as above, but backwards ===== //
    else if (this.cursors.right.isDown) {
      
      this.player.setVelocityX(160);
      this.player.flipX = true;
      this.playerCanJump();

      if (this.Z_KEY.isDown) {

        if (!this.isAttacking) {
          this.playerAnimate(this.player, { animation: 'sword', setVelocityX: 160, flipX: true } );
          this.time.delayedCall(200, () => this.isAttacking = true)
        }

     } else if (this.SPACE_KEY.isDown) {

        if (!this.isSliding) {
          this.playerAnimate(this.player, { animation: 'slide', setVelocityX: 250, flipX: true } );
          this.time.delayedCall(200, () => this.isSliding = true)
        }

      } else if (this.SPACE_KEY.isUp || this.Z_KEY.isUp) {
        this.cancelSlideAndAttack();
      } else {
        this.player.anims.play('run', true);
      }
    }
    // ===== Jump ===== //
    else if (this.cursors.up.isDown && this.player.body.onFloor()) {
      this.player.setVelocityY(-330);
    }
    // Do nothing, 0 frame sprite ===== //
    else {
      this.player.setVelocityX(0);
      this.player.anims.play('turn');
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
  playerAnimate(player, { animation = 'run', setVelocityX = 0 , flipX = false } = {} ) {
    player.setVelocityX(setVelocityX);
    player.flipX = flipX;
    player.anims.play(animation, true);
  }

  
  /**
   *Check to see if player is allowed to jump
   *
   */
  playerCanJump() {
    if( this.cursors.up.isDown && this.player.body.onFloor() ) {
      this.player.setVelocityY(-330);
    }
  }


  /**
   * Cancel attack or sliding animation. Reset to running
   */
  cancelSlideAndAttack() {
    this.isSliding   = false;
    this.isAttacking = false;
    this.player.anims.play('run', true);
  }
}
