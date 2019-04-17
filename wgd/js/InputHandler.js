var cursors;
var jumpButton;		

var InputHandler = function(){ 
	
	this.cursors = PhaserMMORPG.game.input.keyboard.createCursorKeys();
	this.jumpButton = PhaserMMORPG.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
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
		if(PhaserMMORPG.game.input.activePointer.isDown){
			activePlayer.m_weapon.fire(activePlayer.m_sprite);
		}
	
}

InputHandler.prototype.checkVerticalMove = function(activePlayer)
{
		//Jump
		/*if (this.jumpButton.isDown && activePlayer.m_sprite.body.onFloor() && PhaserMMORPG.game.time.now > activePlayer.m_timer)
		{
			activePlayer.m_sprite.body.velocity.y = -250;
			activePlayer.m_timer = PhaserMMORPG.game.time.now + 750;
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
		activePlayer.m_sprite.body.gravity.y = 500;
		activePlayer.m_canJump=true;
		activePlayer.m_onWall = false;
	}
	if(activePlayer.m_sprite.body.blocked.right && activePlayer.m_sprite.body.blocked.down){  // snail on the ground and touching a wall on the right
		activePlayer.m_canJump=true;
	}
	if(activePlayer.m_sprite.body.blocked.right && !activePlayer.m_sprite.body.blocked.down){ // snail NOT on the ground and touching a wall on the right
		activePlayer.m_canJump=false;
		activePlayer.m_onWall = true;
		activePlayer.m_sprite.body.velocity.y=0;
	}
	if(activePlayer.m_sprite.body.blocked.left && activePlayer.m_sprite.body.blocked.down){ // same concept applies to the left
		activePlayer.m_canJump=true;
	}
	if(activePlayer.m_sprite.body.blocked.left && !activePlayer.m_sprite.body.blocked.down){
		activePlayer.m_canJump=false;
		activePlayer.m_onWall = true;
		activePlayer.m_sprite.body.velocity.y=0;
	}
};
		
InputHandler.prototype.checkHorizontalMove = function(activePlayer, layer)
{	
		//game.physics.arcade.collide(this.activePlayer, layer);	
		
		//console.log(activePlayer.m_sprite.onWall);//Works
		//console.log(activePlayer.m_sprite.canJump);//Works
		if(activePlayer.m_sprite.body.blocked.down){
		//console.log("Down");//Works
		}else if (activePlayer.m_sprite.body.blocked.up){
		console.log("Up");
		}else if (activePlayer.m_sprite.body.blocked.left){
		console.log("Left");
		}else if (activePlayer.m_sprite.body.blocked.right){
		console.log("Right");	
		}

		//Gredit////////////////////////////////////////////bug testing starts here
		PhaserMMORPG.game.physics.arcade.collide(activePlayer, this.layer, this.testS(activePlayer, this.layer), null, this);
		//Grend/////////////////////////////////////////////
		//Left right animations and movement
		if ((this.cursors.left.isDown || PhaserMMORPG.game.input.keyboard.isDown(Phaser.Keyboard.A))/* && !activePlayer.m_onWall*/)
		{
			activePlayer.m_sprite.body.velocity.x = -150;

			if (activePlayer.m_facing == 'left')
			{
				activePlayer.m_sprite.animations.play('moveLeft');

				//activePlayer.m_facing = 'left';
			}
			else
			{
				activePlayer.m_sprite.animations.play('moveRight');
			}
		}
		else if ((this.cursors.right.isDown || PhaserMMORPG.game.input.keyboard.isDown(Phaser.Keyboard.D))/* && !activePlayer.m_onWall*/)

		{
			activePlayer.m_sprite.body.velocity.x = 150;

			if (activePlayer.m_facing == 'right')
			{

				activePlayer.m_sprite.animations.play('moveRight');
				//activePlayer.m_facing = 'right';
			}
			else
			{
				activePlayer.m_sprite.animations.play('moveLeft');
			}
		}
		else if((this.cursors.up.isDown || PhaserMMORPG.game.input.keyboard.isDown(Phaser.Keyboard.W)) && activePlayer.m_onWall){
			activePlayer.m_sprite.body.velocity.y = -150;
		}
		else if((this.cursors.down.isDown || PhaserMMORPG.game.input.keyboard.isDown(Phaser.Keyboard.S)) && activePlayer.m_onWall){
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

