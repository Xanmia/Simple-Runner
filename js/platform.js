$.platform = function (x,y,maxsize,minsize,canvas) {
	this.canvas = null; //canvas || $.mainctx;
    this.width=800;
    this.height=(Math.random()*maxsize)+minsize;//this is wrong but works...
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
    $.mainctx.fillStyle = 'rgba('+ this.color.r + ',' + this.color.g + ','+ this.color.b + ',1.0)';
	//$.mainctx.strokeStyle = 'rgb(0,255,255)';
	//$.mainctx.lineWidth = 10;
	$.mainctx.shadowBlur    = 20;
	$.mainctx.shadowColor   = 'rgba(0, 0, 0, 0.0)';
	$.mainctx.beginPath();
    $.mainctx.rect(this.x, this.y, this.width, this.height);
	//$.mainctx.stroke();
	$.mainctx.fill();
	$.mainctx.closePath();
	
	/*$.mainctx.beginPath();
	//$.mainctx.rect(this.x,this.y-15,this.width,30)
	$.mainctx.moveTo(this.x, this.y+50);
	$.mainctx.lineTo(this.x-50, this.y+30);
	$.mainctx.lineTo(this.x-50+(this.width-50), this.y+30);
	$.mainctx.lineTo(this.x+(this.width), this.y+50);
	$.mainctx.lineTo(this.x, this.y+50);
	$.mainctx.stroke();
	$.mainctx.fill();
	$.mainctx.closePath();
	*/

}

$.platformGenerator = function () {
    this.maxDrawDistance = $.W*2;
    this.initialDistance = 300;
}

$.platformGenerator.prototype.update = function () {
	//if($.myPlayer.distance>100){
	//	this.initialDistance = 500;
	//}
    var lastPlatform = $.platforms[$.platforms.length-1]
    if (lastPlatform.x + lastPlatform.width < this.maxDrawDistance) {
		//$.platforms.push(new $.platform((lastPlatform.x + this.initialDistance)*2, $.H - 40, 225, 200, $.bmainctx));
        $.platforms.push(new $.platform(lastPlatform.x + lastPlatform.width + this.initialDistance, $.H - 40, 125, 100));
		
    }
}
