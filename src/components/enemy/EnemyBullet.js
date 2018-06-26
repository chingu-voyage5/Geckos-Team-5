import { HEIGHT } from "../../util/constants";

export default class EnemyBullet extends Phaser.GameObjects.Image {
  constructor(config) {
    super(config, 0, 0, "enemy-bullet");
    this.speedX = 0;
    this.speedY = 0;
    this.targetX = 0;
    this.startingX = 0;
    this.startingY = 0;
  }

  fire(startingX, startingY, targetX, targetY) {
    this.setPosition(startingX, startingY);
    this.targetX = targetX;
    this.startingX = startingX;
    this.startingY = startingY;
    const distanceY = HEIGHT - startingY;
    const distanceX = this.targetX - this.startingX;
    this.speedY = Phaser.Math.GetSpeed(distanceY, 1);
    this.speedX = Phaser.Math.GetSpeed(distanceX, 1);

    let targetAngle = Phaser.Math.Angle.Between(
      this.startingX,
      this.startingY,
      this.targetX,
      HEIGHT
    );
    targetAngle = Phaser.Math.RadToDeg(targetAngle);
    targetAngle = this.targetX > this.startingX ? -targetAngle : targetAngle;

    this.angle = targetAngle;

    this.setActive(true);
    this.setVisible(true);
  }

  update(time, delta) {
    this.y += this.speedY * 20;
    this.x += this.speedX * 20;

    if (this.y > HEIGHT) {
      this.setActive(false);
      this.setVisible(false);
      this.destroy();
    }
  }
}
