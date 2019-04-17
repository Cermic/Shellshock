	
var CollisionHandler = function(){ 
		


	
};



CollisionHandler.prototype.CheckWeaponFire = function(activePlayer, enemies)
{
		
		
		for(i = 0; i < enemies.length; i++)
		{
			if(PhaserMMORPG.game.physics.arcade.overlap(activePlayer.m_weapon.m_projectiles, enemies[i].m_sprite))
			{
				return i;		//return the index of the hit enemy
			}
		}
			
}

CollisionHandler.prototype.CheckWeaponFireWithScene = function(activePlayer, sceneLayer)
{
	if(PhaserMMORPG.game.physics.arcade.overlap(activePlayer.m_weapon.m_projectiles, sceneLayer))
	{
		activePlayer.m_weapon.m_projectiles.x = 1000;
	}

}