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

            this.hitPlayerVariable = false;

            //starts the animation for the ball
            this.anims.play('ballAnim');
            //when the animations are finished they get started again
            this.on('animationcomplete', this.animComplete, this);

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

      hitPlayer(ball, player) {  
            //accounting for the collider setting the y velocity to 0
            this.body.setVelocityY(this.currentVelocY * (-1));

            //the velocity changes for the swortd strike
            if (player.anims.currentAnim.key == 'sword') {
                  //the ball should have some max velocity, so an if
                  if (this.body.velocity.y < 300 && this.body.velocity.y > -300) {
                        //adds upwards velocity to the ball
                        this.body.setVelocityY(this.body.velocity.y - 200);
                  } 
                  //calculates the x position difference
                  this.difference = this.xDifferenceCalc(ball, player);
                  //uses the x difference to add velocity to ball
                  this.body.setVelocityX(this.body.velocity.x + 10 * this.difference);

                  //overrides too muich x velocity
                  if (this.body.velocity.x > 200) {
                        this.body.setVelocityX(200);
                  }
                  if (this.body.velocity.x < -200) {
                        this.body.setVelocityX(-200);
                  }
            } 
            //the velocity changes for hitting the player
            else {
                  //takes away a life since the player was hit
                  this.config.scene.registry.set('HEARTS', this.config.scene.registry.list.HEARTS - 1);

                  //calculates the x position difference
                  this.difference = this.xDifferenceCalc(ball, player);
                  //uses the x difference to add velocity to ball
                  this.body.setVelocityX(this.body.velocity.x + 5 * this.difference);

                  //overrides too muich x velocity
                  if (this.body.velocity.x > 200) {
                        this.body.setVelocityX(200);
                  }
                  if (this.body.velocity.x < -200) {
                        this.body.setVelocityX(-200);
                  }
            }
      }

      update() {
            //necessary variable to override the strange collider velocity behavior
            this.currentVelocY = this.body.velocity.y;
      }

      //calculates the difference between the player and balls x coordinates
      xDifferenceCalc(ball, player) {
            //difference between the x positions of the player and ball
            let diff = 0;
            //  Ball is on the left-hand side of the player
            if (this.x < player.x) { 
                  diff = (player.x - this.x) * (-1);   
            }
            //  Ball is on the right-hand side of the player
            else if (this.x > player.x) {
                  diff = this.x - player.x;
            }
            //  Ball is perfectly in the middle
            else {
                  diff = (2 + Math.random() * 8) / 5;
            }

            return diff
      }

      hitBrick(ball, brick) {
            //hides the brick, not destroyed
            brick.disableBody(true, true);
            //tracks the progress of the brick destroying
            this.scene.amountBricks--;

            //passing variable for the current score
            let oldScore = this.scene.registry.list.SCORE;

            //setting the new score
            this.scene.registry.set('SCORE', oldScore + 100);

            //when the last brick died it it should trigger the end of the stage
            if (this.scene.amountBricks == 0) {
                  // this.resetLevel();
                  console.log('MY FAMILY IS DEAD');
            }
      }

      animComplete(animation, frame) {
            this.anims.play('ballAnim');
      }
}
