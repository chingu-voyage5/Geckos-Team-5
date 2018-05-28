import { Scene } from 'phaser';
import { WIDTH, HEIGHT } from '../util/constants';

export class Level_1 extends Scene {
  constructor() {
    super({
      key: 'Level_1'
    });
  }

  create() {
    console.log('Level 1 loaded');

    // ===== Global Definitions For This FILE ===== //
    let player;
    let Bricks;
    let cursors;
    // ===== CUSTOM KEYS ===== //
    const Z_KEY = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    const SPACE_KEY = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    cursors = this.input.keyboard.createCursorKeys();

    this.add.image(400, 300, 'sky');

    player = this.physics.add.sprite(400, HEIGHT - 30, 'player');
    player.setCollideWorldBounds(true);
    player.body.setGravityY(300);

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

    // ===== Move left ===== //
    if (cursors.left.isDown) {
      player.setVelocityX(-160);
      player.flipX = false;

      // ===== Check to see if we should swing sword ===== //
      if (Z_KEY.isDown) {
        player.anims.play('sword', true);

        // ===== Slide, add speed ===== //
      } else if (SPACE_KEY.isDown && !isSliding) {
        isSliding = true;
        player.anims.play('slide');
        player.setVelocityX(-250);
      } else {
        player.anims.play('run', true);
      }
    }

    // ===== Move right ===== //
    // Need to flip frames on x axis. Sprites dont have moving to the right frames
    else if (cursors.right.isDown) {
      player.setVelocityX(160);
      player.flipX = true;

      if (Z_KEY.isDown) {
        player.anims.play('sword', true);

        // ===== Slide, add speed ===== //
      } else if (SPACE_KEY.isDown && !isSliding) {
        isSliding = true;
        player.anims.play('slide');
        player.setVelocityX(250);
      } else {
        player.anims.play('run', true);
      }
    }

    // ===== Jump ===== //
    else if (cursors.up.isDown && player.body.onFloor()) {
      player.setVelocityY(-330);
    }

    // Do nothing, 0 frame sprite ===== //
    else {
      player.setVelocityX(0);

      player.anims.play('turn');
    }
  }
}
