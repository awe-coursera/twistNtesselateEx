
// Experimenting with a collection of objects ...
// Normals and lighting version ..

var sphereProtoInstance = null;


var cylinderProtoInstance = null;


var coneProtoInstance = null;

var light1 = null;
var light2 = null;
var light3 = null;

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

    this.ambientRed = 0;
    this.ambientGreen = 0;
    this.ambientBlue = 0;

    this.setAmbientRed = setAmbientRed;
    this.setAmbientGreen = setAmbientGreen;
    this.setAmbientBlue = setAmbientBlue;

    this.diffuseRed = 0;
    this.diffuseGreen = 0;
    this.diffuseBlue = 0;

    this.setDiffuseRed = setDiffuseRed;
    this.setDiffuseGreen = setDiffuseGreen;
    this.setDiffuseBlue = setDiffuseBlue;

    this.specularRed = 0;
    this.specularGreen = 0;
    this.specularBlue = 0;

    this.setSpecularRed = setSpecularRed;
    this.setSpecularGreen = setSpecularGreen;
    this.setSpecularBlue = setSpecularBlue;

    this.shininess = 0;
    this.setShininess = setShininess;


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

function setAmbientRed(red) {
    if (red === undefined) {
	red = 0;
    } 
    this.ambientRed = red;
} 

function setAmbientGreen(green) {
    if (green === undefined) {
	green = 0;
    } 
    this.ambientGreen = green;
} 

function setAmbientBlue(blue) {
    if (blue === undefined) {
	blue = 0;
    } 
    this.ambientBlue = blue;
} 



function setDiffuseRed(red) {
    if (red === undefined) {
	red = 0;
    } 
    this.diffuseRed = red;
} 

function setDiffuseGreen(green) {
    if (green === undefined) {
	green = 0;
    } 
    this.diffuseGreen = green;
} 

function setDiffuseBlue(blue) {
    if (blue === undefined) {
	blue = 0;
    } 
    this.diffuseBlue = blue;
} 



function setSpecularRed(red) {
    if (red === undefined) {
	red = 0;
    } 
    this.specularRed = red;
} 

function setSpecularGreen(green) {
    if (green === undefined) {
	green = 0;
    } 
    this.specularGreen = green;
} 

function setSpecularBlue(blue) {
    if (blue === undefined) {
	blue = 0;
    } 
    this.specularBlue = blue;
} 


function setShininess(shiny) {
    if (shiny === undefined) {
	shiny = 0;
    } 
    this.shininess = shiny;
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
    this.normalArray = null;

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

    this.ambientRed = 0;
    this.ambientGreen = 0;
    this.ambientBlue = 0;

    this.setAmbientRed = setAmbientRed;
    this.setAmbientGreen = setAmbientGreen;
    this.setAmbientBlue = setAmbientBlue;

    this.diffuseRed = 0;
    this.diffuseGreen = 0;
    this.diffuseBlue = 0;

    this.setDiffuseRed = setDiffuseRed;
    this.setDiffuseGreen = setDiffuseGreen;
    this.setDiffuseBlue = setDiffuseBlue;

    this.specularRed = 0;
    this.specularGreen = 0;
    this.specularBlue = 0;

    this.setSpecularRed = setSpecularRed;
    this.setSpecularGreen = setSpecularGreen;
    this.setSpecularBlue = setSpecularBlue;

    this.shininess = 0;
    this.setShininess = setShininess;

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

    this.ambientRed = 0;
    this.ambientGreen = 0;
    this.ambientBlue = 0;

    this.setAmbientRed = setAmbientRed;
    this.setAmbientGreen = setAmbientGreen;
    this.setAmbientBlue = setAmbientBlue;

    this.diffuseRed = 0;
    this.diffuseGreen = 0;
    this.diffuseBlue = 0;

    this.setDiffuseRed = setDiffuseRed;
    this.setDiffuseGreen = setDiffuseGreen;
    this.setDiffuseBlue = setDiffuseBlue;

    this.specularRed = 0;
    this.specularGreen = 0;
    this.specularBlue = 0;

    this.setSpecularRed = setSpecularRed;
    this.setSpecularGreen = setSpecularGreen;
    this.setSpecularBlue = setSpecularBlue;

    this.shininess = 0;
    this.setShininess = setShininess;

}


function Light() {
    this.xPos = 0;
    this.yPos = 0;
    this.zPos = 0;

    this.setPos = setPos;

    this.ambientOn = 0;
    this.diffuseOn = 0;
    this.specularOn = 0;

    this.setSpecular = setSpecular;
    this.setAmbient = setAmbient;
    this.setDiffuse = setDiffuse;


    this.ambientRed = 0;
    this.ambientGreen = 0;
    this.ambientBlue = 0;

    this.setAmbientRed = setAmbientRed;
    this.setAmbientGreen = setAmbientGreen;
    this.setAmbientBlue = setAmbientBlue;

    this.diffuseRed = 0;
    this.diffuseGreen = 0;
    this.diffuseBlue = 0;

    this.setDiffuseRed = setDiffuseRed;
    this.setDiffuseGreen = setDiffuseGreen;
    this.setDiffuseBlue = setDiffuseBlue;

    this.specularRed = 0;
    this.specularGreen = 0;
    this.specularBlue = 0;

    this.setSpecularRed = setSpecularRed;
    this.setSpecularGreen = setSpecularGreen;
    this.setSpecularBlue = setSpecularBlue;

}

