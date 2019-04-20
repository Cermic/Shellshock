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
var numOfWeapons = 5;
var currWeaponIndex; // chloe multiplayer


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
	this.m_health = 666;
	this.m_actionPoints = 666;
	
	//Sprite
	this.m_sprite = PhaserMMORPG.game.add.sprite(32, 32, 'RedSnail');
	this.m_sprite.x = 1000;
	this.m_sprite.anchor.setTo(0.5,0.5);

	// Health Bar
	this.m_healthBar = PhaserMMORPG.game.add.sprite(32, 32, 'Health_Bar');
	this.m_healthBar.anchor.setTo(0.5, 0.5); 
	this.m_healthBar.scale.y = 0.75;
	

	// AP Bar
	this.m_apBar = PhaserMMORPG.game.add.sprite(32, 32, 'AP_Bar');
	this.m_apBar.anchor.setTo(0.5, 0.5); 
	this.m_apBar.scale.y = 0.75;
	
							
	//Animations
	this.m_sprite.animations.add('moveLeft' , [0, 1, 2, 3, 4, 5, 6, 7]     , 10, true);
	this.m_sprite.animations.add('moveRight',[8, 9, 10, 11, 12, 13, 14, 15], 10, true);					
							
	//Weapon List Creation
	this.m_weaponsList = new Array(numOfWeapons);
	this.m_weaponsList[4] = createWeapon("snrailgun");
	this.m_weaponsList[3] = createWeapon("beezooka");
	this.m_weaponsList[2] = createWeapon("slug_gun");
	this.m_weaponsList[1] = createWeapon("a_salt_rifle");
	this.m_weaponsList[0] = createWeapon("pea_shooter");		
	
	this.m_weaponKeys = new Array(numOfWeapons);
	this.m_weaponKeys[0] = PhaserMMORPG.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
	this.m_weaponKeys[1] = PhaserMMORPG.game.input.keyboard.addKey(Phaser.Keyboard.TWO);
	this.m_weaponKeys[2] = PhaserMMORPG.game.input.keyboard.addKey(Phaser.Keyboard.THREE);
	this.m_weaponKeys[3] = PhaserMMORPG.game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
	this.m_weaponKeys[4] = PhaserMMORPG.game.input.keyboard.addKey(Phaser.Keyboard.FIVE);
	this.currWeaponIndex = 0; // chloe multiplayer
	
	//Equip Deafult Weapon
	this.m_weapon = this.m_weaponsList[0];
	this.currWeaponIndex = 0;

	this.m_weapon.init();
};

//Update Function//
SnailOnline.prototype.update = function()
{	
	//Weapon
	this.m_weapon.updateOnline(this);
	
	//Health Bar Position update
	this.m_healthBar.x = this.m_sprite.x;
	this.m_healthBar.y = this.m_sprite.y - 35;
	
	// AP Bar
	this.m_apBar.x = this.m_sprite.x;
	this.m_apBar.y = this.m_sprite.y - 25;
	
	
	//Update Hud Bars...
	this.m_healthBar.scale.x = this.m_health * 0.01;
	this.m_apBar.scale.x = this.m_actionPoints * 0.01;
	
	if(this.m_health <= 0)
	{
		this.kill();
	}
};

SnailOnline.prototype.switchweapon =function(weaponindex)
{
	if(this.currWeaponIndex == weaponindex)
		return;
	
	this.m_weapon.destroy();
	this.m_weapon = this.m_weaponsList[weaponindex]; // Snrailgun
	this.m_weapon.init();
	
	this.currWeaponIndex = weaponindex;	
}
SnailOnline.prototype.kill = function()
{
		this.m_sprite.destroy();
		this.m_weapon.m_weaponSprite.destroy();
		this.m_healthBar.destroy();
		this.m_apBar.destroy();		
};


