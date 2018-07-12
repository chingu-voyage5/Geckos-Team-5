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

    /* 
      Define variables for controlling the bullet shower:
       - `bulletShowerTriggered` for determining the current state of the bullet shower
       - `bulletShowerTimer` for holding the `TimerEvent` that controls the bullet shower
       - `bulletWaveCycle` for determining which wave cycle the bullet shower is currently on
       - `bulletCycleDelay` for determining the delay between cycles
       - `bulletShowerDelay` for determining the delay before the bullet shower is triggered
    */
    this.bulletShowerTriggered = false;
    this.bulletShowerTimer;
    this.bulletWaveCycle = 0;
    this.bulletCycleDelay;
    this.bulletShowerDelay;
    this.bulletShowerCooldownTimer;
    this.bulletShowerCycle = 0;
    this.isGameOver = false;
  }

  create() {
    //loading the sounds into the scene look into sound.js
    soundAdder(this);
    //makes music accessible to the scene
    musicAdder(this);

    this.bulletCycleDelay = this.registry.list.bulletCycleDelay
      ? this.registry.list.bulletCycleDelay
      : 5000;
    this.bulletShowerDelay = this.registry.list.bulletShowerDelay
      ? this.registry.list.bulletShowerDelay
      : 60;

    // ===== Level Variables ===== //
    this.gameStart = true;
    this.amountBricks = 0; //will later contain the number of bricks
    this.isPlayerAlive = true;

    if (this.registry.list.sessionAlive) {
      if (this.bulletCycleDelay > 1500) {
        this.registry.set('bulletShowerDelay', this.bulletCycleDelay - 350);
      }
      if (this.bulletShowerDelay > 20) {
        this.registry.set('bulletWaveDelay', this.bulletShowerDelay - 10);
      }
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
      this.isGameOver = false;
      this.physics.world.resume();
      this.events.emit('resumeTimer');
      this.ball.anims.resume();
    }
    // ===== BULLET ===== //
    if (
      //changed to justdown to prevent sound spam
      Phaser.Input.Keyboard.JustDown(this.keys.fire) ||
      pad.buttons[1].pressed ||
      pad.buttons[7].pressed
    ) {
      //makes the sound of the bullet
      if( this.isGameOver ) return;
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
      this.bulletShowerTriggered = false;
      if (this.bulletShowerTimer) {
        this.bulletShowerTimer.destroy();
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

    const showerFlag =
      this.bulletShowerDelay === 60
        ? this.registry.list.TIMER[1] === 1
        : this.registry.list.TIMER[3] ===
          parseInt(`${this.bulletShowerDelay}`.charAt(0));

    if (showerFlag && !this.bulletShowerTriggered) {
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
    // Set the spacing for each row of the bullet shower
    const section = WIDTH / 12;

    for (let i = 0; i < 10; i++) {
      // get the angle at which the bullet is fired
      const angle = this.getBulletAngle();

      // get the x-coordinate from which the bullet is fired
      const startX = this.getStartingX(section, angle, i);

      // get the x-coordinate to which the bullet will be fired
      const targetX = this.getTargetX(startX, section, angle);
      this.fireEnemyBullet(startX, 0, targetX);
    }

    this.bulletWaveCycle++;

    /*
      reset the wave cycle counter every 4 cycles to
      indicate that the wave is complete, and put the
      bullet shower on a cooldown of `this.bulletCycleDelay` seconds
    */
    if (this.bulletWaveCycle === 4) {
      this.pauseBulletShower();
      this.bulletWaveCycle = 0;
      setTimeout(() => {
        this.resumeBulletShower();
      }, this.bulletCycleDelay);
    }
  }

  getBulletAngle() {
    /* 
      Set angle of bullet to one of three options:
       - 0: Left-to-right
       - 1: No angle (straight down)
       - 2: Right-to-left
    */

    return Math.floor(Math.random() * 3);
  }

  /* 
    For the bullet shower, the screen is divided
    into 12 segments (1.e. `section`)
    of  `WITDH`/12 pixels wide. 
    10 columns of bullets will be fired,
    starting at `section pixels to the left of
    the edge of the canvas to `WIDTH - section` pixels
    from the right of the screen.
    Each bullet will have it's origin at `section * column` pixels
    from the left of the screen, from which it will either 
    be shifted to the left or to the right
  */

  getStartingX(section, angle, column) {
    // Set the range of possible values for the x-shift of the bullet
    const range = section / 2;

    // Generate a number between `-1 * range / 2` to `range / 2`
    const shift = Math.random() * range - range / 2;
    return (
      section +
      section * column +
      (angle === 0 ? 0 : angle === 1 ? section / 2 : section) +
      shift
    );
  }

  getTargetX(startX, section, angle) {
    const range = section / 2;
    const shift = Math.random() * range - range / 2;
    return startX + section * (angle === 2 ? -1 : angle === 0 ? 1 : 0) + shift;
  }

  /* 
    Create the time event for the bullet shower and 
  */
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
