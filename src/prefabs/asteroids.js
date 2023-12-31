class Asteroids extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity, texture) {
        // call Phaser Physics Sprite constructor
        super(scene, game.config.width + rocketManWidth, Phaser.Math.Between(rocketManHeight/2,
            game.config.height - rocketManHeight/2));

        this.parentScene = scene;               // maintain scene context
        this.setTexture(texture);

        // set up physics sprite
        this.parentScene.add.existing(this);    // add to existing scene, displayList, updateList
        this.parentScene.physics.add.existing(this);    // add to physics system
        this.setVelocityX(velocity);            // make it go!
        this.setImmovable();
        this.tint = Math.random() * 0xFFFFFF;   // randomize tint
        this.newBarrier = true;                 // custom property to control barrier spawning

        this.anims.create({
            key: 'asteroidAnimation',
            frames: this.anims.generateFrameNumbers('animation', {
                start: 0,
                end: 3
            }),
            frameRate: 8,
            repeat: -1
        });
    }



    update() {
        // add new barrier when existing barrier hits center X
        if(this.newBarrier && this.x < centerX) {
            // (recursively) call parent scene method from this context
            this.parentScene.addAsteroids(this.parent, this.velocity);
            this.newBarrier = false;
        }

        // destroy paddle if it reaches the left edge of the screen
        if(this.x < -this.width) {
            this.destroy();
        }
    }

}