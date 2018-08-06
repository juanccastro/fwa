var noise;
function generateNoise(selector, opacity, w, h, sx,sy, offset, colors) {
   if ( !!!document.createElement('canvas').getContext ) {
      return false;
   }
 
   var canvas = document.createElement("canvas"),
   ctx = canvas.getContext('2d'),
   x, y,
   number,
	 hexAlpha,
   opacity = opacity;
	 sx = sx || 1;
	 sy = sy || 1;
	 offset = offset || 0;
 	 colors = colors || [];
   canvas.width = w || 100;
   canvas.height = h || 100;
   for ( x = 0; x < canvas.width; x+=sx+offset ) {
      for ( y = 0; y < canvas.height; y+=sy+offset ) {
				 if(colors.length>1){
					 number = Math.floor( Math.random() * colors.length);
					 hexAlpha = (Math.round(255*opacity)).toString(16);
					 hexAlpha = hexAlpha.length==1? "0"+hexAlpha : hexAlpha
					 ctx.fillStyle = colors[number]+hexAlpha;
				 }else{
					 number = Math.floor( Math.random() * 60 );
         	 ctx.fillStyle = "rgba(" + number + "," + number + "," + number + "," + opacity + ")";
				 }
         ctx.fillRect(x, y, sx, sy);
      }
   }
	 var divs= document.querySelectorAll(selector);
	 divs.forEach(ele => {
		 ele.style.backgroundImage = "url(" + canvas.toDataURL("image/png") + ")";
	 })
}

function addNoise(params){
	generateNoise.apply(generateNoise,params);
	return requestAnimationFrame(()=>{
		addNoise(params);
	})
}
//addNoise('.noise', 0.5);
var a = addNoise(['.noise',0.3])
 