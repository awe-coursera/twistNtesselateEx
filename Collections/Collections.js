/**
 * Created by awe on 13/08/2015.
 */
// Experimenting with a collection of objects ...

var sphereProtoInstance = null;


var cylinderProtoInstance = null;


var coneProtoInstance = null;

var shapeCollection = [];
var i = 0;

var ShapeEnum = {
    SPHERE: 1,
    CONE: 2,
    CYLINDER: 3
};

var ShapeId = 0;

function getUniqueId () {
    var IdVal = ShapeId;
    ShapeId = ShapeId + 1;
    return IdVal;
}

function Cone()  {
    this.type = ShapeEnum.CONE;
    this.xScale = 1;
    this.yScale = 1;
    this.zScale = 1;

    this.rotateAboutX = 0;
    this.rotateAboutY = 0;
    this.rotateAboutZ = 0;

    this.xPos = 0;
    this.yPos = 0;
    this.zPos = 0;

    this.id = getUniqueId();
    this.setScale = setScale;
    this.setPos = setPos;
    this.setRotateAboutX = setRotateAboutX;
    this.setRotateAboutY = setRotateAboutY;
    this.setRotateAboutZ = setRotateAboutZ;

    this.granularity = granularity;

    this.modelMatrix = null;
    this.setupModelMatrix = createModelMatrix;

    this.draw = displayCone;
    this.drawConeBase = drawConeBase;
    this.drawConeFace = drawConeFace;
}



function createModelMatrix () {
	var self = this;
	self.modelMatrix = new Matrix4();
	self.modelMatrix.scale(self.xScale, self.yScale, self.zScale);
	self.modelMatrix.rotate(self.rotateAboutX,1,0,0);
	self.modelMatrix.rotate(self.rotateAboutY, 0,1,0);
	self.modelMatrix.translate(self.xPos, self.yPos, self.zPos);
	//console.log("In createModelMatrix ", self.modelMatrix);
	//var i;
	//var j;
	//for (i = 0; i < 4; i++) {
		//console.log(self.modelMatrix.elements[i*4],  self.modelMatrix.elements[i*4 +1],  self.modelMatrix.elements[i*4 +2], 
													// self.modelMatrix.elements[i*4 +3]);
	//}
}

function setScale(xScale, yScale, zScale) {
    if (xScale === undefined) {
        xScale = 1;
    }
    if (yScale === undefined) {
        yScale = 1;
    }
    if (zScale === undefined) {
        zScale = 1;
    }

    this.xScale = xScale;
    this.yScale = yScale;
    this.zScale = zScale;

}

function setPos(xPos, yPos, zPos) {
    if (xPos === undefined) {
        xPos = 1;
    }
    if (yPos === undefined) {
        yPos = 1;
    }
    if (zPos === undefined) {
        zPos = 1;
    }

    this.xPos = xPos;
    this.yPos = yPos;
    this.zPos = zPos;

}


function setRotateAboutX(phi) {
    if (phi === undefined) {
	phi = 0;
    } 
    this.rotateAboutX = phi;
}   

function setRotateAboutY(theta) {
    if (theta === undefined) {
	theta = 0;
    } 
    this.rotateAboutY = theta;
} 

function setRotateAboutZ(omega) {
    if (omega === undefined) {
	omega = 0;
    } 
    this.rotateAboutZ = omega;
} 

function Sphere()  {
    this.type = ShapeEnum.SPHERE;
    this.xScale = 1;
    this.yScale = 1;
    this.zScale = 1;

    this.rotateAboutX = 0;
    this.rotateAboutY = 0;
    this.rotateAboutZ = 0;

    this.xPos = 0;
    this.yPos = 0;
    this.zPos = 0;

    this.id = getUniqueId();
    this.setScale = setScale;
    this.setPos = setPos;

    this.vertexArray = null;
    this.colorArray = null;

    this.setRotateAboutX = setRotateAboutX;
    this.setRotateAboutY = setRotateAboutY;
    this.setRotateAboutZ = setRotateAboutZ;

    this.granularity = granularity;

    this.modelMatrix = null;
    this.setupModelMatrix = createModelMatrix;

    this.draw = displaySphere;
    this.drawTopCap = drawTopCap;
    this.drawSphereWithoutCaps = drawSphereWithoutCaps;
    this.drawBottomCap = drawBottomCap;
}



