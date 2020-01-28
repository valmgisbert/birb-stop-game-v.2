"use strict";

function Tower(canvas) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.x = 60;
  this.width = 95;
  this.height = 370;
  this.y = canvas.height - this.height;
}
  
Tower.prototype.draw = function(){
	this.ctx.fillStyle = 'black';
	//fillRect(x, y, width, height)
	
	this.ctx.fillRect(
  	this.x,
  	this.y,
  	this.width,
		this.height,
	);
}