function setSpecular(onOff) {
    if (onOff === undefined) {
	onOff = 0;
    } 
    this.specularOn = onOff;
}


function setDiffuse(onOff) {
    if (onOff === undefined) {
	onOff = 0;
    } 
    this.diffuseOn = onOff;
}

function setAmbient(onOff) {
    if (onOff === undefined) {
	onOff = 0;
    } 
    this.ambientOn = onOff;
}


function setSpecular(onOff) {
    if (onOff === undefined) {
	onOff = 0;
    } 
    this.specularOn = onOff;
}

var modelMatrix = null; // probably need one modelMatrix per object ... 
var viewMatrix = null;
var modelviewMatrix = null;
var projectionMatrix = null; 


var pointsBuf = null;
var normalsBuf = null;

var u_modelviewMatrix = null;
var u_projectionMatrix = null;

var shapeCollection = [];


function start() {

	//console.log ("starting");
	

    canvas = document.getElementById( "gl-canvas" );
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );

    modelMatrix = new Matrix4();
    viewMatrix = new Matrix4();
    //modelviewMatrix = new Matrix4();
    projectionMatrix = new Matrix4(); 

    program = initShaders( gl, "vertex-shader", "fragment-shader" );  

    if (program === null){
       console.log("error in initShaders");
    }

    u_modelMatrix = gl.getUniformLocation(program, "u_modelMatrix");
    u_modelViewMatrix = gl.getUniformLocation(program, "u_modelViewMatrix");
    u_projectionMatrix = gl.getUniformLocation(program, "u_projectionMatrix");

    gl.useProgram( program );
    pointsBuf = gl.createBuffer();
    normalsBuf = gl.createBuffer();
    //console.log ("about to construct the lights");

    light1 = new Light();
    light2 = new Light();
    light3 = new Light();

    // initialise light1
    light1.setPos(1,1,1);
    light1.setAmbientRed(0.2);
    light1.setAmbientGreen(0.2);
    light1.setAmbientBlue(0.2);

    light1.setDiffuseRed(0.0);
    light1.setDiffuseGreen(0.0);
    light1.setDiffuseBlue(0.0);

    light1.setSpecularRed(0.0);
    light1.setDiffuseGreen(0.0);
    light1.setDiffuseBlue(0.0);

    light1.setAmbient(1);
    light1.setDiffuse(0);
    light1.setSpecular(0);

    // initialise light2

    light2.setPos(-1,-1,-1);
    light2.setAmbientRed(0.2);
    light2.setAmbientGreen(0.2);
    light2.setAmbientBlue(0.2);

    light2.setDiffuseRed(0.0);
    light2.setDiffuseGreen(0.5);
    light2.setDiffuseBlue(0.0);

    light2.setSpecularRed(0.0);
    light3.setDiffuseGreen(0.5);
    light2.setDiffuseBlue(0.0);

    light2.setAmbient(0);
    light2.setDiffuse(0);
    light2.setSpecular(1);



    light3.setPos(1,1,1);
    light3.setAmbientRed(0.2);
    light3.setAmbientGreen(0.2);
    light3.setAmbientBlue(0.2);

    light3.setDiffuseRed(0.5);
    light3.setDiffuseGreen(0.0);
    light3.setDiffuseBlue(0.0);

    light3.setSpecularRed(0.0);
    light3.setDiffuseGreen(0.5);
    light3.setDiffuseBlue(0.0);

    light3.setAmbient(0);
    light3.setDiffuse(1);
    light3.setSpecular(1);

    // console.log("calling setUpLights");
    setUpLights();
    // console.log("returned from setUpLights");


    //console.log("about to construct protoSphere");
    sphereProtoInstance = new protoSphere();
    sphereProtoInstance.setup();


    //console.log("about to construct protoCylinder");
    cylinderProtoInstance = new protoCylinder();
    cylinderProtoInstance.setup();


    // console.log("about to construct protoCone");
    coneProtoInstance = new protoCone();
    coneProtoInstance.setup();

    var cone1 = new Cone();

    
    cone1.setScale(0.2,0.2,0.2);
    cone1.setRotateAboutX(30);
    cone1.setRotateAboutZ(20);
    cone1.setPos(-3,1,0);


    cone1.setAmbientRed(0.3);
    cone1.setAmbientGreen(0.3);
    cone1.setAmbientBlue(0.3);

    cone1.setDiffuseRed(0.3);
    cone1.setDiffuseGreen(0.3);
    cone1.setDiffuseBlue(0.3);

    cone1.setSpecularRed(0.3);
    cone1.setSpecularGreen(0.3);
    cone1.setSpecularBlue(0.3);

    cone1.setShininess(20);


    shapeCollection.push(cone1);

    var cone2 = new Cone();


    cone2.setScale(0.1,0.2,0.1);
    cone2.setRotateAboutX(-20);
    cone2.setRotateAboutZ(30);
    cone2.setPos(-3,0,0);

    cone2.setAmbientRed(0.3);
    cone2.setAmbientGreen(0.3);
    cone2.setAmbientBlue(0.3);

    cone2.setDiffuseRed(0.3);
    cone2.setDiffuseGreen(0.3);
    cone2.setDiffuseBlue(0.3);

    cone2.setSpecularRed(0.3);
    cone2.setSpecularGreen(0.3);
    cone2.setSpecularBlue(0.3);

    cone2.setShininess(20);



   
    shapeCollection.push(cone2);




   var cylinder1 = new Cylinder();

   cylinder1.setScale(0.2,0.2,0.2);
   cylinder1.setRotateAboutX(-20);
   cylinder1.setRotateAboutY(30);
   cylinder1.setRotateAboutZ(30);
   cylinder1.setPos(0,0,0);


    cylinder1.setAmbientRed(0.3);
    cylinder1.setAmbientGreen(0.3);
    cylinder1.setAmbientBlue(0.3);

    cylinder1.setDiffuseRed(0.3);
    cylinder1.setDiffuseGreen(0.3);
    cylinder1.setDiffuseBlue(0.3);

    cylinder1.setSpecularRed(0.3);
    cylinder1.setSpecularGreen(0.3);
    cylinder1.setSpecularBlue(0.3);

    cylinder1.setShininess(20);





   shapeCollection.push(cylinder1);
   // console.log("cylinder 1 created");


   var sphere1 = new Sphere();

   sphere1.setScale(0.2,0.2,0.2);
   sphere1.setRotateAboutX(-20);
   sphere1.setRotateAboutY(30);
   sphere1.setRotateAboutZ(30);
   sphere1.setPos(3,0,0);

    sphere1.setAmbientRed(0.3);
    sphere1.setAmbientGreen(0.3);
    sphere1.setAmbientBlue(0.3);

    sphere1.setDiffuseRed(0.3);
    sphere1.setDiffuseGreen(0.3);
    sphere1.setDiffuseBlue(0.3);

    sphere1.setSpecularRed(0.3);
    sphere1.setSpecularGreen(0.3);
    sphere1.setSpecularBlue(0.3);

    sphere1.setShininess(20);

    shapeCollection.push(sphere1);

   // console.log("constructed initial shapes");

    gl.clearColor( 0.0, 0.0, 0.0, 1.0 ); // black background

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LESS);
    setupCamera();   
    setUpLights();

    var i = 0;
    console.log("about to draw starting shapes");
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
   console.log("top cap drawn");
   self.drawSphereWithoutCaps();
   console.log("sphere without caps drawn");
   self.drawBottomCap();
   console.log("bottom cap drawn");
}



