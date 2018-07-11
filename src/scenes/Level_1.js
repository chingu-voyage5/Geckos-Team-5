import { Scene } from 'phaser';
import {
  WIDTH,
  HEIGHT,
  BRICKS,
  checkGamepad,
  FONT,
  FONTSIZE
} from '../util/constants';
import Player from '../components/objects/Player';
import Bullet from '../components/objects/Bullet';
import { soundAdder, soundPlay } from '../components/objects/Sound';
import Ball from '../components/objects/Ball';
import EnemyBullet from '../components/enemy/EnemyBullet';
import {
  musicStart,
  musicStop,
  musicStopScene,
  musicAdder
} from '../components/objects/Music';
import {
  makeKeys,
  gameOver,
  restartGame,
  newBackgroundArray,
  patternNumber
} from '../util/GameHelpers';

export class Level_1 extends Scene {
  constructor() {
    super({ key: 'Level_1' });

    // ===== Global Definitions For This FILE ===== //

    this.bricks = []; //here the bricks will be stored
    this.brickPatternNumber = patternNumber(0); //number of the brick pattern
    this.ball;

    // ===== Background ===== //

    //on background changes do not forget to change this.newbackgroundArray()
    this.backgroundArray = [];
    //spawns new background order
    newBackgroundArray.call(this);
    //starts always at 1
    this.backgroundArrayIndex = 1;

    this.bulletShowerTriggered = false;
    this.bulletShowerTimer;
    this.bulletShowerCooldownTimer;
    this.bulletShowerCycle = 0;
    this.isGameOver = false;
  }

  create() {
    //loading the sounds into the scene look into sound.js
    soundAdder(this);
    //makes music accessible to the scene
    musicAdder(this);

    // ===== Level Variables ===== //
    this.gameStart = true;
    this.amountBricks = 0; //will later contain the number of bricks
    this.isPlayerAlive = true;

    if (this.registry.list.sessionAlive) {
      this.lives = this.registry.list.lives;
    } else {
      this.lives = 5;
      this.registry.set('SESSIONTIMER', 0);
    }

    this.registry.set('lives', this.lives);

    this.scene.launch('UIScene');

    // adding the background / inside backgroundArray are the numbers for the pictures and they are randomly sorted, with the help of the Index it can be shifted  to the next one in the array on new game
    this.image = this.add.sprite(
      240,
      160,
      'background' + this.backgroundArray[this.backgroundArrayIndex]
    );

    // ===== BRIIIIIICKS HEART ===== //

    //selects the prick pattern
    BRICKS['LEVEL_' + this.brickPatternNumber].call(this);

    //counts the amount of bricks in the scene
    for (let i = 0; i < this.bricks.length; i++) {
      this.amountBricks += this.bricks[i].children.entries.length;
    }

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

    this.startText = this.add.bitmapText(
      (WIDTH / 2) * 0.45,
      HEIGHT - 80,
      FONT,
      'Press space to start game!',
      FONTSIZE
    );

    // pause and start game on player input
    this.physics.world.pause();

    //the song name is being chosen
    this.currentSong = 'song' + Number(this.registry.list.currentSongNumber);

    //if the scene is restarted and music is activated, it will start the new track
    if (this.registry.list.musicControl) {
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
      this.events.emit('resumeTimer');
    }
    // ===== BULLET ===== //
    if (
      //changed to justdown to prevent sound spam
      Phaser.Input.Keyboard.JustDown(this.keys.fire) ||
      pad.buttons[1].pressed ||
      pad.buttons[7].pressed
    ) {
      //makes the sound of the bullet
      soundPlay('sound_bullet', this);
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
      this.events.emit('pauseTimer');
      if (this.bulletShowerTimer) {
        this.bulletShowerTimer.paused = true;
      }
      gameOver.call(this);
    }

    if (!this.isPlayerAlive) {
      restartGame.call(this);
    }
    if (
      Phaser.Input.Keyboard.JustDown(this.keys.esc) ||
      pad.buttons[9].pressed
    ) {
      this.scene.start('Title');
      musicStopScene(this.currentSong.toString(), this);
      this.scene.stop('Level_1');
      this.scene.stop('UIScene');
    }

    //music start stop
    if (Phaser.Input.Keyboard.JustDown(this.keys.music)) {
      if (!this.registry.list.musicControl) {
        musicStart(this.currentSong, this);
      } else {
        musicStop(this.currentSong.toString(), this);
      }
    } else if (Phaser.Input.Keyboard.JustDown(this.keys.sound)) {
      //sound start stop
      if (!this.registry.list.soundControl) {
        this.registry.set('soundControl', true);
      } else {
        this.registry.set('soundControl', false);
      }
    }

    if (this.registry.list.TIMER[1] === 1 && !this.bulletShowerTriggered) {
      this.triggerBulletShower();
    }
  }

  fireEnemyBullet(x, y, targetX) {
    let bullet = this.enemyBullets.get();
    if (bullet) {
      bullet.fire(x, y, targetX);
    }
  }

  createBulletShower() {
    const section = WIDTH / 2 / 3;
    for (let i = 0; i < 3; i++) {
      const startX_left = section * i;
      const targetX_left = startX_left + section;

      const startX_right = WIDTH - section * i;
      const targetX_right = startX_right - section;

      this.fireEnemyBullet(startX_left, 0, targetX_left);
      this.fireEnemyBullet(startX_right, 0, targetX_right);
    }

    this.bulletShowerCycle++;
    if (this.bulletShowerCycle === 4) {
      this.pauseBulletShower();
      this.bulletShowerCycle = 0;
      setTimeout(() => {
        this.resumeBulletShower();
      }, 5000);
    }
  }

  triggerBulletShower() {
    this.bulletShowerTriggered = true;

    this.bulletShowerTimer = this.time.addEvent({
      delay: 800,
      callback: this.createBulletShower,
      callbackScope: this,
      loop: true
    });
  }

  pauseBulletShower() {
    this.bulletShowerTimer.paused = true;
  }

  resumeBulletShower() {
    this.bulletShowerTimer.paused = false;
  }
}
