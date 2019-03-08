

function Snail() {

 this.timer = 0;
}

var timer;
var snail;
var weapon;


Snail.prototype.init = function() {
	
			//Sprite
		    this.snail = game.add.sprite(32, 32, 'dude');
			game.physics.enable(this.snail, Phaser.Physics.ARCADE);
			this.snail.x = 1000;
			
			//Physics
			this.snail.body.bounce.y = 0.2;
			this.snail.body.collideWorldBounds = true;
			this.snail.body.setSize(20, 32, 5, 16);
			
			//Animations
			this.snail.animations.add('left', [0, 1, 2, 3], 10, true);
			this.snail.animations.add('turn', [4], 20, true);
			this.snail.animations.add('right', [5, 6, 7, 8], 10, true);
			
			//Camera
			game.camera.follow(this.snail);
			
			//Weapon
			weapon = new Weapon(0,0,0,0,800,0,5);
			weapon.init();
			
			
}


Snail.prototype.update = function() {	
	
	this.snail.body.velocity.x = 0;		
	game.physics.arcade.collide(this.snail, layer);	
	
	weapon.update(this.snail);
}




Snail.prototype.move = function() {
			
		//Weapon Fire
		if(game.input.activePointer.isDown){
			weapon.fire(this.snail);
		}
		
		
		//Left right animations and movement
		if (cursors.left.isDown)
		{
			this.snail.body.velocity.x = -150;

			if (this.facing != 'left')
			{
				this.snail.animations.play('left');
				this.facing = 'left';
			}
		}
		else if (cursors.right.isDown)
		{
			this.snail.body.velocity.x = 150;

			if (this.facing != 'right')
			{
				this.snail.animations.play('right');
				this.facing = 'right';
			}
		}
		else
		{
			if (this.facing != 'idle')
			{
				this.snail.animations.stop();

				if (this.facing == 'left')
				{
					this.snail.frame = 0;
				}
				else
				{
					this.snail.frame = 5;
				}

				this.facing = 'idle';
			}
		}

		
		//Jump
		if (jumpButton.isDown && this.snail.body.onFloor() && game.time.now > this.timer)
		{
			this.snail.body.velocity.y = -250;
			this.timer = game.time.now + 750;
		}
		
}

