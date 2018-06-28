import { Scene } from 'phaser';
import { WIDTH, HEIGHT, UIFONT } from '../util/constants';

export class Title extends Scene {
  constructor() {
    super({
      key: 'Title'
    });
  }

  create() {
    this.keys = {
      start: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
      credits: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C),
      help: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H)
    };

    // document.body.style.backgroundColor = '#000';
    this.titleText = this.add
      .text(WIDTH / 2, HEIGHT - 200, 'THE LAST CHINGU WARRIOR', UIFONT)
      .setOrigin(0.5)
      .setScale(2);
    this.playText = this.add
      .text(WIDTH / 2, HEIGHT - 160, 'SPACE: PLAY', UIFONT)
      .setOrigin(0.5);

    this.helpText = this.add
      .text(WIDTH / 2, HEIGHT - 120, 'H: HOW TO PLAY', UIFONT)
      .setOrigin(0.5);

    this.creditsText = this.add
      .text(WIDTH / 2, HEIGHT - 80, 'C: CREDITS', UIFONT)
      .setOrigin(0.5);
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.keys.start)) {
      this.scene.start('Level_1');
    } else if (Phaser.Input.Keyboard.JustDown(this.keys.help)) {
      this.scene.start('Help');
    } else if (Phaser.Input.Keyboard.JustDown(this.keys.credits)) {
      this.scene.start('Credits');
    }
  }
}
