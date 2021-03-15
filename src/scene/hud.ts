import Constant from '../constant';

export default class HUD extends Phaser.Scene{

    private hpTxT: Phaser.GameObjects.Text;
    private pointsTxT: Phaser.GameObjects.Text;

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

        this.hpTxT = this.add.text(
            20,
            20,
            'HP: 3',
            {fontSize:'32px',color:'#FFFFFF'}
        );

        this.pointsTxT = this.add.text(
            this.witdh - 50,
            20,
            '000',
            {fontSize:'20px',color:'#FFFFFF'}
        );
    }

    private updatehp(): void{
        this.hpTxT.text = 'HP: ' + this.registry.get(Constant.REGIS.HP);
    }

    private updatepoints(): void{
        this.pointsTxT.text = Phaser.Utils.String.Pad(this.registry.get(Constant.REGIS.POINTS), 3 , '0', 1);
    }

}