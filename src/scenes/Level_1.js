import { Scene } from 'phaser';
import { WIDTH, HEIGHT } from '../util/constants';
import Player from '../components/objects/Player';

export class Level_1 extends Scene {
  constructor() {
    super({
      key: 'Level_1'
    });

    // ===== Global Definitions For This FILE ===== //
    this.Bricks;
    this.testing = true;
  }

  create() {
    this.image = this.add.sprite(400, 300, 'sky');

    // ===== CUSTOM KEYS ===== //

    this.keys = {
      jump: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
      slide: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
      attack: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      fire: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
      down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
    };

    // Create Player
    this.player = new Player({
      scene: this,
      key: 'player',
      x: 400,
      y: HEIGHT - 30
    });
  }

  update(time, delta) {
    // Run the update method of Player
    this.player.update(this.keys, time, delta);
    if (this.testing == true) {
      this.registry.set('SCORE', 100);
      this.registry.set('TIMER', [1, 0, ':', 0, 0, 0]);
      this.testing = false;
      this.add.text(0, 100, 'delete testing code in level_1 before merge:');
      this.add.text(0, 130, 'line 13 + 43-49');
    }
  }
}
