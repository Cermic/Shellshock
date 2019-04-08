
//Initialisation Function//
createWeapon = function(weaponType)
{
	//function Weapon(costAP, maxAmmo, damage, range, fireVelocity, weaponSprite, projectileSprite, projectileCount, fireRate)
	if(weaponType == "pea_shooter")
		return new Weapon(3, "Inf", 15, 20, 400,'PeaShooter', 'bullet', 1, 30);
	
	else if(weaponType == "blade_of_grass")
		return new Weapon(3, "Inf", 1, 40, 400,'BladeOfGrass', 'bullet', 1, 30);
	
	else if(weaponType == "a_salt_rifle")
		return new Weapon(2, 3, 10, 1, 200, 'ASaltRifle', 'bullet', 20, 1);
	
	else if(weaponType == "beezooka")
		return new Weapon(9,1,1,1,800,'Beezooka', 'bullet', 1, 1);
	
	else
		print("Invalid Weapon");
}; 	
	


	
