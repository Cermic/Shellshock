//Global Weapon Variables//
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
	
	//Set up weapon projectiles...
	this.projectiles = game.add.group();
	this.projectiles.enableBody = true;
	this.projectiles.physicsBodyType = Phaser.Physics.ARCADE;		
	this.projectiles.createMultiple(this.projectileCount, this.projectileSprite);
	
	this.projectiles.setAll('checkWorldBounds', true);
	this.projectiles.setAll('outOfBoundsKill', true);

}; 	
	
Weapon.prototype.update = function(arg)
{
		
};
	
//Fire Weapon Function//
Weapon.prototype.fire = function(arg)
{
    if (game.time.now > this.nextFire && this.projectiles.countDead() > 0)
    {
        this.nextFire = game.time.now + this.fireRate;
        var projectile = this.projectiles.getFirstDead();
        projectile.reset(arg.x - 8, arg.y - 8);
        game.physics.arcade.moveToPointer(projectile, this.fireVelocity);
	}
};


	
