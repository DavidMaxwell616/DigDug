const FONT_KEY = 'digdugfont';

export default class DigDugFont {
    static preload(scene) {
        if (!scene.textures.exists(FONT_KEY)) {
            scene.load.image(FONT_KEY, 'assets/digdugfont.png');
        }
    }

    // Construct during create(), after the font image has loaded.
    constructor(scene) {
        this.scene = scene;
        if (!scene.cache.bitmapFont.exists(FONT_KEY)) {
            scene.cache.bitmapFont.add(FONT_KEY, Phaser.GameObjects.RetroFont.Parse(scene, {
                image: FONT_KEY,
                width: 8,
                height: 8,
                chars: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ ',
                charsPerRow: 10
            }));
        }
    }

    // Return BitmapText so callers can set alignment, origin, tint, and text.
    add(x, y, text, size = 16) {
        return this.scene.add.bitmapText(x, y, FONT_KEY, String(text), size);
    }
}
