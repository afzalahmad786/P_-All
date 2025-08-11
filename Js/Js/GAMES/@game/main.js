// main.js
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'gameContainer',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
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

let cue;
let balls;
let table;

function preload() {
    this.load.image('table', 'assets/table.png');
    this.load.image('ball', 'assets/ball.png');
    this.load.image('cue', 'assets/cue.png');
}

function create() {
    this.add.image(400, 300, 'table');

    balls = this.physics.add.group({
        key: 'ball',
        repeat: 15,
        setXY: { x: 100, y: 100, stepX: 50 }
    });

    balls.children.iterate(function (ball) {
        ball.setBounce(1);
        ball.setCollideWorldBounds(true);
    });

    cue = this.add.image(400, 500, 'cue').setOrigin(0.5, 1);
    this.input.on('pointermove', function (pointer) {
        cue.x = pointer.x;
    });

    this.input.on('pointerdown', function (pointer) {
        let velocityX = (pointer.x - 400) * 0.5;
        let velocityY = (pointer.y - 300) * 0.5;

        balls.children.iterate(function (ball) {
            if (Phaser.Math.Distance.Between(ball.x, ball.y, pointer.x, pointer.y) < 100) {
                ball.setVelocity(velocityX, velocityY);
            }
        });
    });
}

function update() {
    // Update game logic
}