function drawCylinderTop() {
	var self = this;
	var array32Pos; 
	var array32Norm;

	var light1Ambient = vec4(light1.ambientRed, light1.ambientGreen, light1.ambientBlue, 1.0);
	var light2Ambient = vec4(light2.ambientRed, light2.ambientGreen, light2.ambientBlue, 1.0);
	var light3Ambient = vec4(light3.ambientRed, light3.ambientGreen, light3.ambientBlue, 1.0);

	var modelViewMatrix = new Matrix4();
	var modelMatrix = new Matrix4();
	modelMatrix.scale(self.xScale, self.yScale, self.zScale);
	modelMatrix.rotate(self.rotateAboutX,1,0,0);
	modelMatrix.rotate(self.rotateAboutY, 0,1,0);
	modelMatrix.rotate(self.rotateAboutZ, 0,0,1);
	modelMatrix.translate(self.xPos, self.yPos, self.zPos);


	var materialAmbient = vec4( this.ambientRed, this.ambientGreen, this.ambientBlue, 1.0 );
	var materialDiffuse = vec4( this.diffuseRed, this.diffuseGreen, this.diffuseBlue, 1.0 );
	var materialSpecular = vec4( this.specularRed, this.specularGreen, this.specularBlue, 1.0 );
	var materialShininess = 20.0;

    	gl.uniform4fv( gl.getUniformLocation(program, "u_materialAmbient"),materialAmbient);
    	gl.uniform4fv( gl.getUniformLocation(program, "u_materialDiffuse"),materialDiffuse);
    	gl.uniform4fv( gl.getUniformLocation(program,"u_materialSpecular"),materialSpecular );
    	gl.uniform1f( gl.getUniformLocation(program,"u_shininess"),materialShininess );

	// console.log("cylinderProtoInstance.topFaceTriangleArray size", cylinderProtoInstance.topFaceTriangleArray.length);
	array32Pos = new Float32Array(flatten(cylinderProtoInstance.topFaceTriangleArray));
	// console.log("cylinder top array 32 size", array32Pos.length);
	gl.bindBuffer(gl.ARRAY_BUFFER, pointsBuf);
   	gl.bufferData(gl.ARRAY_BUFFER, array32Pos, gl.STATIC_DRAW);
	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.enableVertexAttribArray(vPosition);
        gl.vertexAttribPointer(vPosition, cylinderProtoInstance.topFaceTriangleArray[0].length, gl.FLOAT, false, 0, 0);


	// console.log("cylinderProtoInstance.topFaceNormals size", cylinderProtoInstance.topFaceNormals.length);
	array32Norm = new Float32Array(flatten(cylinderProtoInstance.topFaceNormals));
	// console.log("cylinder top array 32 Norm size", array32Norm.length);
	gl.bindBuffer(gl.ARRAY_BUFFER, normalsBuf);
   	gl.bufferData(gl.ARRAY_BUFFER, array32Norm, gl.STATIC_DRAW);
	var vNormal = gl.getAttribLocation(program, "vNormal");
	gl.enableVertexAttribArray(vNormal);
 	gl.vertexAttribPointer(vNormal, cylinderProtoInstance.topFaceNormals[0].length, gl.FLOAT, false, 0, 0);

   	gl.uniformMatrix4fv(u_modelMatrix, false, modelMatrix.elements);
   	modelViewMatrix.set(viewMatrix).multiply(modelMatrix);
   	gl.uniformMatrix4fv(u_modelViewMatrix, false, modelViewMatrix.elements);
   	gl.uniformMatrix4fv(u_projectionMatrix, false, projectionMatrix.elements);
// Now for the ambient, diffuse and specular material colours
// and also for the shininess ...

        
	var normalMatrix = new Matrix4();
	normalMatrix.set(modelViewMatrix);
	var transposeInverseNormal = new Matrix4();
	transposeInverseNormal.setInverseOf(normalMatrix).transpose();

	var nUniform = gl.getUniformLocation(program, "u_normalMatrix");
	gl.uniformMatrix4fv(nUniform, false, transposeInverseNormal.elements);


   	gl.drawArrays(gl.TRIANGLES, 0, cylinderProtoInstance.topFaceTriangleArray.length);

}


