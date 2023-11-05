class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        this.asteroidSpeed = -450;
        this.asteroidSpeedMax = -1000;
        level = 0;


        // Background for game
        this.starfield = this.add.tileSprite(0, 0, 1280, 960, 'background').setOrigin(0, 0);
        this.physics.world.setBounds(0 ,0, game.config.width, game.config.height);

        // Creating key "P" for pausing the game at anytime
        this.pasueKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);


        // this.rocketMan = this.physics.add.sprite(32, centerY, 'rocketMan').setOrigin(0.5);

        this.rocketMan = new RocketMan(this, 32, centerY, 'rocketMan');
        this.rocketMan.setCollideWorldBounds(true);
        this.rocketMan.setScale(2.5);

        this.rocketMan.destroyed = false;


        // set up barrier group
        this.asteroidGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });
        // wait a few seconds before spawning barriers
        this.time.delayedCall(2500, () => {
            this.addAsteroids();
        });

        cursors = this.input.keyboard.createCursorKeys();
    }

    // create new barriers and add them to existing barrier group
    addAsteroids() {
        let speedVariance =  Phaser.Math.Between(0, 50);
        let asteroids = new Asteroids(this, this.asteroidSpeed - speedVariance);
        this.asteroidGroup.add(asteroids);
    }

    update() {

        this.starfield.tilePositionX -= 2;
        const rocketVelocity = 100;

        // Check if "P" key is pressed
        if (Phaser.Input.Keyboard.JustDown(this.pasueKey)) {
            console.log("Pause/Resume key pressed");
            this.scene.launch("pauseScene");
            this.scene.pause();
        }

        // Checks if RocketMan is destroyed or not
        if(!this.rocketMan.destroyed) {
            // Handle user input for movement
            if (cursors.up.isDown) {
                console.log("up key");
                this.rocketMan.body.velocity.y -= rocketVelocity;
            } else if (cursors.down.isDown) {
                console.log("down key");
                this.rocketMan.body.velocity.y += rocketVelocity;
            } else {
                this.rocketMan.setVelocityY(0);
            }
        }


    }


//     End Bracket for Play Class
}