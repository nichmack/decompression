ig.module(
	'game.entities.enemy'
)
.requires(
	'impact.entity'
)
.defines(function(){
	EntityEnemy = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('lib/game/media/enemies/enemy.png', 96, 192),
		size: {x: 96, y:192},	
		flip : false,		
		//Is this enemy still alive?
		alive : false,

		//enemy type, refers to a list
		type : null,
		description : "",

		// portrait image, images for pawn facing directions
		portrait: new ig.AnimationSheet('lib/game/media/enemies/enemyPortrait.png', 240, 240),

		//Room location, and tile inside that room
		room : {x: 0, y:0},
		tile : {x: 0, y:0},

		facing_direction : "downRight",

		//HP and other stats
		hp_max : 1,
		hp : 1,

		// Enemy attack accuracy, damage, possible defense value for evasion, and damage reducing armor
		attack : 20,
		attack_dmg : 1,
		defense : 10,
		armor : 0,

		// Enemy data for game logic
		threatRates : {high : 1.0, med : 0.66, low : 0.33},
		threatLevel : 0,
		
		spawnRates : {high : 1.0, medHigh : 0.75, medLow : 0.5, low : 0.25},
		spawnChance : 0,

		lootDropped : 1,
		
		//special status effects

		//Constructor and initialization functions
		init : function() {
			this.threatLevel = this.threatRates.low;
			this.spawnChance = this.spawnRates.high;
			//this.parent( x, y, settings );
			//this.type = type;
			// Add the animations, assumes down-right facing is default
			this.addAnim( 'upIdle', 1, [0] );
			this.addAnim( 'upWalk', 1, [1] );
			this.addAnim( 'upAttack', 1, [2] );
			this.addAnim( 'downIdle', 1, [3] );
			this.addAnim( 'downWalk', 1, [4] );
			this.addAnim( 'downAttack', 1, [5] );
			//this.addAnim( 'run', 0.7, [0,1,2,3,4,5] );

		},

		update : function() {
			this.currentAnim.flip.x = this.flip;
			this.parent();			
		},

		// Possible enemy actions
		moveRooms : function(direction, targetRoom){

			this.facing_direction = direction;
			
			switch(direction){
				case ('upLeft'):
					this.room.x -= 1;
					this.currentAnim = this.anims.UpIdle;
					this.flip = true;
					break;
				case ('upRight'):
					this.room.y -= 1;
					this.currentAnim = this.anims.UpIdle;
					this.flip = false;
					break;
				case ('downLeft'):
					this.room.y += 1;
					this.currentAnim = this.anims.DownIdle;
					this.flip = true;
					break;
				case ('downRight'):
					this.room.x += 1;
					this.currentAnim = this.anims.DownIdle;
					this.flip = false;
					break;														
			};

			this.room.x = targetRoom.x;
			this.room.y = targetRoom.y;
		},
		attack : function(targetEntity){
			//add animation

			//Roll for attack accuracy
			if(Math.floor((Math.random()*20)+1+this.attack) >= targetEntity.defense) {
				targetEntity.takeDamage(this.attack_dmg);
			}
		},

		//use var ability
		ability : function(){

		},

		takeDamage : function(dmgAmount){
			this.hp -= dmgAmount;
			if(this.hp <= 0) {
				this.death();
				return;
			}
			//add hit animation

		},

		death : function(){
			this.active = false;
			//add death animation
		},

		onPlayerEnter : function(targetPlayer){

		},

		onPlayerExit : function(targetPlayer) {

		},

		onPlayerMisses : function(attackingPlayer) {

		}				
	});

});