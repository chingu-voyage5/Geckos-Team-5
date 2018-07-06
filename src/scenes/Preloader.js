import phaser from 'phaser';
import { WIDTH, HEIGHT } from '../util/constants';
import makeAnimations from '../util/Animations';

export class Preloader extends phaser.Scene {
  constructor() {
    super({
      key: 'preloader'
    });
  }
  preload() {
    //loading however there are backgrounds  currently there are 5, names start from background1
    for (let i = 1; i < 6; i++) {
      this.load.image(
        'background' + i,
        './assets/images/background' + i + '.png'
      );
    }
    this.load.image('bullet', './assets/images/bullet.png');
    this.load.image('enemy-bullet', './assets/images/enemy-bullet.png');
    this.load.image('platform', './assets/images/platform.png');
    this.load.image('heart', './assets/images/heart.png');

    this.load.atlas(
      'player',
      './assets/spritesheets/player.png',
      './assets/spritesheets/player.json'
    );
    this.load.atlas(
      'bricks',
      './assets/spritesheets/brick.png',
      './assets/spritesheets/brick.json'
    );
    this.load.spritesheet('ball', './assets/spritesheets/ball.png', {
      frameWidth: 26,
      frameHeight: 26,
      endFrame: 3
    });

    this.load.audio('theme', [
      './assets/audio/kickhat_success-menu.mp3'
    ]);

    this.load.audio('song1', [
      './assets/audio/Ouroboros.mp3'
    ]);
    this.load.audio('song2', [
      './assets/audio/I Can Feel it Coming.mp3'
    ]);
    this.load.audio('song3', [
      './assets/audio/Corruption.mp3'
    ]);
    this.load.audio('song4', [
      './assets/audio/Undaunted.mp3'
    ]);

    this.load.audio('gameover', [
      './assets/sounds/thezero-game-over.mp3'
    ]);
    this.load.audio('bullet', [
      './assets/sounds/sharesynth_laser04.mp3'
    ]);
    this.load.audio('brick', [
      './assets/sounds/brick.mp3'
    ]);
    this.load.audio('ballplayer', [
      './assets/sounds/click4.wav'
    ]);
    this.load.audio('ballwalls', [
      './assets/sounds/click5.wav'
    ]); 
    this.load.audio('gamewin', [
      './assets/sounds/littlerobotsoundfactory_jingle-win-00.mp3'
    ]); 
    this.load.audio('sword', [
      './assets/sounds/cheeseman32__sworddraw01.mp3'
    ]);
    this.load.audio('life', [
      './assets/sounds/suntemple_retro-you-lose-sfx.mp3'
    ]);
    


    const progress = this.add.graphics();

    // Register a load progress event to show a load bar
    this.load.on('progress', value => {
      progress.clear();
      progress.fillStyle(0xffffff, 1);
      progress.fillRect(
        0,
        this.sys.game.config.height / 2,
        this.sys.game.config.width * value,
        60
      );
    });

    // Register a load complete event to launch the title screen when all files are loaded
    this.load.on('complete', () => {
      // prepare all animations, defined in a separate file
      makeAnimations(this);
      progress.destroy();
      this.scene.start('Title');
    });
  }
}
