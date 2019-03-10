var cursors;
var jumpButton;		

var InputHandler = function(){ 
		
	this.cursors = game.input.keyboard.createCursorKeys();
	this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	//Gredit////////////////////////////////////////////
	jumpButton.onDown.add(this.handleJump, this);
	//Grend////////////////////////////////////////////

};

InputHandler.prototype.updateActivePlayer = function(activePlayer, layer)
{
	
	this.checkMouse(activePlayer);
	this.checkFacing(activePlayer);
	this.checkVerticalMove(activePlayer);
	this.checkHorizontalMove(this.activePlayer, this.layer);
}

InputHandler.prototype.checkMouse = function(activePlayer)
{
		//Weapon Fire
		if(game.input.activePointer.isDown){
			activePlayer.m_weapon.fire(activePlayer.m_sprite);
		}
	
}

InputHandler.prototype.checkVerticalMove = function(activePlayer)
{
		//Jump
		/*if (this.jumpButton.isDown && activePlayer.m_sprite.body.onFloor() && game.time.now > activePlayer.m_timer)
		{
			activePlayer.m_sprite.body.velocity.y = -250;
			activePlayer.m_timer = game.time.now + 750;
		}*/
}

InputHandler.prototype.checkFacing = function(activePlayer)
{
	var wepAngle = activePlayer.m_weapon.weaponSprite.angle;
	
	if(wepAngle > -90 && wepAngle <= 90)
	{
		activePlayer.m_facing = 'right';
	}
	else
	{
		activePlayer.m_facing = 'left';
	}
	
};

InputHandler.prototype.handleJump = function()//Greg
{
	
	        if((activePlayer.canJump && this.activePlayer.m_sprite.body.blocked.down)){
            // applying jump force
            this.activePlayer.m_sprite.body.velocity.y = -400;
			
            if(activePlayer.onWall){
				// flip horizontally the hero
				this.activePlayer.m_sprite.body.gravity.y = 0;
            }
            // hero can't jump anymore
			if(!this.activePlayer.m_sprite.body.blocked.down){
            activePlayer.canJump = false;
			}
            // hero is not on the wall anymore
			if(!this.activePlayer.m_sprite.body.blocked.right || !this.activePlayer.m_sprite.body.blocked.left)
            activePlayer.onWall = false;
        }
}

InputHandler.prototype.checkHorizontalMove = function(activePlayer, layer)
{	
		//game.physics.arcade.collide(this.activePlayer, layer);	
		
		//console.log(activePlayer.m_sprite.onWall);//Works
		//console.log(activePlayer.m_sprite.canJump);//Works
		//console.log(activePlayer.m_sprite.body.blocked.down);//Works

		//Gredit////////////////////////////////////////////bug testing starts here
		game.physics.arcade.collide(this.activePlayer, this.layer, function(activePlayer, layer){
		console.log("Checking position");
			if(activePlayer.m_sprite.body.blocked.down){
			console.log("blocked down");
				this.activePlayer.m_sprite.body.gravity.y = 500;
				activePlayer.canJump=true;
				activePlayer.onWall = false;
			}
            if(this.activePlayer.m_sprite.body.blocked.right && this.activePlayer.m_sprite.body.blocked.down){  // snail on the ground and touching a wall on the right
				activePlayer.canJump=true;
            }
            if(this.activePlayer.m_sprite.body.blocked.right && !this.activePlayer.m_sprite.body.blocked.down){ // snail NOT on the ground and touching a wall on the right
				console.log("blocked right");
				activePlayer.canJump=false;
                activePlayer.onWall = true;
				this.activePlayer.m_sprite.body.velocity.y=0;
            }
            if(this.activePlayer.m_sprite.body.blocked.left && this.activePlayer.m_sprite.body.blocked.down){ // same concept applies to the left
                activePlayer.canJump=true;
            }
            if(this.activePlayer.m_sprite.body.blocked.left && !this.activePlayer.m_sprite.body.blocked.down){
				console.log("blocked left");
                activePlayer.canJump=false;
                activePlayer.onWall = true;
				this.activePlayer.m_sprite.body.velocity.y=0;
            }
		}, null, this);
		//Grend/////////////////////////////////////////////
		//Left right animations and movement
		if ((this.cursors.left.isDown || game.input.keyboard.isDown(Phaser.Keyboard.A)) && !activePlayer.onWall)
		{
			activePlayer.m_sprite.body.velocity.x = -150;

			if (activePlayer.m_facing == 'left')
			{
				activePlayer.m_sprite.animations.play('left');
				//activePlayer.m_facing = 'left';
			}
			else
			{
				activePlayer.m_sprite.animations.play('right');
			}
		}
		else if ((this.cursors.right.isDown || game.input.keyboard.isDown(Phaser.Keyboard.D)) && !activePlayer.onWall)
		{
			activePlayer.m_sprite.body.velocity.x = 150;

			if (activePlayer.m_facing == 'right')
			{
				activePlayer.m_sprite.animations.play('right');
				//activePlayer.m_facing = 'right';
			}
			else
			{
				activePlayer.m_sprite.animations.play('left');
			}
		}
		else if((this.cursors.up.isDown || game.input.keyboard.isDown(Phaser.Keyboard.W)) && activePlayer.onWall){
			activePlayer.m_sprite.body.velocity.y = -150;
		}
		else if((this.cursors.down.isDown || game.input.keyboard.isDown(Phaser.Keyboard.S)) && activePlayer.onWall){
			activePlayer.m_sprite.body.velocity.y = 150;
		}
		else
		{
			if (activePlayer.m_facing != 'idle')
			{
				activePlayer.m_sprite.animations.stop();

				if (activePlayer.m_facing == 'left')
				{
					activePlayer.m_sprite.frame = 0;
				}
				else
				{
					activePlayer.m_sprite.frame = 8;
				}

				//activePlayer.m_facing = 'idle';
			}
		}
}