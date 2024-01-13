# Gats.io hacks-mods


Current Featurelist (See vaakir youtube for more information):

Gui:
- Draggable by title
- Multilayered accordion

Aimbot:
- Active
- AlwaysAim
- Calibration
- SortFrequency
- AutoShoot
- ESPLine
- ESPCollisions
- Allies
- AlliesList

AI:
- AutoRespawn
- AutoTalk (Based on AI state [attack, dodge, retreat, keep distance, protect master player, hp, ..])
- AUtoTacticalReload
- PathFinding (Wallcrawler - for the right hand logic, body protected, gun on the side)
- AutoRetreat (vecFromEnemiesToMe inversely weighted and combined to decide new goal)
- GoalDeciding [Terminatorbot -> enemies, follow -> protect master player]
- FollowLeader [the master to protect]
- Espvector (To visualize what is going on
- BulletDodging (Bullets are set as temporary obstacles in front of the player, vector avoidance can be added for sniper shots later for improved performance)
- UpdateFrequency (for a lot of things in the game currently)

ESP:
- Active
- PlayerLine
- ShootRange
- Walls
- ShowAllies

AutoUpgrade:
- Active
- Perk1
- Perk2
- Perk3

Misc:
- Zoom
- AntiSilencer
- AntiCamo
- AntiMines

ChatScroller:
- Active
- Message
- Speed

Data:
- Active
- x
- y

Customizable texturePack
- longCrate
- squareCrate
- longCrateBorder
- squareCrateBorder
- darkmode added
- reset / random abilities (color theory can be added here for improved random textures)

Not included (again check vaakir youtube):
- mroe pathfinding algorithms [A** , navmesh (3 different type of vector based pathfinding algos)]
- autoCalibrate (autoadjust aiming variable to how far ahead of the enemy to shoot based your game ping)
- sniperFriendlyAimbot
- multiboxing
- knifebot (automatically knife someone close)
- shieldbot (automatially draw up shield as a bullet is about to hit) 

Will never be included:
- grecaptcha bypass for bots
- (hash rainbowtable) bypass for bots
- 2 ip limitation bypass for bots
- de-obfuscation script
- 6 simulation scripts (client side of the game built from scratch to simulate and optimize bot movement and shooting strategies)

Patched and will never be included (thank god):
- XSS
- DOS
- In game teamswapper
