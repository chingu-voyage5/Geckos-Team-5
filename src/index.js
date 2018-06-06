import phaser from 'phaser';
import { WIDTH, HEIGHT } from './util/constants';
import { Preloader } from './scenes/Preloader';
import { Level_1 } from './scenes/Level_1';
import { displayInformation } from './scenes/displayInformation';

const config = {
  type: Phaser.AUTO,
  width: WIDTH,
  height: HEIGHT,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: [Preloader, Level_1, displayInformation]
};

const game = new Phaser.Game(config);