
//Initialisation Function//
createWeapon = function(weaponType)
{
	//function Weapon(costAP, damage, hitRadius, range, mass, forceModifier, weaponSprite, projectileSprite)//
	if(weaponType == "pea_shooter")
		return new Weapon(0, 5, 100, 60, 1000, 1000, 'Pea_Shooter', 'Pea_Pellet');
	else if(weaponType == "a_salt_rifle")
		return new Weapon(25, 10, 100, 120, 500, 1000, 'A_Salt_Rifle', 'Salt_Pellet');	
	else if(weaponType == "slug_gun")
		return new Weapon(25, 25, 100, 10, 0, 1000, 'Slug_Gun', 'Slug_Shot');
	else if(weaponType == "beezooka")
		return new Weapon(75, 75, 150, 90, 2000, 1000, 'Beezooka', 'Bee_Rocket');
	else if(weaponType == "snrailgun")
		return new Weapon(100, 95, 100, 120, 0, 1000, 'Snrailgun', 'Snrailgun_Laser');
	else
		print("Invalid Weapon");
}; 	


	
