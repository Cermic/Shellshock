/*
//Legacy Member Variables//
var m_projectiles;	
var m_maxAmmo;
var m_currentAmmo;	
var m_fireVelocity;
var m_projectileCount;
var m_fireRate;
var nextFire;

//Legacy Contructor//

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
*/

//Global Member Variables//
var m_costAP;					//The AP cost to fire the weapon.
var m_damage;					//The damage dealt by the weapon.
var m_hitRadius;				//The radius in which damage is dealt.
var m_range;					//The effective range of the weapon (used as a lifetime for projectile).			//1000 default
var m_mass;						//The mass of the weapons projectiles (effects gravity applied to projectile).		//500 default
var m_forceModifier;			//Modifier applied to default launch force for projectile.

var m_weaponSprite;				//Sprite used for the weapon.
var m_projectileSprite;			//Sprite used for the projectile.

var m_projectile;				//The projectile fired by the weapon.

//Contructor//
function Weapon(costAP, damage, hitRadius, range, mass, forceModifier, weaponSprite, projectileSprite)
{ 
	this.m_costAP 			= costAP;
	this.m_damage 			= damage;
	this.m_hitRadius		= hitRadius;
	this.m_range 			= range;
	this.m_mass				= mass;
	this.m_forceModifier 	= forceModifier;	
	this.m_weaponSprite 	= weaponSprite;
	this.m_projectileSprite = projectileSprite;
};

//Initialisation Function//
Weapon.prototype.init = function()
{
	//Reset cooldown between shots...
	//this.nextFire = 0;

	this.m_weaponSprite = game.add.sprite(0, 0, this.m_weaponSprite);
	this.m_weaponSprite.anchor.set(0.5);
	
	//Set up weapon projectiles...
	//this.m_projectiles = game.add.group();
	//this.m_projectiles.enableBody = true;
	//this.m_projectiles.physicsBodyType = Phaser.Physics.ARCADE;		
	//this.m_projectiles.createMultiple(this.m_projectileCount, this.m_projectileSprite);
	//this.m_projectiles.setAll('checkWorldBounds', true);
	//this.m_projectiles.setAll('outOfBoundsKill', true);
	
	this.m_projectile = new Projectile(this.m_damage, this.m_hitRadius, this.m_range, this.m_projectileSprite);
}; 	
	
//Initialisation Function//	
Weapon.prototype.update = function(snailObj)
{
	this.m_weaponSprite.rotation = game.physics.arcade.angleToPointer(snailObj.m_sprite);

	if(snailObj.m_facing == 'left')
	{
		this.m_weaponSprite.x = snailObj.m_sprite.x + 4;
		this.m_weaponSprite.scale.x = -1;
		this.m_weaponSprite.scale.y = -1;
	} 
	else if(snailObj.m_facing == 'right')
	{
		this.m_weaponSprite.x = snailObj.m_sprite.x + 28;
		this.m_weaponSprite.scale.x = -1; 
		this.m_weaponSprite.scale.y = 1;
	}
	this.m_weaponSprite.y = snailObj.m_sprite.y + 20;
	
	this.m_projectile.update();
};
	
//Fire Weapon Function//
Weapon.prototype.fire = function()
{
	if (this.m_projectile.isAlive == false)
    {
		this.m_projectile = new Projectile(this.m_damage, this.m_hitRadius, this.m_range, this.m_projectileSprite);
		this.m_projectile.init(this.m_weaponSprite.x, this.m_weaponSprite.y);
		
		var vecX = (game.input.activePointer.worldX - this.m_weaponSprite.position.x);
		var vecY = (game.input.activePointer.worldY - this.m_weaponSprite.position.y);
		var magnitude = Math.sqrt((vecX * vecX) + (vecY * vecY));
		
		console.log("pointer x: " + game.input.activePointer.worldX + ", weap pos x: " + this.m_weaponSprite.position.x);
		console.log("pointer y: " + game.input.activePointer.worldY + ", weap pos y: " + this.m_weaponSprite.position.y);
		console.log(magnitude);
		console.log(this.m_forceModifier);
		console.log(this.m_mass);
		
		this.m_projectile.m_sprite.body.velocity.x = (vecX/magnitude) * this.m_forceModifier;
		this.m_projectile.m_sprite.body.velocity.y = (vecY/magnitude) * this.m_forceModifier;
		this.m_projectile.m_sprite.body.gravity.y = this.m_mass;
	}
	
	/*
    if (game.time.now > this.nextFire && this.m_projectiles.countDead() > 0)
    {
        this.nextFire = game.time.now + this.m_fireRate;
        var projectile = this.m_projectiles.getFirstDead();
        projectile.reset(this.m_weaponSprite.x - 16, this.m_weaponSprite.y - 16);
        game.physics.arcade.moveToPointer(projectile, this.m_fireVelocity);
	}
	*/
};