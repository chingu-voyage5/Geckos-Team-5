import { Scene } from 'phaser';
import { WIDTH, HEIGHT } from '../util/constants';
import Player from '../components/objects/Player';
import Bullet from '../components/objects/Bullet';
import Ball from '../components/objects/Ball';

export class Level_1 extends Scene {
  constructor() {
    super({
      key: 'Level_1'
    });

    // ===== Global Definitions For This FILE ===== //
    //here the bricks will be stored
    this.bricks = [];
    //how many bricks are used on this map
    this.amountBricks = 38;
    this.ball;

    //amount of lifes on the level
    this.lifes = 1;
    //used for the init loading of hearts at the start of the level
    this.gameStart = true;
  }

  create() {
    this.image = this.add.sprite(240, 160, 'background');

    // ===== BRIIIIIICKS HEART ===== //

    this.bricks[0] = this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick4'],
      frameQuantity: 3,
      gridAlign: {
        width: 3,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 100,
        y: 50
      }
    });
    this.bricks[1] = this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick4'],
      frameQuantity: 3,
      gridAlign: {
        width: 3,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 298,
        y: 50
      }
    });
    this.bricks[2] = this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick5'],
      frameQuantity: 4,
      gridAlign: {
        width: 4,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 100,
        y: 83
      }
    });
    this.bricks[3] = this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick5'],
      frameQuantity: 4,
      gridAlign: {
        width: 4,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 265,
        y: 83
      }
    });
    this.bricks[5] = this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick7'],
      frameQuantity: 9,
      gridAlign: {
        width: 9,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 100,
        y: 116
      }
    });
    this.bricks[6] = this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick8'],
      frameQuantity: 7,
      gridAlign: {
        width: 7,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 133,
        y: 149
      }
    });
    this.bricks[7] = this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick1'],
      frameQuantity: 5,
      gridAlign: {
        width: 5,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 166,
        y: 182
      }
    });
    this.bricks[8] = this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick2'],
      frameQuantity: 3,
      gridAlign: {
        width: 3,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 199,
        y: 215
      }
    });

    // ===== CUSTOM KEYS ===== //

    this.keys = {
      jump: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
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
      key: 'player',
      x: 400,
      y: HEIGHT - 30
    });

    // Create Ball
    //veloc means velocity
    this.ball = new Ball({
      scene: this,
      key: 'ball',
      x: 0,
      y: HEIGHT - 100,
      veloc: {
        x:100,
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
      this.registry.set('HEARTS', this.lifes);
      this.lifes++;
    }
  }
}
