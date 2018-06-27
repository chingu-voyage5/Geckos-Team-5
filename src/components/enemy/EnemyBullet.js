import { HEIGHT } from "../../util/constants";

export default class EnemyBullet extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {
    super(config, 0, 0, "enemy-bullet");
    config.scene.scene.physics.world.enable(this);

    this.speedX = 0;
    this.speedY = 0;
    this.targetX = 0;
    this.startingX = 0;
    this.startingY = 0;
    this.scene = config.scene.scene;
    this.player = this.scene.player;

    this.scene.physics.add.collider(
      this,
      this.player,
      this.hitPlayer,
      null,
      this
    );
  }

  fire(startingX, startingY, targetX, targetY) {
    this.setAccelerationY(-300);
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
    targetAngle = Math.PI - targetAngle;

    this.rotation = targetAngle;

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

  hitPlayer() {
    if (
      !(
        this.player.anims.currentAnim.key == "sword" ||
        this.player.anims.currentAnim.key === "attackUp"
      )
    ) {
      this.scene.registry.set("lives", this.scene.registry.list.lives - 1);
    }
    this.destroy();
  }
}
