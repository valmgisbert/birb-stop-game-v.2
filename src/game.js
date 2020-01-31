"use strict";

function Game(){
	this.canvas = null;
	this.ctx = null;

	this.tower = null;
	this.player = null;
	this.enemyArr = [];

	this.gameIsOver = false;
	this.gameWin = false;
	this.gameScreen = null;
  this.arrIsFull = false;
  
  this.clashSound = new Audio ("./css/sounds/no-god-short.mp3");
  this.gameOverSound = new Audio ("./css/sounds/no-god-gameover.mp3");
  this.victorySound = new Audio ("./css/sounds/birb-victory.wav");
}

Game.prototype.start = function() {
this.canvasContainer = document.querySelector('.canvas-container');
  this.canvas = this.canvasContainer.querySelector('canvas');
	this.ctx = this.canvas.getContext('2d');
	
	//this.timerElement = this.gameScreen.querySelector('.timer .value');

  var containerWidth = this.canvas.width;
	var containerHeight = this.canvas.height;
	
  this.canvas.setAttribute('width', containerWidth);
	this.canvas.setAttribute('height', containerHeight);

	this.player = new Player(this.canvas);
	this.tower = new Tower(this.canvas);
	
	//event listeners for player moving
	this.handleKeyDown = function(event) {
    if (event.key === 'ArrowUp') {
      this.player.setDirection('up');  
    } 
    else if (event.key === 'ArrowDown') {
      this.player.setDirection('down');
    } 
	};
	  
  window.addEventListener('keydown', 
		this.handleKeyDown.bind(this));

	this.startLoop();
}

Game.prototype.startLoop = function() {
	var loop = function() {
		if (this.enemyArr.length === 8) {
			this.arrIsFull = true;
		}
		//PUT THE ENEMIES IN THE SCREEN
			if (Math.random() > 0.95 && this.arrIsFull === false) { //lower number, more enemies
			 var randomY = (this.canvas.height - 65) * Math.random();
			 if (randomY < 15) {
			 		randomY = 30;
			 	} else if (randomY > 625) {
			 		randomY = 625; //limiting Y
			 	};

			 var newEnemy = new EnemyBird(this.canvas, randomY, 3); //using the template form the enemy.js [YOU CAN RANDOM SPEED]
			 this.enemyArr.push(newEnemy); //to add every enemy appearing to the array
		} 
		//UPDATE PLAYER
		this.player.updatePosition();
		//HANDLESCREENCOLS FOR PLAYER
		this.player.handleScreenCollision();
		//UPDATE EXISTING ENEMIES
		this.enemyArr.forEach(function(enemyBirdObj) {
			enemyBirdObj.updatePosition();
			//CHECK COLLS TO PLAYER
			this.didEnemyCollideWithPlayer(enemyBirdObj);
			//CHECK COLLS TO TOWER
			this.didEnemyCollideWithTower(enemyBirdObj);
    }.bind(this));
      //UPDATE ENEMIES AND CHECK IF THEY ARE IN OR OUT OF SCREEN
   this.enemyArr = this.enemyArr.filter(function(enemyBirdObj) {

     return enemyBirdObj.isInsideScreen();
   });
		
		//CLEAR CANVAS
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		//DRAW TOWER
		this.tower.draw();
		//DRAW PLAYER
		this.player.draw();
		//DRAW ENEMIES
		this.enemyArr.forEach(function(enemyBirdObj) {
			enemyBirdObj.draw();
		})
		//LIMIT THE AMOUNT OF BIRDS
		this.checkNumberOfBirdsLeft();
		//END LOOP IF GAME IS OVER
    if (!this.gameIsOver && !this.gameWin) {
      window.requestAnimationFrame(loop);
		}
  }.bind(this); //to find it again within game

  loop();
};

//isInsideScreen for filtering the birds inside the canvas

Game.prototype.didEnemyCollideWithPlayer = function(enemyBird) {
	var playerRight = this.player.x + this.player.width;
	var playerLeft = this.player.x;
	var playerTop = this.player.y;
	var playerBottom = this.player.y + this.player.height;

	var enemyBirdLeft = enemyBird.x;
	var enemyBirdRight = enemyBird.x + enemyBird.size;
	var enemyBirdTop = enemyBird.y;
  var enemyBirdBottom = enemyBird.y + enemyBird.size;
  
  

	var clashPlayerCenter = enemyBirdLeft <= playerRight && enemyBirdRight >= playerLeft;
	var clashPlayerTop = enemyBirdBottom > playerTop;
	var clashPlayerBottom = enemyBirdTop < playerBottom;

	var clashBorders = (enemyBirdBottom > playerTop && enemyBirdRight > playerLeft && enemyBirdLeft < playerRight && enemyBirdBottom < playerBottom);

	if (clashPlayerCenter && clashPlayerTop && clashPlayerBottom && clashBorders) {
		enemyBird.direction = 1;
    enemyBird.hasCollided = true; 
    
    this.clashSound.play();
      this.clashSound.currentTime = 0;
		//console.log(this.enemyArr[this.enemyArr.length-1].x, this.canvas.width);
		
	}
	return false;
}

Game.prototype.checkNumberOfBirdsLeft = function () {
	console.log('this.enemyArr.length', this.enemyArr.length);

	if ((this.arrIsFull === true) && (this.enemyArr.length < 1)) { 
		this.gameVictory();
	}
}

Game.prototype.didEnemyCollideWithTower = function(enemyBird) {
	var towerRight = this.tower.x + this.tower.width;
	var towerLeft = this.tower.x;
	var towerTop = this.tower.y;
	var towerBottom = this.tower.y + this.tower.height;

	var enemyBirdLeft = enemyBird.x;
	var enemyBirdRight = enemyBird.x + enemyBird.size;
	var enemyBirdTop = enemyBird.y; //CHECK THIS
	var enemyBirdBottom = enemyBird.y + enemyBird.size;

	var clashTower = enemyBirdLeft <= towerRight && enemyBirdRight >= towerLeft;
	var clashTopTower = enemyBirdBottom > towerTop && enemyBirdRight > towerLeft && enemyBirdLeft < towerRight && enemyBirdBottom < towerBottom;

	if (clashTower && clashTopTower) {
    this.gameOver();
	}
	return false;
};

Game.prototype.gameOver = function() {
  this.gameIsOver = true;
  this.gameOverSound.play();
    this.gameOverSound.currentTime = 0;
	this.reStartLoss();
};

Game.prototype.gameVictory = function() {
  this.gameWin = true;
  this.victorySound.play();
      this.victorySound.currentTime = 0;
	//check if all enemies have collided, 
	this.reStartWin();
}

Game.prototype.removeGameScreen = function () {
	this.gameScreen.remove();
}

Game.prototype.passGameOverCallback = function(gameOverFunc) {
	this.reStartLoss = gameOverFunc;
};

Game.prototype.passGameWinCallback = function(gameVictoryFunc) {
	this.reStartWin = gameVictoryFunc;
};
