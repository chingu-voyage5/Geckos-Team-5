import {
  WIDTH,
  HEIGHT,
  FONT,
  FONTSIZE,
  BACKGROUND_AMOUNT
} from '../util/constants';

import { songDecider, musicStopScene } from '../components/objects/Music';
import { soundPlay } from '../components/objects/Sound';



// ===== GAME LOGIC STUFF  ===== //

export const makeKeys = function() {
  return {
    slide: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
    attack: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
    fire: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
    left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
    right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
    down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
    bomb: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C),
    esc: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC),
    music: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M),
    sound: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P)
  };
};

export const makeFullScreen = function() {

  const canvasEl        = document.querySelector('canvas');
  const phaserContainer = document.querySelector('#phaser');
  let isFullScreen      = false;

  const fullscreenFunc = () => {
    const { canvas, device: { fullscreen } } = this.sys.game;
    canvas[fullscreen.request]();
  };

  const onFullScreenChange = () =>  {
    const fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
    if( !fullscreenElement ) {
      cancelFullScreen()
    } else {
      canvasEl.style.height = '80vh';
      canvasEl.style.margin = '0';
    }
  };

  const cancelFullScreen = () => {
    canvasEl.style.height = '';
    isFullScreen = false;
    canvasEl.style.margin = '25vh auto';
  }


  phaserContainer.addEventListener('click', () => {
    if (!isFullScreen) {
      fullscreenFunc();
    } 
  });

  // === These are necessary cause JS doesn't detect fullscreen stuff normally === //
  // === Plus all the different browsers have their own APIs for that ........ === //
  if( document.addEventListener ) {
    document.addEventListener("webkitfullscreenchange", () => onFullScreenChange(), false);
    document.addEventListener("mozfullscreenchange", () => onFullScreenChange(), false);
    document.addEventListener('MSFullscreenChange', () => onFullScreenChange(), false);
    document.addEventListener("fullscreenchange", () => onFullScreenChange(), false);
  }

};


//end the game
export const gameOver = function() {
  nextBackground.call(this);
  // selects new brick pattern
  this.brickPatternNumber = patternNumber(this.brickPatternNumber);
  // counts the new bricks
  for (let i = 0; i < this.bricks.length; i++) {
    this.amountBricks += this.bricks[i].children.entries.length;
  }
  //switches to the next track
  let songNumber = songDecider(this.registry.list.currentSongNumber);
  //saves the track number in the registry
  this.registry.set('currentSongNumber', songNumber);
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
  this.scene.stop('UIScene');

  //stops the normal music upon game over because it collides with the sounds
  musicStopScene(this.currentSong.toString(), this);

  if (this.registry.list.lives === 0) {
    this.registry.set('sessionAlive', false);

    //game over sound
    soundPlay('sound_gameover', this);
    this.add.bitmapText(
      0,
      HEIGHT - 80,
      FONT,
      'Game Over! Score: ' +
        this.registry.list.SCORE +
        ' and Playtime: ' +
        fancyTimeFormat(this.registry.list.SESSIONTIMER) +
        '\nPress C to try again!',
      FONTSIZE
    );
    this.registry.set('SESSIONTIMER', 0);
  } else {
    this.registry.set('sessionAlive', true);
    //game win sound
    soundPlay('sound_gamewin', this);
    this.add.bitmapText(
      0,
      HEIGHT - 80,
      FONT,
      '\nPress C to start next stage!',
      FONTSIZE
    );
  }
};

export const restartGame = function() {
  if (
    this.keys.bomb.isDown ||
    (this.input.gamepad.gamepads.length > 0
      ? this.input.gamepad.gamepads[0].buttons[0].pressed
      : undefined)
  ) {
    //stops the current track for the next to come in
    musicStopScene(this.currentSong.toString(), this);

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
        this.registry.set('TIMER', [0, 0, ':', 0, 0, 0]);
        this.events.off();
        this.scene.restart();
      },
      [],
      this
    );
  }
};

//brick pattern numbers
export const patternNumber = function(oldNumber) {
  let number = Math.floor(Math.random() * 6) + 1;
  if (number == oldNumber) {
    number++;
    if (number > 6) {
      number = 1;
    }
  }
  return number;
};

// ===== BACKGROUND STUFF ===== //

//cycles to the next background

export const nextBackground = function() {
  this.backgroundArrayIndex++;

  //if we had 5 backgrounds it makes a new order for the backgrounds and resets the backgroundArrayIndex
  if (this.backgroundArrayIndex == this.backgroundArray.length) {
    let oldBackgroundArray = this.backgroundArray;
    this.backgroundArrayIndex = 1;

    newBackgroundArray.call(this, this.backgroundArray);
    //prevents the new order to start with the last background
    while (oldBackgroundArray[BACKGROUND_AMOUNT] == this.backgroundArray[1]) {
      newBackgroundArray.call(this, this.backgroundArray);
    }
  }
};

//just use whoever backgrounds there are as numbers --> 3 background is [1,2,3] || 10 background is [1,2,3,4,5,6,7,8,9,10]
export const newBackgroundArray = function() {
  //the shuffle function shuffles the array numbers randomly
  this.backgroundArray = shuffle([1, 2, 3, 4, 5, 6]);
  //the zero does not represent a background but is to allow the backgroundArrayIndex to be easier to read and all following code to be understood easier
  this.backgroundArray.unshift(0);
};

// ===== OTHER GENERAL HELPER FUNCTIONS ===== //

//shuffles an array randomly
export const shuffle = function(array) {
  var tmp,
    current,
    top = array.length;
  if (top)
    while (--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }
  return array;
};

//copied from : https://stackoverflow.com/questions/3733227/javascript-seconds-to-minutes-and-seconds
function fancyTimeFormat(s) {
  return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s;
}
