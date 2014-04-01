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

		lw.find("h3").click(function(){
			$(this).next().slideToggle({duration:t,easing:def});
		});

		$("#hideAbs").click(function(){toggleAbs.call(this, false);});
		$("#showAbs").click(function(){toggleAbs.call(this, true);});

		var toggleAbs = function(isShow){
			$("#dmList").animate({marginTop: isShow? 0 : -24},{duration:t,easing:def});
			cw.find("li>div.artContent").slideToggle({duration:t,easing:def});
		};

	});
})();
