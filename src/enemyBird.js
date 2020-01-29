"use strict";

function EnemyBird(canvas, y, speed) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.size = 65;
  this.x = canvas.width;
  this.y = y;
	this.speed = speed;
	this.direction = -1;
    /*this.width = ;
    this.height = ;*/ //isn't it enough(easier) with the size property? like to add the image, or is that for rects/squares only
}

EnemyBird.prototype.draw = function() {
  this.ctx.fillStyle = 'red';
  var img = new Image();

if(this.direction === -1){
  img.src = "./css/images/enemybird.png"
} else{
  img.src = './css/images/enemybirdrev.png'
}

  this.ctx.drawImage(
    img,
    this.x,
    this.y,
    this.size,
    this.size,
  );
}

EnemyBird.prototype.updatePosition = function() {
	this.x = this.x + this.speed*this.direction;
}