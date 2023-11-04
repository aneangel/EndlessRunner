class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {

        this.starfield = this.add.tileSprite(0, 0, 1280, 960, 'background').setOrigin(0, 0);

    //     Creating key "P" for pausing the game at anytime
        this.pasueKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.escapeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }

    update() {

        this.starfield.tilePositionX -= 2;

    //     Check if "P" key is pressed
        if (Phaser.Input.Keyboard.JustDown(this.pasueKey)) {
            console.log("Pause/Resume key pressed");
            this.scene.launch("pauseScene");
            this.scene.pause();
        }


    }

}