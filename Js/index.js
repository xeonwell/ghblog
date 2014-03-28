/**
 * Author: admin@xw.hb.cn
 */
$(function(){
	if($.getCookie("xw_d") !== "true")
		setTimeout(function(){
			$.getScript("/js/syntaxhighlighter/shCore.js",function(){
				var syntaxHL = ["/js/syntaxhighlighter/shBrush.js","/js/syntaxhighlighter/shCore.css","/js/syntaxhighlighter/shThemeDefault.css"];
				while(syntaxHL.length >0)
					$.get(syntaxHL.shift());
				$.setCookie("xw_d","true",30);
			});
		}, 2000);
});