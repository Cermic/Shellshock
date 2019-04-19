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

var m_actionPoints;

//Get Mouse Position
var	px;
var	py;


//Contructor//
function SnailOnline(sprite, startPos)
{ 
	this.m_sprite = sprite
	this.m_startPos = startPos
	this.m_timer = 0;
};

//Initialisation Function//
SnailOnline.prototype.init = function()
{
	//Sprite
	this.m_sprite = PhaserMMORPG.game.add.sprite(32, 32, 'RedSnail');
	this.m_sprite.x = 1000;
	this.m_sprite.anchor.setTo(0.5,0.5);

	// Health Bar
	this.m_healthBar = PhaserMMORPG.game.add.sprite(32, 32, 'Health_Bar');
	this.m_healthBar.anchor.setTo(0.5, 0.5);

	this.m_actionPoints = 500;	

	// AP Bar
	this.m_apBar = PhaserMMORPG.game.add.sprite(32, 32, 'Health_Bar');
	this.m_apBar.anchor.setTo(0.5, 0.5); 
	
							
	//Animations
	this.m_sprite.animations.add('moveLeft' , [0, 1, 2, 3, 4, 5, 6, 7]     , 10, true);
	this.m_sprite.animations.add('moveRight',[8, 9, 10, 11, 12, 13, 14, 15], 10, true);
							
	//Weapon
	this.m_weapon = createWeapon("beezooka");
	this.m_weapon.init();
};

//Update Function//
SnailOnline.prototype.update = function()
{			
	this.m_weapon.updateOnline(this);	
	
		//Health Bar Position update
	this.m_healthBar.x = this.m_sprite.x;
	this.m_healthBar.y = this.m_sprite.y - 25;
	// AP Bar
	this.m_apBar.x = this.m_sprite.x;
	this.m_apBar.y = this.m_sprite.y - 35;
	PhaserMMORPG.game.physics.arcade.collide(this.m_sprite, layer01);	
};


SnailOnline.prototype.kill = function()
{
		this.m_sprite.destroy();
		this.m_weapon.m_weaponSprite.destroy();
		this.m_healthBar.destroy();
		this.m_apBar.destroy();		
};

