class Loading extends Phaser.Scene {
    constructor() {
        super("loadingScene");
    }

    preload() {
        //     I am using the base structure of the loading bar from Nathan's example in class,
        //     I liked how the loading bar looked in the game
        let loadingBar = this.add.graphics();
        const centerX = game.config.width / 2;
        const centerY = game.config.height / 2;

        // Create a text object for the "Loading" message
        const loadingText = this.add.text(centerX, centerY - 20, 'Loading', {
            fontFamily: 'Arial',
            fontSize: '16px',
            fill: '#FFFFFF',
            align: 'center',
        });
        loadingText.setOrigin(0.5);

        this.load.on('progress', (value) => {
            loadingBar.clear();
            loadingBar.fillStyle(0xFFFFFF, 1);

            const barWidth = 200; // Adjust this value as needed
            const barHeight = 10; // Adjust this value as needed
            const x = centerX - barWidth / 2;
            const y = centerY - barHeight / 2;

            loadingBar.fillRect(x, y, barWidth * value, barHeight);
        });

        this.load.on('complete', () => {
            loadingBar.destroy();
        });

        this.load.path = './assets/';

        // Static images for game
        this.load.image('background', 'background/spaceBackground.png')

        // Audio needed for game
        this.load.audio('background-music', 'sounds/background.mp3')

    }

    create() {
        this.scene.start('menuScene');
    }

}