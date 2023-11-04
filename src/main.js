/* Anthony Angeles
Game title: Rocket Runner
Approx. Hours:
Creative Tilt:
 */

let config = {
    type: Phaser.CANVAS,
    width: 1280,
    height: 960,
    scale: {
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Loading, Menu, Play, GameOver, Credits, Pause ]
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let centerX = game.config.width/2;
let centerY = game.config.height/2;
let w = game.config.width;
let h = game.config.height;

let cursors;

let level;
let highScore;
let newHighScore = false;

let keyF, keyR, keyLEFT, keyRIGHT;
