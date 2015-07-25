// Useful resources and references ...
// http://learningwebgl.com/blog/?p=1253
// http://imagine.inrialpes.fr/people/Francois.Faure/htmlCourses/WebGL/IntroMeshes.html
// http://alteredqualia.com/tmp/webgl-linewidth-test/
// Needs improving to handle canvase resizing for example ... see e.g.
// http://webglfundamentals.org/webgl/lessons/webgl-anti-patterns.html



/* Notes ... pseudo code things etc. ...
   We're going to use gl.LINE_STRIP ... 
   so every time a new point is added the line strip data will be extended
   by one point ... and the polyline will be redrawn ... 
   new points will be added on every mouse move event ...
   
   A mouse down event starts a new doodle .. and the previous one is lost ...
	
   This is simplistic ... and probably a more sophisticated approach would
   allow multiple doodle lines to be drawn .. and allow for lines to be erased
   etc. ...

   Line width can be set using gl.lineWidth ...
   In the html page we'll have a slider for setting line width in pixels
   between 1 (default) and 10 .. 
*/
   
"use strict" 




var mouseDown = false;
var downMouseX = null;
var downMouseY = null;
var currLineWidth = 1;
var points = [];
var canvas = null;
var gl = null;
var program = null;
var pointsBuf = [];

function setColor(v1,v2,v3,v4) {
	// var message = "".concat("setColor ", v1, v2, v3, v4);
	// alert(message);
	var u_colorLocation = gl.getUniformLocation(program, "uColor");
    	gl.uniform4f(u_colorLocation, v1 , v2 , v3, v4);
	drawNewPolyLine();
}

function handleMouseDown(event) {
    // alert("mouse down");
    mouseDown = true;
    points = [];
    // downMouseX = event.clientX;
    // downMouseY = event.clientY;
    // var message = "".concat("Mouse down ", event.clientX, " ", event.clientY);
    // alert(message);
    var downPoint = vec2 (-1 + 2*event.clientX/canvas.width,
		-1 + 2*(canvas.height-event.clientY) / canvas.height);
	points.push(downPoint);

}

function handleMouseUp(event) {
    mouseDown = false;
    // var message = "".concat("Mouse up ", event.clientX, " ", event.clientY);
    // alert(message);
    // here .. simply using the co-ordinate transformation given in the lecture notes. ... 
    var upPoint = vec2 (-1 + 2*event.clientX/canvas.width,
		-1 + 2*(canvas.height-event.clientY) / canvas.height);	 
    points.push(upPoint);  
    // var message = "".concat("mouse up points.length ", points.length);
    // alert(message);
    drawNewPolyLine();
}

function handleMouseMove(event) {

    if (!mouseDown) {
      return;
    }
    // alert("mouse move mouse down");
    // var newX = event.clientX;
    // var newY = event.clientY;

    // var deltaX = newX - prevMouseX;
    // var deltaY = newY - prevMouseY;
    // var message = "".concat("Mouse move button down ", event.clientX, " ", event.clientY);
    // alert(message);

    var downPoint = vec2 (-1 + 2*event.clientX/canvas.width,
		-1 + 2*(canvas.height-event.clientY) / canvas.height);	

    // add new point to set of polyLine points ... 
    points.push(downPoint); 
    // alert(points.length);
    drawNewPolyLine(); 

  }


function start() {
    document.getElementById("lineWidthSlider").value = 1;
    document.getElementById("colorChoice1").checked=true;
    canvas = document.getElementById( "gl-canvas" );
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    
    gl.viewport( 0, 0, canvas.width, canvas.height );
    // gl.clearColor( 1.0, 0.0, 0.0, 1.0 );

    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);


    //  Load shaders and initialize attribute buffers

    program = initShaders( gl, "vertex-shader", "fragment-shader" ); 
    gl.useProgram( program );   
    
    pointsBuf = gl.createBuffer();
    var u_colorLocation = gl.getUniformLocation(program, "uColor");
    gl.uniform4f(u_colorLocation, 1.0 , 0.0 , 0.0,  1.0);
    // colorsBuf = gl.createBuffer()   ... only using a single line colour ...   
    drawNewPolyLine();
}



function updatePolyLine()
{
	// alert("upDatePolyline event");
	var lineWidth = document.getElementById("lineWidthSlider").value;
   	document.getElementById("lineWidth").innerHTML = lineWidth;
   	currLineWidth = parseInt(lineWidth,10);
   	//alert(currLineWidth);
   	drawNewPolyLine();
}

function drawNewPolyLine() {
    var vPosition = gl.getAttribLocation(program, "vPosition");
    var array32 = new Float32Array(flatten(points));
    gl.bindBuffer(gl.ARRAY_BUFFER, pointsBuf);
    gl.bufferData(gl.ARRAY_BUFFER, array32, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(vPosition);
    gl.vertexAttribPointer(vPosition, 2 , gl.FLOAT, false, 0, 0);


   gl.clearColor( 0.0, 0.0, 0.0, 0.1 ); // grey background
   display();   

}



function display() {
        // alert("display");
	
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        // var message = "".concat("Line width ", currLineWidth);
	// alert(message);
	// gl.lineWidth(currLineWidth);  
	gl.lineWidth(currLineWidth);
	gl.drawArrays(gl.LINESTRIP, 0, points.length);
	// if (points.length > 10)
		// alert("over 10 points");
}


window.onload = start;