function drawCylinderBottom() {
	var self = this;
	var array32Pos; 
	var array32Norm; 
	var modelViewMatrix = new Matrix4();
	var modelMatrix = new Matrix4();

	modelMatrix.scale(self.xScale, self.yScale, self.zScale);
	modelMatrix.rotate(self.rotateAboutX,1,0,0);
	modelMatrix.rotate(self.rotateAboutY, 0,1,0);
	modelMatrix.rotate(self.rotateAboutZ, 0,0,1);
	modelMatrix.translate(self.xPos, self.yPos, self.zPos);

	var materialAmbient = vec4( this.ambientRed, this.ambientGreen, this.ambientBlue, 1.0 );
	var materialDiffuse = vec4( this.diffuseRed, this.diffuseGreen, this.diffuseBlue, 1.0 );
	var materialSpecular = vec4( this.specularRed, this.specularGreen, this.specularBlue, 1.0 );
	var materialShininess = 20.0;

    	gl.uniform4fv( gl.getUniformLocation(program, "u_materialAmbient"),materialAmbient );
    	gl.uniform4fv( gl.getUniformLocation(program, "u_materialDiffuse"),materialDiffuse );
    	gl.uniform4fv( gl.getUniformLocation(program,"u_materialSpecular"),materialSpecular );
    	gl.uniform1f( gl.getUniformLocation(program,"u_shininess"),materialShininess );


	array32Pos = new Float32Array(flatten(cylinderProtoInstance.bottomFaceTriangleArray));
	gl.bindBuffer(gl.ARRAY_BUFFER, pointsBuf);
   	gl.bufferData(gl.ARRAY_BUFFER, array32Pos, gl.STATIC_DRAW);
	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.enableVertexAttribArray(vPosition);
        gl.vertexAttribPointer(vPosition, cylinderProtoInstance.bottomFaceTriangleArray[0].length, gl.FLOAT, false, 0, 0);

	array32Norm = new Float32Array(flatten(cylinderProtoInstance.bottomFaceNormals));
	gl.bindBuffer(gl.ARRAY_BUFFER, normalsBuf);
   	gl.bufferData(gl.ARRAY_BUFFER, array32Norm, gl.STATIC_DRAW);
	var vNormal = gl.getAttribLocation(program, "vNormal");
	gl.enableVertexAttribArray(vNormal);
        gl.vertexAttribPointer(vNormal, cylinderProtoInstance.bottomFaceNormals[0].length, gl.FLOAT, false, 0, 0);

   	gl.uniformMatrix4fv(u_modelMatrix, false, modelMatrix.elements);   	
	modelViewMatrix.set(viewMatrix).multiply(modelMatrix);
   	gl.uniformMatrix4fv(u_modelViewMatrix, false, modelViewMatrix.elements);
   	gl.uniformMatrix4fv(u_projectionMatrix, false, projectionMatrix.elements);

	
	var normalMatrix = new Matrix4();
	normalMatrix.set(modelViewMatrix);
	var transposeInverseNormal = new Matrix4();
	transposeInverseNormal.setInverseOf(normalMatrix).transpose();

	var nUniform = gl.getUniformLocation(program, "u_normalMatrix");
	gl.uniformMatrix4fv(nUniform, false, transposeInverseNormal.elements);

   	gl.drawArrays(gl.TRIANGLES, 0, cylinderProtoInstance.bottomFaceTriangleArray.length);


}


