import Nivel1 from './scene/nivel1';
import Preload from './scene/preload';
import Menu from './scene/menu';
import HUD from './scene/hud'

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: 800,
    height: 600,
    scene: [Preload, Menu, Nivel1, HUD],
    pixelArt: true
};

export default config;