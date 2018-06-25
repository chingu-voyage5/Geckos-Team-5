export default function makeAnimations(scene) {
  let config = {
    key: 'run',
    frames: scene.anims.generateFrameNumbers('player', {
      start: 1,
      end: 4
    }),
    frameRate: 10,
    repeat: -1
  };

  scene.anims.create(config);

  config = {
    key: 'sword',
    frames: scene.anims.generateFrameNumbers('player', {
      start: 14,
      end: 17
    }),
    frameRate: 20
  };
  scene.anims.create(config);

  config = {
    key: 'attackUp',
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
    key: 'turn',
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
    key: 'ballAnim',
    frames: scene.anims.generateFrameNumbers('ball', { start: 0, end: 3, first: 0 }),
    frameRate: 8
  };

  scene.anims.create(config);
}
