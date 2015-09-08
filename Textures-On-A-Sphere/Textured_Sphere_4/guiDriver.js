var textureCoordCalculationType = 1 ;  // 1 is LatLong, 2 is XZ

// 1 is Checkerboard - Texture Computed in situ using Javascript
// 2 Checkerboard - Checkerboard supplied as a .jpg image
// 3 Checkerboard - Textured supplied using a raw RGBA binary file
// 4 Texture applied from a moon.jpg image
// 5 Texture applied from an earth.jpg image

var textureType = "1";
var oldTextureType = "1";
var textureApplicationType = "1";
var lastX = null;
var lastY = null;
var stepRot = 2; // in degrees
var sphereRotationMatrix = mat4.create();
mat4.identity(sphereRotationMatrix);

function applyLatLongTextureAndUpdateDisplay() {
	oldTextureType = textureType;
	textureType = document.getElementById("textureSelect").value;
	textureApplicationType = "1";
	console.log("LatLong Texture to be used");
	console.log("textureType ", textureType);
}



function applyXZTextureAndUpdateDisplay() {
	textureType = document.getElementById("textureSelect").value;
	textureApplicationType = "2";
	console.log("XZ Texture to be used");
	console.log("textureType ", textureType);
}


function updateModelMatrixRightAndUpdateDisplay() {
        var newRotationMatrix = mat4.create();
        mat4.identity(newRotationMatrix);
        mat4.rotate(newRotationMatrix, degToRad(stepRot), [0, 1, 0]);
        mat4.multiply(newRotationMatrix, sphereRotationMatrix, sphereRotationMatrix);
        lastX = lastX + stepRot;
	drawScene();
	//console.log("rotation step to right");
}



function updateModelMatrixLeftAndUpdateDisplay() {
        var newRotationMatrix = mat4.create();
        mat4.identity(newRotationMatrix);
        mat4.rotate(newRotationMatrix, degToRad(-stepRot), [0, 1, 0]);
        mat4.multiply(newRotationMatrix, sphereRotationMatrix, sphereRotationMatrix);
        lastX = lastX + stepRot;
	drawScene();
	//console.log("rotation step to left");

}


function updateModelMatrixUpAndUpdateDisplay() {
        var newRotationMatrix = mat4.create();
        mat4.identity(newRotationMatrix);
        mat4.rotate(newRotationMatrix, degToRad(-stepRot), [1, 0, 0]);
        mat4.multiply(newRotationMatrix, sphereRotationMatrix, sphereRotationMatrix);
        lastX = lastX + stepRot;
	drawScene();
	//console.log("rotation step up");
}


function updateModelMatrixDownAndUpdateDisplay() {
        var newRotationMatrix = mat4.create();
        mat4.identity(newRotationMatrix);
        mat4.rotate(newRotationMatrix, degToRad(stepRot), [1, 0, 0]);
        mat4.multiply(newRotationMatrix, sphereRotationMatrix, sphereRotationMatrix);
        lastX = lastX + stepRot;
	drawScene();
	//console.log("rotation step down");
}
