/**
 * Author: admin@xw81.com
 */
$(function(){
	if ($("pre[class^='brush']").size() > 0){
		$.getScript("/js/syntaxhighlighter/shCore.js",function(){
			$.getScript("/js/syntaxhighlighter/shBrush.js",function(){
				SyntaxHighlighter.config.clipboardSwf = '/js/syntaxhighlighter/clipboard.swf';
				SyntaxHighlighter.config.bloggerMode = true;
				SyntaxHighlighter.highlight();
			});
		});
	}
});