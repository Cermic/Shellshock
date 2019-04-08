//Global Member Variables//
var m_timer;
var m_facing;
var m_sprite;
var m_startPos
//Gredit////////////////////////////////////////////
var m_canJump;
var m_onWall;
//Grend////////////////////////////////////////////
var m_weapon;
var m_weaponsList;

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

	game.physics.enable(this.m_sprite, Phaser.Physics.ARCADE);
	this.m_sprite.x = 1000;
			
	//Physics
	this.m_sprite.body.bounce.y = 0.0;
	this.m_sprite.body.collideWorldBounds = true;
	this.m_sprite.body.setSize(32, 32, 5, 1);
	
	//Gredit////////////////////////////////////////////
    this.m_sprite.body.gravity.y = 500;
	this.m_sprite.canJump=true;
	this.m_sprite.onWall=false;	
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
	game.physics.arcade.collide(this.m_sprite, layer01);	
	//Update Weapon...
	this.m_weapon.update(this);
};


