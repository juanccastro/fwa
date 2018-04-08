var cambio=true;


 $("h3").mouseover(function() {
  $( "#follower" ).css( "transform","scale(1.8)" );
	 	 /*cambio=false;
	 var post= $("h3").position();
	   $( "#follower" ).css( {left:post.left, top:post.top} );*/
});

	
$( "h3" ).mouseout(function() {
  $( "#follower" ).css( "transform","scale(1)" );
		 cambio=true;
});

 $(window).mousedown(function() {
  $( "#follower" ).css( "transform","scale(0.7)" );
});

 $(window).mouseup(function() {
  $( "#follower" ).css( "transform","scale(1)" );
	 	
});


var mouseX = 0, mouseY = 0;
$(window).mousemove(function(e){
   mouseX = Math.min(e.pageX);
   mouseY = Math.min(e.pageY);
});

// cache the selector
var follower = $("#follower");
//var pointer = $("#pointer");
var xp = 0, yp = 0;
var loop = setInterval(function(){
    // change 12 to alter damping higher is slower
    xp += (mouseX-20 - xp) / 6;
    yp += (mouseY-20 - yp) / 6;
		if(cambio){
    follower.css({left:xp, top:yp});
				}

//     pointer.css({left:mouseX-2, top:mouseY+2});
}, 30);
