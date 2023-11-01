/* Anthony Angeles
Game title: Campaign Run
Approx. Hours:
Creative Tilt:
 */

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu]
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyF, keyR, keyLEFT, keyRIGHT;