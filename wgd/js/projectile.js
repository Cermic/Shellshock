//Global Member Variables//
var m_damage;
var m_hitRadius;
var m_lifespan;

var m_sprite;

var isAlive;
var currentLifetime;

var explosionEmitter;
var trailEmitter;

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
	this.m_sprite.body.setCircle(4);
	
	//this.emitter = new Phaser.Emitter(game, x, y, 50);
	this.explosionEmitter = game.add.emitter(x, y, 50);
    this.explosionEmitter.makeParticles('Pea_Pellet');
    this.explosionEmitter.gravity = 100;
	
	this.trailEmitter = game.add.emitter(x, y, 50);
    this.trailEmitter.makeParticles('Salt_Pellet');
    this.trailEmitter.gravity = 50;
	
	this.trailEmitter.start(false, 500, 0.2, 10);
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
	if(this.isAlive == true)
	{
		this.particleTrail(this.m_sprite.x, this.m_sprite.y);
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
	}
};
	
//On Collide Function//
Projectile.prototype.onCollision = function()
{
    //Check for collisions within the hitradius, apply damage...
	//for loop for every snail
	
	this.particleBurst(this.m_sprite.x, this.m_sprite.y);
	
	var dist = Phaser.Math.distance(this.m_sprite.body.center.x, this.m_sprite.body.center.y, eplayer.m_sprite.body.center.x, eplayer.m_sprite.body.center.y);
	console.log(dist);
	console.log(this.m_hitRadius);
	
	if(dist <= this.m_hitRadius)
	{
		console.log("Kablam!!!");
		eplayer.m_health -= this.m_damage;
	}
	this.destroy();
	//for loop end
};


Projectile.prototype.particleBurst = function(x, y)
{
	//console.log(this.explosionEmitter);
	
    //Position the emitter where the projectile is
    this.explosionEmitter.x = x;
    this.explosionEmitter.y = y;

    //  The first parameter sets the effect to "explode" which means all particles are emitted at once
    //  The second gives each particle a 2000ms lifespan
    //  The third is ignored when using burst/explode mode
    // Explode, 
    this.explosionEmitter.start(true, 1000, null, 20);

};

Projectile.prototype.particleTrail = function(x, y)
{
	console.log(x + " " + y);
	
    //  Position the emitter where the projectile is
    this.trailEmitter.x = x;
    this.trailEmitter.y = y;
};
