/**
 * Author: admin@xw.hb.cn
 */
$(function(){
	if($.getCookie("xw_d") !== "true")
		setTimeout(function(){
			$.getScript("/Js/syntaxhighlighter/shCore.js",function(){
				var syntaxHL = ["/Js/syntaxhighlighter/shBrush.js","/Js/syntaxhighlighter/shCore.css","/Js/syntaxhighlighter/shThemeDefault.css"];
				while(syntaxHL.length >0)
					$.get(syntaxHL.shift());
				$.setCookie("xw_d","true",30);
			});
		}, 2000);
});