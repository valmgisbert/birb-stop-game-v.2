"use strict";

function Player(canvas){
	this.canvas = canvas;
	this.ctx = canvas.getContext('2d');
  this.x = 200;
  this.y = canvas.height / 2; 
  this.width = 35;
  this.height = 155;
  this.speed = 7; 
  this.direction = 0;
}

Player.prototype.setDirection = function(direction) {
	if (direction === 'up') this.direction = -1;
	else if (direction === 'down') this.direction = 1;
}


Player.prototype.draw = function(){
	this.ctx.fillStyle = 'white';
  var img = new Image();
  img.src = "./css/images/barrieredit.png";
  this.ctx.drawImage(
    img,
    this.x,
    this.y,
    this.width,
    this.height,
  );
}


Player.prototype.updatePosition = function () {
	this.y = this.y + (this.direction * this.speed); //+10 or -10
}

Player.prototype.handleScreenCollision = function() { 
  var screenTop = 0;
  var screenBottom = this.canvas.height;

  if (this.y + this.height > screenBottom) this.direction = -1;
  else if (this.y < screenTop) this.direction = 1;
};


