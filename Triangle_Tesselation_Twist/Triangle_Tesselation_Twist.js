"use strict";
// Note ... must have loaded ... <script type="text/javascript" src="../Common/MV.js"></script>

var canvas;
var gl;

var points = [];
var colors = [];

var NumTimesToSubdivide = 0;
var RotationAngle = 0;
var generateNewColors = 1;

var pointsBuf;
var colorsBuf;
var program;

var applyTwist = false;
var twistParam = 1.0;

function start() {
	 document.getElementById("numStepsSlider").value = 0;
	 document.getElementById("rotationAngleSlider").value = 0;
	 document.getElementById("applyTwistCheck").checked = false;
	 canvas = document.getElementById( "gl-canvas" );
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    
    gl.viewport( 0, 0, canvas.width, canvas.height );
    // gl.clearColor( 0.0, 0.0, 0.0, 1.0 );

    //  Load shaders and initialize attribute buffers

    program = initShaders( gl, "vertex-shader", "fragment-shader" ); 
    gl.useProgram( program );   
    
    pointsBuf = gl.createBuffer(),
    colorsBuf = gl.createBuffer(),
    
    prepareToDisplay();

}


function prepareToDisplay(generateNewColors)
{
	var vPosition = gl.getAttribLocation(program, "vPosition");
	var vColor = gl.getAttribLocation(program, "vColor");
	var array32;
	
	var vertices = [
		vec2( -0.8, -0.8 ),
		vec2(  0,  0.8 ),
		vec2(  0.8, -0.8 )
	];
	
    points = [];
    if(generateNewColors) {
    	colors = [];    
    }

	divideTriangle(vertices[0], vertices[1], vertices[2], NumTimesToSubdivide);


	array32 = new Float32Array(flatten(points));
	gl.bindBuffer(gl.ARRAY_BUFFER, pointsBuf);
   gl.bufferData(gl.ARRAY_BUFFER, array32, gl.STATIC_DRAW);
   gl.enableVertexAttribArray(vPosition);
   gl.vertexAttribPointer(vPosition, points[0].length, gl.FLOAT, false, 0, 0);

   array32 = new Float32Array(flatten(colors));
   gl.bindBuffer(gl.ARRAY_BUFFER, colorsBuf);
   gl.bufferData(gl.ARRAY_BUFFER, array32, gl.STATIC_DRAW);
   gl.enableVertexAttribArray(vColor);
   gl.vertexAttribPointer(vColor, colors[0].length, gl.FLOAT, false, 0, 0);

   gl.clearColor( 0.0, 0.0, 0.0, 1.0 ); // black background
   display();
}

function display() {
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.drawArrays(gl.TRIANGLES, 0, points.length);
}




function tesselateImage()
{
	// alert("Update event");
	var numSteps = document.getElementById("numStepsSlider").value;
   document.getElementById("numStepsVal").innerHTML = numSteps;
   NumTimesToSubdivide = parseInt(numSteps,10);
   //alert(numTimesToSubdivide);
   prepareToDisplay(1);
}



function rotateImage()
{
	
	var theta = document.getElementById("rotationAngleSlider").value;
	document.getElementById("rotationAngleDegrees").innerHTML = theta;
	RotationAngle = parseInt(theta, 10);
	prepareToDisplay(0);
}


function twistUntwist()
{

	if (applyTwistCheck.checked){
          applyTwist = 1 ;
	}else{
		applyTwist = 0;
	}
	prepareToDisplay(0);
}



function triangle( a, b, c )
{
	 //alert("triangle called");
	 var color = [Math.random(), Math.random(), Math.random()];
	 var v1,v2,v3;
	 
	 if (colors.length == points.length) // does reinitialisation preserve colors ?
                colors.push (color, color, color);
    //var message = "".concat("Color values ", color[0], " ", color[1], " ", color[2] );
    //alert(message);
    if(applyTwist) {
    	v1 = spiral(a,twistParam, RotationAngle);
    	v2 = spiral(b,twistParam, RotationAngle);
    	v3 = spiral(c, twistParam, RotationAngle); 	 
 	}
 	else { 	
 	   v1 = rotate(a, RotationAngle);
    	v2 = rotate(b, RotationAngle);
    	v3 = rotate(c, RotationAngle);
	
 	}
     
    points.push( v1, v2, v3 );
}

function rotate (pos, angle) {
	var radianAngleValue = angle * Math.PI / 180;
	var x = pos[0];
	var y = pos[1];
	var sintheta = Math.sin(radianAngleValue);
   var costheta = Math.cos(radianAngleValue);
   return [x*costheta-y*sintheta, x*sintheta+y*costheta]; 
}

function spiral (pos,factor, angle) {
	var radianAngleValue = angle * Math.PI / 180;
	var x = pos[0];
	var y = pos[1];
	var r = factor * Math.sqrt(x*x + y*y);
	var sintheta = Math.sin(r*radianAngleValue);
   var costheta = Math.cos(r*radianAngleValue);
   //var message = "".concat(x, " ",y);
   //alert(message);
   return [x*costheta-y*sintheta, x*sintheta+y*costheta]; 
}

function divideTriangle( a, b, c, count )
{
	 //var message = "".concat("divideTriangle called, count is ", count);
	 //alert(message);

    // check for end of recursion

    if ( count == 0 ) {
        triangle( a, b, c );
    }
    else {

        //bisect the sides

        var ab = mix( a, b, 0.5 );
        var ac = mix( a, c, 0.5 );
        var bc = mix( b, c, 0.5 );

        --count;

        // four new triangles

        divideTriangle( a, ab, ac, count );
        divideTriangle( c, ac, bc, count );
        divideTriangle( b, bc, ab, count );
        divideTriangle( ab, ac, bc, count);
    }
}

window.onload = start;

