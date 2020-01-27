"use strict";

function Tower(canvas) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.x = 60;
  this.y = 100;
  this.width = 95;
  this.height = 170;
}
  
Tower.prototype.draw = function(){
	this.ctx.fillStyle = 'black';
	//fillRect(x, y, width, height)
	this.ctx.fillRect(
  	this.x,
  	this.y,
  	this.size,
		this.size,
	);
}

Tower.prototype.didCollideWithTower = function(enemyBird) {
	var towerRight = this.x + this.size;
	var towerLeft = this.x;
	var enemyBirdLeft = enemyBird.x;
	var enemyBirdRight = enemyBird.x + enemyBird.size;

	var clashTower = enemyBirdLeft <= towerRight && enemyBirdRight >= towerLeft;

	if (clashTower) {
		return true;
	}

	return false;
}//CHECK IF THIS IS OKAY