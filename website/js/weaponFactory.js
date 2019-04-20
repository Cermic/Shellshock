
//Initialisation Function//
createWeapon = function(weaponType)
{
	if(weaponType == "pea_shooter")
		return new Weapon(0, 5, 100, 60, 1000, 1000, 'Pea_Shooter', 'Pea_Pellet', 5, 'Pea_Shard', 'Pea_Shard');
	else if(weaponType == "a_salt_rifle")
		return new Weapon(25, 10, 100, 120, 500, 1000, 'A_Salt_Rifle', 'Salt_Pellet', 5, 'Salt_Shard', 'Salt_Shard');	
	else if(weaponType == "slug_gun")
		return new Weapon(25, 25, 100, 10, 0, 1000, 'Slug_Gun', 'Slug_Shot', 10, 'Slug_Splat', 'Slug_Trail');
	else if(weaponType == "beezooka")
		return new Weapon(75, 75, 150, 90, 2000, 1000, 'Beezooka', 'Bee_Rocket', 20, 'Honey_Splat', 'Smoke_Trail');
	else if(weaponType == "snrailgun")
		return new Weapon(100, 95, 100, 120, 0, 1000, 'Snrailgun', 'Snrailgun_Laser', 20, 'Laser_Splash', 'Laser_Trail');
	else
		print("Invalid Weapon");
}; 	


	
