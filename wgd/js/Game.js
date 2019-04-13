var PhaserMMORPG = PhaserMMORPG || {};
//game
PhaserMMORPG.Game = function(){};


	var map;
	var tileset;
	var layer;
	var bg;
	var player;
	var cursors;
	var jumpButton;	
	var layer00, layer01;//Greg



var gameOptions = {//Greg
    // player gravity
    playerGravity: 500,
	wallGravity: 100,
	noGravity: 0
}

	var m_inputHandler;
	var playerSpriteWidth = 32, playerSpriteHeight = 32;
	
	


PhaserMMORPG.Game.prototype = {
	
	
 
 
 
 	preload: function(){
		
		this.load.tilemap('PLANTER', 'assets/PLANTER.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.image('2_Tone_Textures', 'assets/2_Tone_Textures.png');
		this.load.spritesheet('dude', 'assets/starstruck/dude.png', playerSpriteWidth, playerSpriteHeight);
		this.load.spritesheet('droid', 'assets/starstruck/droid.png', 32, 32);
		this.load.image('starSmall', 'assets/starstruck/star.png');
		this.load.image('starBig', 'assets/starstruck/star2.png');
		this.load.image('background', 'assets/starstruck/background2.png');
		
		this.load.image('arrow', 'assets/sprites/arrow.png');
		this.load.image('bullet', 'assets/sprites/purple_ball.png');
		
		this.load.spritesheet('RedSnail', 'assets/sprites/Red_Snail_Movement.png', 32, 32);
		this.load.image('Beezooka', 'assets/sprites/Beezooka.png');

	},
	
  create: function() {
	this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.physics.gravity=0;

		this.game.stage.backgroundColor = '#000000';

		bg = this.game.add.tileSprite(0, 0, 800, 600, 'background');
		bg.fixedToCamera = true;

		map = this.game.add.tilemap('PLANTER');
		map.addTilesetImage('2_Tone_Textures');

		map.setCollisionByExclusion([4]);//tileset not map location

		//layer = map.createLayer('Background');
		//layer = map.createLayer('Foreground');
		
		layer00 = map.createLayer('Background');//Greg
		layer01 = map.createLayer('Foreground');//Greg
		layer01.debug = true;//Greg
		layer01.resizeWorld();//Greg
		
		//  Un-comment this on to see the collision tiles
		//layer.debug = true;
		//layer.resizeWorld();

	
		
		if(this.game.isRunning )
		this.game.physics.arcade.gravity.y = 800;//This gives the bullets gravity	//CHLOE: This caused the players on the server to fall
																					//		 Constantly when their window wasnt active. 
		if(!this.game.isRunning)
		this.game.physics.arcade.gravity.y = 0;																			//		 Bullets now without gravity
																					
		
		cursors = this.game.input.keyboard.createCursorKeys();
		jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		
		
		player = new Snail('RedSnail', 0);
		player.init();
		
		//Gredit////////////////////////////////////////////
		player.x = 600;
		player.y = 1300;
		//Grend/////////////////////////////////////////////
		//Camera
		PhaserMMORPG.game.camera.follow(player.m_sprite);
	
		
		m_inputHandler = new InputHandler();	
    

		//spawn other players
		PhaserMMORPG.eurecaServer.spawnOtherPlayers();
  
  },
  



	

 update: function() {
	 
		//m_inputHandler.updateActivePlayer(player, layer01);	
		player.update();	
		m_inputHandler.updateActivePlayer(player, layer01);		
  }
  
};