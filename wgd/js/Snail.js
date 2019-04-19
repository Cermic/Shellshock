//Global Member Variables//
var m_timer;
var m_facing;
var m_sprite;
var m_startPos
var m_canJump;
var m_onCeiling;
var m_onWallLeft;
var m_onWallRight;
var m_weapon;
var m_weaponsList;
var m_moving;

var m_healthBar;
var m_apBar;

var m_health;
var m_actionPoints;
var maxHealth = 100;
var maxActionPoints = 100;

//Contructor//
function Snail(sprite, startPos)
{ 
	this.m_sprite = sprite
	this.m_startPos = startPos
	this.m_timer = 0;
};

//Initialisation Function//
Snail.prototype.init = function()
{
	this.m_health = maxHealth;
	this.m_actionPoints = maxActionPoints;
	
	//Sprite
	this.m_sprite = game.add.sprite(32, 32, 'RedSnail');

	this.m_sprite.anchor.setTo(0.5,0.5);

	game.physics.enable(this.m_sprite, Phaser.Physics.ARCADE);
	this.m_sprite.x = 1000;
	
	// Health Bar
	this.m_healthBar = game.add.sprite(32, 32, 'Health_Bar');
	this.m_healthBar.anchor.setTo(0.5, 0.5); 
	this.m_healthBar.scale.y = 0.75;
	
	// AP Bar
	this.m_apBar = game.add.sprite(32, 32, 'AP_Bar');
	this.m_apBar.anchor.setTo(0.5, 0.5); 
	this.m_apBar.scale.y = 0.75;
			
	//Physics
	this.m_sprite.body.bounce.y = 0.0;
	this.m_sprite.body.collideWorldBounds = true;
	this.m_sprite.body.setSize(32, 32, 5, 1);
	
    this.m_sprite.body.gravity.y = 500;
	this.m_sprite.m_canJump		= true;
	this.m_sprite.m_onWallLeft	= false;
	this.m_sprite.m_onWallRight	= false;
	this.m_sprite.m_onCeiling	= false;
	this.m_sprite.m_moving		= false;
			
	//Animations
	this.m_sprite.animations.add('moveLeft', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
	this.m_sprite.animations.add('moveRight',[8, 9, 10, 11, 12, 13, 14, 15], 10, true);
			
	//Camera
	game.camera.follow(this.m_sprite);
	/*
	//Weapon List
	this.m_weaponsList = new Array(5);
	this.m_weaponsList[0] = createWeapon("pea_shooter");		
	this.m_weaponsList[1] = createWeapon("a_salt_rifle");
	this.m_weaponsList[2] = createWeapon("slug_gun");
	this.m_weaponsList[3] = createWeapon("beezooka");
	this.m_weaponsList[4] = createWeapon("snrailgun");
	*/
	//Equipped Weapon
	//this.m_weapon = m_weaponsList[0];
	this.m_weapon = createWeapon("beezooka");
	this.m_weapon.init();
};

//Update Function//
Snail.prototype.update = function()
{	
	this.m_sprite.body.velocity.x = 0;	
	//Health Bar Position update
	this.m_healthBar.x = this.m_sprite.x;
	this.m_healthBar.y = this.m_sprite.y - 35;
	// AP Bar Position update
	this.m_apBar.x = this.m_sprite.x;
	this.m_apBar.y = this.m_sprite.y - 25;
	game.physics.arcade.collide(this.m_sprite, layer01);
	
	//Update Weapon...
	this.m_weapon.update(this);
	
	//Update Hud Bars...
	this.m_healthBar.scale.x = this.m_health * 0.01;
	this.m_apBar.scale.x = this.m_actionPoints * 0.01;
	
	if(this.m_actionPoints < maxActionPoints)
	{
		this.m_actionPoints += 1;
	}
};


