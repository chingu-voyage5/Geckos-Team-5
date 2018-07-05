import { Scene } from 'phaser';
import { WIDTH, HEIGHT, BRICKS, checkGamepad } from '../util/constants';
import Player from '../components/objects/Player';
import Bullet from '../components/objects/Bullet';
import Ball from '../components/objects/Ball';
import EnemyBullet from '../components/enemy/EnemyBullet';
import {
  musicStart,
  musicStop,
} from '../components/objects/Music';

import {
    makeKeys,
    makeFullScreen,
    gameOver,
    restartGame,
    newBackgroundArray
} from '../util/GameHelpers'

export class Level_1 extends Scene {
  constructor() {
    super({
      key: 'Level_1'
    });

    // ===== Global Definitions For This FILE ===== //

    this.bricks = []; //here the bricks will be stored
    this.ball;

    // ===== Background ===== //

    //on background changes do not forget to change this.newbackgroundArray()
    this.backgroundArray = [];
    //spawns new background order
    newBackgroundArray.call(this);
    //starts always at 1
    this.backgroundArrayIndex = 1;
  }

  create() {
    // Enables fullscreen on canvas click
    makeFullScreen.call(this);

    // ===== Level Variables ===== //
    this.gameStart = true;
    this.lives = 3;
    this.amountBricks = 38; //how many bricks are used on this map
    this.isPlayerAlive = true;

    this.registry.set('lives', this.lives);

    this.scene.launch('UIScene');

    // adding the background / inside backgroundArray are the numbers for the pictures and they are randomly sorted, with the help of the Index it can be shifted  to the next one in the array on new game
    this.image = this.add.sprite(
      240,
      160,
      'background' + this.backgroundArray[this.backgroundArrayIndex]
    );

    // ===== BRIIIIIICKS HEART ===== //

    BRICKS.LEVEL_1.call(this);

    // ===== CUSTOM KEYS ===== //
    this.keys = makeKeys.call(this);

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
        x: 100,
        y: -80
      }
    });

    // ===== Set up a creation of bullets for the scene ===== //

    this.player.create.call(this);

    // ===== Can Probably move this to Player file for refactor ===== //

    this.bullets = this.add.group({
      classType: Bullet,
      runChildUpdate: true
    });

    this.enemyBullets = this.add.group({
      classType: EnemyBullet,
      runChildUpdate: true
    });

    this.startText = this.add.text(
      (WIDTH / 2) * 0.5,
      HEIGHT / 2,
      'Press space to start game!'
    );

    // pause and start game on player input
    this.physics.world.pause();

    //the song name is being chosen
    this.currentSong = 'song' + Number(this.registry.list.currentSongNumber);

    //if the scene is restarted and music is activated, it will start the new track
    if (this.registry.list.musicControll) {
      musicStart(this.currentSong, this);
    }
  }

  update(time, delta) {
    let pad = checkGamepad.call(this); 
    if (
      (this.gameStart && Phaser.Input.Keyboard.JustDown(this.keys.slide)) ||
      pad.buttons[0].pressed
    ) {
      this.startText.visible = false;
      this.gameStart = false;
      this.physics.world.resume();
    }
    // ===== BULLET ===== //
    if (
      this.keys.fire.isDown ||
      pad.buttons[1].pressed ||
      pad.buttons[7].pressed
    ) {
      let bullet = this.bullets.get();
      if (bullet) {
        bullet.fire(this.player.x, this.player.y - 30);
      }
    }

    this.player.update(this.keys, time, delta);

    //tracks the y changes in the velocity because add.collider is a bitch
    this.ball.update();

    if (
      (this.registry.list.lives < 1 && this.isPlayerAlive) ||
      (this.amountBricks === 0 && this.isPlayerAlive)
    ) {
      this.gameStart = true;
      gameOver.call(this);
    }

    if (!this.isPlayerAlive) {
      this.gameStart = true;
      restartGame.call(this);
    }
    if (
      Phaser.Input.Keyboard.JustDown(this.keys.esc) ||
      pad.buttons[9].pressed
    ) {
      // this.registry.destroy();
      // this.events.off();
      this.scene.start('Title');
      this.scene.stop('Level_1');
      this.scene.stop('UIScene');
    }

    //music start stop
    if (Phaser.Input.Keyboard.JustDown(this.keys.music)) {
      if (!this.registry.list.musicControll) {
        musicStart(this.currentSong, this);
      } else {
        musicStop(this);
      }
    }
  }

 

  fireEnemyBullet(x, y) {
    let bullet = this.enemyBullets.get();
    if (bullet) {
      bullet.fire(x, y, this.player.x, this.player.y);
    }
  }

}
