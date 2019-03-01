var gameFunc = function(){ 
	var map;
	var tileset;
	var layer;
	var player;
	var facing
	var jumpTimer; // this is a good practice
	var cursors;
	var jumpButton;
	var bg;
	//var akumax;
	var sprite;
	var bullets;
	var firerate;
	var nextFire;
};

	/*fire: function(){
    if (game.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;
        var bullet = bullets.getFirstDead();
        bullet.reset(sprite.x - 8, sprite.y - 8);
        game.physics.arcade.moveToPointer(bullet, 300);
    }
	}*/

gameFunc.prototype = {
	preload: function(){
		game.load.tilemap('PLANTER', 'assets/PLANTER.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.image('2_Tone_Textures', 'assets/2_Tone_Textures.png');
		game.load.spritesheet('dude', 'assets/starstruck/dude.png', 32, 48);
		game.load.spritesheet('droid', 'assets/starstruck/droid.png', 32, 32);
		game.load.image('starSmall', 'assets/starstruck/star.png');
		game.load.image('starBig', 'assets/starstruck/star2.png');
		game.load.image('background', 'assets/starstruck/background2.png');
		
		game.load.image('arrow', 'assets/sprites/arrow.png');
		game.load.image('bullet', 'assets/sprites/purple_ball.png');

		//different way of animation
		//game.load.atlasJSONHash('akuma', 'assets/akumapunch.png', 'assets/akumapunch.json');

	},
  	create: function(){	
	fireRate=100;
	nextFire = 0;
	facing = 'left'
		jumpTimer = 0;
		game.physics.startSystem(Phaser.Physics.ARCADE);

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

		player = game.add.sprite(32, 32, 'dude');
		game.physics.enable(player, Phaser.Physics.ARCADE);

	    //  call akuma
		//akumax = game.add.sprite(200, 200, 'akuma');
		//akumax.animations.add('AkumaJump', Phaser.Animation.generateFrameNames('punch', 1, 7), 5, true);
		
		//Bikini Bottom
		bullets = game.add.group();
		bullets.enableBody = true;
		bullets.physicsBodyType = Phaser.Physics.ARCADE;
		
		bullets.createMultiple(50, 'bullet');
		bullets.setAll('checkWorldBounds', true);
		bullets.setAll('outOfBoundsKill', true);
		
		sprite = game.add.sprite(400,300, 'arrow');
		sprite.anchor.set(0.5);
		
		game.physics.enable(sprite,Phaser.Physics.ARCADE);
		sprite.body.allowRotation = false;
		//Bikini Bottom

		
		player.body.bounce.y = 0.2;
		player.body.collideWorldBounds = true;
		player.body.setSize(20, 32, 5, 16);
		
		player.animations.add('left', [0, 1, 2, 3], 10, true);
		player.animations.add('turn', [4], 20, true);
		player.animations.add('right', [5, 6, 7, 8], 10, true);
		
		game.camera.follow(player);

		cursors = game.input.keyboard.createCursorKeys();
		jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		
		player.x = 1000;
	},
	
	update: function(){
		//akumax.animations.play('AkumaJump');
	    game.physics.arcade.collide(player, layer);

		player.body.velocity.x = 0;
		
		//////////////
		sprite.rotation = game.physics.arcade.angleToPointer(sprite);
		
		if(game.input.activePointer.isDown){
			fire();
		}
		//////////////
		
		if (cursors.left.isDown)
		{
			player.body.velocity.x = -150;

			if (this.facing != 'left')
			{
				player.animations.play('left');
				this.facing = 'left';
			}
		}
		else if (cursors.right.isDown)
		{
			player.body.velocity.x = 150;

			if (this.facing != 'right')
			{
				player.animations.play('right');
				this.facing = 'right';
			}
		}
		else
		{
			if (this.facing != 'idle')
			{
				player.animations.stop();

				if (this.facing == 'left')
				{
					player.frame = 0;
				}
				else
				{
					player.frame = 5;
				}

				this.facing = 'idle';
			}
		}

		if (jumpButton.isDown && player.body.onFloor() && game.time.now > jumpTimer)
		{
			player.body.velocity.y = -250;
			jumpTimer = game.time.now + 750;
		}
	}

}


