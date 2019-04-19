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

var ap_text;

var gameOptions = {//Greg
    // player gravity
    playerGravity: 500,
	wallGravity: 100,
	noGravity: 0
}


	
	


PhaserMMORPG.Game.prototype = {
	 
 	preload: function(){
		
		//UI//
		this.load.image('Health_Bar', 'assets/sprites/ui/healthbar.png');
		this.load.image('AP_Bar', 'assets/sprites/ui/apbar.png');
		this.load.image('UI_Wide_Box', 'assets/sprites/ui/ui_widebox.png');
		this.load.image('UI_Weapon_Box', 'assets/sprites/ui/ui_weaponbox.png');
		this.load.image('UI_Pea_Shooter', 'assets/sprites/ui/ui_peashooter_icon.png');
		this.load.image('UI_A_Salt_Rifle', 'assets/sprites/ui/ui_a-salt-rifle_icon.png');
		this.load.image('UI_Slug_Gun', 'assets/sprites/ui/ui_slug-gun_icon.png');
		this.load.image('UI_Beezooka', 'assets/sprites/ui/ui_beezooka_icon.png');
		this.load.image('UI_Snrailgun', 'assets/sprites/ui/ui_snrailgun_icon.png');
		
		//Level//
		this.load.tilemap('PLANTER2', 'assets/PLANTER2.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.image('2_Tone_Textures', 'assets/2_Tone_Textures.png');
		this.load.image('Scenery', 'assets/Scenery.png');
		
		//Weapons//
		this.load.image('Pea_Shooter', 'assets/sprites/weapons/weapon_peashooter.png');
		this.load.image('A_Salt_Rifle', 'assets/sprites/weapons/weapon_a-salt-rifle.png');
		this.load.image('Slug_Gun', 'assets/sprites/weapons/weapon_slug-gun.png');
		this.load.image('Beezooka', 'assets/sprites/weapons/weapon_beezooka.png');
		this.load.image('Snrailgun', 'assets/sprites/weapons/weapon_snrailgun.png');
		
		//Projectiles//
		this.load.image('Pea_Pellet', 'assets/sprites/projectiles/projectile_pea-pellet.png');
		this.load.image('Salt_Pellet', 'assets/sprites/projectiles/projectile_salt-pellet.png');
		this.load.image('Slug_Shot', 'assets/sprites/projectiles/projectile_slug-ball.png');
		this.load.image('Bee_Rocket', 'assets/sprites/projectiles/projectile_bee-shot.png');
		this.load.image('Snrailgun_Laser', 'assets/sprites/projectiles/projectile_snrailgun-laserball.png');
		
		this.load.image('bullet', 'assets/sprites/projectiles/purple_ball.png');	//legacy, to remove
		
		//Particles//
		this.load.image('Pea_Shard', 'assets/sprites/projectiles/particles/particle_peashard.png');
		this.load.image('Salt_Shard', 'assets/sprites/projectiles/particles/particle_saltshard.png');
		this.load.image('Slug_Splat', 'assets/sprites/projectiles/particles/particle_slugsplat.png');
		this.load.image('Slug_Trail', 'assets/sprites/projectiles/particles/particle_slugtrail.png');
		this.load.image('Honey_Splat', 'assets/sprites/projectiles/particles/particle_honeysplat.png');
		this.load.image('Smoke_Trail', 'assets/sprites/projectiles/particles/particle_smokelaunch.png');
		this.load.image('Laser_Splash', 'assets/sprites/projectiles/particles/particle_lasersplash.png');
		this.load.image('Laser_Trail', 'assets/sprites/projectiles/particles/particle_lasertrail.png');
		
		//Snails n Spritesheets//
		this.load.spritesheet('RedSnail', 'assets/sprites/spritesheets/snail_red.png', 32, 32);
		
	

	},
	
  create: function() {
	
		this.game.physics.startSystem(Phaser.Physics.ARCADE);	
		this.physics.gravity=0;

		this.game.stage.backgroundColor = '#000000';

		bg = this.game.add.tileSprite(0, 0, 800, 600, 'Scenery');
		bg.fixedToCamera = true;

		map = this.game.add.tilemap('PLANTER2');
		map.addTilesetImage('2_Tone_Textures');

		map.setCollisionByExclusion([2,4,7]);//tileset not map location

		layer00 = map.createLayer('Background');
		layer01 = map.createLayer('Foreground');
		layer02 = map.createLayer('Water');
		layer01.debug = false;
		layer01.resizeWorld();

		cursors = PhaserMMORPG.game.input.keyboard.createCursorKeys();
		jumpButton = PhaserMMORPG.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
																										
		cursors = PhaserMMORPG.game.input.keyboard.createCursorKeys();
		jumpButton = PhaserMMORPG.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		
		//Player Creation//
		player = new Snail('RedSnail', 0);
		player.init();
		player.x = 600;
		player.y = 1300;
		
		//Camera
		PhaserMMORPG.game.camera.follow(player.m_sprite);
		
		//Input//
		m_inputHandler = new InputHandler();	
	

		//HUD
		ap_Text = PhaserMMORPG.game.add.text(player.x, player.y, "", 
		{
			font: "32px Arial",
			fill: "#ff0044",
			align: "center"
		});
		ap_Text.anchor.setTo(0.5, 0.75);
		
		// Stick UI to Camera space
		weapon_slot_box = PhaserMMORPG.game.add.image(350, 520 , 'UI_Wide_Box');
		weapon_slot_box.fixedToCamera = true;
		
		var wepOffset = 64, xOffset = 6, yOffset = 6; 
		
		//Generate weapon icons for bar
		ui_weapon1 = PhaserMMORPG.game.add.image(weapon_slot_box.x + xOffset, weapon_slot_box.y + yOffset, 'UI_Pea_Shooter');
		ui_weapon1.fixedToCamera = true;
		ui_weapon2 = PhaserMMORPG.game.add.image(weapon_slot_box.x + wepOffset + xOffset, weapon_slot_box.y + yOffset, 'UI_A_Salt_Rifle');
		ui_weapon2.fixedToCamera = true;
		ui_weapon3 = PhaserMMORPG.game.add.image(weapon_slot_box.x + (wepOffset*2) + xOffset, weapon_slot_box.y + yOffset , 'UI_Slug_Gun');
		ui_weapon3.fixedToCamera = true;
		ui_weapon4 = PhaserMMORPG.game.add.image(weapon_slot_box.x + (wepOffset*3) + xOffset, weapon_slot_box.y + yOffset, 'UI_Beezooka');
		ui_weapon4.fixedToCamera = true;
		ui_weapon5 = PhaserMMORPG.game.add.image(weapon_slot_box.x + (wepOffset*4) + xOffset, weapon_slot_box.y + yOffset, 'UI_Snrailgun');
		ui_weapon5.fixedToCamera = true;
		
		// Create weapon selected UI
		ui_weapon_box = PhaserMMORPG.game.add.sprite(weapon_slot_box.x + (xOffset/2), weapon_slot_box.y + (yOffset/2), 'UI_Weapon_Box');
		ui_weapon_box.fixedToCamera = true;

		//spawn other players
		PhaserMMORPG.eurecaServer.spawnOtherPlayers();
  
  },
  



	

 update: function() {
	 
		//m_inputHandler.updateActivePlayer(player, layer01);	
		player.update();	
		m_inputHandler.updateActivePlayer(player, layer01);		
  }
  
};