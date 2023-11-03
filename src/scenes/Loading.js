class Loading extends Phaser.Scene {
    constructor() {
        super("loadingScene");
    }

    preload() {
    //     I am using the implementation of the loading bar from Professors example in class,
        //     I liked how the loading bar looked in the game
        let loadingBar = this.add.graphics();

        this.load.on('progress', (value) => {
            loadingBar.clear();
            loadingBar.fillStyle(0xFFFFF, 1);
            loadingBar.fillRect(0, centerY, w * value, 5);
        });

        this.load.on('complete', () => {
            loadingBar.destroy();
        });

        // this.load.path = './assets/';
    }

    create() {
        this.scene.start('menuScene');
    }

}