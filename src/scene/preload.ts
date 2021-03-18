import { RIGHT } from 'phaser';
import Constant from '../constant';

export default class Preload extends Phaser.Scene{

    // Barra de carga
    private barraCarga: Phaser.GameObjects.Graphics;
    // Barra de progreso
    private barraProgreso: Phaser.GameObjects.Graphics;

    constructor(){
        super(Constant.SCENE.PRELOAD);
    }

    preload(): void{
        this.cameras.main.setBackgroundColor(0x000000);
        this.createBarras();

        // Listener mientras se cargan los assets
        this.load.on(
            'progress',
            function(value: number) {
                this.barraProgreso.clear();
                this.barraProgreso.fillStyle(0x88e453,1);
                this.barraProgreso.fillRect(
                    this.cameras.main.width / 4,
                    this.cameras.main.height / 2 - 16,
                    (this.cameras.main.width / 2) * value,
                    16
                );
            },
            this
        );

        // Listener para cuando se hayan cargado todos lo assets
        this.load.on(
            'complete',
            () => {
                // Crea la fuente
                const fontJSON = this.cache.json.get(Constant.FONT.JSON);
                this.cache.bitmapFont.add(Constant.FONT.BITMAP, Phaser.GameObjects.RetroFont.Parse(this, fontJSON));

                // Carga menu
                this.scene.start(Constant.SCENE.MENU);
            },
            this
        );
        
        // Carga de archivos, con un bucle para ver el funcionamiento
        
        this.load.image('logo1', 'assets/phaser3-logo.png');
        this.load.tilemapTiledJSON(Constant.MAPS.NIVEL1.TILEMAPJSON, 'assets/levels/nivel1.json');
        this.load.image(Constant.MAPS.TILESET,'assets/levels/levelstileset.png');

        this.load.image(Constant.BACKGROUD.NIVEL1,'assets/img/background/Brown.png');

        this.load.json(Constant.FONT.JSON, 'assets/fuentes/fuente.json');
        this.load.image(Constant.FONT.IMAGEN, 'assets/fuentes/imagenFuente.png');

        // Jugador 
        this.load.atlas(Constant.PLAYER.ID,'assets/player/player.png','assets/player/player.json');
        
    }

    // Metodo para crear las barras de carga
    createBarras(){
        this.barraCarga = this.add.graphics();
        this.barraCarga.fillStyle(0xffffff,1);
        this.barraCarga.fillRect(
            this.cameras.main.width / 4 - 2,
            this.cameras.main.height / 2 - 18,
            this.cameras.main.width / 2 + 3,
            20
        );
        this.barraProgreso = this.add.graphics();
    }
}