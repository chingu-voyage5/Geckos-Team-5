// config settings
export const WIDTH = 480;
export const HEIGHT = 320;

//the general variable for the style of all ui texts
export const FONT = 'pokemon_classic';
export const FONTSIZE = 18;

//the amount of backgrounds in the assets. Needs change upon inclusion of new backgrounds
export const BACKGROUND_AMOUNT = 6;

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


// Brick setup for each level 
//it consists of 6 patterns, named Level_1, Level_2 ...
export const BRICKS = {
  LEVEL_1() {
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick4'],
      frameQuantity: 3,
      gridAlign: {
        width: 3,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 110,
        y: 50
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick4'],
      frameQuantity: 3,
      gridAlign: {
        width: 3,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 308,
        y: 50
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick5'],
      frameQuantity: 4,
      gridAlign: {
        width: 4,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 110,
        y: 83
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick5'],
      frameQuantity: 4,
      gridAlign: {
        width: 4,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 275,
        y: 83
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick7'],
      frameQuantity: 9,
      gridAlign: {
        width: 9,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 110,
        y: 116
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick8'],
      frameQuantity: 7,
      gridAlign: {
        width: 7,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 143,
        y: 149
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick1'],
      frameQuantity: 5,
      gridAlign: {
        width: 5,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 176,
        y: 182
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick2'],
      frameQuantity: 3,
      gridAlign: {
        width: 3,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 209,
        y: 215
      }
    }));
  },
  LEVEL_2() {
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick4'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77,
        y: 83
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick1'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77+66,
        y: 83
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick4'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 66+66,
        y: 83
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick4'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 66 + 66 + 66,
        y: 83
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick7'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 66 + 66 + 66 + 66,
        y: 83
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick4'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 66 + 66 + 66 + 66 + 66,
        y: 83
      }
    }));
    //second row
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick2'],
      frameQuantity: 2,
      gridAlign: {
        width: 1,
        height: 2,
        cellWidth: 33,
        cellHeight: 33,
        x: 77+33,
        y: 116
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick2'],
      frameQuantity: 2,
      gridAlign: {
        width: 1,
        height: 2,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 33+66,
        y: 116
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick5'],
      frameQuantity: 2,
      gridAlign: {
        width: 1,
        height: 2,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 33+66+66,
        y: 116
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick8'],
      frameQuantity: 2,
      gridAlign: {
        width: 1,
        height: 2,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 33 +66+66+66,
        y: 116
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick8'],
      frameQuantity: 2,
      gridAlign: {
        width: 1,
        height: 2,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 33+66+66+66+66,
        y: 116
      }
    }));
    // 4 row
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick4'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77,
        y: 182
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick1'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77+66,
        y: 182
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick4'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77+2*66,
        y: 182
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick4'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77+3*66,
        y: 182
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick7'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77+4*66,
        y: 182
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick4'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77+5*66,
        y: 182
      }
    }));
  },
  LEVEL_3() {
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick4'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77,
        y: 83
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick2'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77+33,
        y: 83
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick5'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77+5*33,
        y: 83
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick8'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77+9*33,
        y: 83
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick4'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77+10*33,
        y: 83
      }
    }));
    //second row
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick4'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77+33,
        y: 116
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick1'],
      frameQuantity: 3,
      gridAlign: {
        width: 3,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 2*33,
        y: 116
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick4'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 5*33,
        y: 116
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick7'],
      frameQuantity: 3,
      gridAlign: {
        width: 3,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 6*33,
        y: 116
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick4'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 9*33,
        y: 116
      }
    }));
    //third row
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick2'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 33,
        y: 149
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick4'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 2*33,
        y: 149
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick1'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 3*33,
        y: 149
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick4'],
      frameQuantity: 3,
      gridAlign: {
        width: 3,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 4*33,
        y: 149
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick7'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 7*33,
        y: 149
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick4'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 8*33,
        y: 149
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick8'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 9*33,
        y: 149
      }
    }));
    //4 row
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick4'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 3*33,
        y: 182
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick8'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 4*33,
        y: 182
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick2'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 6 * 33,
        y: 182
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick4'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 7 * 33,
        y: 182
      }
    }));
  },
  LEVEL_4() {
    //1 row
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick1'],
      frameQuantity: 5,
      gridAlign: {
        width: 1,
        height: 5,
        cellWidth: 33,
        cellHeight: 33,
        x: 77+33,
        y: 50
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick7'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77+2*33,
        y: 50
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick1'],
      frameQuantity: 7,
      gridAlign: {
        width: 7,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 3*33,
        y: 50
      }
    }));
    //2 row
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick4'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 2*33,
        y: 83
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick1'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 3*33,
        y: 83
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick4'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 4*33,
        y: 83
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick7'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 5*33,
        y: 83
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick4'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 6*33,
        y: 83
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick7'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 7*33,
        y: 83
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick4'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 8*33,
        y: 83
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick1'],
      frameQuantity: 4,
      gridAlign: {
        width: 1,
        height: 4,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 9*33,
        y: 83
      }
    }));
    //3 row
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick7'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 2*33,
        y: 116
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick1'],
      frameQuantity: 5,
      gridAlign: {
        width: 5,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 3 * 33,
        y: 116
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick7'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 8 * 33,
        y: 116
      }
    }));
    //4 row
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick4'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 2 * 33,
        y: 149
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick7'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 3 * 33,
        y: 149
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick4'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 4 * 33,
        y: 149
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick7'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 5 * 33,
        y: 149
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick4'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 6 * 33,
        y: 149
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick7'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 7 * 33,
        y: 149
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick4'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 8 * 33,
        y: 149
      }
    }));
    //5 row
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick1'],
      frameQuantity: 7,
      gridAlign: {
        width: 7,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 2 * 33,
        y: 182
      }
    }));
  },
  LEVEL_5() {
    //1 row
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick7'],
      frameQuantity: 2,
      gridAlign: {
        width: 2,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77,
        y: 50
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick4'],
      frameQuantity: 3,
      gridAlign: {
        width: 3,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77+4*33,
        y: 50
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick7'],
      frameQuantity: 2,
      gridAlign: {
        width: 2,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77+9*33,
        y: 50
      }
    }));
    //2 row
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick5'],
      frameQuantity: 3,
      gridAlign: {
        width: 3,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 33,
        y: 83
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick5'],
      frameQuantity: 3,
      gridAlign: {
        width: 3,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 7*33,
        y: 83
      }
    }));
    //3 row
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick7'],
      frameQuantity: 2,
      gridAlign: {
        width: 2,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 33,
        y: 116
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick4'],
      frameQuantity: 3,
      gridAlign: {
        width: 3,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 4*33,
        y: 116
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick7'],
      frameQuantity: 2,
      gridAlign: {
        width: 2,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 8*33,
        y: 116
      }
    }));
    //4 row
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick2'],
      frameQuantity: 3,
      gridAlign: {
        width: 3,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 33,
        y: 149
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick7'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 5*33,
        y: 149
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick2'],
      frameQuantity: 3,
      gridAlign: {
        width: 3,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 7*33,
        y: 149
      }
    }));
    //5 row
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick1'],
      frameQuantity: 3,
      gridAlign: {
        width: 3,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 4*33,
        y: 182
      }
    }));
  },
  LEVEL_6() {
    //1 row
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick4'],
      frameQuantity: 5,
      gridAlign: {
        width: 5,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77+3*33,
        y: 50
      }
    }));
    //2 row
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick2'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 ,
        y: 83
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick5'],
      frameQuantity: 5,
      gridAlign: {
        width: 5,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 3 * 33,
        y: 83
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick8'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 10 * 33,
        y: 83
      }
    }));
    //3 row
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick1'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77,
        y: 116
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick4'],
      frameQuantity: 3,
      gridAlign: {
        width: 3,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 4 * 33,
        y: 116
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick7'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 10 * 33,
        y: 116
      }
    }));
    //4 row
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick2'],
      frameQuantity: 2,
      gridAlign: {
        width: 2,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77,
        y: 149
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick5'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77+5*33,
        y: 149
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick8'],
      frameQuantity: 2,
      gridAlign: {
        width: 2,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 9 * 33,
        y: 149
      }
    }));
    //5 row
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick1'],
      frameQuantity: 3,
      gridAlign: {
        width: 3,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77,
        y: 182
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick4'],
      frameQuantity: 1,
      gridAlign: {
        width: 1,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 5 * 33,
        y: 182
      }
    }));
    this.bricks.push(this.physics.add.staticGroup({
      key: 'bricks',
      frame: ['brick7'],
      frameQuantity: 3,
      gridAlign: {
        width: 3,
        height: 1,
        cellWidth: 33,
        cellHeight: 33,
        x: 77 + 8 * 33,
        y: 182
      }
    }));
  }
};
