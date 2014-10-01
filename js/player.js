$.player = function () {
    this.x=200;
    this.y = $.H-600;
    this.width = 30;
    this.height = 30;
    this.oWidth = this.width;
    this.oHeight = this.height;
    this.velocityY = -10;
    this.velocityX = 15;
    this.maxJumpHeight = 15;
    this.weight = 1;
    this.jumps = 0;
    this.maxJumps = 1;
	this.color=$.colors[Math.floor(Math.random()*3)];
}

$.player.prototype.update = function(){
	this.velocityY = (this.velocityY - (this.weight*$.dt));
	this.checkCollision();

    if ($.mouse.leftDown) {
        this.jump();
    }
	
    if ($.keys.space) {
    	this.changeColor();
    }
  
	$.effects.push(new $.particles(this.x, (this.y-3),0,this.y+1, {r:Math.round(Math.random()*255),g:Math.round(Math.random()*255),b:Math.round(Math.random()*255)}));
	
	this.y -= this.velocityY*$.dt;
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

$.player.prototype.checkCollision = function(){
	var i = $.platforms.length; while(i--){  
		if($.utils.RectOnTopRect( this.x+this.oWidth, (this.y)+Math.max(0,((this.velocityY*$.dt)*-1)),this.oWidth,Math.max(this.oHeight,(this.velocityY*$.dt)*-1),$.platforms[i].x,$.platforms[i].y,$.platforms[i].width,$.platforms[i].height  )){
	
			if(this.velocityY<=0){//on a platform
			    this.jumps = 0;
			    this.velocityY = 0;
				this.y = $.platforms[i].y; //- (this.height);
				if($.platforms[i].color==this.color){
					this.height -= .2*$.dt;
				}
			}
			
		}
	}
}

$.player.prototype.jump = function () {
	if(this.jumps<this.maxJumps){
		var maxJump = this.maxJumpHeight;//*$.dt;
    	this.jumps += 1;
		this.velocityY = maxJump;
		$.mouse.leftDown = 0;
	}
}

$.player.prototype.changeColor = function () {
	var currentColor = $.colors.indexOf(this.color);
	var nextColor = currentColor + 1 > $.colors.length-1 ? 0 : currentColor+1;
	this.color = $.colors[nextColor];
	$.keys.space = 0;
}

$.player.prototype.render = function(){
	$.mainctx.beginPath();
    $.mainctx.fillStyle = 'rgba('+this.color.r+','+ this.color.g +','+ this.color.b +',1.0)';
	$.mainctx.shadowBlur    = 20;
	$.mainctx.shadowColor   = 'rgba(0, 0, 0, 0.0)';
	$.mainctx.lineWidth="2";
   // $.mainctx.fillRect(this.x, this.y, this.width, this.height);
	$.mainctx.rect(this.x, this.y, this.width, -this.height);
	$.mainctx.stroke();
	$.mainctx.fill();
}