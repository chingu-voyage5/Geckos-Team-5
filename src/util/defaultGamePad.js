// ===== Array of 15 numbers from 0 to 15 ===== //
// === I like this better than writing [ 0, 1, 2, 3, 4, ..... ] === //
const keyButtons = Array.from( { length: 16 }, ( _, i ) => i );

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