function Cylinder()  {
    this.type = ShapeEnum.CYLINDER;
    this.xScale = 1;
    this.yScale = 1;
    this.zScale = 1;

    this.rotateAboutX = 0;
    this.rotateAboutY = 0;
    this.rotateAboutZ = 0;

    this.xPos = 0;
    this.yPos = 0;
    this.zPos = 0;

    this.granularity = granularity;

    this.id = getUniqueId();
    this.setScale = setScale;
    this.setPos = setPos;

    this.setRotateAboutX = setRotateAboutX;
    this.setRotateAboutY = setRotateAboutY;
    this.setRotateAboutZ = setRotateAboutZ;

    this.modelMatrix = null;
    this.setupModelMatrix = createModelMatrix;

    this.draw = displayCylinder;
    this.drawCylinderTop = drawCylinderTop;
    this.drawCylinderBottom = drawCylinderBottom;
    this.drawCylinderFace = drawCylinderFace;
}


var modelMatrix = null; // probably need one modelMatrix per object ... 
var viewMatrix = null;
var modelviewMatrix = null;
var projectionMatrix = null; 


var pointsBuf = null;
var colorsBuf = null;

var u_modelviewMatrix = null;
var u_projectionMatrix = null;

var shapeCollection = [];


function start() {
	document.getElementById("xPosSlider").value = 0;
	showValue(document.getElementById("xPosSlider"));
	document.getElementById("yPosSlider").value = 0;
	showValue(document.getElementById("yPosSlider"));
	document.getElementById("zPosSlider").value = 0;
	showValue(document.getElementById("zPosSlider"));

	document.getElementById("xScaleSlider").value = 0.1;
	showValue(document.getElementById("xScaleSlider"));
	document.getElementById("yScaleSlider").value = 0.1;
	showValue(document.getElementById("yScaleSlider"));
	document.getElementById("zScaleSlider").value = 0.1;
	showValue(document.getElementById("zScaleSlider"));

	document.getElementById("xRotSlider").value = 0;
	showValue(document.getElementById("xRotSlider"));
	document.getElementById("yRotSlider").value = 0;
	showValue(document.getElementById("yRotSlider"));
	document.getElementById("zRotSlider").value = 0;
	showValue(document.getElementById("zRotSlider"));

	

    canvas = document.getElementById( "gl-canvas" );
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );

    modelMatrix = new Matrix4();
    viewMatrix = new Matrix4();
    //modelviewMatrix = new Matrix4();
    projectionMatrix = new Matrix4(); 

    program = initShaders( gl, "vertex-shader", "fragment-shader" );  

    if (program==null){
       console.log("error in initShaders");
    }

    u_modelMatrix = gl.getUniformLocation(program, "u_modelMatrix");
    u_modelViewMatrix = gl.getUniformLocation(program, "u_modelViewMatrix");
    u_projectionMatrix = gl.getUniformLocation(program, "u_projectionMatrix");

    gl.useProgram( program );
    pointsBuf = gl.createBuffer(),
    colorsBuf = gl.createBuffer(),

    sphereProtoInstance = new protoSphere();
    sphereProtoInstance.setup();

    cylinderProtoInstance = new protoCylinder();
    cylinderProtoInstance.setup();

    coneProtoInstance = new protoCone();
    coneProtoInstance.setup();

    var cone1 = new Cone();

    
    cone1.setScale(0.2,0.2,0.2);
    cone1.setRotateAboutX(30);
    cone1.setRotateAboutZ(20);
    cone1.setPos(-3,1,0);

   shapeCollection.push(cone1);

    var cone2 = new Cone();


    cone2.setScale(0.1,0.2,0.1);
    cone2.setRotateAboutX(-20);
    cone2.setRotateAboutZ(30);
    cone2.setPos(-3,0,0);
   
    shapeCollection.push(cone2);


   var cylinder1 = new Cylinder();

   cylinder1.setScale(0.2,0.2,0.2);
   cylinder1.setRotateAboutX(-20);
   cylinder1.setRotateAboutY(30);
   cylinder1.setRotateAboutZ(30);
   cylinder1.setPos(0,0,0)

   shapeCollection.push(cylinder1);


   var sphere1 = new Sphere();

   sphere1.setScale(0.2,0.2,0.2);
   sphere1.setRotateAboutX(-20);
   sphere1.setRotateAboutY(30);
   sphere1.setRotateAboutZ(30);
   sphere1.setPos(3,0,0)

   shapeCollection.push(sphere1);

    gl.clearColor( 0.0, 0.0, 0.0, 1.0 ); // black background

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LESS);
    setupCamera();   

    var i = 0;

    for(i = 0; i < shapeCollection.length; i++ ) {
        shapeCollection[i].draw();
    }

    	


    //cone1.draw();
    //cone2.draw();
    //cylinder1.draw();
    //sphere1.draw();

    //shapeCollection.push(new Cone());
    //shapeCollection.push(new Cone());
    //shapeCollection.push(new Sphere());
    //console.log(shapeCollection.length);
    //original0 = shapeCollection[0];
    //console.log(original0);
    //original1 = shapeCollection[1];
    //console.log(original1);
    //original2 = shapeCollection[2];
    //console.log(original2);
    //shapeCollection[0].setScale(0.3,0.7,0.2);
    //shapeCollection[1].setPos(3.1,2.1,0.7);
    //shapeCollection[2].setPos(6.2,11.2,3.1);
    //console.log(shapeCollection[0]);
    //console.log(shapeCollection[1]);
    //console.log(shapeCollection[1]);
}


