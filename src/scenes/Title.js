import { Scene } from 'phaser';
import { WIDTH, HEIGHT, FONT, FONTSIZE } from '../util/constants';
import { musicStart, musicStop, musicStopScene, musicAdder } from '../components/objects/Music';
import { checkGamepad } from '../util/constants';

export class Title extends Scene {
  constructor() {
    super({
      key: 'Title'
    });   
  }

  create() {
    //makes music accessible to the scene
    musicAdder(this);

    //adding the background picture for this scene
    this.image = this.add.sprite(
      240,
      160,
      'title'
    );

    //either creates the registry entries for music or if it is opened from other scenes, playes music if music is activated
    if (this.registry.list.musicControl) {
      musicStart('theme', this);
    } 
    else {
      this.registry.set('musicControl', false);
      this.registry.set('currentSongNumber', 1);
    }

    //checks if the soundControl exists upon the start of the scene, if not creats it
    if (this.registry.list.soundControl) {
      this.registry.set('soundControl', true);
    } 
    else {
      this.registry.set('soundControl', false);
    }

    //keyboard controlls for this scene
     this.keys = {
      start: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
      credits: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C),
      help: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H),
      music: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M),
      sound: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P)
    };

    this.titleText = this.add
      .bitmapText(20, HEIGHT - 290, FONT, '    THE LAST \nCHINGU WARRIOR', FONTSIZE * 1.5);
    this.playText = this.add
      .bitmapText(50, HEIGHT - 210, FONT, 'SPACE: PLAY', FONTSIZE);
    this.helpText = this.add
      .bitmapText(50, HEIGHT - 170, FONT, 'H: HOW TO PLAY', FONTSIZE);
    this.creditsText = this.add
      .bitmapText(50, HEIGHT - 50, FONT, 'C: CREDITS', FONTSIZE);
    this.musicText = this.add
      .bitmapText(50, HEIGHT - 130, FONT, 'M: MUSIC', FONTSIZE);
    this.soundText = this.add
      .bitmapText(50, HEIGHT - 90, FONT, 'P: SOUND', FONTSIZE);
  }

  update() {
    let pad = checkGamepad.call(this);

    //if different buttons are pressed, different scenes are called or controlls triggered:
    //scenes: help, credit, game
    //music and sound controls
    if (
      Phaser.Input.Keyboard.JustDown(this.keys.start) ||
      pad.buttons[0].pressed
    ) {
      this.scene.start('Level_1');
      //transition to next scene and music
      musicStopScene('theme', this);
      
    } else if (Phaser.Input.Keyboard.JustDown(this.keys.help)) {
      this.scene.start('Help');
      musicStopScene('theme', this);

    } else if (Phaser.Input.Keyboard.JustDown(this.keys.credits)) {
      this.scene.start('Credits');
      musicStopScene('theme',this);

    } else if (Phaser.Input.Keyboard.JustDown(this.keys.music)) { //music start stop  key: M
      if (!this.registry.list.musicControl) {
        musicStart('theme', this);
      } else {
        musicStop('theme',this);
      }
    } else if (Phaser.Input.Keyboard.JustDown(this.keys.sound)) { //sound start stop   key: P
      if (!this.registry.list.soundControl) {
        this.registry.set('soundControl', true);
      } else {
        this.registry.set('soundControl', false);
      }
    }
  }
}
