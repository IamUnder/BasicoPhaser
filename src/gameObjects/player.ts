import Constant from '../constant';

export default class Player extends Phaser.Physics.Arcade.Sprite{

    private escena: Phaser.Scene;

    // Controles
    private cursores: Phaser.Types.Input.Keyboard.CursorKeys;
    private wasd: any;
    private space: Phaser.Input.Keyboard.Key;

    constructor (config: any){
        super(config.escena, config.x, config.y, config.texture)

        this.escena = config.escena;
        this.escena.physics.world.enable(this);
        this.escena.add.existing(this);

        this.body.setSize(20,30);
        this.setCollideWorldBounds(true);

        // Controles
        this.cursores = this.escena.input.keyboard.createCursorKeys();
        this.wasd = this.escena.input.keyboard.addKey('W,A,S,D');
        this.space = this.escena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Animacion inicial
        this.play(Constant.PLAYER.ANIMACION.WAIT);
    }

    update(){
        // Control de movimiento
        // this.wasd.A.isDown || 
        if (this.cursores.left.isDown) {
            this.setVelocityX(-200);
            this.flipX = true;
            if (this.body.blocked.down) this.anims.play(Constant.PLAYER.ANIMACION.RUN, true);
        }else if (this.cursores.right.isDown){
            this.setVelocityX(200);
            this.flipX = false;
            if (this.body.blocked.down) this.anims.play(Constant.PLAYER.ANIMACION.RUN, true);
        }else{
            this.setVelocityX(0);
            this.anims.play(Constant.PLAYER.ANIMACION.WAIT, true);
        }

        if ((this.space.isDown || this.cursores.up.isDown) && this.body.blocked.down) {
            this.setVelocityY(-300);
            this.anims.stop();
            this.setTexture(Constant.PLAYER.ID, Constant.PLAYER.ANIMACION.JUMP);
        }
    }
}