function drawCylinderFace() {
	var self = this;
	var array32Pos; 
	var array32Norm; 

	var modelViewMatrix = new Matrix4();
	var modelMatrix = new Matrix4();
	modelMatrix.scale(self.xScale, self.yScale, self.zScale);
	modelMatrix.rotate(self.rotateAboutX,1,0,0);
	modelMatrix.rotate(self.rotateAboutY, 0,1,0);
	modelMatrix.rotate(self.rotateAboutZ, 0,0,1);
	modelMatrix.translate(self.xPos, self.yPos, self.zPos);

	var materialAmbient = vec4( this.ambientRed, this.ambientGreen, this.ambientBlue, 1.0 );
	var materialDiffuse = vec4( this.diffuseRed, this.diffuseGreen, this.diffuseBlue, 1.0 );
	var materialSpecular = vec4( this.specularRed, this.specularGreen, this.specularBlue, 1.0 );
	var materialShininess = 20.0;

    	gl.uniform4fv( gl.getUniformLocation(program, "u_materialAmbient"),materialAmbient );
    	gl.uniform4fv( gl.getUniformLocation(program, "u_materialDiffuse"),materialDiffuse );
    	gl.uniform4fv( gl.getUniformLocation(program,"u_materialSpecular"),materialSpecular );
    	gl.uniform1f( gl.getUniformLocation(program,"u_shininess"),materialShininess );



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

	//console.log("cylinderProtoInstance.cylinderFaceColors size", cylinderProtoInstance.cylinderFaceNormals.length);
	array32Norm = new Float32Array(flatten(cylinderProtoInstance.cylinderFaceNormals));
	gl.bindBuffer(gl.ARRAY_BUFFER, normalsBuf);
   	gl.bufferData(gl.ARRAY_BUFFER, array32Norm, gl.STATIC_DRAW);
	var vNormal = gl.getAttribLocation(program, "vNormal");
	gl.enableVertexAttribArray(vNormal);
        gl.vertexAttribPointer(vNormal, cylinderProtoInstance.cylinderFaceNormals[0].length, gl.FLOAT, false, 0, 0);

   	
   	gl.uniformMatrix4fv(u_modelMatrix, false, modelMatrix.elements);	
	modelViewMatrix.set(viewMatrix).multiply(modelMatrix);
   	gl.uniformMatrix4fv(u_modelViewMatrix, false, modelViewMatrix.elements);
   	gl.uniformMatrix4fv(u_projectionMatrix, false, projectionMatrix.elements);

	var normalMatrix = new Matrix4();
	normalMatrix.set(modelViewMatrix);
	var transposeInverseNormal = new Matrix4();
	transposeInverseNormal.setInverseOf(normalMatrix).transpose();

	var nUniform = gl.getUniformLocation(program, "u_normalMatrix");
	gl.uniformMatrix4fv(nUniform, false, transposeInverseNormal.elements);


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

	var materialAmbient = vec4( this.ambientRed, this.ambientGreen, this.ambientBlue, 1.0 );
	var materialDiffuse = vec4( this.diffuseRed, this.diffuseGreen, this.diffuseBlue, 1.0 );
	var materialSpecular = vec4( this.specularRed, this.specularGreen, this.specularBlue, 1.0 );
	var materialShininess = 20.0;

    	gl.uniform4fv( gl.getUniformLocation(program, "u_materialAmbient"),materialAmbient );
    	gl.uniform4fv( gl.getUniformLocation(program, "u_materialDiffuse"),materialDiffuse );
    	gl.uniform4fv( gl.getUniformLocation(program,"u_materialSpecular"),materialSpecular );
    	gl.uniform1f( gl.getUniformLocation(program,"u_shininess"),materialShininess );


	var array32Pos; 
	var array32Norm;
	// console.log("In drawConeBase");
	// console.log("Size of coneProtoInstance.coneBaseTriangles", coneProtoInstance.coneBaseTriangles.length);
	array32Pos = new Float32Array(flatten(coneProtoInstance.coneBaseTriangles));
	// console.log("Size of flattened coneProtoInstance.coneBaseTriangles", array32Pos.length);

	gl.bindBuffer(gl.ARRAY_BUFFER, pointsBuf);
   	gl.bufferData(gl.ARRAY_BUFFER, array32Pos, gl.STATIC_DRAW);
	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.enableVertexAttribArray(vPosition);
        gl.vertexAttribPointer(vPosition, coneProtoInstance.coneBaseTriangles[0].length, gl.FLOAT, false, 0, 0);

	array32Norm = new Float32Array(flatten(coneProtoInstance.coneBaseNormals));
	gl.bindBuffer(gl.ARRAY_BUFFER, normalsBuf);
   	gl.bufferData(gl.ARRAY_BUFFER, array32Norm, gl.STATIC_DRAW);

	var vNormal = gl.getAttribLocation(program, "vNormal");
	gl.enableVertexAttribArray(vNormal);
        gl.vertexAttribPointer(vNormal, coneProtoInstance.coneBaseNormals[0].length, gl.FLOAT, false, 0, 0);




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

	var normalMatrix = new Matrix4();
	normalMatrix.set(modelViewMatrix);
	var transposeInverseNormal = new Matrix4();
	transposeInverseNormal.setInverseOf(normalMatrix).transpose();

	var nUniform = gl.getUniformLocation(program, "u_normalMatrix");
	gl.uniformMatrix4fv(nUniform, false, transposeInverseNormal.elements);

   	gl.drawArrays(gl.TRIANGLES, 0, coneProtoInstance.coneBaseTriangles.length);

}


