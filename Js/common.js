/**
 * @author:XeonWell
 * @email: admin@xw81.com
 */
(function(undefined){
	var rc = function(obj) {
		var win = window.open('', "_blank", '');
		win.document.open('text/html', 'replace');
		win.opener = null;
		win.document.write(obj.value);
		win.document.close();
	};
	$.fn.extend({
		runCode : function(){
			return this.each(function(){
				var t = this;
				$("<input type='button' value=' RunCode ' class='btn' />").click(function(){rc(t);}).insertAfter(t).wrap("<p />");
			});
		}
	});

	$.extend({
		formatStr : function(){
			var s = Array.prototype.shift.call(arguments);
			for (var i=0; i<arguments.length; i++)
				s = s.replace("{" + (i) + "}", arguments[i]);
			return s;
		},
		setCookie : function (){
			var name = arguments[0], value = escape(arguments[1]), days = arguments[2] === undefined ? 365 : arguments[2], path = arguments[3] === undefined ? "/" : arguments[3];
			with(new Date()){
				setDate(getDate()+days);
				days=toUTCString();
			}
			document.cookie = $.formatStr("{0}={1};expires={2};path={3}", name, value, days, path);
		},
		getCookie : function (){
			var returnValue=document.cookie.match(new RegExp("[\b\^;]?" + arguments[0] + "=([^;]*)(?=;|\b|$)","i"));
			return returnValue?unescape(returnValue[1]):returnValue;
		},
		deleteCookie : function (){
			document.cookie = arguments[0] + "=1 ; expires=Fri, 31 Dec 1999 23:59:59 GMT;";
		}
	});

	$(function(){
		var options = [], def="easeOutBounce", t=500;
		var cw = $("#centerWrapper"), lw = $("#leftWrapper"), rw = $("#rightWrapper"), hd = $("#header"), ft = $("#footer");
		if (cw.height() < lw.height())
			lw.find("ul.ellipsis").slideUp({duration:t,easing:def});
		cw.find("textarea.runCode").runCode();
		var exlink = location.protocol + "//" + location.host;
		ft.find("a").add(cw.find("div.artContent a:not(:has(img))")).add(lw.find(">div.links a")).each(function(){
			if (this.href.indexOf(exlink) !== 0) this.target="_blank";
		}).end().filter(function(){return this.href.indexOf(exlink) !== 0;}).addClass("extenalLink");
//		$.each($.easing, function(name){
//            if (name !== "def" && typeof this === "function")
//                options.push(name);
//		});
//		$("<select/>")
//			.append("<option>" + options.join("</option><option>") + "</option>")
//			.prependTo("#changeDiv")
//			.change(function(){
//				def = $(this).val();
//			});
		lw.find("h3").click(function(){
			$(this).next().slideToggle({duration:t,easing:def});
		});
		$("#searchForm").submit(function(){
			return $("#searchStr").val()!="" || !!(alert("\u641c\u7d22\u5b57\u7b26\u4e32\u4e0d\u80fd\u4e3a\u7a7a!") & $("#searchStr").focus() & 0);
		});
		$("#searchDiv input.search").focus(function(){this.blur();}); // remove dash border when click

		$("#hideAbs").click(function(){toggleAbs.call(this, false);});
		$("#showAbs").click(function(){toggleAbs.call(this, true);});

		var toggleAbs = function(isShow){
			$("#dmList").animate({marginTop: isShow? 0 : -24},{duration:t,easing:def});
			cw.find("li>div.artContent").slideToggle({duration:t,easing:def});
		};

		if ($.browser.webkit)
			$.getScript("/Js/harmony.js",function(){
				$("<div/>").css("height","666px").css("text-align","center").append("<p>&nbsp;</p><p>&#x7559;&#x4E2A;&#x4F4D;&#x7F6E;&#x597D;&#x753B;&#x753B;, ESC&#x952E;&#x91CD;&#x65B0;&#x5F00;&#x59CB; </p>").appendTo(document.body);
			});
	});
})();
