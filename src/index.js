import phaser from 'phaser';
import { WIDTH, HEIGHT } from './util/constants';
import { Preloader } from './scenes/Preloader';
import { Level_1 } from './scenes/Level_1';
import { UIScene } from './scenes/UIScene';
// import { HeartPlugin } from './components/objects/HeartPlugin';

import { heartObject } from './components/objects/heartObject';

class HeartPlugin extends Phaser.Plugins.BasePlugin {

  constructor(pluginManager) {
    super(pluginManager);

    //  Register our new Game Object type
    pluginManager.registerGameObject('heart', this.createHeart);
  }

  createHeart(x, y) {
    return this.displayList.add(new heartObject(this.scene, x, y));
  }

}

const config = {
  type: Phaser.AUTO,
  width: WIDTH,
  height: HEIGHT,
  pixelArt: true,
  parent: 'phaser',
  plugins: {
    global: [
      { key: 'HeartPlugin', plugin: HeartPlugin, start: true }
    ]
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: [Preloader, Level_1, UIScene]
};

const game = new Phaser.Game(config);