function drawConeFace() {
	var self = this;
	var array32Pos; 
	var array32Norm;	
	var modelViewMatrix = new Matrix4();
	var modelMatrix = new Matrix4();
	modelMatrix.scale(self.xScale, self.yScale, self.zScale);
	modelMatrix.rotate(self.rotateAboutX,1,0,0);
	modelMatrix.rotate(self.rotateAboutY, 0,1,0);
	modelMatrix.rotate(self.rotateAboutZ, 0,0,1);
	modelMatrix.translate(self.xPos, self.yPos, self.zPos);

	var materialAmbient = vec4( this.ambientRed, this.ambientGreen, this.ambientBlue, 1.0 );
	var materialDiffuse = vec4( this.diffuseRed, this.diffuseGreen, this.diffuseBlue, 1.0 );
	var materialSpecular = vec4( this.specularRed, this.specularGreen, this.specularBlue, 1.0 );
	var materialShininess = 20.0;

    	gl.uniform4fv( gl.getUniformLocation(program, "u_materialAmbient"),materialAmbient );
    	gl.uniform4fv( gl.getUniformLocation(program, "u_materialDiffuse"),materialDiffuse );
    	gl.uniform4fv( gl.getUniformLocation(program,"u_materialSpecular"),materialSpecular );
    	gl.uniform1f( gl.getUniformLocation(program,"u_shininess"),materialShininess );


	// console.log("In drawConeFace");
	// console.log("Size of coneProtoInstance.coneFaceTriangles", coneProtoInstance.coneFaceTriangles.length);
	array32Pos = new Float32Array(flatten(coneProtoInstance.coneFaceTriangles));
	// console.log("Size of flattened coneProtoInstance.coneFaceTriangles", array32Pos.length);
	gl.bindBuffer(gl.ARRAY_BUFFER, pointsBuf);
   	gl.bufferData(gl.ARRAY_BUFFER, array32Pos, gl.STATIC_DRAW);
	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.enableVertexAttribArray(vPosition);
        gl.vertexAttribPointer(vPosition, coneProtoInstance.coneFaceTriangles[0].length, gl.FLOAT, false, 0, 0);

	array32Norm = new Float32Array(flatten(coneProtoInstance.coneFaceVertexNormals));
	// console.log("Size of flattened coneProtoInstance.coneFaceVertexNormals", array32Norm.length);
	gl.bindBuffer(gl.ARRAY_BUFFER, normalsBuf);
   	gl.bufferData(gl.ARRAY_BUFFER, array32Norm, gl.STATIC_DRAW);
	var vNormal = gl.getAttribLocation(program, "vNormal");
	gl.enableVertexAttribArray(vNormal);
        gl.vertexAttribPointer(vNormal, coneProtoInstance.coneFaceVertexNormals[0].length, gl.FLOAT, false, 0, 0);



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

	var normalMatrix = new Matrix4();
	normalMatrix.set(modelViewMatrix);
	var transposeInverseNormal = new Matrix4();
	transposeInverseNormal.setInverseOf(normalMatrix).transpose();

	var nUniform = gl.getUniformLocation(program, "u_normalMatrix");
	gl.uniformMatrix4fv(nUniform, false, transposeInverseNormal.elements);

   	gl.drawArrays(gl.TRIANGLES, 0, coneProtoInstance.coneFaceTriangles.length);

}


function drawTopCap(){

	var self = this;
	var array32Pos; 
	var array32Norm;	
	var modelViewMatrix = new Matrix4();
	var modelMatrix = new Matrix4();
	modelMatrix.scale(self.xScale, self.yScale, self.zScale);
	modelMatrix.rotate(self.rotateAboutX,1,0,0);
	modelMatrix.rotate(self.rotateAboutY, 0,1,0);
	modelMatrix.rotate(self.rotateAboutZ, 0,0,1);
	modelMatrix.translate(self.xPos, self.yPos, self.zPos);

	var materialAmbient = vec4( this.ambientRed, this.ambientGreen, this.ambientBlue, 1.0 );
	var materialDiffuse = vec4( this.diffuseRed, this.diffuseGreen, this.diffuseBlue, 1.0 );
	var materialSpecular = vec4( this.specularRed, this.specularGreen, this.specularBlue, 1.0 );
	var materialShininess = 20.0;

    	gl.uniform4fv( gl.getUniformLocation(program, "u_materialAmbient"),materialAmbient );
    	gl.uniform4fv( gl.getUniformLocation(program, "u_materialDiffuse"),materialDiffuse );
    	gl.uniform4fv( gl.getUniformLocation(program,"u_materialSpecular"),materialSpecular );
    	gl.uniform1f( gl.getUniformLocation(program,"u_shininess"),materialShininess );


	//console.log("sphereProtoInstance.topCapTriangles size", sphereProtoInstance.topCapTriangles.length);

	array32Pos = new Float32Array(flatten(sphereProtoInstance.topCapTriangles));
	gl.bindBuffer(gl.ARRAY_BUFFER, pointsBuf);
   	gl.bufferData(gl.ARRAY_BUFFER, array32Pos, gl.STATIC_DRAW);
	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.enableVertexAttribArray(vPosition);
        gl.vertexAttribPointer(vPosition, sphereProtoInstance.topCapTriangles[0].length, gl.FLOAT, false, 0, 0);

	array32Norm = new Float32Array(flatten(sphereProtoInstance.topCapNormals));
	gl.bindBuffer(gl.ARRAY_BUFFER, normalsBuf);
   	gl.bufferData(gl.ARRAY_BUFFER, array32Norm, gl.STATIC_DRAW);
	var vNormal = gl.getAttribLocation(program, "vNormal");
	gl.enableVertexAttribArray(vNormal);
        gl.vertexAttribPointer(vNormal, sphereProtoInstance.topCapNormals[0].length, gl.FLOAT, false, 0, 0);

	gl.uniformMatrix4fv(u_modelMatrix, false, modelMatrix.elements);  	
	modelViewMatrix.set(viewMatrix).multiply(modelMatrix);
   	gl.uniformMatrix4fv(u_modelViewMatrix, false, modelViewMatrix.elements);
   	gl.uniformMatrix4fv(u_projectionMatrix, false, projectionMatrix.elements);

	var normalMatrix = new Matrix4();
	normalMatrix.set(modelViewMatrix);
	var transposeInverseNormal = new Matrix4();
	transposeInverseNormal.setInverseOf(normalMatrix).transpose();

	var nUniform = gl.getUniformLocation(program, "u_normalMatrix");
	gl.uniformMatrix4fv(nUniform, false, transposeInverseNormal.elements);


   	gl.drawArrays(gl.TRIANGLES, 0, sphereProtoInstance.topCapTriangles.length);
}


