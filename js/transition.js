$("nav a").on("click", function(event){
	
	event.preventDefault();
	
	const href = $(this).attr("href");
	
	window.history.pushState(null, null, href);
	
	$.ajax({
		url: href,
		success:function(data){
			$(".main").fadeOut(250, function(){
				const newPage= $(data).filter(".about-main").html();
				
				$("section").html(newPage);
				
				$(".about-main").fadeIn(250);
			});
		}
	});
	
})