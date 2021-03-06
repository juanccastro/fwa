'use strict';
// Abandon all hope ye who enter here
$(document).ready(function() {
  
  var navigating = false,
      curPage = 1,
      pages = $(".section").length,
      $sections = $(".sections"),
      $scroller = $(".sections #scroller"),
      $paginationPage = $(".pagination .page"),
      $paginationTotal = $(".total-pages"),
      $textStuff = $(".texts, .linea"),
      $lines = $(".linea"),
      $dot = $(".dot"),
 	  $names = $(".section-heading, .additional-text"),
 	  $up = $(".arrow-up"),
 	  $down = $(".arrow-down");
  
  if (pages >= 10) {
    $paginationTotal.text(pages);
  } else {
    $paginationTotal.text("0" + pages);
  }
  
  /*
  Sets random transition-delay for blocks between 0.4 and 1.2 seconds on every call
  */
  function randomDelay() {
   
  }
  
  /* Async hell, with hardcoded numbers.
  On production, 410 number must be .section-heading transform transition time in miliseconds + 10, but i'm sort of tired of this demo :D
  */
	
  function timeoutNav(t) {
    var time = t || 1500;
    $names.addClass("not-visible");
    $lines.addClass("not-visible");
    setTimeout(function() {
      navigating = false;
      randomDelay();
    }, time);
    setTimeout(function() {
      // cached selector not working because of newely created clone when moving up more then 2 positions
      $(".texts, .linea").css({"margin-top": 0 - (parseInt($(".nav-elem.active").attr("data-page")) - 1) * 100 + "vh"}).hide();
    }, 900);
    setTimeout(function() {
      $textStuff.show();
      $textStuff.css("top");
      $names.removeClass("not-visible");
      $lines.removeClass("not-visible");
    }, time + 10);
  }
  
  function magicStuff(paramPage) {
    if (paramPage) curPage = paramPage;
    navigating = true;
    var calculatedMargin = 18 - (curPage - 1) * 100;
    $(".bg-part, .left-part").css("margin-top", calculatedMargin +"vh"); 
	
	var calculatedMargin = 0 - (curPage - 1) * 100;
    $(".color").css("margin-top", calculatedMargin +"vh"); 
	  
	  if(curPage == 1){
		  $scroller.css("margin-top", "0px"); 
  	  } 
	  if(curPage == 2){
		  $scroller.css("margin-top", "-700px");
 	  }
	  if(curPage == 3){
		  $scroller.css("margin-top", "-1400px"); 
	  }
	  if(curPage == 4){
		  $scroller.css("margin-top", "-2100px"); 
	  }
	  if(curPage == 5){
		  $scroller.css("margin-top", "-2800px"); 
	  }
	  
  }
  
  function trickyStuff(page) {
    $(".left-part, .bg-part, .color").css({"transition-duration": "1.3s", "transition-delay": "1s"});
    $(".main").css("top");
    magicStuff(page);
    $(".main").css("top");
    $(".left-part, .bg-part, .color").css("transition-duration", "1s");
    randomDelay();
  }
  
  function pagination(pg) {
    $(".nav-elem").removeClass("active");
    $(".cont-dot").removeClass("dot-active");
    $(".tit").removeClass("li-active");
    $(".nav-" + pg).addClass("active");
    $(".dot-" + pg).addClass("dot-active");
    $(".tit-" + pg).addClass("li-active");
    curPage = pg;
    
    if (pages >= 10) {
      $paginationPage.text(pg);
    } else {
      $paginationPage.text("0" + pg);
    }
  }
  
  function navigateUp() {
    if (curPage > 1) {
      curPage--;
      pagination(curPage);
      magicStuff();
      timeoutNav();
    }
  }
  
  function navigateDown() {
    if (curPage < pages) {
      curPage++;
      pagination(curPage);
      magicStuff();
      timeoutNav();
    }
  }
  
  $(document).on("mousewheel DOMMouseScroll", function(e) {
    if (!navigating) {
      if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
        navigateUp();
      } else { 
        navigateDown();
      }
    }
  });
    
  
  $(document).on("mousewheel DOMMouseScroll",
                 ".sidebar-hover, .sidebar-real",
                 function(e) {
    e.stopPropagation();
  });
  
  var sidebarScroll = 0,
      $navEl =  $(".nav-elem"),
      $sidebar = $(".sidebar-real"),
      maxScroll = $navEl.length * $navEl.height() - $(window).height();
  
  $(document).on("mousewheel DOMMouseScroll", ".sidebar-real", function(e) {
    if (navigating) return;
    if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
      if (!sidebarScroll) return;
      sidebarScroll += 100;
      if (sidebarScroll > 0) sidebarScroll = 0;
    } else { 
      if (Math.abs(sidebarScroll) === maxScroll) return;
      sidebarScroll -= 100;
      if (Math.abs(sidebarScroll) > maxScroll) sidebarScroll = 0 - maxScroll;
    }
    $sidebar.css("transform", "translateY("+ sidebarScroll +"px)");
  });
  
  $down.on("click" , function() {
         navigateDown();
  });
  
  $up.on("click" , function() {
         navigateUp();
  });
	
	
	$(document).on("click", ".cont-dot:not(.active)", function() {
    var activePage = parseInt($(".cont-dot.active").attr("data-page"), 10),
        futurePage = $(this).attr("data-page");
    
    pagination(futurePage);
    
    if (Math.abs(activePage - futurePage) > 2) {
      var $fakePage = $(".section-" + futurePage).clone(),
          $currentPage = $(".section-" + activePage),
          fakeNumber = 0;
      // ugly code, do not enter here
      if (activePage < futurePage) {
        // moving down
        $currentPage.after($fakePage);
        fakeNumber = activePage + 1;
        $(".main").css("top");
        randomDelay();
        magicStuff(fakeNumber);
      } else {
        // moving up (real hell)
        $currentPage.before($fakePage);
        fakeNumber = activePage - 1;
        trickyStuff(activePage + 1);
        $(".main").css("top");
        randomDelay();
        $(".main").css("top");
        magicStuff(activePage);
      }
      timeoutNav(2050);
      setTimeout(function() {
        $fakePage.remove();
        trickyStuff(futurePage);
      }, 2000);
    } else {
      magicStuff(futurePage);
      timeoutNav();
    }
  });
	
	
	/*
  
  	var i = 0, timeOut = 0;
  
  $('.main').on('mousedown touchstart', function(e) {
	$(".sections #scroller li").css("height", "200px"); 
	$(".sections #scroller li").css("opacity", 1); 
    timeOut = setInterval(function(){
      console.log(i++);
    }, 100);
  }).bind('mouseup mouseleave touchend', function() {
    $scroller.removeClass('li-active');
    $(".sections #scroller li").css("height", "700px"); 
	$(".sections #scroller li").css("opacity", 0); 
    clearInterval(timeOut);
  });
*/
  
  $(window).resize(function() {
    maxScroll = $navEl.length * $navEl.height() - $(window).height();
    $sidebar.css("transform", "translateY(0)");
  });
  
});