var cambio=true;
var $cursor = $('#follower');
 

/*

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
*/


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


var el = document.getElementsByClassName('big')[0];

var options = {
	ease: 0.1,
  	magneticForce: 0.6
};

var mouse = {
	x: 0,
  	y: 0
};

var pos = {
	cx: 0,
  cy: 0,
  tx: 0,
  ty: 0,
  x: 0,
  y: 0
};

var sizes = el.getBoundingClientRect();

observe();
update();

function observe(){
  window.addEventListener('resize', resizeHandler, false);
  el.addEventListener('mousemove', mouseMoveHandler, false);
  el.addEventListener('mouseleave', mouseLeaveHandler, false);
}

function resizeHandler(){
  sizes = el.getBoundingClientRect();
}

function mouseMoveHandler(e){
  //sizes
  
  	mouse.x = e.pageX;
	mouse.y = e.pageY;
  
  // center
  
  pos.cx = sizes.left + ( sizes.width / 2 );
	pos.cy = sizes.top + ( sizes.height / 2 );
  
  // dist
  
	var distX = ( mouse.x - sizes.left ) - ( sizes.width / 2 );
    var distY = ( mouse.y - sizes.top ) - ( sizes.height / 2 );
  
  pos.tx = distX - ( distX * (1 - options.magneticForce) );
  pos.ty = distY - ( distY * (1 - options.magneticForce) );
      
}

function mouseLeaveHandler(e){
  pos.tx = 0;
  pos.ty = 0;
}

function render(){
  
  pos.x += (pos.tx - pos.x) * options.ease;
  pos.y += (pos.ty - pos.y) * options.ease;
  
  var transform2 = 'translateX(' +  pos.x + 'px) translateY(' + pos.y + 'px)';
        
  el.style.webkitTransform = transform2;
  el.style.MozTransform = transform2;
  el.style.msTransform = transform2;
  el.style.OTransform = transform2;
  el.style.transform = transform2;
 

}

function update(){
 	render();
	window.requestAnimationFrame(update);
}


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
