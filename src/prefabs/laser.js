class Laser extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key);
        scene.add.existing(this);
        scene.physics.world.enable(this);

        // Set other properties and behavior as needed
        this.speed = 400; // Adjust the laser speed
    }

    fire(x, y) {
        this.setActive(true);
        this.setVisible(true);
        this.setVelocityX(this.speed);
        this.setPosition(x, y);
    }

    update() {
        // Destroy the laser when it goes out of the screen
        if (this.x > this.scene.sys.game.config.width) {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}
