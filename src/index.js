import 'phaser';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);


// ===== Global Definitions For This FILE ===== //

let player;
let Bricks;
let cursors;

function preload() {
    this.load.image('sky', 'src/assets/images/sky.png');
    this.load.image('platform', 'src/assets/images/platform.png');
    this.load.spritesheet(
        'player',
        'src/assets/spritesheets/player.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}

function create() {

    cursors = this.input.keyboard.createCursorKeys();
    console.log(Phaser.Input.Keyboard.KeyCodes);

    this.add.image(400, 300, 'sky');

    player = this.physics.add.sprite(400, config.height - 30, 'player');
    player.setCollideWorldBounds(true);
    player.body.setGravityY(300);
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'player', frame: 0 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

}

function update() {
    if (cursors.left.isDown) {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.onFloor()) {
        player.setVelocityY(-330);
    }
}
