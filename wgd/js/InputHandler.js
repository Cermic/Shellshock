var cursors;
var jumpButton;		


var InputHandler = function(){ 
		
	this.cursors = game.input.keyboard.createCursorKeys();
	this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	
};



InputHandler.prototype.updateActivePlayer = function(activePlayer)
{
	
	this.checkMouse(activePlayer);
	this.checkVerticalMove(activePlayer);
	this.checkHorizontalMove(activePlayer);
}




InputHandler.prototype.checkMouse = function(activePlayer)
{
		//Weapon Fire
		if(game.input.activePointer.isDown){
			activePlayer.weapon.fire(activePlayer.snail);
		}
	
}


InputHandler.prototype.checkVerticalMove = function(activePlayer)
{
		//Jump
		if (this.jumpButton.isDown && activePlayer.snail.body.onFloor() && game.time.now > activePlayer.timer)
		{
			activePlayer.snail.body.velocity.y = -250;
			activePlayer.timer = game.time.now + 750;
		}
}



InputHandler.prototype.checkHorizontalMove = function(activePlayer)
{	
		
		
		//Left right animations and movement
		if (this.cursors.left.isDown)
		{
			activePlayer.snail.body.velocity.x = -150;

			if (activePlayer.facing != 'left')
			{
				activePlayer.snail.animations.play('left');
				activePlayer.facing = 'left';
			}
		}
		else if (this.cursors.right.isDown)
		{
			activePlayer.snail.body.velocity.x = 150;

			if (activePlayer.facing != 'right')
			{
				activePlayer.snail.animations.play('right');
				activePlayer.facing = 'right';
			}
		}
		else
		{
			if (activePlayer.facing != 'idle')
			{
				activePlayer.snail.animations.stop();

				if (activePlayer.facing == 'left')
				{
					activePlayer.snail.frame = 0;
				}
				else
				{
					activePlayer.snail.frame = 5;
				}

				activePlayer.facing = 'idle';
			}
		}
	
	
}