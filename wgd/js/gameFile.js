var gameFunc = function(){ 

	var map;
	var tileset;
	var layer;
	var bg;
	var player;
	var cursors;
	var jumpButton;	
	var layer00, layer01;
};

	var m_inputHandler;
	var playerSpriteWidth = 32, playerSpriteHeight = 32;
	
	var layer00, layer01;//Greg
	var weapon_slot_box;
	var weapon_info_box;
	var team_health_box;
	var time_box;

	var playerSpriteWidth = 32, playerSpriteHeight = 32;
	var ap_text;

gameFunc.prototype = {
	
	preload: function(){
		
		game.load.image('Health_Bar', 'assets/healthbar.png');
		game.load.image('Info_Box', 'assets/ui_infobox.png');
		game.load.image('Tall_Box', 'assets/ui_tallbox.png');
		game.load.image('Weapon_Box', 'assets/ui_weaponbox.png');
		game.load.tilemap('PLANTER', 'assets/PLANTER.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.image('2_Tone_Textures', 'assets/2_Tone_Textures.png');
		game.load.spritesheet('dude', 'assets/starstruck/dude.png', playerSpriteWidth, playerSpriteHeight);
		game.load.spritesheet('droid', 'assets/starstruck/droid.png', 32, 32);
		game.load.image('starSmall', 'assets/starstruck/star.png');
		game.load.image('starBig', 'assets/starstruck/star2.png');
		game.load.image('background', 'assets/starstruck/background2.png');
		
		game.load.image('arrow', 'assets/sprites/arrow.png');
		game.load.image('bullet', 'assets/sprites/purple_ball.png');
		
		game.load.spritesheet('RedSnail', 'assets/sprites/Red_Snail_Movement.png', 32, 32);
		game.load.image('Beezooka', 'assets/sprites/Beezooka.png');
		game.load.spritesheet('RedSnail', 'assets/sprites/snail_red.png', 32, 32);
		game.load.image('Beezooka', 'assets/sprites/weapon_beezooka.png');
		game.load.image('Shotgun', 'assets/sprites/weapon_slug-gun.png');

	},
	
  	create: function(){	

		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.gravity=0;

		game.stage.backgroundColor = '#000000';

		bg = game.add.tileSprite(0, 0, 800, 600, 'background');
		bg.fixedToCamera = true;

		map = game.add.tilemap('PLANTER');
		map.addTilesetImage('2_Tone_Textures');

		map.setCollisionByExclusion([4]);//tileset not map location

		//layer = map.createLayer('Background');
		//layer = map.createLayer('Foreground');
		
		layer00 = map.createLayer('Background');//Greg
		layer01 = map.createLayer('Foreground');//Greg
		layer01.debug = true;//Greg
		layer01.resizeWorld();//Greg
		
		cursors = game.input.keyboard.createCursorKeys();
		jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		
		
		player = new Snail('RedSnail', 0);
		player.init();
		
		//testing position, will be replaced by user team spawning
		player.x = 600;
		player.y = 1300;
		
		m_inputHandler = new InputHandler();		
		
		ap_Text = game.add.text(player.x, player.y, "", 
		{
			font: "32px Arial",
			fill: "#ff0044",
			align: "center"
		});
		ap_Text.anchor.setTo(0.5, 0.75);	
		
		// Stick UI to Camera space
		weapon_slot_box = game.add.image(600, 525 , 'Tall_Box');
		weapon_slot_box.angle = 90;
		weapon_slot_box.fixedToCamera = true;
		
		weapon_info_box = game.add.image(weapon_slot_box.x - 585, weapon_slot_box.y - 60 , 'Info_Box');
		weapon_info_box.fixedToCamera = true;
	},
	
	update: function(){
		player.update();
		m_inputHandler.updateActivePlayer(player, layer01);		
	}
}



