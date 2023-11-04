class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOverScene");
    }

    create() {
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
}