$.player = function () {
    this.x=200;
    this.y = $.H-400;
    this.width = 30;
    this.height = 30;
	this.ledge = 20;
    this.velocityY = -10;
    this.velocityX = 12;
    this.maxJumpHeight = 40;
    this.weight = 4;
    this.jumps = 0;
    this.maxJumps = 1;
	this.color=$.colors[Math.floor(Math.random()*3)];
}

$.player.prototype.update = function(){
	var collide = this.checkCollision();
	
	if(collide.hit==true && this.velocityY<=0){//on a platform
	    this.jumps = 0;
	    this.velocityY = 0;
		this.y = collide.e.y - this.height;
		if(collide.e.color==this.color){
			
			this.height -= .2;
		}
	}
	else{//not on a platform, possibly jumping or falling
		if (this.velocityY==0){ //falling, should drop quickly
			this.velocityY = -10; 
		}
	}
	
    if (this.velocityY > 0 ) //if it has velocity, it should decrease over time
    {
        this.velocityY -= this.weight;
    }
	
    if ($.mouse.leftDown  && this.jumps<this.maxJumps) {
        this.jump();
    }
	
    if ($.keys.space) {
    	this.changeColor();
    }
  
	$.effects.push(new $.particles(this.x, (this.y+this.height-2),0,this.y+1, {r:0,g:0,b:0}));
	this.y -= this.velocityY;
	

}

$.player.prototype.alive = function(){
    if(this.y > $.H+(this.height*4))
    {
  	 	return false;
    }
	else if(this.height <= 0) 
	{
		return false;
	}
	return true;
}
//this.y >= $.platforms[i].y-(this.height+20) && this.y <= ($.platforms[i].y-this.height) + this.ledge){
$.player.prototype.checkCollision = function(){
	var i = $.platforms.length; while(i--){  
		if( this.x >= $.platforms[i].x && this.x <= $.platforms[i].x + $.platforms[i].width && 
			this.y >= $.platforms[i].y-(this.height+1) && this.y <= ($.platforms[i].y-this.height) + this.ledge){
	   	 	return {hit: true, e: $.platforms[i]};
		}
	}
	return {hit: false, y:0};
}

$.player.prototype.jump = function () {
    this.jumps += 1;
	this.velocityY = this.maxJumpHeight;
	$.mouse.leftDown = 0;
}

$.player.prototype.changeColor = function () {
	 this.color = $.colors[Math.floor(Math.random()*3)];
	$.keys.space = 0;
}

$.player.prototype.render = function(){
	$.mainctx.beginPath();
    $.mainctx.fillStyle = 'rgba('+this.color.r+','+ this.color.g +','+ this.color.b +',1.0)';
	$.mainctx.shadowBlur    = 20;
	$.mainctx.shadowColor   = 'rgba(0, 0, 0, 0.0)';
	$.mainctx.lineWidth="2";
   // $.mainctx.fillRect(this.x, this.y, this.width, this.height);
	$.mainctx.rect(this.x, this.y, this.width, this.height);
	$.mainctx.stroke();
	$.mainctx.fill();
}