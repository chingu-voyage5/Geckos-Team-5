export default class heartObject extends Phaser.GameObjects.Image {
     
      constructor(scene, x, y) {
            super(scene, x, y, 'heart');

            this.setScale(1);
      }

}
