"use strict";

function Player(canvas){
	this.canvas = canvas;
	this.ctx = canvas.getContext('2d');
  this.x = 100;
  this.y = canvas.height + this.height; //TRY IT OUT
  this.width = 35;
  this.height = 85;
  this.speed = 5; 
  this.direction = 0;
}

Player.prototype.setDirection = function(direction) {
	if (direction === 'up') this.direction = -1;
	else if (direction === 'down') this.direction = 1;
	else if (direction === 'stop') this.direction = 0;
}

Player.prototype.didCollideWithPlayer = function(enemyBird) {
	var playerRight = this.x + this.size;
	var playerLeft = this.x;
	var enemyBirdLeft = enemyBird.x;
	var enemyBirdRight = enemyBird.x + enemyBird.size;

	var clashPlayer = enemyBirdLeft <= playerRight && enemyBirdRight >= playerLeft;

	if (clashPlayer) {
		return true;
	}

	return false;
}//CHECK IF THIS IS OKAY

Player.prototype.draw = function(){
	this.ctx.fillStyle = 'white';
  //fillRect(x, y, width, height)
  this.ctx.fillRect(
    this.x,
    this.y,
    this.size,
    this.size,
  );
}


Player.prototype.updatePosition = function () {
	this.y = this.y + (this.direction * this.speed); //+10 or -10
}

Player.prototype.handleScreenCollision = function() { //should i keep it?? i mean it helps the barrier not stray but removing the borders might raise some difficulty i think
  var screenTop = 0;
  var screenBottom = this.canvas.height;

  if (this.y > screenBottom) this.direction = -1;
  else if (this.y < screenTop) this.direction = 1;
};


