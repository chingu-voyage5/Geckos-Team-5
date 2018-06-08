import heartObject from '../objects/heartObject';

//lists the images of hearts as game object so that can be easily interacted with
export default class HeartPlugin extends Phaser.Plugins.BasePlugin {

      constructor(pluginManager) {
            super(pluginManager);

            //  Register our new Game Object type
            pluginManager.registerGameObject('heart', this.createHeart);
      }

      //uses the clas heartObject which we imported on top
      createHeart(x, y) {
            return this.displayList.add(new heartObject(this.scene, x, y));
      }

}