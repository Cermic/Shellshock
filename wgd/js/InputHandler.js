var cursors;
var jumpButton;
var saveX;
var saveY;	

var worldGravity = 800;
var noGravity = 0;	
var ceilingGravity = -1;
var slotOffset = 67;
var yOffset = 6

var APCosts = { jump: 0, horizontalMove: 0, verticalMove:  0 }


var InputHandler = function(){ 
	
	this.cursors = PhaserMMORPG.game.input.keyboard.createCursorKeys();
	this.jumpButton = PhaserMMORPG.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

	jumpButton.onDown.add(this.handleJump, this);
};

InputHandler.prototype.updateActivePlayer = function(activePlayer, layer)
{
	this.activePlayer = activePlayer;
	this.checkMouse(activePlayer);
	this.checkFacing(activePlayer);
	this.checkVerticalMove(activePlayer);
	this.checkHorizontalMove(activePlayer, layer);
	this.updateText(this.activePlayer.m_actionPoints, this.activePlayer);
	this.switchWeapon(this.activePlayer, ui_weapon_box);
}

InputHandler.prototype.updateText = function(newText, activePlayer)
{
	ap_Text.setText("AP: " + newText);
	ap_Text.x = activePlayer.m_sprite.x;
	ap_Text.y = activePlayer.m_sprite.y - 50;
}

InputHandler.prototype.switchWeapon = function(activePlayer, ui_weapon_box)
{
	// Update which weapon is initiliased based on key press.
	if (activePlayer.m_weaponKeys[0].isDown)
    {
		activePlayer.m_weapon.destroy();
        activePlayer.m_weapon = activePlayer.m_weaponsList[0]; // Pea Shooter
		activePlayer.m_weapon.init();
		ui_weapon_box.cameraOffset.x = 353;
		
		activePlayer.currWeaponIndex = 0;
    }
	
	if(activePlayer.m_weaponKeys[1].isDown)
	{
		activePlayer.m_weapon.destroy();
		activePlayer.m_weapon = activePlayer.m_weaponsList[1]; // A-Salt-Rifle
		activePlayer.m_weapon.init();
		ui_weapon_box.cameraOffset.x = 417;
		
		activePlayer.currWeaponIndex = 1;
	}
	if(activePlayer.m_weaponKeys[2].isDown)
	{
		activePlayer.m_weapon.destroy();
		activePlayer.m_weapon = activePlayer.m_weaponsList[2]; // Slug-Gun
		activePlayer.m_weapon.init();
		ui_weapon_box.cameraOffset.x = 481;
		
		activePlayer.currWeaponIndex = 2;
	}
	if(activePlayer.m_weaponKeys[3].isDown)
	{
		activePlayer.m_weapon.destroy();
		activePlayer.m_weapon = activePlayer.m_weaponsList[3]; // Bee-Zooka
		activePlayer.m_weapon.init();
		ui_weapon_box.cameraOffset.x = 545;
		
		activePlayer.currWeaponIndex = 3;
	}
	if(activePlayer.m_weaponKeys[4].isDown)
	{
		activePlayer.m_weapon.destroy();
		activePlayer.m_weapon = activePlayer.m_weaponsList[4]; // Snrailgun
		activePlayer.m_weapon.init();
		ui_weapon_box.cameraOffset.x = 609;
		
		activePlayer.currWeaponIndex = 4;
	}
}

InputHandler.prototype.checkMouse = function(activePlayer)
{
		//Weapon Fire
		if(PhaserMMORPG.game.input.activePointer.isDown)
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
		if(activePlayer.m_onCeiling){
			activePlayer.m_facing = 'left';
		}else{
			activePlayer.m_facing = 'right';
		}
	}
	else
	{
		if(activePlayer.m_onCeiling){
			activePlayer.m_facing = 'right';
		}else{
			activePlayer.m_facing = 'left';
		}
	}
	
};

InputHandler.prototype.handleJump = function()
{

	
	if((this.activePlayer.m_canJump)){
    //applying jump force
		this.activePlayer.m_onCeiling	= false;
        this.activePlayer.m_sprite.body.velocity.y = -400;	
		this.activePlayer.m_canJump = false;
    }
};

