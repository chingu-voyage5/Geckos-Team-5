import phaser from 'phaser';
import { WIDTH, HEIGHT } from './util/constants';
import Level_1 from './scenes/Level_1';

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
  scene: [Level_1]
};

const game = new Phaser.Game(config);
