class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        this.startTime = this.time.now;

        this.asteroidSpeed = -450;

        const speedUpInterval = 30000; // 30 seconds in milliseconds
        let spawnRateMult = 1;
        let speedInc = 0;
        let asteroidSpeed = -450; // Initial speed

        function increaseSpeed() {
            const randomSpeedIncrease = Phaser.Math.Between(249, 601);
            asteroidSpeed -= randomSpeedIncrease; // Increase speed by a certain amount
            console.log(`Asteroid speed increased to ${asteroidSpeed}`);

            if (asteroidSpeed <= -700 && spawnRateMult === 1) {
                // Double the spawn rate when asteroidSpeed is -700 or lower
                spawnRateMult = 2;
                console.log('Asteroid spawn rate doubled!');
            }

            // Check if asteroidSpeed is a multiple of 250
            if (asteroidSpeed % 250 === 0) {
                speedInc++;
                console.log(`Asteroid speed increased ${speedInc} times.`);

                // Increase the spawn rate by a random number
                const randomSpawnRateIncrease = Phaser.Math.Between(1, 2);
                spawnRateMult += randomSpawnRateIncrease;
                console.log(`Asteroid spawn rate increased by ${randomSpawnRateIncrease}.`);
            }
        }

        this.time.addEvent({
            delay: speedUpInterval,
            callback: increaseSpeed,
            callbackScope: this,
            loop: true, // This makes the timer repeat
        });

        // this.timerText = this.add.text(game.config.width / 2, game.config.height / 2, 'Time 0', {
        //     fontSize: game.config.width * 0.2, fill: 'rgba(255, 255, 255, 0.7)'
        // });

        level = 0;

        // Background for game
        this.starfield = this.add.tileSprite(0, 0, 1280, 960, 'background').setOrigin(0, 0);
        this.physics.world.setBounds(0 ,0, game.config.width, game.config.height);

        // Creating key "P" for pausing the game at anytime
        this.pasueKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        // LaserGroup to handle the laser class that adds function
        const laserGroup= this.physics.add.group({
            classType: Laser,
            runChildUpdate: true
        });

        // Creating the rocketMan sprite and creating world collision;
        // scale by 2.5 due to asset being smaller than I expected
        this.rocketMan = new RocketMan(this, 32, centerY, 'rocketMan', laserGroup);

        // Set the desired dimensions for the hitbox
        this.rocketMan.setOrigin(0.5, 0.5);
        const newWidth = 20; // Set your desired width
        const newHeight = 10; // Set your desired height

        // Resize the hitbox
        this.rocketMan.setSize(newWidth, newHeight);

        // Enable the physics for the sprite if it's not enabled
        // this.physics.world.enable(sprite);

        this.rocketMan.setCollideWorldBounds(true);
        this.rocketMan.setScale(2.5);

        // boolean used to monitored if rocketMan was hit by the aliens
        this.rocketMan.destroyed = false;

        // set up asteroid group
        this.asteroidGroup = this.add.group({
            runChildUpdate: true
        });

        // set up laser group
        this.alienGroup = this.add.group({
            runChildUpdate: true
        })

        // wait a few seconds before spawning asteroids
        // Taken from professor's paddle example
        const spawnDelay = 2500 / spawnRateMult;
        this.time.delayedCall(spawnDelay, () => {
            this.addAsteroids();
        });

        // Delayed call for spawning aliens every 10 seconds
        this.time.addEvent({
            delay: 10000, // 10 seconds in milliseconds
            loop: true, // Repeat indefinitely
            callback: () => {
                this.addAliens();
            }
        });

        this.physics.add.collider(this.asteroidGroup, this.rocketMan, this.asteroidCollision, null, this);

        // // calling onto laser's function
        // this.addLasers();

        // creating cursors to add movement to rocketMan
        cursors = this.input.keyboard.createCursorKeys();
    }

    asteroidCollision(asteroid, rocketMan) {
        asteroid.destroy();
        this.particle(this.rocketMan);
        rocketMan.destroyed = true;

    }

    // create asteroids and add them to existing asteroid group
    // create lasers and add them to laser group
    // method for implementation taken from professor's paddle example
    addAsteroids() {
        let speedVariance =  Phaser.Math.Between(5, 500);
        let asteroids = new Asteroids(this, this.asteroidSpeed - speedVariance, 'asteroids');
        this.asteroidGroup.add(asteroids);
        asteroids.play('asteroidAnimation')
    }

    addAliens() {
        const rocketManY = this.rocketMan.y;
        const screenHeight = game.config.height;

        // Calculate the y position for the aliens to be directly opposite the rocketMan
        const alienY = screenHeight - rocketManY;

        let aliens = new Aliens(this, game.config.width - this.rocketMan.x, alienY, -450, 'alien1');
        aliens.setScale(4);

        aliens.setOrigin(0.5, 0.5);
        const newWidth = 10; // Set your desired width
        const newHeight = 10; // Set your desired height

        // Resize the hitbox
        aliens.setSize(newWidth, newHeight);

        this.alienGroup.add(aliens);
    }

    addLasers() {
        const laserY = this.rocketMan.y;
        const laserX = this.rocketMan.x + 10;
        const laser = new Laser(this, laserX, laserY, 'laser');
        this.laserGroup.add(laser);
    }

    handleCollision(rocketMan, alien) {
        alien.destroy();
        this.rocketMan.destroyed = true;

        this.sound.play('explosion');

    }

    update() {

        // creating the scrolling effect for endless runner feeling
        this.starfield.tilePositionX += 2;
        const rocketVelocity = 100;

        this.alienGroup.getChildren().forEach((aliens) => {
            aliens.update
        })

        this.physics.world.collide(this.rocketMan, this.alienGroup, this.handleCollision, null, this);

        // Check if "P" key is pressed
        if (Phaser.Input.Keyboard.JustDown(this.pasueKey)) {
            console.log("Pause/Resume key pressed");
            this.sound.play('pause');
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

            // Handle left and right movement
            if (cursors.left.isDown) {
                // Move left when the left arrow key is pressed
                console.log('left key')
                this.rocketMan.body.velocity.x -= rocketVelocity;
            } else if (cursors.right.isDown) {
                console.log('right key')
                // Move right when the right arrow key is pressed
                this.rocketMan.body.velocity.x += rocketVelocity;
            } else {
                this.rocketMan.setVelocityX(0);
            }

            // Handle user input for movement
            const moveX = (cursors.right.isDown ? 1 : 0) - (cursors.left.isDown ? 1 : 0);
            const moveY = (cursors.down.isDown ? 1 : 0) - (cursors.up.isDown ? 1 : 0);

            // Normalize the diagonal speed
            if (moveX !== 0 && moveY !== 0) {
                const speed = Math.sqrt(2) * rocketVelocity; // Maximum diagonal speed
                this.rocketMan.body.velocity.x = moveX * speed;
                this.rocketMan.body.velocity.y = moveY * speed;
            } else {
                this.rocketMan.body.velocity.x = moveX * rocketVelocity;
                this.rocketMan.body.velocity.y = moveY * rocketVelocity;
            }
        }


        if (this.rocketMan.destroyed) {
            // Calculate the duration
            const duration = this.time.now - this.startTime;

            // Convert duration to seconds
            const durationInSeconds = Math.floor(duration / 1000);
            if (durationInSeconds > highScore) {
                // Update the high score to the new record
                highScore = durationInSeconds;
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
                    this.sound.play('gameOver')
                    this.sound.get('background-music').stop();
                    this.scene.start('GameOverScene');

                }
            });
        }


    }

    particle(rocketMan) {
        // Generate a random number between 1 and 4 to select the particle asset
        const particleKeys = ['particle', 'particle2', 'particle4'];
        const randomParticleKey = Phaser.Math.RND.pick(particleKeys)
        console.log(randomParticleKey)

        this.add.particles(rocketMan.x, rocketMan.y, randomParticleKey, {
            speed: 200,
            lifespan: 150,
            quantity: 3,
            duration: 300,
            maxParticles: 5
        })

        this.sound.play('shipExplosion');
    }


//     End Bracket for Play Class
}