function setupCamera() {
   // console.log("camera setup");
   viewMatrix.setLookAt(0, 0, 5, 0, 0, 0, 0, 1, 0); 
   //viewMatrix.rotate(20,0,0,1);
   //viewMatrix.rotate(20,1,0,0);
   projectionMatrix.setPerspective(20, canvas.width / canvas.height, 1, 100);
}


function displayCylinder() {
   var self = this;	
   //self.setupModelMatrix();
   self.drawCylinderTop();
   self.drawCylinderBottom();
   self.drawCylinderFace();
}


function displayCone() {
   var self = this;
   //self.setupModelMatrix();
   self.drawConeBase();
   self.drawConeFace();
}


function displaySphere() {
   var self = this;
   //self.setupModelMatrix();
   self.drawTopCap();
   self.drawSphereWithoutCaps();
   self.drawBottomCap();
}



function drawCylinderTop() {
	var self = this;
	var array32Pos; 
	var array32Col;

	var modelViewMatrix = new Matrix4();
	var modelMatrix = new Matrix4();
	modelMatrix.scale(self.xScale, self.yScale, self.zScale);
	modelMatrix.rotate(self.rotateAboutX,1,0,0);
	modelMatrix.rotate(self.rotateAboutY, 0,1,0);
	modelMatrix.rotate(self.rotateAboutZ, 0,0,1);
	modelMatrix.translate(self.xPos, self.yPos, self.zPos);

	// console.log("cylinderProtoInstance.topFaceTriangleArray size", cylinderProtoInstance.topFaceTriangleArray.length);
	array32Pos = new Float32Array(flatten(cylinderProtoInstance.topFaceTriangleArray));
	// console.log("cylinder top array 32 size", array32.length);
	gl.bindBuffer(gl.ARRAY_BUFFER, pointsBuf);
   	gl.bufferData(gl.ARRAY_BUFFER, array32Pos, gl.STATIC_DRAW);
	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.enableVertexAttribArray(vPosition);
        gl.vertexAttribPointer(vPosition, cylinderProtoInstance.topFaceTriangleArray[0].length, gl.FLOAT, false, 0, 0);



	array32Col = new Float32Array(flatten(cylinderProtoInstance.topFaceColors));
	gl.bindBuffer(gl.ARRAY_BUFFER, colorsBuf);
   	gl.bufferData(gl.ARRAY_BUFFER, array32Col, gl.STATIC_DRAW);
	var vColor = gl.getAttribLocation(program, "vColor");
	gl.enableVertexAttribArray(vColor);
 	gl.vertexAttribPointer(vColor, cylinderProtoInstance.topFaceColors[0].length, gl.FLOAT, false, 0, 0);

   	gl.uniformMatrix4fv(u_modelMatrix, false, modelMatrix.elements);
   	modelViewMatrix.set(viewMatrix).multiply(modelMatrix);
   	gl.uniformMatrix4fv(u_modelViewMatrix, false, modelViewMatrix.elements);
   	gl.uniformMatrix4fv(u_projectionMatrix, false, projectionMatrix.elements);

   	gl.drawArrays(gl.TRIANGLES, 0, cylinderProtoInstance.topFaceTriangleArray.length);

}


