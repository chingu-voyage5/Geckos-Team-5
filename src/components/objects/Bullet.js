export default class Player extends Phaser.GameObjects.Sprite {

    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        Phaser.GameObjects.Image.call(this, config.scene, 0, 0, "bullet");
        this.speed = Phaser.Math.GetSpeed(400, 1);
        this.born = 0;
    }

    fire(player) {
        this.setPosition(config.x, config.y);
        this.setActive(true);
        this.setVisible(true);       
        this.born = 0;
    }

    update(time, delta) {
        this.y -= this.speed * delta;
        this.x -= this.speed * delta;

        // this.born += delta;
        if (this.y < -50) {
            this.setActive(false);
            this.setVisible(false);
          }
    }
}