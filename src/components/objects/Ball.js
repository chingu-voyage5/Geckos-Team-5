import { soundAdder, soundPlay } from '../objects/Sound';
import Pointdrop from '../objects/Pointdrop';

export default class Ball extends Phaser.Physics.Arcade.Sprite {
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
    //addition gravity for the ball
    this.body.setGravityY(150);

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
      this.hitObject,
      null,
      this
    );

    //initial velocity
    this.body.setVelocity(config.veloc.x, config.veloc.y);

    //saves the current velocity y so that we can fix collider
    this.currentVelocY;
    //difference between the x coordinates of player and ball, it is used to set the velocity on sword strike and bounce
    this.difference;

    //sets the maximum velocity for the ball
    this.body.maxVelocity = { x: 150, y: 450}    

    //added y velocity on action
    this.additionY = 200;
    //multiplier for the x velocity
    this.multiplier = 10;

    this.scene.points = this.scene.physics.add.group({
      classType: Pointdrop,
      runChildUpdate: true
    });
  }

  update() {    
    if( this.config.scene.gameStart ) return this.anims.pause();
    //necessary variable to override the strange collider velocity behavior
    this.currentVelocY = this.body.velocity.y;

    //makes a sound on ball hitting the wall
    if (this.body.checkWorldBounds() == true) {
      soundPlay('sound_ballwalls', this.scene);
    }
  }

  animComplete(animation, frame) {
    this.anims.play('ballAnim');
  }

  hitBrick(ball, brick) {
    //makes a sound on ball hitting a brick
    soundPlay('sound_brick', brick.scene);

    //ads score and tracks bricks
    this.addScore(true);

    //disable the brick
    brick.disableBody(true, false);

    //animation
    this.scene.tweens.add({
      targets: brick,
      alpha: 0,
      duration: 300
    });

    //drops the point with a probability of 25%
    this.pointDropFunc(brick);

    //fires a homing bullet at the player, takes in the current hit brick
    this.fireBullet(brick);
  }

  hitObject(ball, object) {

    if (object.texture.key == 'bullet') {
      this.multiplier = 10;
      this.additionY = 200;
    } else { //everything happening with the player
      setTimeout(() => {

        //makes a sound on ball hitting the object
        soundPlay('sound_ballplayer', object.scene);

        //the velocity changes for the swortd strike
        if (object.anims.currentAnim.key == 'sword') {
          this.multiplier = 10;
          this.additionY = 200;
        }
        //the velocity changes for the slide strike
        else if (object.anims.currentAnim.key == 'slide') {
          this.multiplier = 10;
          this.additionY = 250;
        }
        //the velocity changes for hitting the object
        else {
          this.multiplier = 7;
          this.additionY = 0;
          //takes away a life from the player, playes the sound and sets the invincibilty
          this.takeLife(object);

          //allows the ball to travel faster if than the max veloc of 150
          //fixes the bug where the ball is stuck on the player
          this.velocityAdjusterX();
        }

      }, 70);
      
    }

    //starts the process of calculating the new velocity for the ball after being hit
    //depending on the condition of the hit, the if tree before it sends different variables
    this.changeVelocity(this.additionY, this.multiplier, ball, object);
  }

  changeVelocity(addedVelocity, multiplier, ball, object) {

    //enabling the bounce for the top of the object
    this.body.setVelocityY(this.currentVelocY * -1);

    //sometimes the ball is being hit after it bounces on the floor, this changes the velocity if so
    this.bounceCheck();

    //allows the ball to travel faster than the veloc y limit of 450 if its slow and near the bottom
    //if the conditions are met, it increases the addedVelocity which is later added to the ball
    addedVelocity = this.velocityAdjusterY(addedVelocity);

    //adding the additional velocity to the current velocity (which had the polarity changed in the lines before)
    this.body.setVelocityY(this.body.velocity.y - addedVelocity);

    //the function to change the X velocity
    this.changeVelocX(multiplier, ball, object);
  }

  changeVelocX(multiplier, ball, object) {

    //calculates the x position difference
    this.difference = this.calculateXDistance(ball, object);

    //uses the x difference to add velocity to ball
    this.body.setVelocityX(this.body.velocity.x + multiplier * this.difference);
  }

  //calculates the difference between the object and balls x coordinates
  calculateXDistance(ball, object) {
    //  Ball is on the left-hand side of the object
    if (this.x < object.x) {
      return (object.x - this.x) * -1;
    }
    //  Ball is on the right-hand side of the object
    else if (this.x > object.x) {
      return this.x - object.x;
    }
    //  Ball is perfectly in the middle
    else {
      return (2 + Math.random() * 8) / 5;
    }
  }

  //detracts the life from the player, sets invincibility and plays sound if switched on
  takeLife(player) {
    if (!player.isInvincible) {
      soundPlay('sound_life', player.scene);

      player.setTemporaryInvincibility();

      //takes away a life since the player was hit
      this.config.scene.registry.set('lives', this.config.scene.registry.list.lives - 1);
    }
  }

  //drops the point with a probability of 25%
  pointDropFunc(brick) {
    //sets the probability of the point drop
    let number = Math.floor(Math.random() * 8) + 1;
    //fires the pointdrop
    if (number == 8) {
      let point = this.scene.points.get();
      if (point) {
        point.fire(brick.x, brick.y);
      }
    }
  }

  //tracks the bricks and sets the score on brick hit
  addScore(boolean) {
    //tracking the amount of bricks
    if (boolean == true) {
      this.scene.amountBricks--;
    }

    //setting the new score as the old score plus 100
    this.scene.registry.set('SCORE', this.scene.registry.list.SCORE + 100);

    //adds a life if the score conditions are met
    this.lifeGain();
  }

  //adds a life if the score conditions are met 
  lifeGain() {
    if (this.scene.registry.list.SCORE % 16000 === 0) {
      this.config.scene.registry.set(
        'lives',
        this.config.scene.registry.list.lives + 1
      );
    }
  }

  //sometimes the ball is being hit after it bounces on the floor, this changes the velocity if so
  bounceCheck() {
    if (this.body.velocity.y > 0) {
      this.body.setVelocityY(this.body.velocity.y * -1);
    }
  }

  //fires a homing bullet from the destroyed brick
  fireBullet(brick) {
    if (this.scene.amountBricks == 0) { }
    else {
      //firing homing bullets onto the player
      this.scene.fireEnemyBullet(brick.x, brick.y, this.scene.player.x, this.scene.player.y);
    }
  }

  //allows the ball to travel faster if necessery than the max veloc of 150
  //fixes the bug where the ball is stuck on the player
  velocityAdjusterX() {
    //initial increasing of the limit to let the ball have more velocity
    this.body.maxVelocity.x = 450;

    //making a smoother speed decrease after it gained momentum to prevent it bouncing all over the place
    this.speedDecrease("x", 150, 1);
  }

  //allows the ball to travel faster than the veloc y limit of 450 if its slow and near the bottom
  //if the conditions are met, it increases the addedVelocity which is later added to the ball
  velocityAdjusterY(addedVelocity) {
    //takes in the absolute value to be able to use it when the ball bounce from floor and is being hit
    if (Math.abs(this.body.velocity.y) < 200 && this.y > 230) { 

      //initial increase of the limiter      
      this.body.maxVelocity.y = 750;
 
      //a function to make a smoother speed decrease after the ball gained momentum to prevent it bouncing all over the place
      //otherwise it looks like the ball warped
      this.speedDecrease("y", 450, 1);
      
      //adding more velocity when low
      addedVelocity += 100;

      return addedVelocity
    }
    else {return addedVelocity}
  }

  //a function to make a smoother speed decrease after the ball gained momentum to prevent it bouncing all over the place
  //otherwise it looks like the ball warped
  speedDecrease(velocityNAME, changedLimit, multiplicator) {
    if (velocityNAME == "x") {
      setTimeout(() => {
        this.body.maxVelocity.x = 400;
      }, 50);
      setTimeout(() => {
        this.body.maxVelocity.x = 330;
      }, 70);
      setTimeout(() => {
        this.body.maxVelocity.x = 260;
      }, 90);
      setTimeout(() => {
        this.body.maxVelocity.x = 200;
      }, 100);
      setTimeout(() => {
        this.body.maxVelocity.x = 182;
      }, 150);
      setTimeout(() => {
        this.body.maxVelocity.x = 164;
      }, 200);
      setTimeout(() => {
        this.body.maxVelocity.x = 150;
      }, 300);
    } else {
      setTimeout(() => {
        this.body.maxVelocity[velocityNAME] = changedLimit;
      }, 100 * multiplicator);
    }
  }
}
