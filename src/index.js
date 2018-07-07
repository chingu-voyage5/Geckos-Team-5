import phaser from 'phaser';
import { WIDTH, HEIGHT } from './util/constants';
import { Preloader } from './scenes/Preloader';
import { Level_1 } from './scenes/Level_1';
import { UIScene } from './scenes/UIScene';
import { Title } from './scenes/Title';
import { Help } from './scenes/Help';
import { Credits } from './scenes/Credits';
import HeartPlugin from './components/objects/HeartPlugin';

const config = {
  type: Phaser.AUTO,
  width: WIDTH,
  height: HEIGHT,
  input: {
    gamepad: true
  },
  pixelArt: true,
  parent: 'phaser',
  plugins: {
    global: [{ key: 'HeartPlugin', plugin: HeartPlugin, start: true }]
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: true
    }
  },
  scene: [Preloader, Title, Credits, Help, Level_1, UIScene],
  audio: {
    // disableWebAudio: true
  }
};

const game = new Phaser.Game(config);
