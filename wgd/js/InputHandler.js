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
	this.activePlayer = activePlayer;
	this.checkMouse(activePlayer);
	this.checkFacing(activePlayer);
	this.checkVerticalMove(activePlayer);
	this.checkHorizontalMove(activePlayer, layer);
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

	var wepAngle = activePlayer.m_weapon.m_weaponSprite.angle;
	
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
	
	        if((this.activePlayer.m_canJump && this.activePlayer.m_sprite.body.blocked.down)){
            // applying jump force
            this.activePlayer.m_sprite.body.velocity.y = -400;
			
            if(this.activePlayer.m_onWall){
				// flip horizontally the hero
				this.activePlayer.m_sprite.body.gravity.y = 0;
            }
            // hero can't jump anymore
			if(!this.activePlayer.m_sprite.body.blocked.down){
            this.activePlayer.m_canJump = false;
			}
            // hero is not on the wall anymore
			if(!this.activePlayer.m_sprite.body.blocked.right || !this.activePlayer.m_sprite.body.blocked.left)
            this.activePlayer.m_onWall = false;
        }
};

InputHandler.prototype.testS = function(activePlayer, layer){
	//console.log("Checking position");
	if(activePlayer.m_sprite.body.blocked.down){
		activePlayer.m_sprite.body.gravity.y = 800;
		activePlayer.m_canJump=true;
		activePlayer.m_onWall = false;
	}
	else if(activePlayer.m_sprite.body.blocked.right && activePlayer.m_sprite.body.blocked.down){  // snail on the ground and touching a wall on the right
		activePlayer.m_canJump=true;
	}
	else if(activePlayer.m_sprite.body.blocked.right && !activePlayer.m_sprite.body.blocked.down){ // snail NOT on the ground and touching a wall on the right
		activePlayer.m_canJump=false;
		activePlayer.m_onWall = true;
		activePlayer.m_sprite.body.velocity.y=0;
		activePlayer.m_sprite.body.gravity.y=0;
	}
	else if(activePlayer.m_sprite.body.blocked.left && activePlayer.m_sprite.body.blocked.down){ // same concept applies to the left
		activePlayer.m_canJump=true;
	}
	else if(activePlayer.m_sprite.body.blocked.left && !activePlayer.m_sprite.body.blocked.down){
		activePlayer.m_canJump=false;
		activePlayer.m_onWall = true;
		activePlayer.m_sprite.body.velocity.y=0;
		activePlayer.m_sprite.body.gravity.y=0;
	}else if(activePlayer.m_sprite.body.blocked.right && !activePlayer.m_sprite.body.blocked.up){
		
	}else if(activePlayer.m_sprite.body.blocked.left && !activePlayer.m_sprite.body.blocked.up){
		
	}

};
		
		/*
		
InputHandler.prototype.handleJump = function()//Greg
{
	
	        if((this.activePlayer.m_canJump && this.activePlayer.m_sprite.body.blocked.down)){
            // applying jump force
            this.activePlayer.m_sprite.body.velocity.y = -400;
			
            if(this.activePlayer.m_onWall){
				// flip horizontally the hero
				this.activePlayer.m_sprite.body.gravity.y = 0;
            }
            // hero can't jump anymore
			if(!this.activePlayer.m_sprite.body.blocked.down){
            this.activePlayer.m_canJump = false;
			}
            // hero is not on the wall anymore
			if(!this.activePlayer.m_sprite.body.blocked.right || !this.activePlayer.m_sprite.body.blocked.left)
            this.activePlayer.m_onWall = false;
        }
};

InputHandler.prototype.testS = function(activePlayer, layer){
	//console.log("Checking position");
	if(activePlayer.m_sprite.body.blocked.down){
		activePlayer.m_sprite.body.gravity.y = 800;
		activePlayer.m_canJump=true;
		activePlayer.m_onWall = false;
	}
	//else if(activePlayer.m_sprite.body.blocked.right && activePlayer.m_sprite.body.blocked.down){  // snail on the ground and touching a wall on the right
	//	activePlayer.m_canJump=true;
	//}
	//else if(activePlayer.m_sprite.body.blocked.right && !activePlayer.m_sprite.body.blocked.down){ // snail NOT on the ground and touching a wall on the right
	//	activePlayer.m_canJump=false;
	//	activePlayer.m_onWall = true;
	//	activePlayer.m_sprite.body.velocity.y=0;
	//	activePlayer.m_sprite.body.gravity.y=0;
	//}
	//else if(activePlayer.m_sprite.body.blocked.left && activePlayer.m_sprite.body.blocked.down){ // same concept applies to the left
	//	activePlayer.m_canJump=true;
	//}
	//else if(activePlayer.m_sprite.body.blocked.left && !activePlayer.m_sprite.body.blocked.down){
	//	activePlayer.m_canJump=false;
	//	activePlayer.m_onWall = true;
	//	activePlayer.m_sprite.body.velocity.y=0;
	//	activePlayer.m_sprite.body.gravity.y=0;
	//}
	else if(activePlayer.m_sprite.body.blocked.right){
		activePlayer.m_canJump=false;
		activePlayer.m_onWall = true;
	}
	else if(activePlayer.m_sprite.body.blocked.left){
		activePlayer.m_canJump=false;
		activePlayer.m_onWall = true;
	}
	else if(activePlayer.m_sprite.body.blocked.up){
		activePlayer.m_canJump=false;
		activePlayer.m_onCeiling = true;
	}

	//////////////////Wall climbing settings

	if activePlayer.m_onWall{
		int saveY = activePlayer.m_sprite.body.position.y;
		
		if(activePlayer.m_sprite.body.position.y != saveY){	
			activePlayer.m_onWall= false;
			
			if(!activePlayer.m_onCeiling){				
				activePlayer.m_sprite.body.gravity.y = worldGravity;
			}			
		}
	}
	
	if() activePlayer.m_onCeiling{
		int saveX = activePlayer.m_sprite.body.position.x;
		
		if(activePlayer.m_sprite.body.position.x != saveX){
			activePlayer.m_onCeiling= false;
			if(!activePlayer.m_onWall){				
				activePlayer.m_sprite.body.gravity.y = worldGravity;
			}
		}
	}
	////////////////////////////////////////
};
		
		
		*/
		
