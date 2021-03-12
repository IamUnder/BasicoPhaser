export default class Nivel1 extends Phaser.Scene
{
    constructor ()
    {
        super('Nivel1');
    }

    preload ()
    {
       
    }

    create ()
    {
        const logo = this.add.image(400, 70, 'logo1');
        
    }
}