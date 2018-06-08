import { heartObject } from '../objects/heartObject';

export default class HeartPlugin extends Phaser.Plugins.BasePlugin {

      constructor(pluginManager) {
            super(pluginManager);

            //  Register our new Game Object type
            pluginManager.registerGameObject('heart', this.createHeart);
      }

      createHeart(x, y) {
            return this.displayList.add(new heartObject(this.scene, x, y));
      }

}