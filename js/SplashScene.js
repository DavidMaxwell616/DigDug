import { WIDTH, HEIGHT } from './config.js';
import DigDugFont from './DigDugFont.js';

export default class SplashScene extends Phaser.Scene {
    constructor() {
        super('Splash');
    }

    preload() {
        this.load.image('splash', 'assets/splash.png');
        this.load.image('title', 'assets/title.png');
        DigDugFont.preload(this);
    }

    create() {
        this.font = new DigDugFont(this);
        this.createPlaceholderTextures();

        this.add.image(WIDTH / 2, HEIGHT / 2, 'splash')
            .setDisplaySize(WIDTH, HEIGHT);
        this.createScoreDisplay();
        this.createCreditAndRoundDisplay();

        const title = this.add.image(WIDTH / 2, HEIGHT * 0.26, 'title');
        title.setScale(Math.min(WIDTH * 0.8 / title.width, HEIGHT * 0.22 / title.height));

        this.font.add(WIDTH / 2, HEIGHT * 0.85,
            'PRESS SPACE ENTER OR CLICK TO START\n\n\ARROW KEYS TO MOVE', 16)
            .setScale(0.7, 1)
            .setCenterAlign()
            .setOrigin(0.5);

        const start = () => this.scene.start('Game');
        this.input.keyboard.once('keydown-SPACE', start);
        this.input.keyboard.once('keydown-ENTER', start);
        this.input.once('pointerdown', start);
        this.events.once('shutdown', () => {
            this.input.keyboard.off('keydown-SPACE', start);
            this.input.keyboard.off('keydown-ENTER', start);
            this.input.off('pointerdown', start);
        });
    }

    createScoreDisplay() {
        const score = this.registry.get('score') ?? 0;
        const highScore = this.registry.get('highScore') ?? 10000;

        for (const [x, label, value] of [
            [WIDTH / 6, '1UP', score],
            [WIDTH / 2, 'HIGH SCORE', highScore]
        ]) {
            this.font.add(x, 0, label)
                .setOrigin(0.5, 0)
                .setTint(0xff0000);
            this.font.add(x, 24, String(value).padStart(2, '0'))
                .setOrigin(0.5, 0)
                .setTint(0xffffff);
        }
    }

    createCreditAndRoundDisplay() {
        const credits = this.registry.get('credits') ?? 0;
        const round = this.registry.get('round') ?? 1;

        this.font.add(32, HEIGHT - 32, 'CREDIT')
            .setTint(0xff0000);
        this.font.add(160, HEIGHT - 32, credits)
            .setTint(0xffffff);

        this.font.add(WIDTH - 56, HEIGHT - 32, 'ROUND')
            .setOrigin(1, 0)
            .setTint(0xff0000);
        this.font.add(WIDTH - 16, HEIGHT - 32, round)
            .setOrigin(1, 0)
            .setTint(0xffffff);
    }

    createPlaceholderTextures() {
        // Temporary textures until individual frames from the supplied sheets are mapped.
        const graphics = this.make.graphics({ x: 0, y: 0 }, false);
        for (const [key, color] of [
            ['player', 0xffffff], ['rock', 0x888888], ['enemy', 0xe84838]
        ]) {
            if (this.textures.exists(key)) continue;
            graphics.clear();
            graphics.fillStyle(color);
            graphics.fillRect(0, 0, 32, 32);
            graphics.generateTexture(key, 32, 32);
        }
        graphics.destroy();
    }
}
