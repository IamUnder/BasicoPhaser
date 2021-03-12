export default class Preload extends Phaser.Scene{

    // Barra de carga
    private barraCarga: Phaser.GameObjects.Graphics;
    // Barra de progreso
    private barraProgreso: Phaser.GameObjects.Graphics;

    constructor(){
        super('Preload');
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
            function() {
                this.scene.start('Nivel1');
            },
            this
        );
        
        // Carga de archivos, con un bucle para ver el funcionamiento
        for (let i = 0; i < 1000; i++) {
            this.load.image('logo' + i, 'assets/phaser3-logo.png');
        }
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