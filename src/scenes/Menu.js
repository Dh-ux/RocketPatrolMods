class Menu extends Phaser.Scene {
	constructor() {
		super("menuScene")
	}
	preload() {
		// load audio
		this.load.audio('sfx_select', './assets/blip.wav');
		this.load.audio('sfx_explosion', './assets/explosion.wav');
		this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
	}
	create() {
		// menu text configuration
		let menuConfig = {
			fontFamily: 'Courier',
			fontSize: '28px',
			backgroundColor: '#F3B141',
			color: '#843605',
			align: 'right',
			padding: {
				top: 5,
				bottom: 5
			},
			fixedWidth: 0
		}
		
		// show menu text
		this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
		menuConfig.fontSize = '20px';
		this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ arrows to move & (F) or (SPACE) to fire', menuConfig).setOrigin(0.5);
		this.add.text(game.config.width/2, game.config.height/2 + borderUISize, '(P) to pause and resume', menuConfig).setOrigin(0.5);
		menuConfig.backgroundColor = '#37946e';
		menuConfig.color = '#000';
		this.add.text(game.config.width/2, game.config.height/2 + borderUISize * 2 + borderPadding, 'Press ← for Novice or → for Export', menuConfig).setOrigin(0.5);
		
		//defines key
		keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
		keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
	}
	update() {
		if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
			game.settings = {
				spaceshipSpeed: 3,
				gameTimer: 60000
			};
			this.sound.play('sfx_select');
			this.scene.start('playScene');
		}
		if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
			game.settings = {
				spaceshipSpeed: 4,
				gameTimer: 45000
			};
			this.sound.play('sfx_select');
			this.scene.start('playScene');
		}
	}
}