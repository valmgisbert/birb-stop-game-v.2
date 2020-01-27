"use strict";

function Game(){
	this.canvas = null;
	this.ctx = null;

	this.enemyBirds = [];
	this.player = null;
	this.tower = null;

	this.gameIsOver = false;
	this.gameScreen = null;
	/*this.timer = 0;*/ //do i start it like this or??? answer: GO BACKWARDS!!
}

Game.prototype.start = function() {
	this.canvasContainer = document.querySelector('.canvas-container');
  this.canvas = this.canvasContainer.querySelector('canvas');
	this.ctx = this.canvas.getContext('2d');
	
	this.timerElement = this.gameScreen.querySelector('.timer .value');

  var containerWidth = this.canvas.width;
	var containerHeight = this.canvas.height;
	
  this.canvas.setAttribute('width', containerWidth);
	this.canvas.setAttribute('height', containerHeight);

	this.player = new Player(this.canvas);
	this.tower = new Tower(this.canvas);
	// this.enemyBirds = new EnemyBird(this.canvas);
	
	//event listeners for player moving
	this.handleKeyDown = function(event) {
    if (event.key === 'ArrowUp') {
      console.log('UP');
      this.player.setDirection('up');  
    } 
    else if (event.key === 'ArrowDown') {
      console.log('DOWN');
      this.player.setDirection('down');
    } 
	};
	  
  window.addEventListener('keydown', 
		this.handleKeyDown.bind(this));

	this.startLoop();
}

Game.prototype.startLoop = function() {
	var loop = function() {
		//PUT THE ENEMIES IN THE SCREEN
		if (Math.random() > 0.98) { //lower number, more enemies
			var randomY = this.canvas.height * Math.random();
			var newEnemy = new EnemyBird(this.canvas, randomY, parseInt(10 * Math.random())); //using the template form the enemy.js [YOU CAN RANDOM SPEED]

			this.enemyBirds.push(newEnemy); //to add every enemy appearing to the array
		}
		//UPDATE PLAYER
		this.player.updatePosition();
		//HANDLESCREENCOLS FOR PLAYER
		this.player.handleScreenCollision();
		//UPDATE EXISTING ENEMIES
		this.enemyBirds.forEach(function(enemyBirdObj) {
			enemyBirdObj.updatePosition();
		})
		//CHECK COLLS TO PLAYER
		//this.checkCollisionsToPlayer();
		//CHECK COLLS TO TOWER
		//this.checkCollisionsToTower();

		//CLEAR CANVAS
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		//DRAW PLAYER
		this.player.draw();
		//DRAW ENEMIES
		this.enemyBirds.forEach(function(enemyBirdObj) {
			enemyBirdObj.draw();
		})
		//DRAW TOWER
		this.tower.draw();

		//END LOOP IF GAME IS OVER
    if (!this.gameIsOver) {
      window.requestAnimationFrame(loop);
    }
  }.bind(this); //to find it again within game

  loop();
};

Game.prototype.checkCollisionsToTower = function() {
	this.enemyBirds.forEach(function(enemyBird) {
    if (this.tower.didCollideWithTower(enemyBird)) { //is it necessary that i make the enemies disappear if they touch the tower bc its game over??
        this.gameOver();
      }
  }, this);
};

Game.prototype.checkCollisionsToPlayer = function() {
	this.enemyBirds.forEach(function(enemyBird) {
		if (this.player.didCollideWithPlayer(enemyBird)) {
				this.bounceBack();
		}
	}, this);
}

Game.prototype.updateGameStats = function() {};

Game.prototype.passGameOverCallback = function(gameOverFunc) {
	this.reStart = gameOverFunc;
};

Game.prototype.setGameOver = function() {
	this.gameIsOver = true;

	this.reStart();
};