function drawCylinderBottom() {
	var self = this;
	var array32Pos; 
	var array32Col; 
	var modelViewMatrix = new Matrix4();
	var modelMatrix = new Matrix4();

	var modelViewMatrix = new Matrix4();
	var modelMatrix = new Matrix4();
	modelMatrix.scale(self.xScale, self.yScale, self.zScale);
	modelMatrix.rotate(self.rotateAboutX,1,0,0);
	modelMatrix.rotate(self.rotateAboutY, 0,1,0);
	modelMatrix.rotate(self.rotateAboutZ, 0,0,1);
	modelMatrix.translate(self.xPos, self.yPos, self.zPos);

	array32Pos = new Float32Array(flatten(cylinderProtoInstance.bottomFaceTriangleArray));
	gl.bindBuffer(gl.ARRAY_BUFFER, pointsBuf);
   	gl.bufferData(gl.ARRAY_BUFFER, array32Pos, gl.STATIC_DRAW);
	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.enableVertexAttribArray(vPosition);
        gl.vertexAttribPointer(vPosition, cylinderProtoInstance.bottomFaceTriangleArray[0].length, gl.FLOAT, false, 0, 0);

	array32Col = new Float32Array(flatten(cylinderProtoInstance.bottomFaceColors));
	gl.bindBuffer(gl.ARRAY_BUFFER, colorsBuf);
   	gl.bufferData(gl.ARRAY_BUFFER, array32Col, gl.STATIC_DRAW);
	var vColor = gl.getAttribLocation(program, "vColor");
	gl.enableVertexAttribArray(vColor);
        gl.vertexAttribPointer(vColor, cylinderProtoInstance.bottomFaceColors[0].length, gl.FLOAT, false, 0, 0);

   	gl.uniformMatrix4fv(u_modelMatrix, false, modelMatrix.elements);   	
	modelViewMatrix.set(viewMatrix).multiply(modelMatrix);
   	gl.uniformMatrix4fv(u_modelViewMatrix, false, modelViewMatrix.elements);
   	gl.uniformMatrix4fv(u_projectionMatrix, false, projectionMatrix.elements);

   	gl.drawArrays(gl.TRIANGLES, 0, cylinderProtoInstance.bottomFaceTriangleArray.length);


}


