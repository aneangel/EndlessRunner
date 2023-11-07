/* Anthony Angeles
Game title: Rocket Runner
Approx. Hours: 26 hours

Creative Tilt: I didn't really do anything to technically interesting as this is my first time ever working with
game development in general my mind has always been a software application oriented mind till now, and I didn't want to
stray too much on my own for this project until I felt like I had enough experience to really explore the new concepts
in game making, but I do feel pretty good about how the scenes transition from the play scene to game over it might
be a small task, but I would have never guessed that I would be able to create that in a game.

visually I like the asteroids and backdrop I made, it was the first time working with sprite creation and I don't really
consider myself in tune with arts so the ship itself and particles are somewhat basic; but I tried adding shading to
the asteroids and I think they came out pretty well especially seeing them rotate, I also tried making a realistic
backdrop with depth percep. adding the smaller stars that are further back and making the closer ones bigger, which
might be a lot since at the end of the day they are dots but still great to see in my actual game.
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
            debug: true,
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
let highScore = 0;
const rocketManWidth = 16;
const rocketManHeight = 128;

let keyF, keyR, keyLEFT, keyRIGHT;
