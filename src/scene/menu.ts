import Constant from "../constant";

export default class Menu extends Phaser.Scene{

    private witdh: number;
    private height: number;

    constructor(){
        super(Constant.SCENE.MENU)
    }

    init(){
        this.witdh = this.cameras.main.width;
        this.height = this.cameras.main.height;
    }

    create(){
        const logo = this.add.image(this.witdh/2, 70, 'logo1');

        const jugarTxT: Phaser.GameObjects.BitmapText = this.add.bitmapText(
            50,
            this.height/2,
            Constant.FONT.BITMAP,
            Constant.MENU.JUGAR,
            25
        ).setInteractive();

        this.changeScene(jugarTxT,'Nivel1');
        
    }

    // Cuando se pulse sobre el texto nos mueve a la escena indicada.
    changeScene(jugarTxT: Phaser.GameObjects.BitmapText, scene: string) {
        jugarTxT.on('pointerdown', () => {
            this.scene.start(scene);
            this.scene.start(Constant.SCENE.HUD);
            this.scene.bringToTop(Constant.SCENE.HUD);
        });
    }
}