InputHandler.prototype.checkHorizontalMove = function(activePlayer, layer)
{	
		//console.log(activePlayer.m_sprite.onWall);//Works
		//console.log(activePlayer.m_sprite.canJump);//Works
		if(activePlayer.m_sprite.body.blocked.down){
		console.log("Down");//Works
		}
		if (activePlayer.m_sprite.body.blocked.up){
		console.log("Up");
		}
		if (activePlayer.m_sprite.body.blocked.left){
		console.log("Left");
		}
		if (activePlayer.m_sprite.body.blocked.right){
		console.log("Right");	
		}
		//console.log(activePlayer.m_sprite.body.gravity.y);
		
		
		game.physics.arcade.collide(activePlayer, this.layer, this.testS(activePlayer, this.layer), null, this);
		//Left right animations and movement
		if ((this.cursors.left.isDown || game.input.keyboard.isDown(Phaser.Keyboard.A))/* && !activePlayer.m_onWall*/)
		{
			activePlayer.m_sprite.body.velocity.x = -150;

			if (activePlayer.m_facing == 'left')
			{
				activePlayer.m_sprite.animations.play('moveLeft');
			}
			else
			{
				activePlayer.m_sprite.animations.play('moveRight');
			}
		}
		else if ((this.cursors.right.isDown || game.input.keyboard.isDown(Phaser.Keyboard.D))/* && !activePlayer.m_onWall*/)

		{
			activePlayer.m_sprite.body.velocity.x = 150;

			if (activePlayer.m_facing == 'right')
			{
				activePlayer.m_sprite.animations.play('moveRight');
			}
			else
			{
				activePlayer.m_sprite.animations.play('moveLeft');
			}
		}
		else if((this.cursors.up.isDown || game.input.keyboard.isDown(Phaser.Keyboard.W)) && activePlayer.m_onWall){
			activePlayer.m_sprite.body.velocity.y = -150;
		}
		else if((this.cursors.down.isDown || game.input.keyboard.isDown(Phaser.Keyboard.S)) && activePlayer.m_onWall){
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
};

