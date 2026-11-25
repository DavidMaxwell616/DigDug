import SplashScene from './SplashScene.js';
import GameScene from './GameScene.js';
import { WIDTH, HEIGHT } from './config.js';

const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: WIDTH,
    height: HEIGHT,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
    scene: [SplashScene, GameScene]
};

new Phaser.Game(config);
