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

var weapon;
var projectiles;	
var fireVelocity;
var bulCount;

Weapon.prototype.init = function()
{
	fireRate = 100;
	nextFire = 0;
	
	projectiles = game.add.group();
	projectiles.enableBody = true;
	projectiles.physicsBodyType = Phaser.Physics.ARCADE;
	//bullets.body.allowGravity=false;              why do you not work?
		
	projectiles.createMultiple(this.bulCount, 'bullet');
	projectiles.setAll('checkWorldBounds', true);
	projectiles.setAll('outOfBoundsKill', true);

}
  	
Weapon.prototype.fire = function()
{
    if (game.time.now > nextFire && projectiles.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;
        var projectile = projectiles.getFirstDead();
        projectile.reset(sprite.x - 8, sprite.y - 8);
        game.physics.arcade.moveToPointer(projectile, this.fireVelocity);
	}
}


	
