
//need death animation
//save best score
//slide death message from left?
//directions
//change to translate
//sound 
window.requestAnimFrame = (function(){
    return window.requestAnimationFrame ||
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame ||
           function(callback){
               setInterval(callback, 1000/60);
           };
})();


$.setup = function() {
    $.main = document.getElementById('main');
	$.bmain = document.getElementById('bmain');
	$.bg1 = document.getElementById('bg1');
    $.mainctx = $.main.getContext('2d');
	$.bmainctx = $.bmain.getContext('2d');
    $.main.width = window.innerWidth;
    $.main.height = window.innerHeight;
    $.bmain.width = window.innerWidth;
    $.bmain.height = window.innerHeight;
    $.bg1.width = window.innerWidth;
    $.bg1.height = window.innerHeight;
    $.W = window.innerWidth;
    $.H = window.innerHeight;
	$.setfps = 30;

	var ua = navigator.userAgent.toLowerCase();
	var ios = ua.indexOf('ipod') >= 0 || ua.indexOf('ipad') >= 0 || ua.indexOf('iphone') >= 0;
	var android = ua.indexOf('android') >= 0;
	var ffos = ua.indexOf('firefox') >= 0 && ua.indexOf('mobile') >= 0;
	$.mobile = ios || android || ffos;


	window.addEventListener('touchstart',$.touchstart);
	window.addEventListener('touchmove',$.touchMove );
	window.addEventListener('touchend',$.touchend );
    window.addEventListener('mousedown', $.mousedown);
    window.addEventListener('mouseup', $.mouseup);
	window.addEventListener( 'keydown', $.keydown );
	window.addEventListener( 'keyup', $.keyup );
	
    $.mouse = {
        leftDown: 0
    };
	
	$.keys = {
		space: 0
	};
	
	$.updateDelta();
	
    $.myPlayer = new $.player();
	//$.particleSystem = new $.Emitter(new $.Vector(100,100), new $.Vector(1,1));
	
	$.platformManager = new $.platformGenerator();
    $.platforms = [];
 	$.effects = [];
	
	$.platforms.push( new $.platform(1, $.H-40, 125,100) );
  // $.sounds.play();
}

$.titleScreen = function(){
	$.mainctx.save();
	$.mainctx.fillStyle = 'rgba(20,133,204,1.0)';
	$.mainctx.shadowBlur    = 20;
	$.mainctx.shadowColor   = 'rgba(0, 0, 0, 0.0)';
	$.utils.text("COLOR RUNNER",$.mainctx ,$.W/2-400,$.H/6,12,7);
	$.utils.text($.mobile ? "TAP  TO  PLAY" : "SPACE TO PLAY",$.mainctx ,$.W/2-225,$.H/2,6,7);
	$.mainctx.restore();
}

$.deathScreen = function(){
	$.mainctx.save();
	$.mainctx.fillStyle = 'rgba(255,0,0,1.0)';
	$.mainctx.shadowBlur    = 20;
	$.mainctx.shadowColor   = 'rgba(0, 0, 0, 0.0)';
	$.utils.text("GAME OVER",$.mainctx ,$.W/2-300,$.H/6,12,7);
	$.utils.text("SCORE " + Math.round($.myPlayer.distance),$.mainctx ,$.W/2-170,$.H/3,6,7);
	$.utils.text($.mobile ? "TAP  TO  PLAY" :"SPACE TO PLAY",$.mainctx ,$.W/2-225,$.H/2,6,7);
	$.mainctx.restore();
}

$.newGame = function(){
	$.gameStatus = 'playing';
    $.setup();
}

$.updateDelta = function(){
    var now = Date.now();
    $.dt = (now - $.lt) / (1000/60);
    $.lt = now;
    $.elapsed += $.dt;
}

$.mousedown = function (e) {
    e.preventDefault();
	if(e.which == 1){$.mouse.leftDown = 1;}
};

$.mouseup = function (e) {
    e.preventDefault();
    if(e.which == 1){$.mouse.leftDown = 0;}
};

$.touchstart = function (e) {
    e.preventDefault();
	e = e.touches ? e.touches[e.touches.length - 1] : e;
	if(e.clientX < $.W/2){$.keys.space = 1;}
	else{$.mouse.leftDown = 1;}
};

$.touchmove = function (e) {
    e.preventDefault();
};

$.touchend = function (e) {
    e.preventDefault();
	$.keys.space = 0;
	$.mouse.leftDown = 0;
   // if(e.which == 1){$.mouse.leftDown = 0;}
};

$.keydown = function(e){
	if( e.keyCode === 32 ){ $.keys.space = 1; }
};

$.keyup = function(e){
	if( e.keyCode === 32 ){ $.keys.space = 0; }
};

$.playing = function(){
	$.main.style.marginLeft = '0px';
	$.main.style.marginTop = '0px';
//setTimeout(function() {
	$.myPlayer.update();
	$.platformManager.update();
	var i = $.platforms.length; while(i--){  $.platforms[i].update($.myPlayer.velocityX,i); }
		i = $.effects.length; while(i--){  $.effects[i].update(i); }
	$.mainctx.clearRect(0, 0, $.W, $.H);
	//$.mainctx.fillStyle = 'rgba(255,255,255,1.0)';

	//$.bmainctx.clearRect(0, 0, $.W, $.H);
	i = $.platforms.length; while(i--){  $.platforms[i].render(); }
	i = $.effects.length; while(i--){  $.effects[i].render(); }
	$.myPlayer.render();
}

$.loop = function () {
		requestAnimFrame($.loop);
        $.updateDelta();
		
		if ($.gameStatus == 'title'){
			if($.mouse.leftDown || $.keys.space){$.newGame();};
			$.playing()
			$.titleScreen();
		}
		else if($.gameStatus == 'playing')
		{
			$.playing();
			if(!$.myPlayer.alive()){
				$.gameStatus = 'dead';
			}
		}
		else if ($.gameStatus == 'dead'){
			 $.mainctx.clearRect(0, 0, $.W, $.H);
			 $.deathScreen();
			 if($.mouse.leftDown || $.keys.space){$.newGame();};
 			 var i = $.platforms.length; while(i--){  $.platforms[i].render(); }
 			//i = $.effects.length; while(i--){  $.effects[i].render(); }
		 }
		//},1000/$.setfps);

	
}

window.addEventListener('load', function () {
	$.gameStatus = 'title';
 //	$.sounds = new $.sound();
    $.setup();
	 $.loop();
});