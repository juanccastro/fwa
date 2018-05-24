var lastPosition = -100;

$(document).ready(function() {
    $('.case-main').height($('.case').height());

    $(window).resize(function() {
        $('.case-main').height($('.case').height());
    });

});

var scroll =  $('.case-main').requestAnimationFrame ||
     $('.case-main').webkitRequestAnimationFrame ||
     $('.case-main').mozRequestAnimationFrame ||
     $('.case-main').msRequestAnimationFrame ||
     $('.case-main').oRequestAnimationFrame ||
    // IE Fallback, you can even fallback to onscroll
    function(callback) {
        $('.case-main').setTimeout(callback, 1000 / 60)
    };

function loop() {

    // Avoid calculations if not needed
    if (lastPosition == $('.case-main').pageYOffset) {
        scroll(loop);
        return false;
    } else lastPosition = $('.case-main').pageYOffset;
    var transform = 'translate3d(0px, -' + lastPosition + 'px, 0px)';
    var smoothScoll = $(".case")[0];
    console.log(transform);

    smoothScoll.style.webkitTransform = transform;
    smoothScoll.style.mozTransform = transform;
    smoothScoll.style.transform = transform;
    
  
    scroll(loop)
}

// Call the loop for the first time
loop();