function drawCylinderFace() {
	var self = this;
	var array32Pos; 
	var array32Col; 

	var modelViewMatrix = new Matrix4();
	var modelMatrix = new Matrix4();
	modelMatrix.scale(self.xScale, self.yScale, self.zScale);
	modelMatrix.rotate(self.rotateAboutX,1,0,0);
	modelMatrix.rotate(self.rotateAboutY, 0,1,0);
	modelMatrix.rotate(self.rotateAboutZ, 0,0,1);
	modelMatrix.translate(self.xPos, self.yPos, self.zPos);


	//console.log("In drawCylinderFace ", modelMatrix);
	//var i;
	//var j;
	//for (i = 0; i < 4; i++) {
		//console.log(modelMatrix.elements[i*4],  modelMatrix.elements[i*4 +1],  modelMatrix.elements[i*4 +2], 
	//												modelMatrix.elements[i*4 +3]);
	//}

	array32Pos = new Float32Array(flatten(cylinderProtoInstance.cylinderFaceTriangleArray));
	gl.bindBuffer(gl.ARRAY_BUFFER, pointsBuf);
   	gl.bufferData(gl.ARRAY_BUFFER, array32Pos, gl.STATIC_DRAW);
	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.enableVertexAttribArray(vPosition);
        gl.vertexAttribPointer(vPosition, cylinderProtoInstance.cylinderFaceTriangleArray[0].length, gl.FLOAT, false, 0, 0);

	//console.log("cylinderProtoInstance.cylinderFaceColors size", cylinderProtoInstance.cylinderFaceColors.length);
	array32Col = new Float32Array(flatten(cylinderProtoInstance.cylinderFaceColors));
	gl.bindBuffer(gl.ARRAY_BUFFER, colorsBuf);
   	gl.bufferData(gl.ARRAY_BUFFER, array32Col, gl.STATIC_DRAW);
	var vColor = gl.getAttribLocation(program, "vColor");
	gl.enableVertexAttribArray(vColor);
        gl.vertexAttribPointer(vColor, cylinderProtoInstance.cylinderFaceColors[0].length, gl.FLOAT, false, 0, 0);

   	
   	gl.uniformMatrix4fv(u_modelMatrix, false, modelMatrix.elements);	
	modelViewMatrix.set(viewMatrix).multiply(modelMatrix);
   	gl.uniformMatrix4fv(u_modelViewMatrix, false, modelViewMatrix.elements);
   	gl.uniformMatrix4fv(u_projectionMatrix, false, projectionMatrix.elements);


	//console.log("Calling drawArrays .. ");

   	gl.drawArrays(gl.TRIANGLES, 0, cylinderProtoInstance.cylinderFaceTriangleArray.length);

}



function drawConeBase() {
	var self = this;
	var modelViewMatrix = new Matrix4();
	var modelMatrix = new Matrix4();
	modelMatrix.scale(self.xScale, self.yScale, self.zScale);
	modelMatrix.rotate(self.rotateAboutX,1,0,0);
	modelMatrix.rotate(self.rotateAboutY, 0,1,0);
	modelMatrix.rotate(self.rotateAboutZ, 0,0,1);
	modelMatrix.translate(self.xPos, self.yPos, self.zPos);

	var array32Pos; 
	var array32Col;
	// console.log("In drawConeBase");

	array32Pos = new Float32Array(flatten(coneProtoInstance.coneBaseTriangles));
	gl.bindBuffer(gl.ARRAY_BUFFER, pointsBuf);
   	gl.bufferData(gl.ARRAY_BUFFER, array32Pos, gl.STATIC_DRAW);
	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.enableVertexAttribArray(vPosition);
        gl.vertexAttribPointer(vPosition, coneProtoInstance.coneBaseTriangles[0].length, gl.FLOAT, false, 0, 0);

	array32Col = new Float32Array(flatten(coneProtoInstance.coneBaseColors));
	gl.bindBuffer(gl.ARRAY_BUFFER, colorsBuf);
   	gl.bufferData(gl.ARRAY_BUFFER, array32Col, gl.STATIC_DRAW);
	var vColor = gl.getAttribLocation(program, "vColor");
	gl.enableVertexAttribArray(vColor);
        gl.vertexAttribPointer(vColor, coneProtoInstance.coneBaseColors[0].length, gl.FLOAT, false, 0, 0);




   	//modelViewMatrix.set(viewMatrix).multiply(modelMatrix);
	//modelViewMatrix.set(modelMatrix);
	//console.log("In drawConeBase ", modelViewMatrix);
	//var i;
	//var j;
	//for (i = 0; i < 4; i++) {
	//	console.log(modelViewMatrix.elements[i*4],  modelViewMatrix.elements[i*4 +1],  modelViewMatrix.elements[i*4 +2], 
	//												modelViewMatrix.elements[i*4 +3]);
	//}
   	gl.uniformMatrix4fv(u_modelMatrix, false, modelMatrix.elements);   	
	modelViewMatrix.set(viewMatrix).multiply(modelMatrix);
   	gl.uniformMatrix4fv(u_modelViewMatrix, false, modelViewMatrix.elements);
   	gl.uniformMatrix4fv(u_projectionMatrix, false, projectionMatrix.elements);

   	gl.drawArrays(gl.TRIANGLES, 0, coneProtoInstance.coneBaseTriangles.length);

}


