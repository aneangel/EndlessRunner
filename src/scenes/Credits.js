class Credits extends Phaser.Scene {
    constructor() {
        super("CreditsScene");
    }

    create() {
        // Add a transparent background
        const overlay = this.add.rectangle(0, 0, game.config.width, game.config.height, 0x000000, 0.5);
        overlay.setOrigin(0, 0);

        // Create credits text with scrolling effect
        const creditsText = this.add.text(game.config.width / 2, game.config.height, 'Developer: Anthony Angeles\n' +
            'Music: https://mixkit.co/free-sound-effects/\n' +
            'Sprite Design: Anthony Angeles\n ' +
            'Inspiration for implementation on sprite mechanics taken from in class examples\n provided by Professor Nathan', {
            fontSize: '24px',
            fill: '#fff',
            align: 'center'
        });
        creditsText.setOrigin(0.5, 1);

        // Scroll the credits text upwards
        this.tweens.add({
            targets: creditsText,
            y: -creditsText.height,
            duration: 10005,  // Adjust the duration as needed
            onComplete: () => {
                // Transition to the next scene (e.g., main menu)
                this.scene.start("menuScene");
            }
        });
    }
}