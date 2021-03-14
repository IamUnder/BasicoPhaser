export default class Nivel1 extends Phaser.Scene
{

    private witdh: number;
    private height: number;
    private hp: number;

    constructor ()
    {
        super('Nivel1');
    }

    init(){
        this.witdh = this.cameras.main.width;
        this.height = this.cameras.main.height;
        this.hp = 3;
    }

    preload ()
    {
       
    }

    create ()
    {
        const logo = this.add.image(400, 70, 'logo1');
        
        const jugarTxT: Phaser.GameObjects.Text = this.add.text(
            50,
            this.height/2,
            'NIVEL 1',
            {fontSize:'32px',color:'#FFFFFF'}
        );

        const hpTxT: Phaser.GameObjects.Text = this.add.text(
            this.witdh/2,
            this.height/2,
            'HP --',
            {fontSize:'32px',color:'#FFFFFF'}
        ).setInteractive();

        hpTxT.on('pointerdown', ()=>{
            this.hp --;
            this.registry.set('hp',this.hp);
            this.events.emit('changehp');
        })
    }
}