import { Scene } from 'phaser';
import { WIDTH, HEIGHT, FONT, FONTSIZE } from '../util/constants';
import { musicStart, musicStop, musicStopScene, musicAdder } from '../components/objects/Music';

export class Credits extends Scene {
  constructor() {
    super({
      key: 'Credits'
    });
  }
  create() {
    //makes music accessible to the scene
    musicAdder(this);
    
    this.image = this.add.sprite(
      240,
      160,
      'title'
    );
  
    const text = this.add

      .bitmapText(WIDTH / 2, HEIGHT - 200, FONT, this.text(), FONTSIZE).setOrigin(0.5);


    this.keys = {
      space: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
      esc: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC),
      music: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M),
      sound: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P)
    };

    //if the scene starts while music is activated, run music
    if (this.registry.list.musicControl) {
      musicStart('theme', this);
    }
  }

  text() {
    return `\n
    DEVELOPED BY GECKO #5 AT CHINGU.IO\n\n
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
      musicStopScene('theme', this);
    } else if (Phaser.Input.Keyboard.JustDown(this.keys.music)) {      //music start stop
      if (!this.registry.list.musicControl) {
        musicStart('theme', this);
      } else {
        musicStop('theme',this);
      }
    } else if (Phaser.Input.Keyboard.JustDown(this.keys.sound)) { //sound start stop
      if (!this.registry.list.soundControl) {
        this.registry.set('soundControl', true);
      } else {
        this.registry.set('soundControl', false);
      }
    }
  }
}