function drawConeFace() {
	var self = this;
	var array32Pos; 
	var array32Col;	
	var modelViewMatrix = new Matrix4();
	var modelMatrix = new Matrix4();
	modelMatrix.scale(self.xScale, self.yScale, self.zScale);
	modelMatrix.rotate(self.rotateAboutX,1,0,0);
	modelMatrix.rotate(self.rotateAboutY, 0,1,0);
	modelMatrix.rotate(self.rotateAboutZ, 0,0,1);
	modelMatrix.translate(self.xPos, self.yPos, self.zPos);

	// console.log("In drawConeFace");
	// console.log("Size of coneProtoInstance.coneFaceTriangles", coneProtoInstance.coneFaceTriangles.length);
	array32Pos = new Float32Array(flatten(coneProtoInstance.coneFaceTriangles));
	// console.log("Size of flattened coneProtoInstance.coneFaceTriangles", array32.length);
	gl.bindBuffer(gl.ARRAY_BUFFER, pointsBuf);
   	gl.bufferData(gl.ARRAY_BUFFER, array32Pos, gl.STATIC_DRAW);
	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.enableVertexAttribArray(vPosition);
        gl.vertexAttribPointer(vPosition, coneProtoInstance.coneFaceTriangles[0].length, gl.FLOAT, false, 0, 0);

	array32Col = new Float32Array(flatten(coneProtoInstance.coneFaceColors));
	// console.log("Size of flattened coneProtoInstance.coneFaceColors", array32.length);
	gl.bindBuffer(gl.ARRAY_BUFFER, colorsBuf);
   	gl.bufferData(gl.ARRAY_BUFFER, array32Col, gl.STATIC_DRAW);
	var vColor = gl.getAttribLocation(program, "vColor");
	gl.enableVertexAttribArray(vColor);
        gl.vertexAttribPointer(vColor, coneProtoInstance.coneFaceColors[0].length, gl.FLOAT, false, 0, 0);



   	//modelViewMatrix.set(viewMatrix).multiply(modelMatrix);
	modelViewMatrix.set(modelMatrix);
	//console.log("In drawConeFace ", modelViewMatrix);
	//var i;
	//var j;
	//for (i = 0; i < 4; i++) {
	//	console.log(modelViewMatrix.elements[i*4],  modelViewMatrix.elements[i*4 +1],  modelViewMatrix.elements[i*4 +2], 
	//												modelViewMatrix.elements[i*4 +3]);
	//}

   	gl.uniformMatrix4fv(u_modelMatrix, false, modelMatrix.elements);   	
	modelViewMatrix.set(viewMatrix).multiply(modelMatrix);
   	gl.uniformMatrix4fv(u_modelViewMatrix, false, modelViewMatrix.elements);
   	gl.uniformMatrix4fv(u_projectionMatrix, false, projectionMatrix.elements);

   	gl.drawArrays(gl.TRIANGLES, 0, coneProtoInstance.coneFaceTriangles.length);

}


