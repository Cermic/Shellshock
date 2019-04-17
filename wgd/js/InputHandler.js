var cursors;
var jumpButton;
var saveX;
var saveY;	

var worldGravity = 800;
var noGravity = 0;	
var ceilingGravity = -10;
var jumpButton;		

var APCosts = { jump: 10, horizontalMove: 1, verticalMove:  1 }


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
	this.updateText(this.activePlayer.m_actionPoints, this.activePlayer);
	//console.log(this.activePlayer.m_actionPoints);
}

InputHandler.prototype.updateText = function(newText, activePlayer)
{
	ap_Text.setText("AP: " + newText);
	ap_Text.x = activePlayer.m_sprite.x;
	ap_Text.y = activePlayer.m_sprite.y - 50;
}

InputHandler.prototype.checkMouse = function(activePlayer)
{
		//Weapon Fire
		if(game.input.activePointer.isDown){
			activePlayer.m_weapon.fire(activePlayer.m_sprite);
		if(game.input.activePointer.isDown)
		{
			if(activePlayer.m_actionPoints >= activePlayer.m_weapon.m_costAP)
			{
				activePlayer.m_weapon.fire(activePlayer);
			}
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
	
	if((this.activePlayer.m_canJump)){
    //applying jump force
        this.activePlayer.m_sprite.body.velocity.y = -400;	
		this.activePlayer.m_canJump = false;
    }
};

InputHandler.prototype.testS = function(activePlayer, layer){
	if(activePlayer.m_sprite.body.blocked.down){//if on ground
		activePlayer.m_sprite.body.gravity.y = worldGravity;
		activePlayer.m_canJump		= true;
		activePlayer.m_onWall 		= false;
		activePlayer.m_onCeiling	= false;
		activePlayer.m_sprite.angle = 0;
	}
	else if(activePlayer.m_sprite.body.blocked.right){//If wall on right
		activePlayer.m_canJump		= false;
		activePlayer.m_onWall 		= true;
		activePlayer.m_sprite.body.velocity.y=0;
		activePlayer.m_sprite.body.gravity.y=noGravity;
		activePlayer.m_sprite.angle = -90;
	}
	else if(activePlayer.m_sprite.body.blocked.left){//If wall on right
		activePlayer.m_canJump		= false;
		activePlayer.m_onWall 		= true;
		activePlayer.m_sprite.body.velocity.y=0;
		activePlayer.m_sprite.body.gravity.y=noGravity;
		activePlayer.m_sprite.angle = 90;
	}
	else if(activePlayer.m_sprite.body.blocked.up){//If on ceiling
		activePlayer.m_canJump 		= false;
		activePlayer.m_onCeiling 	= true;
		activePlayer.m_sprite.body.velocity.y=0;
		activePlayer.m_sprite.body.gravity.y=ceilingGravity
		activePlayer.m_sprite.angle = 180;
	}
	
	if (activePlayer.m_onWall){//Wall climbling
		if(activePlayer.m_sprite.body.position.x != saveX){
			activePlayer.m_onWall	= false;
			if(!activePlayer.m_onCeiling){				
				activePlayer.m_sprite.body.gravity.y = worldGravity;
			}			
		}
		saveX = activePlayer.m_sprite.body.position.x;
	}
	if (activePlayer.m_onCeiling){//Ceiling climbing
		
		if(activePlayer.m_sprite.body.position.y != saveY){
			activePlayer.m_onCeiling	= false;
			if(!activePlayer.m_onWall){				
				activePlayer.m_sprite.body.gravity.y = worldGravity;
			}
		}
		saveY = activePlayer.m_sprite.body.position.y;
	}
};
		
InputHandler.prototype.checkHorizontalMove = function(activePlayer, layer)
{	
		//game.physics.arcade.collide(this.activePlayer, layer);	
		
		//console.log(activePlayer.m_sprite.onWall);//Works
		//console.log(activePlayer.m_sprite.canJump);//Works
		//if(activePlayer.m_sprite.body.blocked.down){
		//console.log("Down");//Works
		//}else if (activePlayer.m_sprite.body.blocked.up){
		//console.log("Up");
		//}else if (activePlayer.m_sprite.body.blocked.left){
		//console.log("Left");
		//}else if (activePlayer.m_sprite.body.blocked.right){
		//console.log("Right");	
		//}

		//Gredit////////////////////////////////////////////bug testing starts here
		//Non-Greg-Edit////////////////////
		game.physics.arcade.collide(activePlayer, this.layer, this.testS(activePlayer, this.layer), null, this);
		//Grend/////////////////////////////////////////////
		//Left right animations and movement
		if ((this.cursors.left.isDown || game.input.keyboard.isDown(Phaser.Keyboard.A))/* && !activePlayer.m_onWall*/)
		{
			//Ap Calculation...
			if(this.activePlayer.m_actionPoints >= APCosts.horizontalMove)
			{
				activePlayer.m_actionPoints -= APCosts.horizontalMove;
				activePlayer.m_sprite.body.velocity.x = -150;

				if (activePlayer.m_facing == 'left')
				{
					activePlayer.m_sprite.animations.play('moveLeft');

					//activePlayer.m_facing = 'left';
				}
			}
			else
			{
				activePlayer.m_sprite.animations.play('moveRight');
			}
		}
		else if ((this.cursors.right.isDown || game.input.keyboard.isDown(Phaser.Keyboard.D))/* && !activePlayer.m_onWall*/)
		{
			//Ap Calculation...
			if(this.activePlayer.m_actionPoints >= APCosts.horizontalMove)
			{
				activePlayer.m_actionPoints -= APCosts.horizontalMove;
				activePlayer.m_sprite.body.velocity.x = 150;

				if (activePlayer.m_facing == 'right')
				{

					activePlayer.m_sprite.animations.play('moveRight');
					//activePlayer.m_facing = 'right';
				}
			}
			else
			{
				activePlayer.m_sprite.animations.play('moveLeft');
			}
		}
		else if((this.cursors.up.isDown || game.input.keyboard.isDown(Phaser.Keyboard.W)) && activePlayer.m_onWall && !activePlayer.m_onCeiling)
		{
			if(this.activePlayer.m_actionPoints >= APCosts.verticalMove)
			{
				activePlayer.m_actionPoints -= APCosts.verticalMove;
				activePlayer.m_sprite.body.velocity.y = -150;
				activePlayer.m_sprite.body.gravity.y = worldGravity;
			}
		}
		else if((this.cursors.down.isDown || game.input.keyboard.isDown(Phaser.Keyboard.S)) && (activePlayer.m_onWall || activePlayer.m_onCeiling))
		{
			//Ap Calculation...
			if(this.activePlayer.m_actionPoints >= APCosts.verticalMove)
			{
				activePlayer.m_actionPoints -= APCosts.verticalMove;
				activePlayer.m_sprite.body.velocity.y = 150;
				activePlayer.m_sprite.body.gravity.y = worldGravity;
			}
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

