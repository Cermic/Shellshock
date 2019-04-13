//Global Member Variables//
var m_timer;
var m_facing;
var m_sprite;
var m_startPos

var m_weapon;
var m_weaponsList;

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
	//Update Weapon and animation
	if(this.m_facing == 'left')
	{
		this.m_weapon.m_weaponSprite.x = this.m_sprite.x + 4;
		this.m_weapon.m_weaponSprite.scale.x = -1;
		this.m_weapon.m_weaponSprite.scale.y = -1;
		
		this.m_sprite.animations.play('moveLeft');
		
	} else if(this.m_facing == 'right')
	{
		this.m_weapon.m_weaponSprite.x = this.m_sprite.x + 28;
		this.m_weapon.m_weaponSprite.scale.x = -1; 
		this.m_weapon.m_weaponSprite.scale.y = 1;
		
		this.m_sprite.animations.play('moveRight');
	}
	
	this.m_weaponSprite.y = this.m_sprite.y + 20;
	
};


