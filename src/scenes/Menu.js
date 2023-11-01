class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // background soundtrack found from: https://www.fesliyanstudios.com/royalty-free-music
        // /downloads-c/8-bit-music/6
        this.load.audio('background-music', './assets/sounds/background.mp3');
    //     End bracket for Preload function
    }

    create() {
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            // backgroundColor: '#FFFFFF',
            color: '#37B9FF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

    //     Menu Text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding,
            'Endless Runner', menuConfig).setOrigin(0.5)
        menuConfig.color = '#4F595E';

    //     Define Keys LEFT and RIGHT
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    //     End bracket for Create function
    }

    update() {

    }

//     End Bracket for Class Menu
}