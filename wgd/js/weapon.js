function Weapon(costAP, maxAmmo, damage, range, i_fireVelocity, wepSprite, bulSprite, i_bulCount)
{ 
	this.costAP = costAP;
	this.maxAmmo = maxAmmo;
	this.damage = damage;
	this.range = range;
	this.fireVelocity = i_fireVelocity;
	this.wepSprite = wepSprite;
	this.bulSprite = bulSprite;
	this.bulCount = i_bulCount;
	
	this.currentAmmo = maxAmmo;
};

//var weapon;
var projectiles;	
var fireVelocity;
var bulCount;
var weaponSprite;
var fireRate;
var nextFire;

Weapon.prototype.init = function()
{
	this.fireRate = 100;
	this.nextFire = 0;
		
	this.weaponSprite = game.add.sprite(1000,100, 'arrow');
	this.weaponSprite.anchor.set(0.5);
	
	this.projectiles = game.add.group();
	this.projectiles.enableBody = true;
	this.projectiles.physicsBodyType = Phaser.Physics.ARCADE;
	//bullets.body.allowGravity=false;             					 why do you not work?
		
	this.projectiles.createMultiple(this.bulCount, 'bullet');
	this.projectiles.setAll('checkWorldBounds', true);
	this.projectiles.setAll('outOfBoundsKill', true);
}


Weapon.prototype.update = function(theSnail)
{
	this.weaponSprite.rotation = game.physics.arcade.angleToPointer(theSnail);		
	this.weaponSprite.x = theSnail.x + (playerSpriteWidth/2);
	this.weaponSprite.y = theSnail.y + (playerSpriteHeight/2);	
}
  
  
Weapon.prototype.fire = function(theSnail)
{
    if (game.time.now > this.nextFire && this.projectiles.countDead() > 0)
    {
        this.nextFire = game.time.now + this.fireRate;
        var projectile = this.projectiles.getFirstDead();
        projectile.reset(theSnail.x - 8, theSnail.y - 8);
        game.physics.arcade.moveToPointer(projectile, this.fireVelocity);
	}
}


	
