//Global Member Variables//
var m_damage;
var m_hitRadius;

var m_sprite;

var isAlive;

//Contructor//
function Projectile(damage, hitRadius, fireVelocity, projectileSprite)
{ 
	this.m_damage 			= damage;
	this.m_hitRadius		= hitRadius;
	
	this.m_sprite 			= projectileSprite;
	
	this.isAlive = false;
};

//Initialisation Function//
Projectile.prototype.init = function(x, y)
{
	this.isAlive = true;
	
	this.m_sprite = PhaserMMORPG.game.add.sprite(x, y, this.m_sprite);
	this.m_sprite.anchor.set(0.5);

	PhaserMMORPG.game.physics.enable(this.m_sprite, Phaser.Physics.ARCADE);
}; 	

//Initialisation Function//
Projectile.prototype.destroy = function()
{
	this.isAlive = false;
	this.m_sprite.destroy();
}; 	
	
//Initialisation Function//	
Projectile.prototype.update = function()
{
	//this.m_sprite.rotation = game.physics.arcade.angleToPointer(this.m_sprite); //set the rotation of the sprite to match its direction
	

};
	
//On Collide Function//
Projectile.prototype.onCollision = function()
{
    //Check for collisions within the hitradius, apply damage...
	this.destroy();
};

