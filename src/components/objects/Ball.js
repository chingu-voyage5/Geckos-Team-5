export default class Ball extends Phaser.GameObjects.Image {
      constructor(config) {
            //takes in the scene the x position, the y pposition, the key of the picture and and an object to set the velocity, {x:2,y:3}
            super(config.scene, config.x, config.y, config.key, config.veloc.x, config.veloc.y);
            config.scene.physics.world.enable(this);
            //adding the picture of the ball
            config.scene.add.existing(this);
            //stting the bounce on walls
            this.body.setCollideWorldBounds(true).setBounce(1);

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
      }

      hitPlayer(ball, player) {
            //difference between the x positions of the player and ball
            let diff = 0;

            //  Ball is on the left-hand side of the player
            if (this.x < player.x) {
                  //logging the difference
                  diff =player.x - this.x;

                  //adding some difference based velocity
                  this.body.setVelocityX(-5 * diff);

                  //add some y velocity if ball too slow
                  if (this.body.velocity.y < 100 && this.body.velocity.y > -50) {
                        this.body.setVelocityY(this.body.velocity.y - 100);
                  }
            }

            //  Ball is on the right-hand side of the player
            else if (this.x > player.x) {
                  //logging the difference
                  diff = this.x - player.x;

                  //setting the difference based velocity
                  this.body.setVelocityX(5 * diff);

                  //add some y velocity if ball too slow
                  if (this.body.velocity.y < 100 && this.body.velocity.y > -50) {
                        this.body.setVelocityY(this.body.velocity.y - 100);
                  }
            }

            //  Ball is perfectly in the middle
            //  Add a little random X to stop it bouncing straight up!
            else {
                  this.body.setVelocityX(2 + Math.random() * 8);
                  this.body.setVelocityY(this.body.velocity.y - 100);
            }
      }

      hitBrick(ball, brick) {
            //hides the brick, not destroyed
            brick.disableBody(true, true);
            //tracks the progress of the brick destroying
            this.scene.amountBricks--;

            //when the last brick died it it should trigger the end of the stage
            if (this.scene.amountBricks == 0) {
                  // this.resetLevel();
                  console.log('MY FAMILY IS DEAD');
            }
      }
}
