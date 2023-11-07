class Aliens extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, velocity, texture) {

        // call Phaser Physics Sprite constructor
        super(scene, game.config.width + rocketManWidth, y);
        this.setTexture(texture);

        this.parentScene = scene;               // maintain scene context

        // set up physics sprite
        this.parentScene.add.existing(this);    // add to existing scene, displayList, updateList
        this.parentScene.physics.add.existing(this);    // add to physics system
        this.setVelocityX(velocity);            // make it go!
        this.setImmovable();
        this.tint = Math.random() * 0xFFFFFF;   // randomize tint
        this.newAlien = true;                 // custom property to control barrier spawning
    }



    update() {
        // add new barrier when existing barrier hits center X
        if(this.newAlien && this.x < centerX) {
            // (recursively) call parent scene method from this context
            this.parentScene.addAsteroids(this.parent, this.velocity);
            this.newAlien = false;
        }

        // destroy paddle if it reaches the left edge of the screen
        if(this.x < -this.width) {
            this.destroy();
        }
    }

}