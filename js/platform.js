$.platform = function (x,y,maxsize,minsize,canvas) {
	this.canvas = canvas || $.mainctx;
    this.width=600;
    this.height=(Math.random()*maxsize)+minsize;
    this.x=x;
    this.y=$.H-this.height;
	this.color=$.colors[Math.floor(Math.random()*3)];
}

$.platform.prototype.update = function(velocityX, index){
    this.x -= velocityX*$.dt;
    if (this.x < -this.width) {
        $.platforms.splice(index, 1);
    }
}

$.platform.prototype.render = function(){
    this.canvas.fillStyle = 'rgba('+ this.color.r + ',' + this.color.g + ','+ this.color.b + ',1.0)';
	this.canvas.shadowBlur    = 20;
	this.canvas.shadowColor   = 'rgba(0, 0, 0, 1.0)';
    this.canvas.fillRect(this.x, this.y, this.width, this.height);

}

$.platformGenerator = function () {
    this.maxDrawDistance = $.W*2;
    this.initialDistance = 200;
}

$.platformGenerator.prototype.update = function () {
    var lastPlatform = $.platforms[$.platforms.length-1]
    if (lastPlatform.x + lastPlatform.width < this.maxDrawDistance) {
		//$.platforms.push(new $.platform((lastPlatform.x + this.initialDistance)*2, $.H - 40, 225, 200, $.bmainctx));
        $.platforms.push(new $.platform(lastPlatform.x + lastPlatform.width + this.initialDistance, $.H - 40, 125, 100));
		
    }
}
