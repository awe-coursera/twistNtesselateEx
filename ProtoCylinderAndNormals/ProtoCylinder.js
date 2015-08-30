// y axis is the vertical axis
// protoCylinder has height 1 unit
// protoCylinder has radius 1 unit
// proto Cylinder and normals ... 
// No colours assigned explicitly ... because lighting material properties will be used to 
// render the various facets ...
// Normals arrays are constructed ... 


var vertexNormals = []; 

var spokeEnds = [];
var granularity = 60;
var cylinderFaceTriangleArray = [];
var topFaceTriangleArray = [];
var bottomFaceTriangleArray = [];
var cylinderFaceNormals = [];
var topFaceNormals = [];
var bottomFaceNormals = [];

var bottomFaceCentre = vec3(0,0,0);
var topFaceCentre = vec3(0,1,0);


function generateProtoRimVertices() {
	var i;
	var radians = 0;
	var stepAngle = 360 / granularity;
	for (i = 0; i < granularity; i++) {
		radians = 2 * Math.PI * stepAngle * i / 360;
		spokeEnds.push(vec3(Math.cos(radians), 0, Math.sin(radians)));
	}
}

function generateProtoTopFaceTriangles() {
	var i;
	for (i = 0; i < granularity-1; i++) {
		topFaceTriangleArray.push(topFaceCentre);
		topFaceTriangleArray.push(vec3(spokeEnds[i][0], 1, spokeEnds[i][2]));
		topFaceTriangleArray.push(vec3(spokeEnds[i+1][0], 1, spokeEnds[i+1][2]));
		topFaceNormals.push(vec3(0,1,0));
		topFaceNormals.push(vec3(0,1,0));
		topFaceNormals.push(vec3(0,1,0));
	}
// join up the ends 
	topFaceTriangleArray.push(topFaceCentre);
	topFaceTriangleArray.push(vec3(spokeEnds[granularity -1][0], 1, spokeEnds[granularity -1][2]));
	topFaceTriangleArray.push(vec3(spokeEnds[0][0], 1, spokeEnds[0][2]));

	topFaceNormals.push(vec3(0,1,0));
	topFaceNormals.push(vec3(0,1,0));
	topFaceNormals.push(vec3(0,1,0));
}

function generateProtoBottomFaceTriangles() {
	var i;
	for (i = 0; i < granularity-1; i++) {
		bottomFaceTriangleArray.push(bottomFaceCentre);
		bottomFaceTriangleArray.push(vec3(spokeEnds[i][0], 0, spokeEnds[i][2]));
		bottomFaceTriangleArray.push(vec3(spokeEnds[i+1][0], 0, spokeEnds[i+1][2]));

		bottomFaceNormals.push(vec3(0,-1,0));
		bottomFaceNormals.push(vec3(0,-1,0));
		bottomFaceNormals.push(vec3(0,-1,0));
	}
// join up the ends 
	bottomFaceTriangleArray.push(topFaceCentre);
	bottomFaceTriangleArray.push(vec3(spokeEnds[granularity -1][0], 0, spokeEnds[granularity -1][2]));
	bottomFaceTriangleArray.push(vec3(spokeEnds[0][0], 0, spokeEnds[0][2]));

	bottomFaceNormals.push(vec3(0,-1,0));
	bottomFaceNormals.push(vec3(0,-1,0));
	bottomFaceNormals.push(vec3(0,-1,0));
}



function generateProtoCylinderFaceTriangles() {
	var i;
	for (i = 0; i < granularity-1; i++) {
		cylinderFaceTriangleArray.push(vec3(spokeEnds[i][0], 1, spokeEnds[i][2]));
		cylinderFaceTriangleArray.push(vec3(spokeEnds[i][0], 0, spokeEnds[i][2]));
		cylinderFaceTriangleArray.push(vec3(spokeEnds[i+1][0], 0, spokeEnds[i+1][2]));

		cylinderFaceNormals.push(vec3(spokeEnds[i][0], 0, spokeEnds[i][2]));
		cylinderFaceNormals.push(vec3(spokeEnds[i][0], 0, spokeEnds[i][2]));
		cylinderFaceNormals.push(vec3(spokeEnds[i+1][0], 0, spokeEnds[i+1][2]));


		cylinderFaceTriangleArray.push(vec3(spokeEnds[i][0], 1, spokeEnds[i][2]));
		cylinderFaceTriangleArray.push(vec3(spokeEnds[i+1][0], 1, spokeEnds[i+1][2]));
		cylinderFaceTriangleArray.push(vec3(spokeEnds[i+1][0], 0, spokeEnds[i+1][2]));
		//color = [Math.random(), Math.random(), Math.random()];

		cylinderFaceNormals.push(vec3(spokeEnds[i][0], 0, spokeEnds[i][2]));
		cylinderFaceNormals.push(vec3(spokeEnds[i][0], 0, spokeEnds[i][2]));
		cylinderFaceNormals.push(vec3(spokeEnds[i+1][0], 0, spokeEnds[i+1][2]));
	}
// join up the ends 
	cylinderFaceTriangleArray.push(vec3(spokeEnds[granularity -1 ][0], 1, spokeEnds[granularity -1][2]));
	cylinderFaceTriangleArray.push(vec3(spokeEnds[granularity -1][0], 0, spokeEnds[granularity -1][2]));
	cylinderFaceTriangleArray.push(vec3(spokeEnds[0][0], 0, spokeEnds[0][2]));

	cylinderFaceNormals.push(vec3(spokeEnds[granularity -1 ][0], 0, spokeEnds[granularity -1][2]));
	cylinderFaceNormals.push(vec3(spokeEnds[granularity -1][0], 0, spokeEnds[granularity -1][2]));
	cylinderFaceNormals.push(vec3(spokeEnds[0][0], 0, spokeEnds[0][2]));

	cylinderFaceTriangleArray.push(vec3(spokeEnds[granularity -1][0], 1, spokeEnds[granularity -1][2]));
	cylinderFaceTriangleArray.push(vec3(spokeEnds[0][0], 1, spokeEnds[0][2]));
	cylinderFaceTriangleArray.push(vec3(spokeEnds[0][0], 0, spokeEnds[0][2]));

	cylinderFaceNormals.push(vec3(spokeEnds[granularity -1][0], 0, spokeEnds[granularity -1][2]));
	cylinderFaceNormals.push(vec3(spokeEnds[0][0], 0, spokeEnds[0][2]));
	cylinderFaceNormals.push(vec3(spokeEnds[0][0], 0, spokeEnds[0][2]));
}

/// Now for the proto cylinder class .. 


function SetupProtoCylinder() {
	generateProtoRimVertices();
	//console.log("generatedProtoRimVertices");
	generateProtoBottomFaceTriangles();
	//console.log("generatedProtoBottomFaceTriangles");
	generateProtoTopFaceTriangles();
	//console.log("generatedProtoTopFaceTriangles");	
	generateProtoCylinderFaceTriangles(); 
	//console.log("generatedProtoCylinderFaceTriangles");
}

function protoCylinder() {
	this.setup = SetupProtoCylinder;

	this.cylinderFaceTriangleArray = cylinderFaceTriangleArray;
	this.cylinderFaceNormals = cylinderFaceNormals;

	this.topFaceTriangleArray = topFaceTriangleArray;
	this.bottomFaceTriangleArray = bottomFaceTriangleArray;
	this.topFaceNormals = topFaceNormals;
	this.bottomFaceNormals = bottomFaceNormals;

}



