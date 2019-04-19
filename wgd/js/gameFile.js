var eplayer;

var gameFunc = function(){ 

	var map;
	var bg;
	var player;
	var cursors;
	var jumpButton;	
	var layer00, layer01;
};

	var m_inputHandler;
	var playerSpriteWidth = 32, playerSpriteHeight = 32;
	
	var layer00, layer01;
	var weapon_slot_box;
	var weapon_info_box;

	var ui_weapon1, ui_weapon2, ui_weapon3, ui_weapon4, ui_weapon5;
	
	var playerSpriteWidth = 32, playerSpriteHeight = 32;
	var ap_text;

gameFunc.prototype = {
	
	preload: function(){
		
		//UI//
		game.load.image('Health_Bar', 'assets/sprites/ui/healthbar.png');
		game.load.image('AP_Bar', 'assets/sprites/ui/apbar.png');
		game.load.image('Info_Box', 'assets/sprites/ui/ui_infobox.png');
		game.load.image('Tall_Box', 'assets/sprites/ui/ui_tallbox.png');
		game.load.image('Wide_Box', 'assets/sprites/ui/ui_widebox.png');
		game.load.image('Weapon_Box', 'assets/sprites/ui/ui_weaponbox.png');
		game.load.image('UI_Pea_Shooter', 'assets/sprites/ui/ui_peashooter_icon.png');
		game.load.image('UI_A_Salt_Rifle', 'assets/sprites/ui/ui_a-salt-rifle_icon.png');
		game.load.image('UI_Slug_Gun', 'assets/sprites/ui/ui_slug-gun_icon.png');
		game.load.image('UI_Beezooka', 'assets/sprites/ui/ui_beezooka_icon.png');
		game.load.image('UI_Snrailgun', 'assets/sprites/ui/ui_snrailgun_icon.png');
		
		//Level//
		game.load.tilemap('PLANTER', 'assets/PLANTER.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.image('2_Tone_Textures', 'assets/2_Tone_Textures.png');
		game.load.image('background', 'assets/starstruck/background2.png');
		
		//Weapons//
		game.load.image('Pea_Shooter', 'assets/sprites/weapons/weapon_peashooter.png');
		game.load.image('A_Salt_Rifle', 'assets/sprites/weapons/weapon_a-salt-rifle.png');
		game.load.image('Slug_Gun', 'assets/sprites/weapons/weapon_slug-gun.png');
		game.load.image('Beezooka', 'assets/sprites/weapons/weapon_beezooka.png');
		game.load.image('Snrailgun', 'assets/sprites/weapons/weapon_snrailgun.png');
		
		//Projectiles//
		game.load.image('Pea_Pellet', 'assets/sprites/projectiles/projectile_pea-pellet.png');
		game.load.image('Salt_Pellet', 'assets/sprites/projectiles/projectile_salt-pellet.png');
		game.load.image('Slug_Shot', 'assets/sprites/projectiles/projectile_slug-ball.png');
		game.load.image('Bee_Rocket', 'assets/sprites/projectiles/projectile_bee-shot.png');
		game.load.image('Snrailgun_Laser', 'assets/sprites/projectiles/projectile_snrailgun-laserball.png');
		
		game.load.image('bullet', 'assets/sprites/projectiles/purple_ball.png');	//legacy, to remove
		
		//Particles//
		game.load.image('Pea_Shard', 'assets/sprites/projectiles/particles/particle_peashard.png');
		game.load.image('Salt_Shard', 'assets/sprites/projectiles/particles/particle_saltshard.png');
		game.load.image('Slug_Splat', 'assets/sprites/projectiles/particles/particle_slugsplat.png');
		game.load.image('Slug_Trail', 'assets/sprites/projectiles/particles/particle_slugtrail.png');
		game.load.image('Honey_Splat', 'assets/sprites/projectiles/particles/particle_honeysplat.png');
		game.load.image('Smoke_Trail', 'assets/sprites/projectiles/particles/particle_smokelaunch.png');
		game.load.image('Laser_Splash', 'assets/sprites/projectiles/particles/particle_lasersplash.png');
		game.load.image('Laser_Trail', 'assets/sprites/projectiles/particles/particle_lasertrail.png');
		
		//Snails n Spritesheets//
		game.load.spritesheet('RedSnail', 'assets/sprites/spritesheets/snail_red.png', 32, 32);


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

		layer00 = map.createLayer('Background');
		layer01 = map.createLayer('Foreground');
		layer01.debug = true;
		layer01.resizeWorld();
		
		cursors = game.input.keyboard.createCursorKeys();
		jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		
		eplayer = new Snail('RedSnail', 0);
		eplayer.init();
		
		eplayer.x = 800;
		eplayer.y = 1300;
		
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

		weapon_slot_box = game.add.image(350, 520 , 'Wide_Box');
		weapon_slot_box.fixedToCamera = true;
		
		var wepOffset = 64, xOffset = 6, yOffset = 6; 
		
		ui_weapon1 = game.add.image(weapon_slot_box.x + xOffset, weapon_slot_box.y + yOffset, 'UI_Pea_Shooter');
		ui_weapon1.fixedToCamera = true;
		ui_weapon2 = game.add.image(weapon_slot_box.x + wepOffset + xOffset, weapon_slot_box.y + yOffset, 'UI_A_Salt_Rifle');
		ui_weapon2.fixedToCamera = true;
		ui_weapon3 = game.add.image(weapon_slot_box.x + (wepOffset*2) + xOffset, weapon_slot_box.y + yOffset , 'UI_Slug_Gun');
		ui_weapon3.fixedToCamera = true;
		ui_weapon4 = game.add.image(weapon_slot_box.x + (wepOffset*3) + xOffset, weapon_slot_box.y + yOffset, 'UI_Beezooka');
		ui_weapon4.fixedToCamera = true;
		ui_weapon5 = game.add.image(weapon_slot_box.x + (wepOffset*4) + xOffset, weapon_slot_box.y + yOffset, 'UI_Snrailgun');
		ui_weapon5.fixedToCamera = true;
		
		weapon_info_box = game.add.image(16, weapon_slot_box.y - 64 , 'Info_Box');
		weapon_info_box.fixedToCamera = true;
	},
	
	update: function()
	{
		player.update();
		eplayer.update();
		m_inputHandler.updateActivePlayer(player, layer01);				
	}
}


