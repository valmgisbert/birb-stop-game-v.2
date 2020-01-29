"use strict";

function Tower(canvas) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.x = 40;
  this.width = 115;
  this.height = 350;
  this.y = canvas.height - this.height;
}
  
Tower.prototype.draw = function(){
  this.ctx.fillStyle = 'black';
  var img = new Image();
  img.src = "./css/images/stackedtower.png";
  //fillRect(x, y, width, height)
  this.ctx.drawImage(
  	img,
  	this.x,
  	this.y,
  	this.width,
  	this.height,
  );
}