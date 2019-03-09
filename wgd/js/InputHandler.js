var cursors;
var jumpButton;		


var InputHandler = function(){ 
		
	this.cursors = game.input.keyboard.createCursorKeys();
	this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	
};



InputHandler.prototype.updateActivePlayer = function(activePlayer)
{
	
	this.checkMouse(activePlayer);
	this.checkFacing(activePlayer);
	this.checkVerticalMove(activePlayer);
	this.checkHorizontalMove(activePlayer);
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
		if (this.jumpButton.isDown && activePlayer.m_sprite.body.onFloor() && game.time.now > activePlayer.m_timer)
		{
			activePlayer.m_sprite.body.velocity.y = -250;
			activePlayer.m_timer = game.time.now + 750;
		}
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

InputHandler.prototype.checkHorizontalMove = function(activePlayer)
{	
		
		
		//Left right animations and movement
		if (this.cursors.left.isDown)
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
		else if (this.cursors.right.isDown)
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