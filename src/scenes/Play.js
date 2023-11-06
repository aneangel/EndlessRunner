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


        // this.rocketMan = this.physics.add.sprite(32, centerY, 'rocketMan').setOrigin(0.5)

        // LaserGroup to handle the laser class that adds function
        const laserGroup= this.physics.add.group({
            classType: Laser,
            runChildUpdate: true
        });

        // Creating the rocketMan sprite and creating world collision;
        // scale by 2.5 due to asset being smaller than I expected
        this.rocketMan = new RocketMan(this, 32, centerY, 'rocketMan', laserGroup);
        this.rocketMan.setCollideWorldBounds(true);
        this.rocketMan.setScale(2.5);

        // boolean used to monitored if rocketMan was hit by the aliens
        this.rocketMan.destroyed = false;


        // set up barrier group
        this.asteroidGroup = this.add.group({
            runChildUpdate: true
        });

        this.alienGroup = this.add.group({
            runChildUpdate: true
        })

        for (let i = 0; i <= 5; i++) {
            this.addAliens();
            // const aliens = new Aliens(this, game.config.width - this.rocketMan.x, Phaser.Math.Between(0, 25), 'alien1');
        }

        // wait a few seconds before spawning barriers
        // Taken from professor's paddle example
        this.time.delayedCall(2500, () => {
            this.addAsteroids();
        });

        this.physics.add.collider(this.asteroidGroup, this.rocketMan, this.asteroidCollision, null, this);

        // calling onto laser's function
        // this.addLasers();

        // creating cursors to add movement to rocketMan
        cursors = this.input.keyboard.createCursorKeys();
    }

    asteroidCollision(asteroid, rocketMan) {
        asteroid.destroy();
        rocketMan.destroyed = true
    }

    // create asteroids and add them to existing asteroid group
    // create lasers and add them to laser group
    // method for implementation taken from professor's paddle exmaple
    addAsteroids() {
        let speedVariance =  Phaser.Math.Between(0, 50);
        let asteroids = new Asteroids(this, this.asteroidSpeed - speedVariance, 'asteroids');
        this.asteroidGroup.add(asteroids);
    }

    addAliens() {
        let speedVariance = Phaser.Math.Between(0, 25);
        let aliens = new Aliens(this, game.config.width - this.rocketMan.x, speedVariance, 'alien1');
        this.alienGroup.add(aliens);
    }

    // addLasers() {
    //     const laserY = this.rocketMan.y;
    //     const laserX = this.rocketMan.x + 10;
    //     const laser = new Laser(this, laserX, laserY, 'laser');
    //     // this.laserGroup.add(laser);
    // }

    handleCollision(rocketMan, alien) {
        alien.destroy();
        this.rocketMan.destroyed = true;

        this.sound.play('explosion');

    }

    update() {

        // creating the scrolling effect for endless runner feeling
        this.starfield.tilePositionX -= 2;
        const rocketVelocity = 100;

        this.alienGroup.getChildren().forEach((aliens) => {
            aliens.update
        })

        this.physics.world.collide(this.rocketMan, this.alienGroup, this.handleCollision, null, this);

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

        // Check if rocketMan (player) pressed 'SPACE' to shoot lasers towards aliens
        if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE))) {
            console.log("spacebar")
            this.rocketMan.shootLaser();
        }

        if (this.rocketMan.destroyed === true) {
            // Add a delay before transitioning to the GameOverScene (in milliseconds)
            const transitionDelay = 2000; // 2 seconds as an example

            // Use a fade transition to the GameOverScene
            this.cameras.main.fade(transitionDelay, 0, 0, 0, false, function (camera, progress) {
                if (progress === 1) {
                    // Transition is complete, start the GameOverScene
                    this.scene.start('GameOverScene');
                }
            });
        }


    }


//     End Bracket for Play Class
}