$.particles = function(X,Y, targetX, targetY,color){
	this.x = X;
	this.y = Y;
	this.velocity=5;
	this.fallVelocity=.01;
	
	this.life = 50;
	this.lifeTick = 0;
	
	this.peices = [];
	this.color = color;
	
	
	var dx = this.x - targetX,
		dy = this.y - targetY;
	var direction = Math.atan2( dx, dy );
			
    for(i=0;i<2*$.dt;i++){
		this.peices.push({x: this.x, 
						  y: this.y, 
						  dir: (Math.random()* (direction - (direction-.4))) + (direction-.4),
						  vel: (Math.random()*this.velocity)+1,
						  size:  Math.random()*7,
						  opacity: (((Math.random()*10)+1)*0.5)
					  });
    }
	
};

$.particles.prototype.update = function(i) {
	x = this.peices.length; while(x--){
	    this.peices[x].x += Math.sin( (Math.PI) + this.peices[x].dir) * (this.peices[x].vel*$.dt);
		this.peices[x].y += Math.cos( (Math.PI) + this.peices[x].dir) * (this.peices[x].vel*$.dt)+this.fallVelocity;
		//this.fallVelocity += .0075;
	};

	this.lifeTick += $.dt;
	if (this.lifeTick > this.life){
		$.effects.splice(i,1);
	}
};

$.particles.prototype.render = function() {
	i = this.peices.length; while(i--){
	    $.mainctx.fillStyle = "rgba("+ this.color.r + ","+ this.color.g +"," + this.color.b + ", "+ this.peices[i].opacity * (.9-(this.lifeTick/this.life)) + ")";
		//$.mainctx.shadowBlur    = 20;
		//$.mainctx.shadowColor   = 'rgba(0, 0, 0, 1.0)';
	    $.mainctx.fillRect(this.peices[i].x,this.peices[i].y,this.peices[i].size,this.peices[i].size);

	};
};