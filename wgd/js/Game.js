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
	
	var m_inputHandler;
	//var collisionhandler;
	var playerSpriteWidth = 32, playerSpriteHeight = 32;



var gameOptions = {//Greg
    // player gravity
    playerGravity: 500,
	wallGravity: 100,
	noGravity: 0
}


	
	


PhaserMMORPG.Game.prototype = {
	
	
 
 
 
 	preload: function(){
		this.load.image('Health_Bar', 'assets/healthbar.png');
		this.load.image('Info_Box', 'assets/ui_infobox.png');
		this.load.image('Tall_Box', 'assets/ui_tallbox.png');
		this.load.image('Weapon_Box', 'assets/ui_weaponbox.png');
		
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
		this.load.spritesheet('RedSnail', 'assets/sprites/snail_red.png', 32, 32);
		this.load.image('Beezooka', 'assets/sprites/weapon_beezooka.png');
		this.load.image('Shotgun', 'assets/sprites/weapon_slug-gun.png');

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

		cursors = PhaserMMORPG.game.input.keyboard.createCursorKeys();
		jumpButton = PhaserMMORPG.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		
		
		//PhaserMMORPG.game.physics.arcade.gravity.y = 800;//This gives the bullets gravity	
	
																	//		 Bullets now without gravity
																					
		
		cursors = PhaserMMORPG.game.input.keyboard.createCursorKeys();
		jumpButton = PhaserMMORPG.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		
		
		player = new Snail('RedSnail', 0);
		player.init();
		
		//Gredit////////////////////////////////////////////
		player.x = 600;
		player.y = 1300;
		//Grend/////////////////////////////////////////////
		//Camera
		PhaserMMORPG.game.camera.follow(player.m_sprite);
	
	
	//HUD
		ap_Text = PhaserMMORPG.game.add.text(player.x, player.y, "", 
		{
			font: "32px Arial",
			fill: "#ff0044",
			align: "center"
		});
		ap_Text.anchor.setTo(0.5, 0.75);	
		
		// Stick UI to Camera space
		weapon_slot_box = PhaserMMORPG.game.add.image(600, 525 , 'Tall_Box');
		weapon_slot_box.angle = 90;
		weapon_slot_box.fixedToCamera = true;
		
		weapon_info_box = PhaserMMORPG.game.add.image(weapon_slot_box.x - 585, weapon_slot_box.y - 60 , 'Info_Box');
		weapon_info_box.fixedToCamera = true;
	
	
	
	
		
		m_inputHandler = new InputHandler();	
		//collisionhandler = new CollisionHandler();		
    

		//spawn other players
		PhaserMMORPG.eurecaServer.spawnOtherPlayers();
  
  },
  



	

 update: function() {
	 
		//m_inputHandler.updateActivePlayer(player, layer01);	
		player.update();	
		m_inputHandler.updateActivePlayer(player, layer01);		
  }
  
};