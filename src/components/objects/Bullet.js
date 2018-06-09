import { HEIGHT } from '../../util/constants'

export default class Bullet extends Phaser.GameObjects.Image {

    constructor(config) {
        super(config, 0, 0, 'bullet');
        this.speed = Phaser.Math.GetSpeed(200, 1);
    }


    fire(x, y) {
        this.setPosition(x, y);

        this.setActive(true);
        this.setVisible(true);
    }

    update(time, delta) {
        this.y -= this.speed * 30;
        if (this.y > HEIGHT) {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}