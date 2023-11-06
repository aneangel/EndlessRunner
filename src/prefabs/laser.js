class Laser extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y);
        // scene.add.existing(this);
        // scene.physics.world.enable(this);
        this.setTexture(key);

        // Other properties
        this.parentScene = scene;
        this.parentScene.add.existing(this);    // add to existing scene, displayList, updateList
        this.parentScene.physics.add.existing(this);


        this.speed = 400; // Adjust the laser speed
    }

    fire(x, y) {
        this.setActive(true);
        this.setVisible(true);

        const offset = 10;
        this.setPosition(x + offset, y);


        this.setVelocityX(this.speed);
    }

    update() {

        // Destroy the laser when it goes out of the screen
        if (this.x > this.scene.sys.game.config.width) {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}
