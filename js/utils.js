$.utils = {};

$.utils.RectInRectHit = function(x1,y1,width1,height1,x2,y2,width2,height2)
{
	if(x1 >= x2 && x1 <= x2 + width2 && 
	   y1 <= y2+height1 && y1 >= y2)
	{
		return true;
	}
}

$.utils.RectOnTopRect = function(x1,y1,width1,height1,x2,y2,width2,height2)
{
	if(x1 >= x2-width1 && x1 <= x2 + width2 && 
	   y1 >= y2 && y1 <= y2+height1)
	{
		return true;
	}
}