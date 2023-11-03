/* Anthony Angeles
Game title: Rocket Runner
Approx. Hours:
Creative Tilt:
 */

let config = {
    type: Phaser.CANVAS,
    width: 1280,
    height: 960,
    scene: [ Loading, Menu, Play, GameOver ]
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyF, keyR, keyLEFT, keyRIGHT;