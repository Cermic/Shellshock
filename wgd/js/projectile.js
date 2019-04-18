//Global Member Variables//
var m_damage;
var m_hitRadius;
var m_lifespan;

var m_sprite;

var isAlive;
var currentLifetime;

//Contructor//
function Projectile(damage, hitRadius, lifespan, projectileSprite)
{ 
	this.m_damage 		= damage;
	this.m_hitRadius	= hitRadius;
	this.m_lifespan		= lifespan;
	
	this.m_sprite 		= projectileSprite;
	
	this.isAlive = false;
};

//Initialisation Function//
Projectile.prototype.init = function(x, y)
{
	this.isAlive = true;
	this.currentLifetime = 0;
	
	this.m_sprite = game.add.sprite(x, y, this.m_sprite);
	this.m_sprite.anchor.set(0.5);
	game.physics.enable(this.m_sprite, Phaser.Physics.ARCADE);
}; 	

//Initialisation Function//
Projectile.prototype.destroy = function()
{
	this.isAlive = false;
	this.m_sprite.destroy();
	delete this;
}; 	
	
//Update Function//	
Projectile.prototype.update = function()
{
	//Check if projectile has went out of range...
	if(this.currentLifetime > this.m_lifespan)
	{
		this.destroy();
	}
	else
	{
		this.currentLifetime += 1;
	}
	
	var targets = [eplayer.m_sprite];
	
	//Check for collisions...
	if(game.physics.arcade.overlap(this.m_sprite, targets[0]))
	{
		console.log("Collided with snail.");
		this.onCollision();
	}
	else if (game.physics.arcade.collide(this.m_sprite, layer01))
	{
		console.log("Collided with world.");
		this.onCollision();
		
	}
	
	//Rotate the sprite to match direction of movement...
	//...
	//...
	//...
};
	
//On Collide Function//
Projectile.prototype.onCollision = function()
{
    //Check for collisions within the hitradius, apply damage...
	//for loop for every snail
	
	var dist = Phaser.Math.distance(this.m_sprite.x, this.m_sprite.y, eplayer.m_sprite.x, eplayer.m_sprite.y);
	console.log(dist);
	console.log(this.m_hitRadius);
	
	if(dist <= this.m_hitRadius)
	{
		console.log("Kablam!!!");
	}
	this.destroy();
	//for loop end
};

