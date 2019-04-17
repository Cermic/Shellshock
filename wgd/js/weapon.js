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

var m_projectile;

//chloe multiplayer
var m_hasFired;
var m_velocityx;
var m_velocityy;

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
	
	
	//chloe Multiplayer
	m_hasFired = 0;
	m_velocityx = 0;
	m_velocityy = 0;
};

//Initialisation Function//
Weapon.prototype.init = function()
{
	//Reset cooldown between shots...
	this.nextFire = 0;

	this.m_weaponSprite = PhaserMMORPG.game.add.sprite(1000, 100, this.m_weaponSprite);
	this.m_weaponSprite.anchor.set(0.5);
	
	//Set up weapon projectiles...
	this.m_projectiles = PhaserMMORPG.game.add.group();
	this.m_projectiles.enableBody = true;
	this.m_projectiles.physicsBodyType = Phaser.Physics.ARCADE;		
	this.m_projectiles.createMultiple(this.m_projectileCount, this.m_projectileSprite);
	
	this.m_projectiles.setAll('checkWorldBounds', true);
	this.m_projectiles.setAll('outOfBoundsKill', true);
	
	this.m_projectile = new Projectile(0,0,this.m_projectileSprite);
	//this.m_projectile.init(this.m_weaponSprite.x, this.m_weaponSprite.y);
}; 	
	
//Initialisation Function//	
Weapon.prototype.update = function(snailObj)
{
	this.m_weaponSprite.rotation = PhaserMMORPG.game.physics.arcade.angleToPointer(snailObj.m_sprite);
	//this.weaponSprite.x = arg.x + 10;
	//this.weaponSprite.y = arg.y + 24;
	if(snailObj.m_facing == 'left')
	{

		this.m_weaponSprite.x = snailObj.m_sprite.x + 4;
		this.m_weaponSprite.scale.x = -1;
		this.m_weaponSprite.scale.y = -1;
	} else if(snailObj.m_facing == 'right')
	{
		this.m_weaponSprite.x = snailObj.m_sprite.x + 28;
		this.m_weaponSprite.scale.x = -1; 
		this.m_weaponSprite.scale.y = 1;
	}
	this.m_weaponSprite.y = snailObj.m_sprite.y + 20;
};

//Initialisation Function//	
Weapon.prototype.updateOnline = function(snailObj)
{
	///this.m_weaponSprite.rotation = PhaserMMORPG.game.physics.arcade.angleToPointer(snailObj.m_sprite);
	//this.weaponSprite.x = arg.x + 10;
	//this.weaponSprite.y = arg.y + 24;
	if(snailObj.m_facing == 'left')
	{

		this.m_weaponSprite.x = snailObj.m_sprite.x + 4;
		this.m_weaponSprite.scale.x = -1;
		this.m_weaponSprite.scale.y = -1;
	} else if(snailObj.m_facing == 'right')
	{
		this.m_weaponSprite.x = snailObj.m_sprite.x + 28;
		this.m_weaponSprite.scale.x = -1; 
		this.m_weaponSprite.scale.y = 1;
	}
	this.m_weaponSprite.y = snailObj.m_sprite.y + 20;
};
	
//Fire Weapon Function//
Weapon.prototype.fire = function(snailObj)
{

	if (this.m_projectile.isAlive == false)
    {
		//console.log("NewProj");
		//this.m_projectile.destroy();
		this.m_projectile = new Projectile(0,0,0,this.m_projectileSprite);
		//this.m_projectile.init(this.m_weaponSprite.x - 16, this.m_weaponSprite.y - 16);
		this.m_projectile.init(this.m_weaponSprite.x, this.m_weaponSprite.y);
		//console.log(this.m_weaponSprite);
		//game.physics.arcade.moveToPointer(this.m_projectile.m_sprite.body, this.m_fireVelocity);
		
		var Xvector = (PhaserMMORPG.game.input.activePointer.worldX - this.m_weaponSprite.position.x);
		var Yvector = (PhaserMMORPG.game.input.activePointer.worldY - this.m_weaponSprite.position.y);
		
		//console.log("pointer x: " + game.input.activePointer.x + ", weap pos x: " + this.m_weaponSprite.position.x /*+ Xvector*/ );
		
		console.log("vecX: " + Xvector + " / vecY: " + Yvector);
		
		var dir = Math.sqrt((Xvector * Xvector) + (Yvector * Yvector));
		
		console.log(dir);
		
		this.m_projectile.m_sprite.body.velocity.x = Xvector/dir * 1000;
		this.m_projectile.m_sprite.body.velocity.y = Yvector/dir * 1000;
		this.m_projectile.m_sprite.body.gravity.y = 500;
		
		
		
		
		//chloe multiplayer
		this.m_hasFired = 1;
		this.m_velocityx = Xvector/dir * 1000;
		this.m_velocityy = Yvector/dir * 1000;		
	}
	
	/*
=======
>>>>>>> 4bb01b7f86c11636626e65939c7f729512d73ac0
    if (game.time.now > this.nextFire && this.m_projectiles.countDead() > 0)
    {
		snailObj.m_actionPoints -= this.m_costAP;
        this.nextFire = game.time.now + this.m_fireRate;
        var projectile = this.m_projectiles.getFirstDead();
		projectile.body.gravity.y = 0;
        projectile.reset(this.m_weaponSprite.x - 16, this.m_weaponSprite.y - 16);
        game.physics.arcade.moveToPointer(projectile, this.m_fireVelocity);
	}
	*/
};

//Fire Weapon Function//
Weapon.prototype.fireOnline = function(velx, vely)
{
	if (this.m_projectile.isAlive == false)
    {
		
		this.m_projectile = new Projectile(0,0,0,this.m_projectileSprite);

		this.m_projectile.init(this.m_weaponSprite.x, this.m_weaponSprite.y);
		
		this.m_projectile.m_sprite.body.velocity.x = velx;
		this.m_projectile.m_sprite.body.velocity.y = vely;
		this.m_projectile.m_sprite.body.gravity.y = 500;
	}
};



