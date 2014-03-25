(function(){

const BRUSHES = ["ribbon"], USER_AGENT = navigator.userAgent.toLowerCase();
var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
var BRUSH_SIZE = 1, BRUSH_PRESSURE = 1, COLOR = [0, 0, 0], mouseX = 0, mouseY = 0;
var brush, saveTimeOut, wacom, i, container, canvas, context;

var ribbon = function( context )
{
	this.init( context );
}

ribbon.prototype = {
	context: null,
	mouseX: null, mouseY: null,

	painters: null,

	interval: null,

	init: function( context )
	{
		var scope = this;

		this.context = context;
		this.context.globalCompositeOperation = 'source-over';

		this.mouseX = SCREEN_WIDTH / 2;
		this.mouseY = SCREEN_HEIGHT / 2;

		this.painters = new Array();

		for (var i = 0; i < 20; i++)
		{
			this.painters.push({ dx: SCREEN_WIDTH / 2, dy: SCREEN_HEIGHT / 2, ax: 0, ay: 0, div: 0.1, ease: Math.random() * 0.2 + 0.6 });
		}

		this.interval = setInterval( function(){scope.update()}, 20 );


	},
	update : function()
	{
		var i;

		for (i = 0, j=this.painters.length; i < j; i++)
		{
			this.context.beginPath();
			this.context.moveTo(this.painters[i].dx, this.painters[i].dy);

			this.painters[i].dx -= this.painters[i].ax = (this.painters[i].ax + (this.painters[i].dx - this.mouseX) * this.painters[i].div) * this.painters[i].ease;
			this.painters[i].dy -= this.painters[i].ay = (this.painters[i].ay + (this.painters[i].dy - this.mouseY) * this.painters[i].div) * this.painters[i].ease;
			this.context.lineTo(this.painters[i].dx, this.painters[i].dy);
			this.context.stroke();
		}
	},
	destroy: function()
	{
		clearInterval(this.interval);
	},

	strokeStart: function( mouseX, mouseY )
	{
		this.mouseX = mouseX;
		this.mouseY = mouseY

		for (var i = 0, j=this.painters.length; i < j; i++)
		{
			this.painters[i].dx = mouseX;
			this.painters[i].dy = mouseY;
		}

		this.shouldDraw = true;
	},

	stroke: function( mouseX, mouseY )
	{
		this.mouseX = mouseX;
		this.mouseY = mouseY;
	},

	strokeEnd: function()
	{

	}
}

//harmony();
//function harmony()
//{

	if (USER_AGENT.search("android") > -1 || USER_AGENT.search("iphone") > -1)
		BRUSH_SIZE = 2;

	document.body.style.backgroundRepeat = 'no-repeat';
	document.body.style.backgroundPosition = 'center center';
	container = document.createElement('div');
	container.id = "harmonyDiv";
	document.body.appendChild(container);
	canvas = document.createElement("canvas");
	canvas.width = SCREEN_WIDTH;
	canvas.height = SCREEN_HEIGHT;
	canvas.style.cursor = 'crosshair';
	container.appendChild(canvas);
	container = null;

	if (!canvas.getContext) return;
	context = canvas.getContext("2d");

	context.lineWidth = BRUSH_SIZE;
	context.strokeStyle = "rgba(" + COLOR[0] + ", " + COLOR[1] + ", " + COLOR[2] + ", " + 0.1 * BRUSH_PRESSURE + ")";

	if (!brush)
		brush = new ribbon(context);

	window.addEventListener('mousemove', onWindowMouseMove, false);
	window.addEventListener('resize', onWindowResize, false);
	window.addEventListener('keydown', onWindowKeyDown, false);
	document.addEventListener('mouseout', onDocumentMouseOut, false);
	canvas.addEventListener('mousemove', onCanvasMouseMove, false);
	canvas.addEventListener('touchstart', onCanvasTouchStart, false);

	onWindowResize(null);
//}
function onWindowMouseMove( event )
{
	mouseX = event.clientX;
	mouseY = event.clientY;
}

function onWindowResize()
{
	SCREEN_WIDTH = window.innerWidth;
	SCREEN_HEIGHT = window.innerHeight;
}

function onWindowKeyDown( event )
{
	if(event.keyCode===27){
		context.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
		brush.destroy();
		brush = new ribbon(context);
	}
}

function onDocumentMouseOut( event )
{
	onCanvasMouseUp();
}

function onCanvasMouseMove( event )
{
	brush.stroke( event.clientX, event.clientY );
}

function onCanvasMouseUp()
{
	brush.strokeEnd();
	window.removeEventListener('mousemove', onCanvasMouseMove, false);
	window.removeEventListener('mouseup', onCanvasMouseUp, false);
}
function onCanvasTouchStart( event )
{
	if(event.touches.length == 1)
	{
		event.preventDefault();

		brush.strokeStart( event.touches[0].pageX, event.touches[0].pageY );

		window.addEventListener('touchmove', onCanvasTouchMove, false);
		window.addEventListener('touchend', onCanvasTouchEnd, false);
	}
}

function onCanvasTouchMove( event )
{
	if(event.touches.length == 1)
	{
		event.preventDefault();
		brush.stroke( event.touches[0].pageX, event.touches[0].pageY );
	}
}

function onCanvasTouchEnd( event )
{
	if(event.touches.length == 0)
	{
		event.preventDefault();
		brush.strokeEnd();
		window.removeEventListener('touchmove', onCanvasTouchMove, false);
		window.removeEventListener('touchend', onCanvasTouchEnd, false);
	}
}

})();