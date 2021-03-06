class Play extends Phaser.Scene {
	constructor() {
		super("playScene")
	}
	preload() {
		// load images/tile sprites
		this.load.image('rocket', './assets/rocket.png');
		this.load.image('spaceship', './assets/spaceship.png');
		this.load.image('newSpaceship', './assets/cloud.png')
		this.load.image('starfield', './assets/starfield.png');
		this.load.audio('BGM', './assets/BGM.wav');
		// load spritesheet
		this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
	  }
	create() {
		this.bgm = this.sound.add('BGM', {
            mute:false,
            volume:0.5,
            rate:1,
            loop:true
        });

        this.bgm.play();
		// place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
		this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0xAEEEEE).setOrigin(0, 0);
        // white borders
		this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
    
		// add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
        // add spaceships (x3)
		this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
		this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
		this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);
		this.ship04 = new Spaceship2(this, game.config.width + 38, 215, 'newSpaceship', 0, 50).setScale(0.5, 0.5).setOrigin(0,0);
        
		// define keys
		keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        // animation config
		this.anims.create({
			key: 'explode',
			frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
			frameRate: 30
		});
		// initialize score
		this.p1Score = 0;
        // display score
		let scoreConfig = {
			fontFamily: 'Courier',
			fontSize: '28px',
			backgroundColor: '#F3B141',
			color: '#843605',
			align: 'right',
			padding: {
			  top: 5,
			  bottom: 5,
			},
			fixedWidth: 100
		}
		this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
		//GAME OVER flag
		this.gameOver = false;
        //60-second play clock
		scoreConfig.fixedWidth = 0;
		this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
			this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
		    this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ??? to Menu', scoreConfig).setOrigin(0.5);
		    this.gameOver = true;
		}, null, this);

		this.timerSeconds = game.settings.gameTimer / 1000;
        this.timeStart = this.time.now;
		this.disTimer = this.add.text(game.config.width, 0, this.timerSeconds, scoreConfig).setOrigin(1,0);

        this.cameras.main.fadeIn(500); 

        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
			this.scene.start('menuScene');
        });
		//mouse control 
		this.input.on('pointerdown', function(pointer){

            this.input.mouse.requestPointerLock();

            if (!this.p1Rocket.isFiring && !this.gameOver && pointer.leftButtonDown()) {

                this.p1Rocket.type = 0;
                this.p1Rocket.isFiring = true;
                this.p1Rocket.sfxRocket.play();

            } else if (!this.p1Rocket.isFiring && !this.gameOver && pointer.rightButtonDown() && this.p1Rocket.rtypeNumber > 0) {

                this.p1Rocket.isFiring = true;
                this.p1Rocket.type = 1;
                this.p1Rocket.setFlipY(true); 
                this.p1Rocket.setScale(0.3);
                this.p1Rocket.rtypeNumber--;
                this.p1Rocket.sfxRocket.play();
            }

        }, this);

        this.input.on('pointermove', function (pointer) {

           

                if (!this.p1Rocket.isFiring && !this.gameOver && this.input.mouse.locked) {

                    this.p1Rocket.x += pointer.movementX;
                    this.p1Rocket.x = Phaser.Math.Wrap(this.p1Rocket.x, 0, game.renderer.width);
                }
            

        }, this);
		//I looked at the video about phaser 3 tutorial cursors https://www.youtube.com/watch?v=teZavPHW4uQ


	}
	update() {
		if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
			this.bgm.pause();
            this.scene.restart();
        }
		if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
			this.cameras.main.fadeOut(1000);
        }
		this.starfield.tilePositionX -= 4;

		if (!this.gameOver) {              
			this.p1Rocket.update();         // update rocket sprite
			this.ship01.update();           // update spaceships (x3)
			this.ship02.update();
			this.ship03.update();
			this.ship04.update();
			this.disTimer.text = this.timerSeconds - Math.round((this.time.now - this.timeStart) / 1000)
		} 
		// check collisions
		if(this.checkCollision(this.p1Rocket, this.ship04)) {
			this.p1Rocket.reset();
			this.shipExplode(this.ship04); 
		}	
		if(this.checkCollision(this.p1Rocket, this.ship03)) {
			this.p1Rocket.reset();
			this.shipExplode(this.ship03);   
		}
		if (this.checkCollision(this.p1Rocket, this.ship02)) {
			this.p1Rocket.reset();
			this.shipExplode(this.ship02);
		}
		if (this.checkCollision(this.p1Rocket, this.ship01)) {
			this.p1Rocket.reset();
			this.shipExplode(this.ship01);
		}
	}	
		checkCollision(rocket, ship) {
			// simple AABB checking
			if (rocket.x < ship.x + ship.width && 
				rocket.x + rocket.width > ship.x && 
				rocket.y < ship.y + ship.height &&
				rocket.height + rocket.y > ship. y) {
					return true;
			} else {
				return false;
			}
		}
		shipExplode(ship) {
			// temporarily hide ship
			ship.alpha = 0;
			// create explosion sprite at ship's position
			let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
			boom.anims.play('explode');             // play explode animation
			boom.on('animationcomplete', () => {    // callback after anim completes
			ship.reset();                         // reset ship position
			ship.alpha = 1;                       // make ship visible again
			boom.destroy();                       // remove explosion sprite
			}); 
			//score add and repaint
			this.p1Score += ship.points;
			this.scoreLeft.text = this.p1Score;
			this.sound.play('sfx_explosion');
	
		}

}
