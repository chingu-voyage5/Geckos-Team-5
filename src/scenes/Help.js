import { Scene } from 'phaser';
import { WIDTH, HEIGHT, FONT, FONTSIZE } from '../util/constants';
import { musicStart, musicStop, musicStopScene, musicAdder } from '../components/objects/Music';

export class Help extends Scene {
  constructor() {
    super({
      key: 'Help'
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

    // const text = this.add.bitmapText(0, 0, UIFONT, this.text(), 8);
    const text = this.add
      .bitmapText(WIDTH / 4 + 10, HEIGHT - 200, FONT, this.text(), FONTSIZE)
      .setOrigin(0.5);

    this.keys = {
      space: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
      esc: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC),
      music: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M),
      sound: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P)
    };

    //if music is activated it starts the music
    if (this.registry.list.musicControl) {
      musicStart('theme', this);
    }
  }

  text() {
    return `\n
    CONTROLS\n
    ARROW KEYS: MOVE\n
    A: SWORD ATTACK
    S: THROW CARD
    M: MUSIC ON-OFF
    P: SOUNDS ON-OFF
    SPACE: SLIDE
    -OR USE JOYPADS- \n
    [esc] to title
    `;
  }

  update() {
    if (
      Phaser.Input.Keyboard.JustDown(this.keys.esc) ||
      Phaser.Input.Keyboard.JustDown(this.keys.space)
    ) {
      this.scene.start('Title');
      musicStopScene('theme',this);
    } else if (Phaser.Input.Keyboard.JustDown(this.keys.music)) {//music start stop
      if (!this.registry.list.musicControl) {
        musicStart('theme', this);
      } else {
        musicStop('theme', this);
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
