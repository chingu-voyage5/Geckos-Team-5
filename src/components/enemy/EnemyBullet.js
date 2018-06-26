import { HEIGHT } from "../../util/constants";

export default class EnemyBullet extends Phaser.GameObjects.Image {
  constructor(config) {
    super(config, 0, 0, "enemy-bullet");
    this.speed = Phaser.Math.GetSpeed(200, 1);
  }

  fire(x, y) {
    this.setPosition(x, y);

    this.setActive(true);
    this.setVisible(true);
  }

  update(time, delta) {
    this.y += this.speed * 30;

    // comment below line in if you want to see the bullet children get deleted
    // console.log(this.scene.bullets.children.entries.length)
    if (this.y > HEIGHT) {
      this.setActive(false);
      this.setVisible(false);
      this.destroy();
    }
  }
}