function drawTopCap(){

	var self = this;
	var array32Pos; 
	var array32Col;	
	var modelViewMatrix = new Matrix4();
	var modelMatrix = new Matrix4();
	modelMatrix.scale(self.xScale, self.yScale, self.zScale);
	modelMatrix.rotate(self.rotateAboutX,1,0,0);
	modelMatrix.rotate(self.rotateAboutY, 0,1,0);
	modelMatrix.rotate(self.rotateAboutZ, 0,0,1);
	modelMatrix.translate(self.xPos, self.yPos, self.zPos);

	//console.log("sphereProtoInstance.topCapTriangles size", sphereProtoInstance.topCapTriangles.length);

	array32Pos = new Float32Array(flatten(sphereProtoInstance.topCapTriangles));
	gl.bindBuffer(gl.ARRAY_BUFFER, pointsBuf);
   	gl.bufferData(gl.ARRAY_BUFFER, array32Pos, gl.STATIC_DRAW);
	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.enableVertexAttribArray(vPosition);
        gl.vertexAttribPointer(vPosition, sphereProtoInstance.topCapTriangles[0].length, gl.FLOAT, false, 0, 0);

	array32Col = new Float32Array(flatten(sphereProtoInstance.topCapColors));
	gl.bindBuffer(gl.ARRAY_BUFFER, colorsBuf);
   	gl.bufferData(gl.ARRAY_BUFFER, array32Col, gl.STATIC_DRAW);
	var vColor = gl.getAttribLocation(program, "vColor");
	gl.enableVertexAttribArray(vColor);
        gl.vertexAttribPointer(vColor, sphereProtoInstance.topCapColors[0].length, gl.FLOAT, false, 0, 0);

	gl.uniformMatrix4fv(u_modelMatrix, false, modelMatrix.elements);  	
	modelViewMatrix.set(viewMatrix).multiply(modelMatrix);
   	gl.uniformMatrix4fv(u_modelViewMatrix, false, modelViewMatrix.elements);
   	gl.uniformMatrix4fv(u_projectionMatrix, false, projectionMatrix.elements);

   	gl.drawArrays(gl.TRIANGLES, 0, sphereProtoInstance.topCapTriangles.length);
}


function drawSphereWithoutCaps() {
	var self = this;
	var array32Pos; 
	var array32Col;	

	var modelViewMatrix = new Matrix4();
	var modelMatrix = new Matrix4();

	modelMatrix.scale(self.xScale, self.yScale, self.zScale);
	modelMatrix.rotate(self.rotateAboutX,1,0,0);
	modelMatrix.rotate(self.rotateAboutY, 0,1,0);
	modelMatrix.rotate(self.rotateAboutZ, 0,0,1);
	modelMatrix.translate(self.xPos, self.yPos, self.zPos);

	//console.log("sphereProtoInstance.protoSphereMinusCapsArray size", sphereProtoInstance.protoSphereMinusCapsArray.length);

	array32Pos = new Float32Array(flatten(sphereProtoInstance.protoSphereMinusCapsArray));
	//console.log("array32Pos initialised");
	gl.bindBuffer(gl.ARRAY_BUFFER, pointsBuf);
   	gl.bufferData(gl.ARRAY_BUFFER, array32Pos, gl.STATIC_DRAW);
	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.enableVertexAttribArray(vPosition);
        gl.vertexAttribPointer(vPosition, sphereProtoInstance.protoSphereMinusCapsArray[0].length, gl.FLOAT, false, 0, 0);

	array32Col = new Float32Array(flatten(sphereProtoInstance.protoSphereMinusCapsColors));
	//console.log("array32Col initialised");
	gl.bindBuffer(gl.ARRAY_BUFFER, colorsBuf);
   	gl.bufferData(gl.ARRAY_BUFFER, array32Col, gl.STATIC_DRAW);
	var vColor = gl.getAttribLocation(program, "vColor");
	gl.enableVertexAttribArray(vColor);
        gl.vertexAttribPointer(vColor, sphereProtoInstance.topCapColors[0].length, gl.FLOAT, false, 0, 0);

	gl.uniformMatrix4fv(u_modelMatrix, false, modelMatrix.elements);  	
	modelViewMatrix.set(viewMatrix).multiply(modelMatrix);
   	gl.uniformMatrix4fv(u_modelViewMatrix, false, modelViewMatrix.elements);
   	gl.uniformMatrix4fv(u_projectionMatrix, false, projectionMatrix.elements);

   	gl.drawArrays(gl.TRIANGLES, 0, sphereProtoInstance.protoSphereMinusCapsArray.length);
}


