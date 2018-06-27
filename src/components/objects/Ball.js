export default class Ball extends Phaser.GameObjects.Sprite {
  constructor(config) {
    //takes in the scene the x position, the y pposition, the key of the picture and and an object to set the velocity, {x:2,y:3}
    super(config.scene, config.x, config.y, config.key);
    config.scene.physics.world.enable(this);
    //adding the picture of the ball
    config.scene.add.existing(this);
    //saving config to be able to use later
    this.config = config;
    //stting the bounce on walls
    this.body.setCollideWorldBounds(true).setBounce(1);

    //starts the animation for the ball
    this.anims.play("ballAnim");
    //when the animations are finished they get started again
    this.on("animationcomplete", this.animComplete, this);

    //collider for the bricks
    config.scene.physics.add.collider(
      this,
      config.scene.bricks,
      this.hitBrick,
      null,
      this
    );

    //collider for the player
    config.scene.physics.add.collider(
      this,
      config.scene.player,
      this.hitPlayer,
      null,
      this
    );

    //initial velocity
    this.body.setVelocity(config.veloc.x, config.veloc.y);

    //saves the current velocity y so that we can fix collider
    this.currentVelocY;
    //difference between the x coordinates of player and ball, it is used to set the velocity on sword strike and bounce
    this.difference;
  }

  update() {
    //necessary variable to override the strange collider velocity behavior
    this.currentVelocY = this.body.velocity.y;
  }

  animComplete(animation, frame) {
    this.anims.play("ballAnim");
  }

  hitBrick(ball, brick) {
    //hides the brick
    brick.disableBody(true, true);
    //tracks the progress of the brick destroying
    this.scene.amountBricks--;
    //setting the new score as the old score plus 100
    this.scene.registry.set("SCORE", this.scene.registry.list.SCORE + 100);
    //firing homing bullets onto the player
    this.scene.fireEnemyBullet(brick.x, brick.y);
  }

  hitPlayer(ball, player) {
    //accounting for the collider setting the y velocity to 0
    this.body.setVelocityY(this.currentVelocY * -1);

    //the velocity changes for the swortd strike
    if (player.anims.currentAnim.key == "sword") {
      this.changeVelocity(300, 200, 10, ball, player);
    }
    //the velocity changes for the slide strike
    else if (player.anims.currentAnim.key == "slide") {
      // ---------------------------------------------------- VARIABLES NEEDS CHANGE -------------------------------------
      this.changeVelocity(300, 300, 10, ball, player);
    }
    //the velocity changes for hitting the player
    else {
      //takes away a life since the player was hit
      this.config.scene.registry.set("lives", this.config.scene.registry.list.lives - 1);
      this.changeVelocX(200, 5, ball, player);
    }
  }

  changeVelocity(maxY, addY, multiplier, ball, player) {
    console.log(this.body.velocity);
    
    //the ball should have some max velocity, so an if
    if (this.body.velocity.y < maxY && this.body.velocity.y > maxY * (-1)) {
      //adds upwards velocity to the ball
      this.body.setVelocityY(this.body.velocity.y - addY);
    }
    this.changeVelocX(addY, multiplier, ball, player);
  }

  changeVelocX(addY, multiplier, ball, player) {
    //calculates the x position difference
    this.difference = this.calculateXDistance(ball, player);
    //uses the x difference to add velocity to ball
    this.body.setVelocityX(this.body.velocity.x + multiplier * this.difference);

    //overrides too muich x velocity
    if (this.body.velocity.x > addY) {
      this.body.setVelocityX(addY);
    }
    if (this.body.velocity.x < addY * (-1)) {
      this.body.setVelocityX(addY * (-1));
    }
  }

  //calculates the difference between the player and balls x coordinates
  calculateXDistance(ball, player) {
    //  Ball is on the left-hand side of the player
    if (this.x < player.x) {
      return (player.x - this.x) * -1;
    }
    //  Ball is on the right-hand side of the player
    else if (this.x > player.x) {
      return this.x - player.x;
    }
    //  Ball is perfectly in the middle
    else {
      return (2 + Math.random() * 8) / 5;
    }
  }
}
