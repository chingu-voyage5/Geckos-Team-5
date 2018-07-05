import { Scene } from 'phaser';
import { WIDTH, HEIGHT, UIFONT } from '../util/constants';
import { musicStart, musicStop, musicStopScene } from '../components/objects/Music';

export class Credits extends Scene {
  constructor() {
    super({
      key: 'Credits'
    });
  }
  create() {
    // const text = this.add.bitmapText(0, 0, UIFONT, this.text(), 8);
    const text = this.add
      .text(WIDTH / 2, HEIGHT - 160, this.text(), UIFONT)
      .setOrigin(0.5)
      .setScale(1);

    this.keys = {
      space: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
      esc: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC),
      music: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)
    };

    //if the scene starts while music is activated, run music
    if (this.registry.list.musicControll) {
      musicStart('theme', this);
    }
  }

  text() {
    return `\n
    DEVELOPED BY GECKO #5\n\n
    FANCYACTION\n\n
    ALEXEVER17 \n\n
    SPARTA\n\n
    JETRHO FREDERICKS\n\n
    [esc] to title
    `;
  }

  update() {
    if (
      Phaser.Input.Keyboard.JustDown(this.keys.esc) ||
      Phaser.Input.Keyboard.JustDown(this.keys.space)
    ) {
      this.scene.start('Title');
      musicStopScene(this);
    } else if (Phaser.Input.Keyboard.JustDown(this.keys.music)) {      //music start stop
      if (!this.registry.list.musicControll) {
        musicStart('theme', this);
      } else {
        musicStop(this);
      }
    }
  }
}
