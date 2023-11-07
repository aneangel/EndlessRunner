class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOverScene");
    }

    create() {

        this.restartKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        // Display the game over message and score
        const gameOverText = this.add.text(game.config.width / 2, game.config.height / 2, 'Game Over', {
            fontSize: '48px',
            fill: '#fff'
        });
        gameOverText.setOrigin(0.5);

        const creditsText = this.add.text(game.config.width / 2, game.config.height / 2 + 60,
            "Press 'Enter' for game credits", {
            fontSize: '30px',
            fill: '#fff'
        });
        creditsText.setOrigin(0.5);

        const restartText = this.add.text(game.config.width / 2, game.config.height / 2 + 100,
            "Press 'R' to restart the game back to menu", { fontSize: '24px', fill: '#fff' });
        restartText.setOrigin(0.5);

        const highScoreText = this.add.text(game.config.width / 2, game.config.height - 100,
            'High Score: ' + highScore, {
            fontSize: '24px',
            fill: '#fff'
        });
        highScoreText.setOrigin(0.5);

        // Listen for a key press to start the credits scene
        this.input.keyboard.on('keydown', (event) => {
            if (event.key === 'Enter') {  // You can use any key you prefer
                this.scene.start("CreditsScene");
            }
        });
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.restartKey)) {
            console.log("Restart key pressed");

            this.sound.stopAll();

            this.scene.stop("playScene");
            this.scene.start("menuScene");
        }
    }
}