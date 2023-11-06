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

        // Static images for sprites
        this.load.image('asteroids', 'asteroid.png')
        this.load.image('alien1', 'opp.png')
        this.load.image('rocketMan', 'rocketMan.png')

        // Static images for particle sprites
        this.load.image('particle1', 'particles/particle.png')
        this.load.image('particle2', 'particles/particle1.png')
        this.load.image('particle3', 'particles/particle2.png')
        this.load.image('particle4', 'particles/particle3.png')

        // Static images for laser
        this.load.image('laser', 'laser/laser.png')

        // Audio needed for game
        this.load.audio('background-music', 'sounds/background.mp3')
        this.load.audio('shipExplosion', 'sounds/explosion.wav')


    }

    create() {
        // this.sound.play('tvon')
        this.scene.start('menuScene');
    }

}