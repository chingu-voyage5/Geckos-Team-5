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
    this.load.image('background', './assets/images/background.png');
    this.load.image('bullet', './assets/images/bullet.png');
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
      frameWidth: 25,
      frameHeight: 25,
      endFrame: 3
    });

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
      this.scene.start('Level_1');
    });
  }
}