function drawSphereWithoutCaps() {
	var self = this;
	var array32Pos; 
	var array32Norm;	

	var modelViewMatrix = new Matrix4();
	var modelMatrix = new Matrix4();

	modelMatrix.scale(self.xScale, self.yScale, self.zScale);
	modelMatrix.rotate(self.rotateAboutX,1,0,0);
	modelMatrix.rotate(self.rotateAboutY, 0,1,0);
	modelMatrix.rotate(self.rotateAboutZ, 0,0,1);
	modelMatrix.translate(self.xPos, self.yPos, self.zPos);

	var materialAmbient = vec4( this.ambientRed, this.ambientGreen, this.ambientBlue, 1.0 );
	var materialDiffuse = vec4( this.diffuseRed, this.diffuseGreen, this.diffuseBlue, 1.0 );
	var materialSpecular = vec4( this.specularRed, this.specularGreen, this.specularBlue, 1.0 );
	var materialShininess = 20.0;

    	gl.uniform4fv( gl.getUniformLocation(program, "u_materialAmbient"),materialAmbient);
    	gl.uniform4fv( gl.getUniformLocation(program, "u_materialDiffuse"),materialDiffuse );
    	gl.uniform4fv( gl.getUniformLocation(program,"u_materialSpecular"),materialSpecular );
    	gl.uniform1f( gl.getUniformLocation(program,"u_shininess"),materialShininess );


	//console.log("sphereProtoInstance.protoSphereMinusCapsArray size", sphereProtoInstance.protoSphereMinusCapsArray.length);

	array32Pos = new Float32Array(flatten(sphereProtoInstance.protoSphereMinusCapsArray));
	//console.log("array32Pos initialised");
	gl.bindBuffer(gl.ARRAY_BUFFER, pointsBuf);
   	gl.bufferData(gl.ARRAY_BUFFER, array32Pos, gl.STATIC_DRAW);
	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.enableVertexAttribArray(vPosition);
        gl.vertexAttribPointer(vPosition, sphereProtoInstance.protoSphereMinusCapsArray[0].length, gl.FLOAT, false, 0, 0);

	array32Norm = new Float32Array(flatten(sphereProtoInstance.protoSphereMinusCapsNormals));
	//console.log("array32Norm initialised");
	gl.bindBuffer(gl.ARRAY_BUFFER, normalsBuf);
   	gl.bufferData(gl.ARRAY_BUFFER, array32Norm, gl.STATIC_DRAW);
	var vNormal = gl.getAttribLocation(program, "vNormal");
	gl.enableVertexAttribArray(vNormal);
        gl.vertexAttribPointer(vNormal, sphereProtoInstance.protoSphereMinusCapsNormals[0].length, gl.FLOAT, false, 0, 0);

	gl.uniformMatrix4fv(u_modelMatrix, false, modelMatrix.elements);  	
	modelViewMatrix.set(viewMatrix).multiply(modelMatrix);
   	gl.uniformMatrix4fv(u_modelViewMatrix, false, modelViewMatrix.elements);
   	gl.uniformMatrix4fv(u_projectionMatrix, false, projectionMatrix.elements);

	var normalMatrix = new Matrix4();
	normalMatrix.set(modelViewMatrix);
	var transposeInverseNormal = new Matrix4();
	transposeInverseNormal.setInverseOf(normalMatrix).transpose();

	var nUniform = gl.getUniformLocation(program, "u_normalMatrix");
	gl.uniformMatrix4fv(nUniform, false, transposeInverseNormal.elements);

   	gl.drawArrays(gl.TRIANGLES, 0, sphereProtoInstance.protoSphereMinusCapsArray.length);
}


