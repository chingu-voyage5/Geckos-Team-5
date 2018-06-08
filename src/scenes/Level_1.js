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
  }
}
