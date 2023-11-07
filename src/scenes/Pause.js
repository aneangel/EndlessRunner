class Pause extends Phaser.Scene {
    constructor() {
        super("pauseScene");
    }

    create() {
        console.log("in pause scene");

        // Add a semi-transparent background rectangle to cover the entire screen
        const overlay = this.add.rectangle(0, 0, game.config.width, game.config.height, 0x000000, 0.7);
        overlay.setOrigin(0, 0);

        // Add pause message or options
        const pauseText = this.add.text(game.config.width / 2, game.config.height / 2,
            'PAUSED', { fontSize: '48px', fill: '#fff' });
        pauseText.setOrigin(0.5);

        // Add the "Press 'R' to restart" text below the "PAUSED" message
        const restartText = this.add.text(game.config.width / 2, game.config.height / 2 + 60,
            "Press 'R' to restart the game back to menu", { fontSize: '24px', fill: '#fff' });
        restartText.setOrigin(0.5);

        // Add the "Press 'R' to restart" text below the "PAUSED" message
        const endText = this.add.text(game.config.width / 2, game.config.height / 2 + 90,
            "Press 'ESC' to end the game", { fontSize: '24px', fill: '#fff' });
        endText.setOrigin(0.5);

        //     Creating key "P" for pausing the game at anytime
        this.pauseKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.restartKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

    //     End game key
        this.endKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }

    update() {
        // Check if the "Escape" key is pressed to resume the game from pauseScene
        if (Phaser.Input.Keyboard.JustDown(this.pauseKey)) {
            console.log("Resume/Pause key pressed");

            this.scene.resume("playScene");
            this.scene.stop("pauseScene");
        }

        if (Phaser.Input.Keyboard.JustDown(this.restartKey)) {
            console.log("Restart key pressed");

            this.sound.stopAll();

            this.scene.stop("playScene");
            this.sound.play('button')
            this.scene.start("menuScene");
        }

        if (Phaser.Input.Keyboard.JustDown(this.endKey)) {
            console.log("End key pressed");

            this.sound.stopAll();

            this.scene.stop("playScene");
            this.sound.play('button')
            this.scene.start("GameOverScene");
        }
    }

// End bracket for Pause Scene
}