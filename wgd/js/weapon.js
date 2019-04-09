//Global Member Variables//
var m_projectiles;
var m_costAP;		
var m_maxAmmo;
var m_currentAmmo;	
var m_damage;
var m_range;
var m_fireVelocity;
var m_projectileCount;

var m_weaponSprite;
var m_projectileSprite;

var m_fireRate;
var nextFire;

//Contructor//
function Weapon(costAP, maxAmmo, damage, range, fireVelocity, weaponSprite, projectileSprite, projectileCount, fireRate)
{ 
	this.m_costAP 			= costAP;
	this.m_maxAmmo 			= maxAmmo;
	this.m_currentAmmo 		= maxAmmo;
	this.m_damage 			= damage;
	this.m_range 			= range;
	this.m_fireVelocity 	= fireVelocity;
	this.m_fireRate			= fireRate
	this.m_projectileCount 	= projectileCount;

	this.m_weaponSprite 	= weaponSprite;
	this.m_projectileSprite = projectileSprite;
};

//Initialisation Function//
Weapon.prototype.init = function()
{
	//Reset cooldown between shots...
	this.nextFire = 0;
	

	this.m_weaponSprite = game.add.sprite(1000, 100, this.m_weaponSprite);
	this.m_weaponSprite.anchor.set(0.5);
	
	//Set up weapon projectiles...
	this.m_projectiles = game.add.group();
	this.m_projectiles.enableBody = true;
	this.m_projectiles.physicsBodyType = Phaser.Physics.ARCADE;		
	this.m_projectiles.createMultiple(this.m_projectileCount, this.m_projectileSprite);
	
	this.m_projectiles.setAll('checkWorldBounds', true);
	this.m_projectiles.setAll('outOfBoundsKill', true);
}; 	
	
//Initialisation Function//	
Weapon.prototype.update = function(snailObj)
{
	this.m_weaponSprite.rotation = game.physics.arcade.angleToPointer(snailObj.m_sprite);
	//this.weaponSprite.x = arg.x + 10;
	//this.weaponSprite.y = arg.y + 24;
	if(snailObj.m_facing == 'left')
	{

		this.m_weaponSprite.x = snailObj.m_sprite.x - 10;
		this.m_weaponSprite.scale.x = -1;
		this.m_weaponSprite.scale.y = -1;
	} else if(snailObj.m_facing == 'right')
	{
		this.m_weaponSprite.x = snailObj.m_sprite.x + 10;
		this.m_weaponSprite.scale.x = -1; 
		this.m_weaponSprite.scale.y = 1;
	}
	this.m_weaponSprite.y = snailObj.m_sprite.y + 12;
};
	
//Fire Weapon Function//
Weapon.prototype.fire = function()
{

    if (game.time.now > this.nextFire && this.m_projectiles.countDead() > 0)
    {
        this.nextFire = game.time.now + this.m_fireRate;
        var projectile = this.m_projectiles.getFirstDead();
        projectile.reset(this.m_weaponSprite.x - 16, this.m_weaponSprite.y - 16);
        game.physics.arcade.moveToPointer(projectile, this.m_fireVelocity);
	}
};