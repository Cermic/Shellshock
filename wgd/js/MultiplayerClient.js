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
		var plr = new Snail('RedSnail', 0);
		plr.init();
		plr.x = x;
		plr.y = y;
		
		PhaserMMORPG.playerList[id] = plr;
	}
	
	eurecaClient.exports.updateState = function(id, state)
	{
		
			
		if (PhaserMMORPG.playerList[id] && PhaserMMORPG.MyMyltiplayerId  !== id)  {

			//Do scene collision check
			PhaserMMORPG.game.physics.arcade.collide(PhaserMMORPG.playerList[id].m_sprite, layer01);	 

			//Update player orientation
			PhaserMMORPG.playerList[id].m_sprite.position.x = state.x;
			PhaserMMORPG.playerList[id].m_sprite.position.y = state.y;
			
			//Update weapon orientation
			PhaserMMORPG.playerList[id].m_weapon.m_weaponSprite.x = state.wepx;	
			PhaserMMORPG.playerList[id].m_weapon.m_weaponSprite.y = state.wepy;
			PhaserMMORPG.playerList[id].m_weapon.m_weaponSprite.rotation  = state.wepAng;
			
			
			
			//Update the character
			PhaserMMORPG.playerList[id].m_sprite.body.velocity.x = 0;		
			PhaserMMORPG.game.physics.arcade.collide(PhaserMMORPG.playerList[id].m_sprite, layer01);	
			PhaserMMORPG.playerList[id].m_weapon.updateOnline(PhaserMMORPG.playerList[id]);
			m_inputHandler.updateActivePlayer(PhaserMMORPG.playerList[id], layer01);

		}	
	}
}
