'use strict';
// Abandon all hope ye who enter here
$(document).ready(function() {
  
  var navigating = false,
      curPage = 1,
      pages = $(".section").length,
      $sections = $(".sections"),
      $paginationPage = $(".pagination .page"),
      $paginationTotal = $(".total-pages"),
      $textStuff = $(".box, .texts, .linea"),
	  $names = $(".section-heading, .additional-text");
  
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
    setTimeout(function() {
      navigating = false;
      randomDelay();
    }, time);
    setTimeout(function() {
      // cached selector not working because of newely created clone when moving up more then 2 positions
      $(".box, .texts, .linea").css({"margin-top": 0 - (parseInt($(".nav-elem.active").attr("data-page")) - 1) * 100 + "vh"}).hide();
    }, 520);
    setTimeout(function() {
      $textStuff.show();
      $textStuff.css("top");
      $names.removeClass("not-visible");
    }, time + 20);
  }
  
  function magicStuff(paramPage) {
    if (paramPage) curPage = paramPage;
    navigating = true;
    var calculatedMargin = 13 - (curPage - 1) * 100;
    $(".bg-part, .left-part").css("margin-top", calculatedMargin +"vh"); 
  }
  
  function trickyStuff(page) {
    $(".left-part, .bg-part").css({"transition-duration": "1s", "transition-delay": "1.5s"});
    $(".main").css("top");
    magicStuff(page);
    $(".main").css("top");
    $(".left-part, .bg-part").css("transition-duration", "1s");
    randomDelay();
  }
  
  function pagination(pg) {
    $(".nav-elem").removeClass("active");
    $(".nav-" + pg).addClass("active");
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
  
  $(document).on("click", ".nav-elem:not(.active)", function() {
    if (navigating) return;
    var activePage = parseInt($(".nav-elem.active").attr("data-page"), 10),
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
      }, 1000);
    } else {
      magicStuff(futurePage);
      timeoutNav();
    }
  });
  
  $(window).resize(function() {
    maxScroll = $navEl.length * $navEl.height() - $(window).height();
    $sidebar.css("transform", "translateY(0)");
  });
  
});