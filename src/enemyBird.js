"use strict";

function EnemyBird(canvas, y, speed) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.size = 35;
  this.x = canvas.width + this.size;
  this.y = y;
	this.speed = speed;
    /*this.width = ;
    this.height = ;*/ //isn't it enough(easier) with the size property? like to add the image, or is that for rects/squares only
}

EnemyBird.prototype.draw = function() {
  this.ctx.fillStyle = 'yellow';
  // fillRect(x, y, width, height)
  this.ctx.fillRect(
    this.x,
    this.y,
    this.size,
    this.size,
  );
}

EnemyBird.prototype.updatePosition = function() {
	this.x = this.x - this.speed;
}
  
EnemyBird.prototype.bounceBack = function() {
	
}
  