InputHandler.prototype.testS = function(activePlayer, layer){
	
	if(activePlayer.m_sprite.body.blocked.down){//if on ground
		activePlayer.m_sprite.body.gravity.y = worldGravity;
		activePlayer.m_canJump		= true;
		activePlayer.m_onWallLeft 	= false;
		activePlayer.m_onWallRight 	= false;
		activePlayer.m_onCeiling	= false;
		activePlayer.m_sprite.angle = 0;
	}
	else if(activePlayer.m_sprite.body.blocked.up){//If on ceiling
		activePlayer.m_canJump 		= true;
		activePlayer.m_onCeiling 	= true;
		activePlayer.m_sprite.body.velocity.y=0;
		activePlayer.m_sprite.body.gravity.y=ceilingGravity
		activePlayer.m_sprite.angle = 180;
	}
	else if(activePlayer.m_sprite.body.blocked.right){//If wall on right
		activePlayer.m_canJump		= false;
		activePlayer.m_onWallLeft	= false;
		activePlayer.m_onWallRight	= true;
		activePlayer.m_onCeiling	= false;
		activePlayer.m_sprite.body.velocity.y=0;
		activePlayer.m_sprite.body.gravity.y=noGravity;
		activePlayer.m_sprite.angle = -90;
	}
	else if(activePlayer.m_sprite.body.blocked.left){//If wall on right
		activePlayer.m_canJump		= false;
		activePlayer.m_onWallLeft	= true;
		activePlayer.m_onWallRight	= false;
		activePlayer.m_onCeiling	= false;
		activePlayer.m_sprite.body.velocity.y=0;
		activePlayer.m_sprite.body.gravity.y=noGravity;
		activePlayer.m_sprite.angle = 90;
	}
	
	if (activePlayer.m_onCeiling){//Ceiling climbing
		
		if(activePlayer.m_sprite.body.position.y != saveY){
			activePlayer.m_onCeiling	= false;
			if(!activePlayer.m_onWallLeft || !activePlayer.m_onWallRight){				
				activePlayer.m_sprite.body.gravity.y = worldGravity;
			}
		}
		saveY = activePlayer.m_sprite.body.position.y;
	}
	
	if (activePlayer.m_onWallLeft || activePlayer.m_onWallRight){//Wall climbling
		if(activePlayer.m_sprite.body.position.x != saveX){
			activePlayer.m_onWallLeft	= false;
			activePlayer.m_onWallRight	= false;
			if(!activePlayer.m_onCeiling){				
				activePlayer.m_sprite.body.gravity.y = worldGravity;
			}			
		}
		saveX = activePlayer.m_sprite.body.position.x;
	}
	//console.log("Ceiling: " + activePlayer.m_onCeiling);
	//console.log("Wall: " + activePlayer.m_onWall);
};
		
InputHandler.prototype.checkHorizontalMove = function(activePlayer, layer)
{	
//<<<<<<< HEAD
//<<<<<<< HEAD
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
		//PhaserMMORPG.game.physics.arcade.collide(activePlayer, this.layer, this.testS(activePlayer, this.layer), null, this);
		//Grend/////////////////////////////////////////////

		
//=======
		PhaserMMORPG.game.physics.arcade.collide(activePlayer, this.layer, this.testS(activePlayer, this.layer), null, this);
//>>>>>>> 329926c653f55cf00551a84e996f4d69f3632eaf
		//Left right animations and movement
		if ((this.cursors.left.isDown || PhaserMMORPG.game.input.keyboard.isDown(Phaser.Keyboard.A))/* && !activePlayer.m_onWall*/)
		{
			//Ap Calculation...
			if(this.activePlayer.m_actionPoints >= APCosts.horizontalMove)
			{
				activePlayer.m_sprite.m_moving = true;
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
		else if ((this.cursors.right.isDown || PhaserMMORPG.game.input.keyboard.isDown(Phaser.Keyboard.D))/* && !activePlayer.m_onWall*/)
		{
			//Ap Calculation...
			if(this.activePlayer.m_actionPoints >= APCosts.horizontalMove)
			{
							activePlayer.m_sprite.m_moving = true;

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
		else if((this.cursors.up.isDown || PhaserMMORPG.game.input.keyboard.isDown(Phaser.Keyboard.W)) && (activePlayer.m_onWallLeft || activePlayer.m_onWallRight))
		{
			if(this.activePlayer.m_actionPoints >= APCosts.verticalMove)
			{
				activePlayer.m_actionPoints -= APCosts.verticalMove;
				activePlayer.m_sprite.body.velocity.y = -150;
				
			if(activePlayer.m_onWallLeft){
				activePlayer.m_sprite.body.velocity.x = -150;
			}else if(activePlayer.m_onWallRight)
			{
				activePlayer.m_sprite.body.velocity.x = 150;
			}
				
				activePlayer.m_sprite.body.gravity.y = worldGravity;
			}
		}
		else if((this.cursors.down.isDown || PhaserMMORPG.game.input.keyboard.isDown(Phaser.Keyboard.S)) && ((activePlayer.m_onWallLeft || activePlayer.m_onWallRight) || activePlayer.m_onCeiling))
		{
			//Ap Calculation...
			if(this.activePlayer.m_actionPoints >= APCosts.verticalMove)
			{
				activePlayer.m_actionPoints -= APCosts.verticalMove;
				activePlayer.m_sprite.body.velocity.y = 150;
				activePlayer.m_sprite.body.gravity.y = worldGravity;
				activePlayer.m_sprite.m_moving = true;
			}
		}
		else
		{
			activePlayer.m_sprite.m_moving = false;
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