import Constant from '../constant';

export default class HUD extends Phaser.Scene{

    private hpTxT: Phaser.GameObjects.BitmapText;
    private pointsTxT: Phaser.GameObjects.BitmapText;

    private witdh: number;
    private height: number;

    constructor(){
        super(Constant.SCENE.HUD);
    }

    init(){
        this.witdh = this.cameras.main.width;
        this.height = this.cameras.main.height;
    }

    create(): void{

        const nivel1: Phaser.Scene = this.scene.get(Constant.SCENE.NIVEL1);
        nivel1.events.on(Constant.EVENTOS.HP, this.updatehp , this);
        nivel1.events.on(Constant.EVENTOS.POINTS, this.updatepoints , this);

        this.hpTxT = this.add.bitmapText(
            20,
            20,
            Constant.FONT.BITMAP,
            'HP: 3',
            32
        );

        this.pointsTxT = this.add.bitmapText(
            this.witdh - 70,
            20,
            Constant.FONT.BITMAP,
            '000',
            20
        );
    }

    private updatehp(): void{
        this.hpTxT.text = 'HP: ' + this.registry.get(Constant.REGIS.HP);
    }

    private updatepoints(): void{
        this.pointsTxT.text = Phaser.Utils.String.Pad(this.registry.get(Constant.REGIS.POINTS), 3 , '0', 1);
    }

}