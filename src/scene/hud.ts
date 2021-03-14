export default class HUD extends Phaser.Scene{

    private hpTxT: Phaser.GameObjects.Text;

    constructor(){
        super('HUD');
    }

    create(): void{

        const nivel1: Phaser.Scene = this.scene.get('Nivel1');
        nivel1.events.on('changehp', this.updatehp , this);

        this.hpTxT = this.add.text(
            20,
            20,
            'HP: 3',
            {fontSize:'32px',color:'#FFFFFF'}
        );
    }

    private updatehp(): void{
        this.hpTxT.text = 'HP: ' + this.registry.get('hp');
    }

}