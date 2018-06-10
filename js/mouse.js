var cambio=true;
var $cursor = $('#follower');
 


 $(".text-list").mouseover(function() {
  $( ".up" ).css( "margin-top","-2em");
  $( ".down" ).css( "margin-top","0.5em");
  $( ".linea" ).css( "width","5%");
});

 $(".text-list").mouseout(function() {
  $( ".up" ).css( "margin-top","0.5em" );
  $( ".down" ).css( "margin-top","2em" );
  $( ".linea" ).css( "width","8%");
});


 $(".big").mouseover(function() {
  $cursor.addClass('scale');
	 
	 	 /*cambio=false;
	 var post= $("h3").position();
	   $( "#follower" ).css( {left:post.left, top:post.top} );*/
});
 
	 
$( ".big" ).mouseout(function() {
       $cursor.removeClass('scale');
       cambio=true;
});

 $(window).mousedown(function() {
  $cursor.addClass('is-moving');
});

 $(window).mouseup(function() {
       $cursor.removeClass('is-moving');
	 	
});


// http://ahrengot.com/tutorials/greensock-javascript-animation


function moveCursor(e) {
//  	$cursor.addClass('is-moving');
	TweenLite.to($cursor, 1.2, {
    left: e.pageX-5,
    top: e.pageY-5,
    ease: Power4.easeOut, 
  });
  
  clearTimeout(timer);

   var timer = setTimeout(function() {
	    $cursor.removeClass('is-moving');
   }, 300);
}

$(window).on('mousemove', moveCursor);

/*

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
*/
