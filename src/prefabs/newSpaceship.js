class Spaceship2 extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);   // add to existing scene, displayList, updateList
        this.points = pointValue;   // store pointValue

    }
    update () {
        // move spaceship 
        if (this.mLeft) {
            this.x -= 6;
        } else {
            this.x += 6
        }
        // wrap around
        if(this.mLeft && this.x <= 0 - this.width) {
            this.x = game.config.width;
        } else if (!this.mLeft && this.x > game.config.width) {
            this.x = 0 - this.width;
        }
    }
    reset () {
        let random = Math.random()
        this.mLeft = Math.floor(random * 2) == 0;
        random = Math.abs(random - 0.5) * 2;
        this.moveSpeed = Math.ceil(game.settings.spaceshipSpeed * random);
        if (this.mLeft) {
            this.flipX = false;
            this.x = game.config.width + (borderUISize * random * 6);
        } else {
            this.flipX = true;
            this.x = 0 - (borderUISize * random * 6);
        }
    }

    
  

}