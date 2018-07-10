import { soundAdder, soundPlay } from '../objects/Sound';

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
    this.body.setGravityY(100);

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
  }

  update() {
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
    this.addScore();

    //disable the brick
    brick.disableBody(true, false);

    //animation
    this.scene.tweens.add({
      targets: brick,
      alpha: 0,
      duration: 300
    });

    this.fireBullet(brick);
  }

  hitObject(ball, object) {
    if (object.texture.key == 'bullet') {
      this.multiplier = 10;
      this.additionY = 200;
    } else {
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
        this.additionY = 300;
      }
      //the velocity changes for hitting the object
      else {
        this.multiplier = 5;
        this.additionY = 0;
        this.takeLife(object);
      }
    }
    
    this.changeVelocity(this.additionY, this.multiplier, ball, object);
  }

  changeVelocity(addedVelocity, multiplier, ball, object) {
    //enabling the bounce for the top of the object
    this.body.setVelocityY(this.currentVelocY * -1);
    //adding the velocity as specified 
    this.body.setVelocityY(this.body.velocity.y - addedVelocity);
    //changing the x velocity
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

  takeLife(player) {
    if (!player.isInvincible) {
      soundPlay('sound_life', player.scene);

      player.setTemporaryInvincibility();

      //takes away a life since the player was hit
      this.config.scene.registry.set('lives', this.config.scene.registry.list.lives - 1);
    }
  }

  addScore() {
    //tracking the amount of bricks
    this.scene.amountBricks--;

    //setting the new score as the old score plus 100
    this.scene.registry.set('SCORE', this.scene.registry.list.SCORE + 100);

    if (this.scene.registry.list.SCORE % 16000 === 0) {
      this.config.scene.registry.set(
        'lives',
        this.config.scene.registry.list.lives + 1
      );
    }
  }

  fireBullet(brick) {
    if (this.scene.amountBricks == 0) { }
    else {
      //firing homing bullets onto the player
      this.scene.fireEnemyBullet(brick.x, brick.y, this.scene.player.x, this.scene.player.y);
    }
  }
}
