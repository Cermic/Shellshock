var PhaserMMORPG = PhaserMMORPG || {};


PhaserMMORPG.MultiplayerServerReady = false;
PhaserMMORPG.playerList = PhaserMMORPG.playerList || {};
PhaserMMORPG.MyMyltiplayerId = 0;


//this function will handle client communication with the server
PhaserMMORPG.eurecaClientSetup = function() {
	//create an instance of eureca.io client
	var eurecaClient = new Eureca.Client();
	
	eurecaClient.ready(function (proxy) {		
		PhaserMMORPG.eurecaServer = proxy;
	});
	
	
	//methods defined under "exports" namespace become available in the server side
	
	eurecaClient.exports.setId = function(id) 
	{
		PhaserMMORPG.MyMyltiplayerId = id;
		PhaserMMORPG.eurecaServer.handshake();
		PhaserMMORPG.MultiplayerServerReady = true;
	}	
	
	eurecaClient.exports.kill = function(id)
	{	
		if (PhaserMMORPG.playerList[id]) {
			PhaserMMORPG.playerList[id].kill();
			console.log('killing ', id, PhaserMMORPG.playerList[id]);
		}
	}	
	
	eurecaClient.exports.spawnAnotherPlayer = function(id, x, y, color, ip)
	{
		
		if (id == PhaserMMORPG.MyMyltiplayerId) return; //this is me
		
		console.log('Spawning another player with name ' + ip);
		
		//var plr = new PhaserMMORPG.Avatar(PhaserMMORPG.game, ip, x, y, color);
		var plr = new SnailOnline('RedSnail', 0);
		plr.init();
		plr.x = x;
		plr.y = y;
			
		PhaserMMORPG.playerList[id] = plr;
	}
	
	
	
	eurecaClient.exports.updateState = function(id, state)
	{
				
		if (PhaserMMORPG.playerList[id] && PhaserMMORPG.MyMyltiplayerId  !== id)  {

			//Update player orientation
			PhaserMMORPG.playerList[id].m_sprite.position.x = state.x;
			PhaserMMORPG.playerList[id].m_sprite.position.y = state.y;
			
			PhaserMMORPG.playerList[id].m_facing = state.facingDir;
			
			
			//Update weapon orientation
			PhaserMMORPG.playerList[id].m_weapon.m_weaponSprite.x = state.wepx;	
			PhaserMMORPG.playerList[id].m_weapon.m_weaponSprite.y = state.wepy;
			PhaserMMORPG.playerList[id].m_weapon.m_weaponSprite.rotation  = state.wepAng;
					
										
			//Animation Bug		
			///if(PhaserMMORPG.playerList[id].m_sprite.animations.name ==state.anim)
			///{
				///PhaserMMORPG.playerList[id].m_sprite.animations.stop();
			///}
			///else{
				///if(PhaserMMORPG.playerList[id].m_sprite.animations.name != null)
				///PhaserMMORPG.playerList[id].m_sprite.animations.play(state.anim);	
			///}
					
			
			
			if(state.activeProj)
			{
				if(PhaserMMORPG.playerList[id].m_weapon.m_projectile.isAlive)
				{
					PhaserMMORPG.playerList[id].m_weapon.m_projectile.m_sprite.position.x = state.projx;
					PhaserMMORPG.playerList[id].m_weapon.m_projectile.m_sprite.position.y = state.projy;
				}
				else
				{
					PhaserMMORPG.playerList[id].m_weapon.m_projectile = new Projectile(0,0,0,PhaserMMORPG.playerList[id].m_weapon.m_projectileSprite);
					PhaserMMORPG.playerList[id].m_weapon.m_projectile.init(PhaserMMORPG.playerList[id].m_weapon.m_weaponSprite.x, PhaserMMORPG.playerList[id].m_weapon.m_weaponSprite.y);
					
					PhaserMMORPG.playerList[id].m_weapon.m_projectile.m_sprite.position.x = state.projx;
					PhaserMMORPG.playerList[id].m_weapon.m_projectile.m_sprite.position.y = state.projy;
				}
			}
			
			
			//if(state.hasFired == 1)
			//{
			//	PhaserMMORPG.playerList[id].m_weapon.fireOnline(state.velx, state.vely);		
			//	PhaserMMORPG.playerList[id].m_weapon.hasFired = 0;
						
			//}
			
			
			
			//Update the character			
			PhaserMMORPG.playerList[id].update();	
					
			
				
		}	
	}
}
