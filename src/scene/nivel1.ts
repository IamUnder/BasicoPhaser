import Constant from '../constant';
import Player from '../gameObjects/player'

export default class Nivel1 extends Phaser.Scene
{

    private witdh: number;
    private height: number;
    private hp: number;
    private points: number;

    private mapaNivel: Phaser.Tilemaps.Tilemap;
    private conjuntoPatrones: Phaser.Tilemaps.Tileset;
    private capaMapaNivel: Phaser.Tilemaps.TilemapLayer;

    private background: Phaser.GameObjects.TileSprite;

    private player: Player;

    
    

    constructor ()
    {
        super(Constant.SCENE.NIVEL1);
    }

    init(){
        this.witdh = this.cameras.main.width;
        this.height = this.cameras.main.height;
        this.hp = 3;
        this.points = 0;

        this.registry.set(Constant.REGIS.HP,3);
    }

    preload ()
    {
       
    }

    create ()
    {
        const logo = this.add.image(400, 70, 'logo1');
        
        const jugarTxT: Phaser.GameObjects.BitmapText = this.add.bitmapText(
            50,
            this.height/2,
            Constant.FONT.BITMAP,
            'NIVEL 1',
            32
        );

        const hpTxT: Phaser.GameObjects.BitmapText = this.add.bitmapText(
            this.witdh/2,
            this.height/2,
            Constant.FONT.BITMAP,
            'HP --',
            32
        ).setInteractive();

        hpTxT.on('pointerdown', ()=>{
            this.hp --;
            this.registry.set(Constant.REGIS.HP,this.hp);
            this.events.emit(Constant.EVENTOS.HP);
        });

        const pointsTxT: Phaser.GameObjects.BitmapText = this.add.bitmapText(
            this.witdh/2,
            this.height/2 + 100,
            Constant.FONT.BITMAP,
            'POINTS ++',
            32
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
        // Ponemos colisiones al mapa
        this.capaMapaNivel.setCollisionByExclusion([-1]);

        // Cargamos el fondo
        this.background = this.add.tileSprite(0,0,this.mapaNivel.widthInPixels,this.mapaNivel.heightInPixels, Constant.BACKGROUD.NIVEL1).setOrigin(0,0).setDepth(-1);
    
        // Animaciones
        this.anims.create({
            key: Constant.PLAYER.ANIMACION.WAIT,
            frames: this.anims.generateFrameNames(Constant.PLAYER.ID,{prefix: Constant.PLAYER.ANIMACION.WAIT + '-', end:10}),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: Constant.PLAYER.ANIMACION.RUN,
            frames: this.anims.generateFrameNames(Constant.PLAYER.ID,{prefix: Constant.PLAYER.ANIMACION.RUN + '-', end:11}),
            frameRate: 20,
            repeat: -1
        });

        // Creamos el jugador
        
        this.player = new Player({
            escena: this,
            x: 80,
            y: 80,
            texture: Constant.PLAYER.ID
        });

        
        this.physics.add.collider(this.player, this.capaMapaNivel)
       

        
    }

    update(): void{
        // Animar el fondo
        this.background.tilePositionY -= 0.4;

        //Si nos quedamos sin vidas volvemos al menu
        if (parseInt(this.registry.get(Constant.REGIS.HP)) === 0) {
            this.scene.stop(Constant.SCENE.NIVEL1);
            this.scene.stop(Constant.SCENE.HUD);
            this.scene.start(Constant.SCENE.MENU);
        }

        this.player.update();
    }
}

