// main.js
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'gameContainer',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let player;
let cursors;
let bullets;
let lastFired = 0;
let enemies;

function preload() {
    this.load.image('player', 'assets/player.png');
    this.load.image('enemy', 'assets/enemy.png');
    this.load.image('island', 'assets/island.png');
    this.load.image('bullet', 'assets/bullet.png');
}

function create() {
    this.add.image(400, 300, 'island');
    
    player = this.physics.add.sprite(400, 500, 'player').setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();
    
    bullets = this.physics.add.group({
        defaultKey: 'bullet',
        maxSize: 10
    });

    enemies = this.physics.add.group({
        key: 'enemy',
        repeat: 5,
        setXY: { x: 100, y: 100, stepX: 120 }
    });

    this.physics.add.collider(bullets, enemies, hitEnemy, null, this);
}

function update(time, delta) {
    if (cursors.left.isDown) {
        player.setVelocityX(-200);
    } else if (cursors.right.isDown) {
        player.setVelocityX(200);
    } else {
        player.setVelocityX(0);
    }

    if (cursors.up.isDown) {
        player.setVelocityY(-200);
    } else if (cursors.down.isDown) {
        player.setVelocityY(200);
    } else {
        player.setVelocityY(0);
    }

    if (cursors.space.isDown && time > lastFired) {
        let bullet = bullets.get(player.x, player.y);
        if (bullet) {
            bullet.setActive(true);
            bullet.setVisible(true);
            bullet.setVelocityY(-300);
            lastFired = time + 100;
        }
    }

    bullets.children.each(function(bullet) {
        if (bullet.active && bullet.y < 0) {
            bullet.setActive(false);
            bullet.setVisible(false);
        }
    }, this);
}

function hitEnemy(bullet, enemy) {
    bullet.setActive(false);
    bullet.setVisible(false);
    enemy.disableBody(true, true);
}
