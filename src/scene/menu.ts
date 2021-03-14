export default class Menu extends Phaser.Scene{

    private witdh: number;
    private height: number;

    constructor(){
        super('Menu')
    }

    init(){
        this.witdh = this.cameras.main.width;
        this.height = this.cameras.main.height;
    }

    create(){
        const logo = this.add.image(this.witdh/2, 70, 'logo1');

        const jugarTxT: Phaser.GameObjects.Text = this.add.text(
            50,
            this.height/2,
            'JUGAR',
            {fontSize:'32px',color:'#FFFFFF'}
        ).setInteractive();

        this.changeScene(jugarTxT,'Nivel1');
        
    }

    // Cuando se pulse sobre el texto nos mueve a la escena indicada.
    changeScene(jugarTxT: Phaser.GameObjects.Text, scene: string) {
        jugarTxT.on('pointerdown', () => {
            this.scene.start(scene);
            this.scene.start('HUD');
            this.scene.bringToTop('HUD');
        });
    }
}