function drawBottomCap() {
	var self = this;
	var array32Pos; 
	var array32Col;	
	var modelViewMatrix = new Matrix4();
	var modelMatrix = new Matrix4();
	modelMatrix.scale(self.xScale, self.yScale, self.zScale);
	modelMatrix.rotate(self.rotateAboutX,1,0,0);
	modelMatrix.rotate(self.rotateAboutY, 0,1,0);
	modelMatrix.rotate(self.rotateAboutZ, 0,0,1);
	modelMatrix.translate(self.xPos, self.yPos, self.zPos);

	//console.log("sphereProtoInstance.bottomCapTriangles size", sphereProtoInstance.bottomCapTriangles.length);

	array32 = new Float32Array(flatten(sphereProtoInstance.bottomCapTriangles));
	gl.bindBuffer(gl.ARRAY_BUFFER, pointsBuf);
   	gl.bufferData(gl.ARRAY_BUFFER, array32, gl.STATIC_DRAW);
	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.enableVertexAttribArray(vPosition);
        gl.vertexAttribPointer(vPosition, sphereProtoInstance.bottomCapTriangles[0].length, gl.FLOAT, false, 0, 0);

	array32 = new Float32Array(flatten(sphereProtoInstance.bottomCapColors));
	gl.bindBuffer(gl.ARRAY_BUFFER, pointsBuf);
   	gl.bufferData(gl.ARRAY_BUFFER, array32, gl.STATIC_DRAW);
	var vColor = gl.getAttribLocation(program, "vColor");
	gl.enableVertexAttribArray(vColor);
        gl.vertexAttribPointer(vColor, sphereProtoInstance.bottomCapColors[0].length, gl.FLOAT, false, 0, 0);

	gl.uniformMatrix4fv(u_modelMatrix, false, modelMatrix.elements);  	
	modelViewMatrix.set(viewMatrix).multiply(modelMatrix);
   	gl.uniformMatrix4fv(u_modelViewMatrix, false, modelViewMatrix.elements);
   	gl.uniformMatrix4fv(u_projectionMatrix, false, projectionMatrix.elements);

   	gl.drawArrays(gl.TRIANGLES, 0, sphereProtoInstance.bottomCapTriangles.length);
}

//var newObjectClickCount = 0;

function createNewObjectAndUpdateDisplay() {

	console.log ("Click event occurred");


//	newObjectClickCount = newObjectClickCount + 1;

//	if(newObjectClickCount == 1) {
//		console.log("Click count ", newObjectClickCount);
//		return;
//	}

	var xPos = 0;
	var yPos = 0;
	var zPos = 0;


	var xScale = 0.1;
	var yScale = 0.1;
	var zScale = 0.1;


	var xRot = 0;
	var yRot = 0;
	var zRot = 0;

	var objectType = ShapeEnum.CONE;

	xPos = document.getElementById("xPosSlider").value;
	yPos = document.getElementById("yPosSlider").value;
	zPos = document.getElementById("zPosSlider").value;

	xScale = document.getElementById("xScaleSlider").value;
	yScale = document.getElementById("yScaleSlider").value;
	zScale = document.getElementById("zScaleSlider").value;

	xRot = document.getElementById("xRotSlider").value;
	yRot = document.getElementById("yRotSlider").value;
	zRot = document.getElementById("zRotSlider").value;

	objectType = document.getElementById("shapeSelect").value;

	console.log("objectType ", objectType);

	var nextObject = null;


	if(objectType === "1") {
		console.log ("creating a cone");
		nextObject = new Cone();
	}
	else if (objectType ==="2") {
		console.log ("creating a cylinder");
		nextObject = new Cylinder();
	}
	else if (objectType ==="3") {
		console.log ("creating a sphere");
		nextObject = new Sphere();
	}


	nextObject.setScale(xScale, yScale, zScale);
	nextObject.setRotateAboutX(xRot);
        nextObject.setRotateAboutY(yRot);
	nextObject.setRotateAboutZ(zRot);
	nextObject.setPos(xPos,yPos,zPos)

	shapeCollection.push(nextObject);

	gl.clearColor( 0.0, 0.0, 0.0, 1.0 ); // black background
    	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    	gl.enable(gl.DEPTH_TEST);
   	gl.depthFunc(gl.LESS);

    	var i = 0;

    	for(i = 0; i < shapeCollection.length; i++ ) {
        	shapeCollection[i].draw();
   	 }

}




window.onload = start;

