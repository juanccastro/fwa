$("nav a").on("click", function(event){
	
	event.preventDefault();
	
	const href = $(this).attr("href");
	
	window.history.pushState(null, null, href);
	
})