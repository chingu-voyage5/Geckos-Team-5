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
  }

  create() {
    this.image = this.add.sprite(400, 300, 'sky');

    // ===== CUSTOM KEYS ===== //
    this.Z_KEY = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    this.SPACE_KEY = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.cursors = this.input.keyboard.createCursorKeys();

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
      frames: [{ key: 'player', frame: 0 }],
      frameRate: 20
    });
  }

  update() {
    let isSliding = false;
    //   // ===== Move left ===== //
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.flipX = false;
      // ===== Check to see if we should swing sword ===== //
      if (this.Z_KEY.isDown) {
        this.player.anims.play('sword', true);
        // ===== Slide, add speed ===== //
      } else if (this.SPACE_KEY.isDown && !isSliding) {
        isSliding = true;
        this.player.anims.play('slide');
        this.player.setVelocityX(-250);
      } else {
        this.player.anims.play('run', true);
      }
    }
    // ===== Move right ===== //
    // Need to flip frames on x axis. Sprites dont have moving to the right frames
    else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.flipX = true;
      if (this.Z_KEY.isDown) {
        this.player.anims.play('sword', true);
        // ===== Slide, add speed ===== //
      } else if (this.SPACE_KEY.isDown && !isSliding) {
        isSliding = true;
        this.player.anims.play('slide');
        this.player.setVelocityX(250);
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
}
