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

//Get Mouse Position
	var	px;
	var	py;

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
	this.m_sprite = PhaserMMORPG.game.add.sprite(32, 32, 'RedSnail');

	PhaserMMORPG.game.physics.enable(this.m_sprite, Phaser.Physics.ARCADE);
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
		
	//Animations
	this.m_sprite.animations.add('moveLeft' , [0, 1, 2, 3, 4, 5, 6, 7]     , 10, true);
	this.m_sprite.animations.add('moveRight',[8, 9, 10, 11, 12, 13, 14, 15], 10, true);
					
	//Weapon
	this.m_weapon = createWeapon("beezooka");
	this.m_weapon.init();
};

//Update Function//
Snail.prototype.update = function()
{	
	this.m_sprite.body.velocity.x = 0;		
		
	//Do scene collision check
	PhaserMMORPG.game.physics.arcade.collide(this.m_sprite, layer01);	

	//Update Weapon...
	this.m_weapon.update(this);


	var projX;
	var projY;
	var isactive = this.m_weapon.m_projectile.isAlive;
	
	console.log('projx: ' + projX);
	console.log('projy: ' + projY);
	console.log('isActiveProj: ' + isactive);
	
	if(this.m_weapon.m_projectile.isAlive)
	{
		projX = this.m_weapon.m_projectile.m_sprite.position.x;
		projY = this.m_weapon.m_projectile.m_sprite.position.y;
	}
	else{
		projX = null;
		projY = null;	
	}
	
	
	var keys = {
			x: this.m_sprite.position.x|| null,
			y: this.m_sprite.position.y|| null,
			wepx: this.m_weapon.m_weaponSprite.x || null,
			wepy: this.m_weapon.m_weaponSprite.y || null,
			facingDir : this.m_facing || null,
			wepAng :this.m_weapon.m_weaponSprite.rotation ,
			anim :this.m_sprite.animations.name || null,
			projx : projX || null,
			projy : projY || null,
			activeProj : isactive || null,
			playerName : PhaserMMORPG.MyMyltiplayerId
	};

	PhaserMMORPG.eurecaServer.handleKeys(keys);
	
	
	 
};

Snail.prototype.kill = function()
{
		this.destroy();
};


