import { HEIGHT } from '../../util/constants'

export default class Bullet extends Phaser.GameObjects.Image {

    constructor({ scene, x, y, key }) {
        super(scene, x, y, key);
        this.speed = Phaser.Math.GetSpeed(200, 1);
    }


    fire(x) {
        this.setPosition(x, y);

        this.setActive(true);
        this.setVisible(true);
    }

    update(delta) {
        this.y -= this.speed * delta;

        if (this.y > HEIGHT) {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}