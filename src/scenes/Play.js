class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        // Background for game
        this.starfield = this.add.tileSprite(0, 0, 1280, 960, 'background').setOrigin(0, 0);

    //     Creating key "P" for pausing the game at anytime
        this.pasueKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);


        this.rocketMan = this.physics.add.sprite(32, centerY, 'rocketMan').setOrigin(0.5);
        this.rocketMan.setCollideWorldBounds(true);
        this.rocketMan.setScale(2.5);

        this.rocketMan.destroyed = false;
        const rocketVelocity = 150;

        // set up barrier group
        this.barrierGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });
        // wait a few seconds before spawning barriers
        this.time.delayedCall(2500, () => {
            this.addBarrier();
        });

        cursors = this.input.keyboard.createCursorKeys();
    }

    // create new barriers and add them to existing barrier group
    addBarrier() {
        let speedVariance =  Phaser.Math.Between(0, 50);
        let barrier = new Barrier(this, this.barrierSpeed - speedVariance);
        this.barrierGroup.add(barrier);
    }

    update() {

        this.starfield.tilePositionX -= 2;

        // Check if "P" key is pressed
        if (Phaser.Input.Keyboard.JustDown(this.pasueKey)) {
            console.log("Pause/Resume key pressed");
            this.scene.launch("pauseScene");
            this.scene.pause();
        }

        // if (!this.rocketMan.destroyed) {
        //     if(cursors.up.isDown) {
        //         this.rocketMan.body.velocity.y -= rocketVelocity;
        //     } else if(cursors.down.isDown) {
        //         this.rocketMan.body.velocity.y += velocity;
        //     }
        //
        //     this.physics.world.collide(this.rocketMan, this.barrierGroup, this.rocketMan.rocketManCollision, null, this);
        // }

    }

    spawnAsteroids() {
        // add a "shadow paddle" at main paddle position
        let asteroid = this.add.image(this.rocketMan.x, this.rocketMan.y, 'asteroid').setOrigin(0.5);
        asteroid.scaleY = this.rocketMan.scaleY;            // scale to parent paddle
        // asteroid.tint = Math.random() * 0xFFFFFF;   // tint w/ rainbow colors
        // asteroid.alpha = 0.5;                       // make semi-transparent
        // tween shadow paddle alpha to 0
        this.tweens.add({
            targets: asteroid,
            alpha: { from: 0.5, to: 0 },
            duration: 750,
            ease: 'Linear',
            repeat: 0
        });
        // set a kill timer for trail effect
        this.time.delayedCall(750, () => { asteroid.destroy(); } );
    }

//     End Bracket for Play Class
}