/**
 * Author: admin@xw81.com
 */
$(function(){
	if ($("pre[class^='brush']").size() > 0){
		$.getScript("/Js/syntaxhighlighter/shCore.js",function(){
			$.getScript("/Js/syntaxhighlighter/shBrush.js",function(){
				SyntaxHighlighter.config.clipboardSwf = '/Js/syntaxhighlighter/clipboard.swf';
				SyntaxHighlighter.config.bloggerMode = true;
				SyntaxHighlighter.highlight();
			});
		});
	}
});