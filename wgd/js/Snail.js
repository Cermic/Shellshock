//Global Member Variables//
var m_timer;
var m_facing;
var m_sprite;
var m_startPos
var m_canJump;
var m_onCeiling;
var m_onWall;
var m_weapon;
var m_weaponsList;

var m_healthBar;
var m_apBar;

var m_actionPoints;

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
	//Sprite
	this.m_sprite = game.add.sprite(32, 32, 'RedSnail');

	this.m_sprite.anchor.setTo(0.5,0.5);

	game.physics.enable(this.m_sprite, Phaser.Physics.ARCADE);
	this.m_sprite.x = 1000;
	
	// Health Bar
	this.m_healthBar = game.add.sprite(32, 32, 'Health_Bar');
	this.m_healthBar.anchor.setTo(0.5, 0.5); 

	// AP Bar
	this.m_apBar = game.add.sprite(32, 32, 'Health_Bar');
	this.m_apBar.anchor.setTo(0.5, 0.5); 

			
	//Physics
	this.m_sprite.body.bounce.y = 0.0;
	this.m_sprite.body.collideWorldBounds = true;
	this.m_sprite.body.setSize(32, 32, 5, 1);
	
	this.m_sprite.m_onWall		= false;	
	this.m_sprite.m_onCeiling	= false;
	//Gredit////////////////////////////////////////////
    this.m_sprite.body.gravity.y = 500;
	this.m_sprite.m_canJump=true;
	//Grend////////////////////////////////////////////

	this.m_actionPoints = 500;
			
	//Animations
	this.m_sprite.animations.add('moveLeft', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
	this.m_sprite.animations.add('moveRight',[8, 9, 10, 11, 12, 13, 14, 15], 10, true);
			
	//Camera
	game.camera.follow(this.m_sprite);
			
	//Weapon

	//this.m_weapon = new Weapon(0,0,0,0,800,'Beezooka','bullet',5, 100);
	//this.m_weapon.init();

	this.m_weapon = createWeapon("beezooka");

	this.m_weapon.init();
};

//Update Function//
Snail.prototype.update = function()
{	

	this.m_sprite.body.velocity.x = 0;	
	//Health Bar Position update
	this.m_healthBar.x = this.m_sprite.x;
	this.m_healthBar.y = this.m_sprite.y - 25;
	// AP Bar
	this.m_apBar.x = this.m_sprite.x;
	this.m_apBar.y = this.m_sprite.y - 35;
	game.physics.arcade.collide(this.m_sprite, layer01);	
	//Update Weapon...
	this.m_weapon.update(this);
};


