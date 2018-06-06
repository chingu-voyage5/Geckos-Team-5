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
    console.log('Preloader preload');
    this.load.image('sky', 'src/assets/images/sky.png');
    this.load.image('platform', 'src/assets/images/platform.png');
    this.load.spritesheet('player', 'src/assets/spritesheets/player.png', {
      frameWidth: 32,
      frameHeight: 48
    });
    makeAnimations(this);
  }

  create() {
    this.scene.start('Level_1');
    this.scene.start('UIScene');
  }
}
