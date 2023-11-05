class RocketMan extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key);
        scene.add.existing(this);
        scene.physics.world.enable(this);

        // Set origin and other properties
        this.setOrigin(0.5, 0.5);
        this.setCollideWorldBounds(true);
        this.setBounce(0.5);

        // Define custom properties for RocketMan, e.g., speed
        this.speed = 200;

    }

    // update() {
    //     const velocityIncrement = 5
    //
    //     // Handle user input for movement
    //     if (this.cursors.up.isDown) {
    //         console.log("up key");
    //         this.body.velocity.y -= this.speed;
    //     } else if (this.cursors.down.isDown) {
    //         console.log("down key");
    //         this.body.velocity.y += this.speed;
    //     }
    //
    //     // Ensure RocketMan stays within the world bounds
    //     const minY = 0;  // Minimum Y coordinate
    //     const maxY = this.scene.sys.game.config.height;  // Maximum Y coordinate
    //
    //     if (this.y < minY) {
    //         this.y = minY;
    //     } else if (this.y > maxY) {
    //         this.y = maxY;
    //     }
    //
    //     // // Shooting
    //     // if (this.cursors.space.isDown && this.canShoot) {
    //     //     this.shootLaser();
    //     // }
    // }


}
