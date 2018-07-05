import { Scene } from 'phaser';
import { WIDTH, HEIGHT, UIFONT } from '../util/constants';
import { musicStart, musicStop, musicStopScene } from '../components/objects/Music';
import { checkGamepad } from '../util/constants';

export class Title extends Scene {
  constructor() {
    super({
      key: 'Title'
    });   
  }

  create() {
    //either creates the registry entries for music or if it is opened from other scenes, playes music if music is activated
    if (this.registry.list.musicControll) {
      musicStart('theme', this);
    } else {
      this.registry.set('musicControll', false);
      this.registry.set('currentSongNumber', 1);
    }
    
    this.keys = {
      start: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
      credits: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C),
      help: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H),
      music: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)
    };

    // document.body.style.backgroundColor = '#000';
    this.titleText = this.add
      .text(WIDTH / 2, HEIGHT - 230, 'THE LAST CHINGU WARRIOR', UIFONT)
      .setOrigin(0.5)
      .setScale(2);
    this.playText = this.add
      .text(WIDTH / 2, HEIGHT - 190, 'SPACE: PLAY', UIFONT)
      .setOrigin(0.5);

    this.helpText = this.add
      .text(WIDTH / 2, HEIGHT - 150, 'H: HOW TO PLAY', UIFONT)
      .setOrigin(0.5);

    this.creditsText = this.add
      .text(WIDTH / 2, HEIGHT - 70, 'C: CREDITS', UIFONT)
      .setOrigin(0.5);

    this.musicText = this.add
      .text(WIDTH / 2, HEIGHT - 110, 'M: MUSIC', UIFONT)
      .setOrigin(0.5);
  }

  update() {
    let pad = checkGamepad.call(this);

    if (
      Phaser.Input.Keyboard.JustDown(this.keys.start) ||
      pad.buttons[0].pressed
    ) {
      this.scene.start('Level_1');
      //transition to next scene and music
      musicStopScene(this);
    } else if (Phaser.Input.Keyboard.JustDown(this.keys.help)) {
      this.scene.start('Help');
      musicStopScene(this);
    } else if (Phaser.Input.Keyboard.JustDown(this.keys.credits)) {
      this.scene.start('Credits');
      musicStopScene(this);
    } else if (Phaser.Input.Keyboard.JustDown(this.keys.music)) { //music start stop
      if (!this.registry.list.musicControll) {
        musicStart('theme', this);
      } else {
        musicStop(this);
      }
    }
  }
}
