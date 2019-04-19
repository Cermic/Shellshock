
//Global Member Variables//
var m_costAP;					//The AP cost to fire the weapon.
var m_damage;					//The damage dealt by the weapon.
var m_hitRadius;				//The radius in which damage is dealt.
var m_range;					//The effective range of the weapon (used as a lifetime for projectile).			
var m_mass;						//The mass of the weapons projectiles (effects gravity applied to projectile).		
var m_forceModifier;			//Modifier applied to default launch force for projectile.

var m_weaponSpriteKey;			//Sprite Key used for the weapon.

var m_weaponSprite;				//Sprite used for the weapon.
var m_projectileSprite;			//Sprite used for the projectile.

var m_projectile;				//The projectile fired by the weapon.

var m_explosionCount;
var m_explosionParticleKey;
var m_trailParticleKey;

//Contructor//
function Weapon(costAP, damage, hitRadius, range, mass, forceModifier, weaponSprite, projectileSprite, explosionCount, explosionParticleKey, trailParticleKey)
{ 
	this.m_costAP 			= costAP;
	this.m_damage 			= damage;
	this.m_hitRadius		= hitRadius;
	this.m_range 			= range;
	this.m_mass				= mass;
	this.m_forceModifier 	= forceModifier;	
	this.m_weaponSpriteKey 	= weaponSprite;
	this.m_projectileSprite = projectileSprite;
	this.m_explosionCount			= explosionCount;
	this.m_explosionParticleKey		= explosionParticleKey;
	this.m_trailParticleKey			= trailParticleKey;
};

//Initialisation Function//
Weapon.prototype.init = function()
{
	this.m_weaponSprite = game.add.sprite(0, 0, this.m_weaponSpriteKey);
	this.m_weaponSprite.anchor.set(0.75, 0.25);
	this.m_projectile = new Projectile(this.m_damage, this.m_hitRadius, this.m_range, this.m_projectileSprite, this.m_explosionCount, this.m_explosionParticleKey, this.m_trailParticleKey);
}; 	

Weapon.prototype.destroy = function()
{
	this.m_weaponSprite.destroy();
}
//Initialisation Function//	
Weapon.prototype.update = function(snailObj)
{
	this.m_weaponSprite.rotation = game.physics.arcade.angleToPointer(snailObj.m_sprite);

	if(snailObj.m_facing == 'left')
	{
		this.m_weaponSprite.x = snailObj.m_sprite.x;
		this.m_weaponSprite.scale.x = -1;
		this.m_weaponSprite.scale.y = -1;
	} 
	else if(snailObj.m_facing == 'right')
	{
		this.m_weaponSprite.x = snailObj.m_sprite.x;
		this.m_weaponSprite.scale.x = -1; 
		this.m_weaponSprite.scale.y = 1;
	}
	this.m_weaponSprite.y = snailObj.m_sprite.y;
	
	this.m_projectile.update();
};
	
//Fire Weapon Function//
Weapon.prototype.fire = function(snailObj)
{
	if (this.m_projectile.isAlive == false && snailObj.m_actionPoints >= this.m_costAP)
    {
		this.m_projectile = new Projectile(this.m_damage, this.m_hitRadius, this.m_range, this.m_projectileSprite, this.m_explosionCount, this.m_explosionParticleKey, this.m_trailParticleKey);
		this.m_projectile.init(this.m_weaponSprite.x, this.m_weaponSprite.y);
		
		var vecX = (game.input.activePointer.worldX - this.m_weaponSprite.position.x);
		var vecY = (game.input.activePointer.worldY - this.m_weaponSprite.position.y);
		var magnitude = Math.sqrt((vecX * vecX) + (vecY * vecY));
		
		console.log(vecX + " " + vecY);
		/*
		console.log("pointer x: " + game.input.activePointer.worldX + ", weap pos x: " + this.m_weaponSprite.position.x);
		console.log("pointer y: " + game.input.activePointer.worldY + ", weap pos y: " + this.m_weaponSprite.position.y);
		console.log(magnitude);
		console.log(this.m_forceModifier);
		console.log(this.m_mass);
		*/
		
		this.m_projectile.m_sprite.body.velocity.x = (vecX/magnitude) * this.m_forceModifier;
		this.m_projectile.m_sprite.body.velocity.y = (vecY/magnitude) * this.m_forceModifier;
		this.m_projectile.m_sprite.body.gravity.y = this.m_mass;
		
		snailObj.m_actionPoints -= this.m_costAP;
	}
};