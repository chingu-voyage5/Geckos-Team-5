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
    
    //the background image for this scene
    this.image = this.add.sprite(
      240,
      160,
      'title'
    );
    //variable controlls which credits are displayed, those are split into different "pages"
    this.textnumber = 1;
    //sets the first page into view, the developer credits
    this.text = this.add.bitmapText(0, 0, FONT, this.text1(), FONTSIZE).setOrigin(0,0);

    this.keys = {
      space: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
      esc: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC),
      music: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M),
      sound: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P),
      textswitch: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
    };

    //if the scene starts while music is activated, run music
    if (this.registry.list.musicControl) {
      musicStart('theme', this);
    }
  }

  //dev credits
  text1() {
    return `
    DEVELOPED BY GECKO #5 AT CHINGU.IO\n\n
    FANCYACTION\n\n
    ALEXEVER17 \n\n
    SPARTA\n\n
    JETRHO FREDERICKS\n\n
    [esc] to title   ||  [F] for next Page (Sounds) 
    `;
  }

  //sound credits
  text2() {
    return `
    We are very thankful for being 
    able to use following sounds from:\n\n
    https://freesound.org:\n
    32cheeseman32  ,  Ironlink15
    Mativve  ,  Sharesynth  ,  TheZero
    suntemple  ,  kickhat\n
    https://gamesounds.xyz:\n
    Kenney's Sound Pack / UI Audio\n

    [esc] to title   ||  [F] for next Page (Music)`;
  }

  //music credits
  text3() {
    return `
    We are very thankful for being 
    able to use following music from:\n\n
    https://incompetech.com:\n
    "I Can Feel it Coming"
    “Corruption”
    “Ouroboros”
    “Undaunted” \n
    by Kevin MacLeod\n\n

    [esc] to title   ||  [F] for next Page (Images)`;
  }

  //image credits
  text4() {
    return `
    We are very thankful for being 
    able to use following images from:\n\n
    https://unsplash.com:\n
    aiksooon
    naletu
    gcaringal
    lesanderson
    darthxuan
    ianchen0\n\n

    [esc] to title   ||  [F] for next Page (Devs)`;
  }

  update() {
    if (                                                   //when esc key is pressed
      Phaser.Input.Keyboard.JustDown(this.keys.esc) ||
      Phaser.Input.Keyboard.JustDown(this.keys.space)
    ) {
      this.scene.start('Title'); //changes to title scene
      musicStopScene('theme', this); //stops music for this scene only, but keeps it on generally
    } else if (Phaser.Input.Keyboard.JustDown(this.keys.music)) {      //music start stop   keyboard M
      if (!this.registry.list.musicControl) {
        musicStart('theme', this);
      } else {
        musicStop('theme',this);
      }
    } else if (Phaser.Input.Keyboard.JustDown(this.keys.sound)) { //sound start stop    keyboard P
      if (!this.registry.list.soundControl) {
        this.registry.set('soundControl', true);
      } else {
        this.registry.set('soundControl', false);
      }
    } else if (Phaser.Input.Keyboard.JustDown(this.keys.textswitch)) { //text switcher for the credits  keyboard F
      this.textnumber++;
      if (this.textnumber == 5) {
        this.textnumber = 1;
      }
      switch (this.textnumber) {
        case 1:
          this.text.setText(this.text1()); //devs
          break;
        case 2:
          this.text.setText(this.text2().toUpperCase()); //sounds
          break;
        case 3:
          this.text.setText(this.text3().toUpperCase()); //music
          break;
        case 4:
          this.text.setText(this.text4().toUpperCase()); //images
          break;
      }
    }
  }
}
