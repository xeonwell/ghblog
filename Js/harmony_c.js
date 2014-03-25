function ribbon(context)
{this.init(context);}
ribbon.prototype={context:null,mouseX:null,mouseY:null,painters:null,interval:null,init:function(context)
{var scope=this;this.context=context;this.context.globalCompositeOperation='source-over';this.mouseX=SCREEN_WIDTH/2;this.mouseY=SCREEN_HEIGHT/2;this.painters=new Array();for(var i=0;i<50;i++)
{this.painters.push({dx:SCREEN_WIDTH/2,dy:SCREEN_HEIGHT/2,ax:0,ay:0,div:0.1,ease:Math.random()*0.2+0.6});}
this.interval=setInterval(update,1000/60);function update()
{var i;this.context.lineWidth=BRUSH_SIZE;this.context.strokeStyle="rgba("+COLOR[0]+", "+COLOR[1]+", "+COLOR[2]+", "+0.05*BRUSH_PRESSURE+")";for(i=0;i<scope.painters.length;i++)
{scope.context.beginPath();scope.context.moveTo(scope.painters[i].dx,scope.painters[i].dy);scope.painters[i].dx-=scope.painters[i].ax=(scope.painters[i].ax+(scope.painters[i].dx-scope.mouseX)*scope.painters[i].div)*scope.painters[i].ease;scope.painters[i].dy-=scope.painters[i].ay=(scope.painters[i].ay+(scope.painters[i].dy-scope.mouseY)*scope.painters[i].div)*scope.painters[i].ease;scope.context.lineTo(scope.painters[i].dx,scope.painters[i].dy);scope.context.stroke();}}},destroy:function()
{clearInterval(this.interval);},strokeStart:function(mouseX,mouseY)
{this.mouseX=mouseX;this.mouseY=mouseY
for(var i=0;i<this.painters.length;i++)
{this.painters[i].dx=mouseX;this.painters[i].dy=mouseY;}
this.shouldDraw=true;},stroke:function(mouseX,mouseY)
{this.mouseX=mouseX;this.mouseY=mouseY;},strokeEnd:function()
{}}
const
BRUSHES=["ribbon"],USER_AGENT=navigator.userAgent.toLowerCase();var SCREEN_WIDTH=window.innerWidth,SCREEN_HEIGHT=window.innerHeight,BRUSH_SIZE=1,BRUSH_PRESSURE=1,COLOR=[0,0,0],BACKGROUND_COLOR=[250,250,250],brush,saveTimeOut,wacom,i,mouseX=0,mouseY=0,container,canvas,flattenCanvas,context;harmony();function harmony()
{if(USER_AGENT.search("android")>-1||USER_AGENT.search("iphone")>-1)
BRUSH_SIZE=2;$(document.body).css("background-repeat","no-repeat").css("background-position","center center");container=document.createElement('div');container.id="harmonyDiv";document.body.appendChild(container);canvas=document.createElement("canvas");canvas.width=SCREEN_WIDTH;canvas.height=SCREEN_HEIGHT;canvas.style.cursor='crosshair';container.appendChild(canvas);context=canvas.getContext("2d");flattenCanvas=document.createElement("canvas");flattenCanvas.width=SCREEN_WIDTH;flattenCanvas.height=SCREEN_HEIGHT;if(!brush)
{brush=new ribbon(context);}
$(window).bind("mousemove",onWindowMouseMove);$(window).bind("resize",onWindowResize);$(window).bind("keydown",onWindowKeyDown);$(document).bind("mouseout",onDocumentMouseOut);$(canvas).bind("mousemove",onCanvasMouseMove);$(canvas).bind("touchstart",onCanvasTouchStart);onWindowResize(null);}
function onWindowMouseMove(event)
{mouseX=event.clientX;mouseY=event.clientY;}
function onWindowResize()
{SCREEN_WIDTH=window.innerWidth;SCREEN_HEIGHT=window.innerHeight;}
function onWindowKeyDown(event)
{if(event.keyCode===27){context.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);brush.destroy();brush=new ribbon(context);}}
function onDocumentMouseDown(event)
{if(!isMenuMouseOver)
event.preventDefault();}
function onDocumentMouseOut(event)
{onCanvasMouseUp();}
function onCanvasMouseDown(event)
{var data,position;clearTimeout(saveTimeOut);if(altKeyIsDown)
{flatten();data=flattenCanvas.getContext("2d").getImageData(0,0,flattenCanvas.width,flattenCanvas.height).data;position=(event.clientX+(event.clientY*canvas.width))*4;return;}
BRUSH_PRESSURE=wacom&&wacom.isWacom?wacom.pressure:1;brush.strokeStart(event.clientX,event.clientY);$(window).bind('mousemove',onCanvasMouseMove);$(window).bind('mouseup',onCanvasMouseUp);}
function onCanvasMouseMove(event)
{BRUSH_PRESSURE=wacom&&wacom.isWacom?wacom.pressure:1;brush.stroke(event.clientX,event.clientY);}
function onCanvasMouseUp()
{brush.strokeEnd();$(window).unbind('mousemove',onCanvasMouseMove);$(window).unbind('mouseup',onCanvasMouseUp);}
function onCanvasTouchStart(event)
{if(event.touches.length==1)
{event.preventDefault();brush.strokeStart(event.touches[0].pageX,event.touches[0].pageY);$(window).bind('touchmove',onCanvasTouchMove);$(window).bind('touchend',onCanvasTouchEnd);}}
function onCanvasTouchMove(event)
{if(event.touches.length==1)
{event.preventDefault();brush.stroke(event.touches[0].pageX,event.touches[0].pageY);}}
function onCanvasTouchEnd(event)
{if(event.touches.length==0)
{event.preventDefault();brush.strokeEnd();$(window).unbind('touchmove',onCanvasTouchMove);$(window).unbind('touchend',onCanvasTouchEnd);}}
function flatten()
{var context=flattenCanvas.getContext("2d");context.fillStyle='rgb('+BACKGROUND_COLOR[0]+', '+BACKGROUND_COLOR[1]+', '+BACKGROUND_COLOR[2]+')';context.fillRect(0,0,canvas.width,canvas.height);context.drawImage(canvas,0,0);}