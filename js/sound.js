$.sound = function(){
	this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
	this.sampleRate = this.audioContext.sampleRate;
	this.seconds = 0.0;
	this.scriptProcessor = this.audioContext.createScriptProcessor( 2048, 1, 1 );
	this.bufferSize = this.scriptProcessor.bufferSize;
	this.toneChange = 10;
	this.value = "var q=1-(t*2.15)%1,s=sin,p=pow;\nreturn s(24*p(q,24))*.9+3*s(p((q*4)%1,5)*3)*min(.1,max(-.1,(6+s(t*.5)*3)*s(40*(1+q)*s(690+q*" + this.toneChange + "))));";
	//var f = function (t) { return this.value };
	
	this.scriptProcessor.onaudioprocess = function ( event )
	{
	 var f=new Function('t',"with(Math){"+$.sounds.value+"}");
	  var data = event.outputBuffer.getChannelData( 0 );
	  for( var i = 0 ; i < $.sounds.bufferSize ; ++i )
	    data[i] = f( $.sounds.seconds += 1.0 / $.sounds.sampleRate );
	};
	
	
	//this.compile();
	//scriptProcessor.connect( audioContext.destination );
};

$.sound.prototype.play = function(){
	 this.scriptProcessor.connect( this.audioContext.destination );
}


$.sound.prototype.updateSound = function(change){
	this.toneChange = change;
	this.value = "var q=1-(t*2.15)%1,s=sin,p=pow;\nreturn s(24*p(q,24))*.9+3*s(p((q*4)%1,5)*3)*min(.1,max(-.1,(6+s(t*.5)*3)*s(40*(1+q)*s(690+q*" + this.toneChange + "))));";
	
}
/*
var isPlaying = false;
function togglePlayback()
{
  if( isPlaying )
  {
    scriptProcessor.disconnect( audioContext.destination );
    isPlaying = false;
    b.value = "PLAY";
  }
  else
  {
    seconds = 0.0;
   
    isPlaying = true;
    b.value = "STOP";
  }
}
*/

$.sound.prototype.compile = function()
{
  try{this.f=new Function('t',"with(Math){"+this.value+"}");}
  catch(e){null;}
}

//e.value="var q=1-(t*2.15)%1,s=sin,p=pow;\nreturn s(24*p(q,24))*.9+3*s(p((q*4)%1,5)*3)*min(.1,max(-.1,(6+s(t*.5)*3)*s(40*(1+q)*s(690+q*3))));";
//e.focus();
//compile();