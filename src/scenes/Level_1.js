import { Scene } from 'phaser';
import { WIDTH, HEIGHT } from '../util/constants';
import Player from '../components/objects/Player';
import Bullet from '../components/objects/Bullet';

export class Level_1 extends Scene {
  constructor() {
    super({
      key: 'Level_1'
    });

    // ===== Global Definitions For This FILE ===== //
    this.Bricks;
    this.Bullet;

    //amount of lifes on the level
    this.lifes = 1;
    //used for the init loading of hearts at the start of the level
    this.gameStart = true;
  }

  create() {
    this.image = this.add.sprite(400, 300, 'sky');

    // ===== CUSTOM KEYS ===== //

    this.keys = {
      jump: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
      slide: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
      attack: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      fire: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
      down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
      arrow: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X)
    };

    // Create Player
    this.player = new Player({
      scene: this,
      key: 'player',
      x: 400,
      y: HEIGHT - 30
    });

    var Bullet = new Phaser.Class({

      Extends: Phaser.GameObjects.Image,

      initialize:

        function Bullet(scene) {
          Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');

          this.speed = Phaser.Math.GetSpeed(200, 1);
        },

      fire: function (x) {
        this.setPosition( x, HEIGHT - 70 );

        this.setActive(true);
        this.setVisible(true);
      },

      update: function (time, delta) {
        this.y -= this.speed * delta;

        if (this.y > HEIGHT) {
          this.setActive(false);
          this.setVisible(false);
        }
      }

    });

    this.bullets = this.add.group({
      classType: Bullet,
      runChildUpdate: true
    });

  }

  update(time, delta) {
    if (this.keys.arrow.isDown) {
      let bullet = this.bullets.get();
      if (bullet) {
        bullet.fire(this.player.x);
      }
    }
    this.player.update(this.keys, time, delta);

    //fun little animation for the initial heart load, delete if the amount of initial lifes is less than 8 
    if (this.gameStart === true) {
      this.startLifeAnim();
    }
  }

  //its using the update function to increase the amount of hearts with the frequency of update
  startLifeAnim() {
  if (this.lifes < 14) {
    if (this.lifes == 13) {
      //stops the startLifeAnim()
      this.gameStart = false;
    }
    this.registry.set('HEARTS', this.lifes)
    this.lifes++;
  }
}
}
