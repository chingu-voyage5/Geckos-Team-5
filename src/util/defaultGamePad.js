const keyButtons = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ];



/**
 * If no gamepad connected, import this 
 * gamepad that mimics the gamepad values with all falsy values
 */
export const DefaultPad = {
    axes: [
        { value: 0 }, 
        { value: 1 }
    ],
    buttons: keyButtons.map( key => ( { pressed: false } ) )
};