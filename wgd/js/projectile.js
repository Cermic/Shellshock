//Global Member Variables//
var m_damage;
var m_hitRadius;
var m_lifespan;

var m_sprite;

var isAlive;
var currentLifetime;

var explosionEmitter;
var trailEmitter;

var m_explosionCount;
var m_explosionParticleKey;
var m_trailParticleKey;

var damagedone;
var snailHit;


//Contructor//
function Projectile(damage, hitRadius, lifespan, projectileSprite, explosionCount, explosionParticleKey, trailParticleKey)
{ 
	this.m_damage 					= damage;
	this.m_hitRadius				= hitRadius;
	this.m_lifespan					= lifespan;
	this.m_sprite 					= projectileSprite;
	this.m_explosionCount			= explosionCount;
	this.m_explosionParticleKey		= explosionParticleKey;
	this.m_trailParticleKey			= trailParticleKey;
	
	this.isAlive = false;
};

//Initialisation Function//
Projectile.prototype.init = function(x, y)
{
	this.isAlive = true;
	this.currentLifetime = 0;
	
	this.m_sprite = PhaserMMORPG.game.add.sprite(x, y, this.m_sprite);
	this.m_sprite.anchor.set(0.5);
	PhaserMMORPG.game.physics.enable(this.m_sprite, Phaser.Physics.ARCADE);
	this.m_sprite.body.setCircle(4);
	
	//this.emitter = new Phaser.Emitter(game, x, y, 50);
	this.explosionEmitter = PhaserMMORPG.game.add.emitter(x, y, 50);
    this.explosionEmitter.makeParticles(this.m_explosionParticleKey);
    this.explosionEmitter.gravity = 100;
	
	this.trailEmitter = PhaserMMORPG.game.add.emitter(x, y, 50);
    this.trailEmitter.makeParticles(this.m_trailParticleKey);
    this.trailEmitter.gravity = 50;
	
	this.trailEmitter.start(false, 500, 0.2, 10);
	
	//console.log(this.m_explosionParticleKey + " " + this.m_trailParticleKey);
	
	this.damagedone = 0;
	this.snailHit = 0;

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
		
		
		//Check for collisions...
		for (var i in PhaserMMORPG.playerList)
		{		
			console.log( "bullet X y "+ this.m_sprite.position.x + ", " + this.m_sprite.position.y);
			console.log( "Snail X y "+ PhaserMMORPG.playerList[i].m_sprite.position.x + ", " + PhaserMMORPG.playerList[i].m_sprite.position.y);
	
			if(PhaserMMORPG.game.physics.arcade.intersects(this.m_sprite, PhaserMMORPG.playerList[i].m_sprite))
			{
				console.log("Collided with snail.");
				this.onCollision();
			}
			else if (PhaserMMORPG.game.physics.arcade.collide(this.m_sprite, layer01))
			{
				console.log("Collided with world.");
				this.onCollision();
			}	
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
	this.particleBurst(this.m_sprite.x, this.m_sprite.y);
	
	for (var i in PhaserMMORPG.playerList)
	{
		var dist = Phaser.Math.distance(this.m_sprite.body.center.x, this.m_sprite.body.center.y, PhaserMMORPG.playerList[i].m_sprite.position.x, PhaserMMORPG.playerList[i].m_sprite.position.y);
		console.log(dist);
		console.log(this.m_hitRadius);
	
		if(dist <= this.m_hitRadius)
		{
			console.log("Kablam!!!");
			
			this.damagedone = this.m_damage;
			this.snailhit = i;
			console.log("Index: " + i);
		}
		
	}
	
	this.destroy();

};


Projectile.prototype.particleBurst = function(x, y)
{
    this.explosionEmitter.x = x;
    this.explosionEmitter.y = y;
    this.explosionEmitter.start(true, 1000, null, this.m_explosionCount);
};

Projectile.prototype.particleTrail = function(x, y)
{
    this.trailEmitter.x = x;
    this.trailEmitter.y = y;
};

