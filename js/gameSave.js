
     $.gameLoad = function (){
		this.data = {};
		this.data.best = 0;
 	 	var opt = JSON.parse( localStorage.getItem( 'progress' ) );
 		if (opt == null){
 			localStorage.setItem( 'progress', JSON.stringify(this.data) );
 		}
		else
		{
			this.data.best = opt.best;
		}
	 };
	 
     $.gameLoad.prototype.save = function(score){
		 
		if (this.data.best < score){
			this.data.best = score;
		}
		localStorage.setItem( 'progress', JSON.stringify(this.data) );
	 };