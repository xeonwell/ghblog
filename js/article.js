/**
 * Author:  admin@xw.hb.cn
 */
$(function(){
	if ($("pre[class^='brush']").size() > 0){
		$.getScript("/js/syntaxhighlighter/shCore.js",function(){
			$.getScript("/js/syntaxhighlighter/shBrush.js",function(){
				SyntaxHighlighter.config.bloggerMode = true;
				SyntaxHighlighter.highlight();
			});
		});
	}
});