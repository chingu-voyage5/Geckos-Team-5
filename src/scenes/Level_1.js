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
    this.bricks;

    //amount of lifes on the level
    this.lifes = 1;
    //used for the init loading of hearts at the start of the level
    this.gameStart = true;
  }

  create() {
    this.image = this.add.sprite(400, 300, 'sky');

    // ===== BRIIIIIICKS HEART ===== //

    this.bricks = this.physics.add.staticGroup({
      key: 'bricks', frame: ['brick4'],
      frameQuantity: 3,
      gridAlign: { width: 3, height: 1, cellWidth: 33, cellHeight: 33, x: 100, y: 50 }
    });
    this.bricks += this.physics.add.staticGroup({
      key: 'bricks', frame: ['brick4'],
      frameQuantity: 3,
      gridAlign: { width: 3, height: 1, cellWidth: 33, cellHeight: 33, x: 298, y: 50 }
    });
    this.bricks += this.physics.add.staticGroup({
      key: 'bricks', frame: ['brick5'],
      frameQuantity: 4,
      gridAlign: { width: 4, height: 1, cellWidth: 33, cellHeight: 33, x: 100, y: 83 }
    });
    this.bricks += this.physics.add.staticGroup({
      key: 'bricks', frame: ['brick5'],
      frameQuantity: 4,
      gridAlign: { width: 4, height: 1, cellWidth: 33, cellHeight: 33, x: 265, y: 83 }
    });
    this.bricks += this.physics.add.staticGroup({
      key: 'bricks', frame: ['brick7'],
      frameQuantity: 9,
      gridAlign: { width: 9, height: 1, cellWidth: 33, cellHeight: 33, x: 100, y: 116 }
    });
    this.bricks += this.physics.add.staticGroup({
      key: 'bricks', frame: ['brick8'],
      frameQuantity: 7,
      gridAlign: { width: 7, height: 1, cellWidth: 33, cellHeight: 33, x: 133, y: 149 }
    });
    this.bricks += this.physics.add.staticGroup({
      key: 'bricks', frame: ['brick1'],
      frameQuantity: 5,
      gridAlign: { width: 5, height: 1, cellWidth: 33, cellHeight: 33, x: 166, y: 182 }
    });
    this.bricks += this.physics.add.staticGroup({
      key: 'bricks', frame: ['brick2'],
      frameQuantity: 3,
      gridAlign: { width: 3, height: 1, cellWidth: 33, cellHeight: 33, x: 199, y: 215 }
    });

    // ===== CUSTOM KEYS ===== //

    this.keys = {
      jump: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
      slide: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
      attack: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      fire: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
      down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
    };

    // Create Player
    this.player = new Player({
      scene: this,
      key: 'player',
      x: 400,
      y: HEIGHT - 30
    });


    const Bullets = new Phaser.Class({

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
      classType: Bullets,
      runChildUpdate: true
    });

    console.log(this.bullets)

  }

  update(time, delta) {
    if (this.keys.fire.isDown) {
      let bullet = this.bullets.get();
      if (bullet) {
        console.log(bullet)
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
