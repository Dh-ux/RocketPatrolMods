//Display remaining time
let config = {
	type: Phaser.CANVAS,
	width: 640,
	height: 480,
	scene: [Menu, Play]
}
let game = new Phaser.Game(config);
// set UI sizes
let borderUISize = 30;
let borderPadding = 8;

// reserve keyboard variables
let keyF, keyR, keyLEFT, keyRIGHT;