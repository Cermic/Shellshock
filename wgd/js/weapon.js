//Global Member Variables//
var projectiles;
var costAP;		
var maxAmmo;
var currentAmmo;	
var damage;
var range;
var fireVelocity;
var projectileCount;

var weaponSprite;
var projectileSprite;

var fireRate;
var nextFire;

//Contructor//
function Weapon(i_costAP, i_maxAmmo, i_damage, i_range, i_fireVelocity, i_weaponSprite, i_projectileSprite, i_projectileCount, i_fireRate)
{ 
	this.costAP 			= i_costAP;
	this.maxAmmo 			= i_maxAmmo;
	this.currentAmmo 		= i_maxAmmo;
	this.damage 			= i_damage;
	this.range 				= i_range;
	this.fireVelocity 		= i_fireVelocity;
	this.fireRate			= i_fireRate
	this.projectileCount 	= i_projectileCount;

	this.weaponSprite 		= i_weaponSprite;
	this.projectileSprite 	= i_projectileSprite;
};

//Initialisation Function//
Weapon.prototype.init = function()
{
	//Reset cooldown between shots...
	this.nextFire = 0;
	
	this.weaponSprite = game.add.sprite(1000, 100, this.weaponSprite);
	this.weaponSprite.anchor.set(0.5);
	
	//Set up weapon projectiles...
	this.projectiles = game.add.group();
	this.projectiles.enableBody = true;
	this.projectiles.physicsBodyType = Phaser.Physics.ARCADE;		
	this.projectiles.createMultiple(this.projectileCount, this.projectileSprite);
	
	this.projectiles.setAll('checkWorldBounds', true);
	this.projectiles.setAll('outOfBoundsKill', true);

}; 	
	
//Initialisation Function//	
Weapon.prototype.update = function(snailObj)
{
	this.weaponSprite.rotation = game.physics.arcade.angleToPointer(snailObj.m_sprite);
	//this.weaponSprite.x = arg.x + 10;
	//this.weaponSprite.y = arg.y + 24;
	if(snailObj.m_facing == 'left')
	{
		this.weaponSprite.x = snailObj.m_sprite.x + 4;
		this.weaponSprite.scale.x = -1;
		this.weaponSprite.scale.y = -1;
	} else if(snailObj.m_facing == 'right')
	{
		this.weaponSprite.x = snailObj.m_sprite.x + 28;
		this.weaponSprite.scale.x = -1; 
		this.weaponSprite.scale.y = 1;
	}
	this.weaponSprite.y = snailObj.m_sprite.y + 20;
};
	
//Fire Weapon Function//
Weapon.prototype.fire = function()
{
    if (game.time.now > this.nextFire && this.projectiles.countDead() > 0)
    {
        this.nextFire = game.time.now + this.fireRate;
        var projectile = this.projectiles.getFirstDead();
        projectile.reset(this.weaponSprite.x - 8, this.weaponSprite.y - 8);
        game.physics.arcade.moveToPointer(projectile, this.fireVelocity);
	}
};


	
