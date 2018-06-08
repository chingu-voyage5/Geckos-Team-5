//puts the image heart where it needs to be scene, x, y
export default class heartObject extends Phaser.GameObjects.Image {
     
      constructor(scene, x, y) {
            super(scene, x, y, 'heart');

            this.setScale(0.45);
      }

}
