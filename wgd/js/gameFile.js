var gameFunc = function(){ 

	var map;
	var tileset;
	var layer;
	var bg;
	
	
	var player;
	
	var cursors;
	var jumpButton;		
};



	var playerSpriteWidth = 32, playerSpriteHeight = 32;
	
	
	
gameFunc.prototype = {
	
	preload: function(){
		
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

		layer = map.createLayer('Background');
		layer = map.createLayer('Foreground');

		//  Un-comment this on to see the collision tiles
		layer.debug = true;
		layer.resizeWorld();

		game.physics.arcade.gravity.y = 800;

		
		cursors = game.input.keyboard.createCursorKeys();
		jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		
		
		player = new Snail();
		player.init();
		
	},
	
	
	update: function(){
		
		player.update();
		player.move();
				
	}

}



