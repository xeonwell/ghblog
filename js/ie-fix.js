$(function(){
	document.execCommand('BackgroundImageCache', false, true);//open background-image caching for IE6
	if($(document.body).width()<850) $("#searchDiv").fadeOut("slow");
	$(window).resize(function(){
		$("#searchDiv").toggle($(document.body).width()>850);
	});
});