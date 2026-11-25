import { WIDTH, HEIGHT, PLAYER_SPEED, ENEMY_COUNT, ENEMY_SPEED } from './config.js';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    create() {
        this.cameras.main.setBackgroundColor('#80502d');
        this.player = this.physics.add.sprite(WIDTH / 2, HEIGHT / 2, 'player').setScale(0.5);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.rocks = this.physics.add.group();
        this.enemies = this.physics.add.group();
        this.createEnemies();

        this.physics.add.collider(this.player, this.rocks);
        this.physics.add.collider(this.enemies, this.rocks);
    }

    createEnemies() {
        for (let i = 0; i < ENEMY_COUNT; i++) {
            const enemy = this.enemies.create(
                Phaser.Math.Between(100, WIDTH - 100),
                Phaser.Math.Between(100, HEIGHT - 100),
                'enemy'
            ).setScale(0.5);
            enemy.setVelocity(
                Phaser.Math.Between(-ENEMY_SPEED, ENEMY_SPEED),
                Phaser.Math.Between(-ENEMY_SPEED, ENEMY_SPEED)
            );
            enemy.setBounce(1);
        }
    }

    update() {
        const { left, right, up, down } = this.cursors;
        this.player.setVelocityX(left.isDown ? -PLAYER_SPEED : right.isDown ? PLAYER_SPEED : 0);
        this.player.setVelocityY(up.isDown ? -PLAYER_SPEED : down.isDown ? PLAYER_SPEED : 0);
    }
}