function drawBottomCap() {
	var self = this;
	var array32Pos; 
	var array32Norm;	
	var modelViewMatrix = new Matrix4();
	var modelMatrix = new Matrix4();
	modelMatrix.scale(self.xScale, self.yScale, self.zScale);
	modelMatrix.rotate(self.rotateAboutX,1,0,0);
	modelMatrix.rotate(self.rotateAboutY, 0,1,0);
	modelMatrix.rotate(self.rotateAboutZ, 0,0,1);
	modelMatrix.translate(self.xPos, self.yPos, self.zPos);

	var materialAmbient = vec4( this.ambientRed, this.ambientGreen, this.ambientBlue, 1.0 );
	var materialDiffuse = vec4( this.diffuseRed, this.diffuseGreen, this.diffuseBlue, 1.0 );
	var materialSpecular = vec4( this.specularRed, this.specularGreen, this.specularBlue, 1.0 );
	var materialShininess = 20.0;

    	gl.uniform4fv( gl.getUniformLocation(program, "u_materialAmbient"),materialAmbient );
    	gl.uniform4fv( gl.getUniformLocation(program, "u_materialDiffuse"),materialDiffuse );
    	gl.uniform4fv( gl.getUniformLocation(program,"u_materialSpecular"),materialSpecular );
    	gl.uniform1f( gl.getUniformLocation(program,"u_shininess"),materialShininess );


	//console.log("sphereProtoInstance.bottomCapTriangles size", sphereProtoInstance.bottomCapTriangles.length);

	array32Pos = new Float32Array(flatten(sphereProtoInstance.bottomCapTriangles));
	gl.bindBuffer(gl.ARRAY_BUFFER, pointsBuf);
   	gl.bufferData(gl.ARRAY_BUFFER, array32Pos, gl.STATIC_DRAW);
	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.enableVertexAttribArray(vPosition);
        gl.vertexAttribPointer(vPosition, sphereProtoInstance.bottomCapTriangles[0].length, gl.FLOAT, false, 0, 0);

	array32Norm = new Float32Array(flatten(sphereProtoInstance.bottomCapNormals));
	gl.bindBuffer(gl.ARRAY_BUFFER, pointsBuf);
   	gl.bufferData(gl.ARRAY_BUFFER, array32Norm, gl.STATIC_DRAW);
	var vNormal = gl.getAttribLocation(program, "vNormal");
	gl.enableVertexAttribArray(vNormal);
        gl.vertexAttribPointer(vNormal, sphereProtoInstance.bottomCapNormals[0].length, gl.FLOAT, false, 0, 0);

	gl.uniformMatrix4fv(u_modelMatrix, false, modelMatrix.elements);  	
	modelViewMatrix.set(viewMatrix).multiply(modelMatrix);
   	gl.uniformMatrix4fv(u_modelViewMatrix, false, modelViewMatrix.elements);
   	gl.uniformMatrix4fv(u_projectionMatrix, false, projectionMatrix.elements);

	//var normalMatrix = mat3.create();
    	//mat4.toInverseMat3(modelViewMatrix, normalMatrix);
    	//mat3.transpose(normalMatrix);

	var normalMatrix = new Matrix4();
	normalMatrix.set(modelViewMatrix);
	var transposeInverseNormal = new Matrix4();
	transposeInverseNormal.setInverseOf(normalMatrix).transpose();

	var nUniform = gl.getUniformLocation(program, "u_normalMatrix");
	gl.uniformMatrix4fv(nUniform, false, transposeInverseNormal.elements);


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
	nextObject.setPos(xPos,yPos,zPos);

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


function setUpLights()
{
    // console.log ("setUpLights");
    var light1Position = vec4(light1.xPos, light1.yPos, light1.zPos, 0.0);
    var light2Position = vec4(light2.xPos, light2.yPos, light2.zPos, 0.0);
    var light3Position = vec4(light3.xPos, light3.yPos, light3.zPos, 0.0);


    gl.uniform4fv( gl.getUniformLocation(program,"u_light1Position"),light1Position );
    gl.uniform4fv( gl.getUniformLocation(program,"u_light2Position"),light2Position );
    gl.uniform4fv( gl.getUniformLocation(program,"u_light3Position"),light3Position );


	var light1Ambient = vec4( light1.ambientRed, light1.ambientGreen, light1.ambientBlue, 1.0 );
	var light1Diffuse = vec4( light1.diffuseRed, light1.diffuseGreen,light1.diffuseBlue, 1.0 );
	var light1Specular = vec4(light1.specularRed, light1.specularGreen, light1.specularBlue,1.0 );


        gl.uniform4fv( gl.getUniformLocation(program, "u_light1Ambient"),light1Ambient );
        gl.uniform4fv( gl.getUniformLocation(program, "u_light1Diffuse"),light1Diffuse );
        gl.uniform4fv( gl.getUniformLocation(program,"u_light1Specular"),light1Specular );


	var light2Ambient = vec4( light2.ambientRed, light2.ambientGreen, light2.ambientBlue, 1.0 );
	var light2Diffuse = vec4( light2.diffuseRed, light2.diffuseGreen,light2.diffuseBlue, 1.0 );
	var light2Specular = vec4(light2.specularRed, light2.specularGreen, light2.specularBlue,1.0 );

        gl.uniform4fv( gl.getUniformLocation(program, "u_light2Ambient"),light2Ambient );
        gl.uniform4fv( gl.getUniformLocation(program, "u_light2Diffuse"),light2Diffuse );
        gl.uniform4fv( gl.getUniformLocation(program,"u_light2Specular"),light2Specular );


	var light3Ambient = vec4( light2.ambientRed, light2.ambientGreen, light2.ambientBlue, 1.0 );
	var light3Diffuse = vec4( light2.diffuseRed, light2.diffuseGreen,light2.diffuseBlue, 1.0 );
	var light3Specular = vec4(light2.specularRed, light2.specularGreen, light2.specularBlue,1.0 );

        gl.uniform4fv( gl.getUniformLocation(program, "u_light3Ambient"),light3Ambient );
        gl.uniform4fv( gl.getUniformLocation(program, "u_light3Diffuse"),light3Diffuse );
        gl.uniform4fv( gl.getUniformLocation(program,"u_light3Specular"),light3Specular );


	var light1Mix = vec3(light1.ambientOn, light1.diffuseOn, light1.specularOn);
	var light2Mix = vec3(light2.ambientOn, light2.diffuseOn, light2.specularOn);
	var light3Mix = vec3(light3.ambientOn, light3.diffuseOn, light3.specularOn);


        gl.uniform3fv( gl.getUniformLocation(program, "u_light1Mix"),light1Mix );
        gl.uniform3fv( gl.getUniformLocation(program, "u_light2Mix"),light2Mix );
        gl.uniform3fv( gl.getUniformLocation(program, "u_light3Mix"),light3Mix );

}

window.onload = start;

