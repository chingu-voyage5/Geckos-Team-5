export default function makeAnimations(scene) {
  let config = {
    key: 'run', //running to the side
    frames: scene.anims.generateFrameNumbers('player', {
      start: 1,
      end: 4
    }),
    frameRate: 10, //this controls the animation length, the higher the number the faster the animation
    repeat: -1
  };

  scene.anims.create(config);

  config = {
    key: 'sword', //sword swing
    frames: scene.anims.generateFrameNumbers('player', {
      start: 14,
      end: 16
    }),
    frameRate: 14
  };
  scene.anims.create(config);

  config = {
    key: 'attackUp', //a spelly looking arm swing
    frames: scene.anims.generateFrameNumbers('player', {
      start: 27,
      end: 30
    }),
    frameRate: 10
  };
  scene.anims.create(config);

  config = {
    key: 'slide',
    frames: scene.anims.generateFrameNumbers('player', {
      start: 5,
      end: 6
    }),
    frameRate: 10
  };
  scene.anims.create(config);

  config = {
    key: 'turn', //the back of the character, the default position
    frames: [
      {
        key: 'player',
        frame: 0
      }
    ],
    frameRate: 20
  };
  scene.anims.create(config);

  config = {
    key: 'ballAnim', //the ball is rotating, done with 4 frames
    frames: scene.anims.generateFrameNumbers('ball', {
      start: 0,
      end: 3,
      first: 0
    }),
    frameRate: 8
  };

  scene.anims.create(config);
}
