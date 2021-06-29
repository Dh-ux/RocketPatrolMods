//Display remaining time
let config = {
	type: Phaser.CANVAS,
	width: 640,
	height: 480,
	scene: [Menu, Play]
}
let game = new Phaser.Game(config);
// set UI sizes
let borderUISize = game.config.height / 20;
let borderPadding = borderUISize / 5;

// reserve keyboard variables
let keyF, keyR, keyLEFT, keyRIGHT;