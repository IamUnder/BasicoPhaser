import Constant from '../constant';

export default class Nivel1 extends Phaser.Scene
{

    private witdh: number;
    private height: number;
    private hp: number;
    private points: number;

    private mapaNivel: Phaser.Tilemaps.Tilemap;
    private conjuntoPatrones: Phaser.Tilemaps.Tileset;
    private capaMapaNivel: Phaser.Tilemaps.TilemapLayer;

    constructor ()
    {
        super(Constant.SCENE.NIVEL1);
    }

    init(){
        this.witdh = this.cameras.main.width;
        this.height = this.cameras.main.height;
        this.hp = 3;
        this.points = 0;
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
            Constant.SCENE.NIVEL1,
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
            this.registry.set(Constant.REGIS.HP,this.hp);
            this.events.emit(Constant.EVENTOS.HP);
        });

        const pointsTxT: Phaser.GameObjects.Text = this.add.text(
            this.witdh/2,
            this.height/2 + 100,
            'Points ++',
            {fontSize:'32px',color:'#FFFFFF'}
        ).setInteractive();

        pointsTxT.on('pointerdown', () =>{
            this.points ++;
            this.registry.set(Constant.REGIS.POINTS, this.points);
            this.events.emit(Constant.EVENTOS.POINTS);
        });

        // Cargamos tilemap
        this.mapaNivel = this.make.tilemap({ key: Constant.MAPS.NIVEL1.TILEMAPJSON, tileWidth: 16, tileHeight: 16});
        this.conjuntoPatrones = this.mapaNivel.addTilesetImage(Constant.MAPS.TILESET);
        this.capaMapaNivel = this.mapaNivel.createLayer(Constant.MAPS.NIVEL1.PLATFORM_CAP, this.conjuntoPatrones);
    }
}