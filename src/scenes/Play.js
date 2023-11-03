class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {

        this.starfield = this.add.tileSprite(0, 0, 1280, 960, 'background').setOrigin(0, 0);


    }

    update() {

        this.starfield.tilePositionX -= 2;


    }

}