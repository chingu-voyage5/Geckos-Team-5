// config settings
export const WIDTH = 480;
export const HEIGHT = 320;

//the general variable for the style of all ui texts
export const UIFONT = { font: '12px Arial', fill: '#fff' };

// ===== Array of 15 numbers from 0 to 15 ===== //
// === I like this better than writing [ 0, 1, 2, 3, 4, ..... ] === //
const keyButtons = Array.from({ length: 16 }, (_, i) => i);

/**
 * If no gamepad connected, import this
 * gamepad that mimics the gamepad values with all falsy values
 */
export const DEFAULT_PAD = {
  axes: [{ value: 0 }, { value: 1 }],
  buttons: keyButtons.map(key => ({ pressed: false }))
};

/**
 *  Need ES5 function here cause we don't want to catch the `this` value
 *  Call function and bind it to a scene this value
 *  something like checkGamepad.call(this.scene), etc
 */
export const checkGamepad = function() {
  return this.input.gamepad.gamepads.length > 0
    ? this.input.gamepad.gamepads[0]
    : DEFAULT_PAD;
};


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
        music: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)
          
    }
}


// Brick setup for each level 
export const BRICKS = {
  LEVEL_1() {
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
  }
};
