class RocketMan extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key, laserGroup) {
        super(scene, x, y, key);
        scene.add.existing(this);
        scene.physics.world.enable(this);

        // Set origin and other properties
        this.setOrigin(0.5, 0.5);
        this.setCollideWorldBounds(true);
        this.setBounce(0.5);

        // Define custom properties for RocketMan, e.g., speed
        this.speed = 200;

        // Laser Group
        this.laserGroup = laserGroup;


    }


    shootLaser() {
        const x = this.x + this.width / 2;
        const y = this.y;

        const laser = this.laserGroup.getFirstDead(false);

        if (laser) {
            // Shoot Laser if ready
            laser.fire(x, y);
        }
    // End of shootLaser function
    }

//     End of RocketMan class
}
