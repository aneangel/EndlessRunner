class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {
        let menuConfig = {
            parent: 'game-screen',
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
            'Rocket Runner', menuConfig).setOrigin(0.5)
        menuConfig.color = '#4F595E';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding,
            'Press Enter to start', menuConfig).setOrigin(0.5)

    //     Define Keys LEFT and RIGHT
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    //     End bracket for Create function
    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.sound.play('background-music')
            this.scene.start('playScene')
        }
    }

//     End Bracket for Class Menu
}