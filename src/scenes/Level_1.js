import { Scene } from "phaser";
import { WIDTH, HEIGHT, BRICKS } from "../util/constants";
import Player from "../components/objects/Player";
import Bullet from "../components/objects/Bullet";
import Ball from "../components/objects/Ball";

export class Level_1 extends Scene {
  constructor() {
    super({
      key: "Level_1"
    });

    // ===== Global Definitions For This FILE ===== //
    //here the bricks will be stored
    this.bricks = [];
    this.ball;
  }

  create() {
    //how many bricks are used on this map
    this.lives = 3;
    this.amountBricks = 38;
    this.isPlayerAlive = true;

    this.registry.set("lives", this.lives);

    //used for the init loading of hearts at the start of the level
    // this.gameStart = true;

    this.scene.launch("UIScene");

    this.image = this.add.sprite(240, 160, "background");

    // ===== BRIIIIIICKS HEART ===== //
    BRICKS.LEVEL_1.call(this);

    // ===== CUSTOM KEYS ===== //

    this.keys = {
      slide: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
      attack: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      fire: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
      down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
    };

    // Create Player
    this.player = new Player({
      scene: this,
      key: "player",
      x: 400,
      y: HEIGHT - 30
    });

    // Create Ball
    //veloc means velocity
    this.ball = new Ball({
      scene: this,
      key: "ball",
      x: 0,
      y: HEIGHT - 100,
      veloc: {
        x: 100,
        y: -80
      }
    });

    // ===== Set up a creation of bullets for the scene ===== //
    // ===== Can Probably move this to Player file for refactor ===== //

    this.bullets = this.add.group({
      classType: Bullet,
      runChildUpdate: true
    });
  }

  update(time, delta) {
    // ===== BULLET ===== //
    if (this.keys.fire.isDown) {
      let bullet = this.bullets.get();
      if (bullet) {
        bullet.fire(this.player.x, this.player.y - 30);
      }
    }

    this.player.update(this.keys, time, delta);
    //tracks the y changes in the velocity because add.collider is a bitch
    this.ball.update();

    //fun little animation for the initial heart load, delete if the amount of initial lifes is less than 8
    // if (this.gameStart === true) {
    //   this.startLifeAnim();
    // }

    if (
      (this.registry.list.lives < 1 && this.isPlayerAlive) ||
      (this.amountBricks === 0 && this.isPlayerAlive)
    ) {
      this.gameOver();
    }

    if (!this.isPlayerAlive) {
      this.restartGame();
    }
  }

  //its using the update function to increase the amount of hearts with the frequency of update
  // startLifeAnim() {
  //   if (this.lives < 5) {
  //     if (this.lives == 4) {
  //       //stops the startLifeAnim()
  //       this.gameStart = false;
  //     }
  //     this.registry.set('lives', this.lives);
  //     this.lives++;
  //   }
  // }

  //end the game
  gameOver() {
    this.isPlayerAlive = false;
    this.cameras.main.shake(500);
    this.time.delayedCall(
      250,
      () => {
        this.physics.world.pause();
      },
      [],
      this
    );
    this.scene.stop("UIScene");

    if (this.registry.list.lives === 0) {
      this.add.text(
        (WIDTH / 2) * 0.5,
        HEIGHT / 2,
        "Game Over! \n Press any key to try again!"
      );
    } else {
      this.add.text(
        (WIDTH / 2) * 0.5,
        HEIGHT / 2,
        "You won!! \n Press any key to play again!"
      );
    }
  }

  restartGame() {
    if (this.keys.attack.isDown || this.keys.slide.isDown) {
      // fade camera
      this.time.delayedCall(
        250,
        () => {
          this.cameras.main.fade(250);
        },
        [],
        this
      );

      // restart game
      this.time.delayedCall(
        500,
        () => {
          this.registry.set("SCORE", 0);
          this.registry.set("TIMER", [0, 0, ":", 0, 0, 0]);
          this.scene.restart();
        },
        [],
        this
      );
    }
  }
}
