import { WIDTH, HEIGHT } from '../util/constants';

import {
    songDecider
} from '../components/objects/Music'


export const makeFullScreen = function () {
    let fullscreenFunc = true;

    document.querySelector('#phaser').addEventListener('click', function () {
        if (fullscreenFunc) {
            fullscreenFunc();
            fullscreenFunc = false;
        } else {
            document.querySelector('canvas').style.height = '';
            document.querySelector('canvas').style.margin = '25vh auto';
            fullscreenFunc = true;
        }
    });

    this.input.on(
        'pointerdown',
        function (event) {
            const canvas = this.sys.game.canvas;
            const fullscreen = this.sys.game.device.fullscreen;
            if (!fullscreen.available) {
                return;
            }
            fullscreenFunc = function () {
                canvas[ fullscreen.request ]();
                document.querySelector('canvas').style.height = '80vh';
                document.querySelector('canvas').style.margin = '0';
            };
        },
        this
    );
}

//end the game
export const gameOver = function () {
    this.nextBackground();
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

    if (this.registry.list.lives === 0) {
        this.add.text(
            (WIDTH / 2) * 0.5,
            HEIGHT / 2,
            'Game Over! \n Press any key to try again!'
        );
    } else {
        this.add.text(
            (WIDTH / 2) * 0.5,
            HEIGHT / 2,
            'You won!! \n Press any key to play again!'
        );
    }
}


export const restartGame = function() {
    if (
      this.keys.attack.isDown ||
      this.keys.slide.isDown ||
      ( this.input.gamepad.gamepads.length > 0 ? this.input.gamepad.gamepads[0].buttons[0].pressed : undefined )
    ) {
      //stops the current track for the next to come in
      if (this.registry.list.musicControll) {
        this.music.stop();
      }
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
  }
