import { WIDTH, HEIGHT, FONT, FONTSIZE, BACKGROUND_AMOUNT } from '../util/constants';

import {
    songDecider, musicStopScene
} from '../components/objects/Music'
import {
    soundPlay
} from '../components/objects/Sound'



// ===== GAME LOGIC STUFF  ===== //



export const makeKeys = function() {
    return {
        slide : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
        attack: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
        fire  : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
        left  : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
        right : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
        down  : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
        bomb  : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C),
        esc   : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC),
        music : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M),
        sound: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P)
    }
}


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
    musicStopScene(this.currentSong.toString(),this);
    
    if (this.registry.list.lives === 0) {
        //game over sound
        soundPlay('sound_gameover', this);
        this.add.bitmapText(
            (WIDTH / 2) * 0.5,
            HEIGHT - 80, FONT,
            'Game Over! Score: ' + this.registry.list.SCORE + '\nPress any key to try again!', FONTSIZE
        );
    } else {
        //game win sound
        soundPlay('sound_gamewin', this);
        this.add.bitmapText(
            (WIDTH / 2) * 0.5,
            HEIGHT - 80, FONT,
            'You won!! Score: ' + this.registry.list.SCORE + '\nPress any key to play again!', FONTSIZE
        );
    }
}


export const restartGame = function () {
    if (
        this.keys.attack.isDown ||
        this.keys.slide.isDown ||
        (this.input.gamepad.gamepads.length > 0 ? this.input.gamepad.gamepads[ 0 ].buttons[ 0 ].pressed : undefined)
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
                this.registry.set('TIMER', [ 0, 0, ':', 0, 0, 0 ]);
                this.events.off();
                this.scene.restart();
            },
            [],
            this
        );
    }
}

//brick pattern numbers
export const patternNumber = function (oldNumber) {
    let number = Math.floor(Math.random() * 6) + 1;
    if (number == oldNumber) {
        number++;
        if (number > 6) {
            number = 1
        }
    }
    return number;
}


// ===== BACKGROUND STUFF ===== //

//cycles to the next background
export const nextBackground = function () {
    this.backgroundArrayIndex++;

    //if we had 5 backgrounds it makes a new order for the backgrounds and resets the backgroundArrayIndex
    if (this.backgroundArrayIndex == this.backgroundArray.length) {
        let oldBackgroundArray = this.backgroundArray;
        this.backgroundArrayIndex = 1;

        newBackgroundArray.call(this, this.backgroundArray);
        //prevents the new order to start with the last background
        while (oldBackgroundArray[ BACKGROUND_AMOUNT ] == this.backgroundArray[ 1 ]) {
            newBackgroundArray.call(this, this.backgroundArray);
        }
    }
}

//just use whoever backgrounds there are as numbers --> 3 background is [1,2,3] || 10 background is [1,2,3,4,5,6,7,8,9,10]
export const newBackgroundArray = function () {
    //the shuffle function shuffles the array numbers randomly
    this.backgroundArray = shuffle([ 1, 2, 3, 4, 5, 6 ]);
    //the zero does not represent a background but is to allow the backgroundArrayIndex to be easier to read and all following code to be understood easier
    this.backgroundArray.unshift(0);
}



// ===== OTHER GENERAL HELPER FUNCTIONS ===== //

//shuffles an array randomly
export const shuffle = function(array) {
    var tmp,
        current,
        top = array.length;
    if (top)
        while (--top) {
            current = Math.floor(Math.random() * (top + 1));
            tmp = array[ current ];
            array[ current ] = array[ top ];
            array[ top ] = tmp;
        }
    return array;
}
