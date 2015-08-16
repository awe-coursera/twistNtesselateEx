// y axis is the vertical axis
// protoCylinder has height 1 unit
// protoCylinder has radius 1 unit

var spokeEnds = [];
var granularity = 60;
var cylinderFaceTriangleArray = [];
var cylinderFaceColors = [];
var topFaceTriangleArray = [];
var bottomFaceTriangleArray = [];
var topFaceColors = [];
var bottomFaceColors = [];

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
		color = [Math.random(), Math.random(), Math.random()];
		topFaceColors.push(color);
		topFaceColors.push(color);
		topFaceColors.push(color);
	}
// join up the ends 
	topFaceTriangleArray.push(topFaceCentre);
	topFaceTriangleArray.push(vec3(spokeEnds[granularity -1][0], 1, spokeEnds[granularity -1][2]));
	topFaceTriangleArray.push(vec3(spokeEnds[0][0], 1, spokeEnds[0][2]));
	color = [Math.random(), Math.random(), Math.random()];
	topFaceColors.push(color);
	topFaceColors.push(color);
	topFaceColors.push(color);

}

function generateProtoBottomFaceTriangles() {
	var i;
	for (i = 0; i < granularity-1; i++) {
		bottomFaceTriangleArray.push(bottomFaceCentre);
		bottomFaceTriangleArray.push(vec3(spokeEnds[i][0], 0, spokeEnds[i][2]));
		bottomFaceTriangleArray.push(vec3(spokeEnds[i+1][0], 0, spokeEnds[i+1][2]));
		color = [Math.random(), Math.random(), Math.random()];
		bottomFaceColors.push(color);
		bottomFaceColors.push(color);
		bottomFaceColors.push(color);
	}
// join up the ends 
	bottomFaceTriangleArray.push(topFaceCentre);
	bottomFaceTriangleArray.push(vec3(spokeEnds[granularity -1][0], 0, spokeEnds[granularity -1][2]));
	bottomFaceTriangleArray.push(vec3(spokeEnds[0][0], 0, spokeEnds[0][2]));
	color = [Math.random(), Math.random(), Math.random()];
	bottomFaceColors.push(color);
	bottomFaceColors.push(color);
	bottomFaceColors.push(color);
}



function generateProtoCylinderFaceTriangles() {
	var i;
	for (i = 0; i < granularity-1; i++) {
		cylinderFaceTriangleArray.push(vec3(spokeEnds[i][0], 1, spokeEnds[i][2]));
		cylinderFaceTriangleArray.push(vec3(spokeEnds[i][0], 0, spokeEnds[i][2]));
		cylinderFaceTriangleArray.push(vec3(spokeEnds[i+1][0], 0, spokeEnds[i+1][2]));
		color = [Math.random(), Math.random(), Math.random()];
		cylinderFaceColors.push(color);
		cylinderFaceColors.push(color);
		cylinderFaceColors.push(color);
		cylinderFaceTriangleArray.push(vec3(spokeEnds[i][0], 1, spokeEnds[i][2]));
		cylinderFaceTriangleArray.push(vec3(spokeEnds[i+1][0], 1, spokeEnds[i+1][2]));
		cylinderFaceTriangleArray.push(vec3(spokeEnds[i+1][0], 0, spokeEnds[i+1][2]));
		color = [Math.random(), Math.random(), Math.random()];
		cylinderFaceColors.push(color);
		cylinderFaceColors.push(color);
		cylinderFaceColors.push(color);
	}
// join up the ends 
	cylinderFaceTriangleArray.push(vec3(spokeEnds[granularity -1 ][0], 1, spokeEnds[granularity -1][2]));
	cylinderFaceTriangleArray.push(vec3(spokeEnds[granularity -1][0], 0, spokeEnds[granularity -1][2]));
	cylinderFaceTriangleArray.push(vec3(spokeEnds[0][0], 0, spokeEnds[0][2]));
	color = [Math.random(), Math.random(), Math.random()];
	cylinderFaceColors.push(color);
	cylinderFaceColors.push(color);
	cylinderFaceColors.push(color);
	cylinderFaceTriangleArray.push(vec3(spokeEnds[granularity -1][0], 1, spokeEnds[granularity -1][2]));
	cylinderFaceTriangleArray.push(vec3(spokeEnds[0][0], 1, spokeEnds[0][2]));
	cylinderFaceTriangleArray.push(vec3(spokeEnds[0][0], 0, spokeEnds[0][2]));
	color = [Math.random(), Math.random(), Math.random()];
	cylinderFaceColors.push(color);
	cylinderFaceColors.push(color);
	cylinderFaceColors.push(color);
}

/// Now for the proto cylinder class .. 


function SetupProtoCylinder() {
	generateProtoRimVertices();
	generateProtoBottomFaceTriangles();
	generateProtoTopFaceTriangles();	
	generateProtoCylinderFaceTriangles(); 
}

function protoCylinder() {
	this.setup = SetupProtoCylinder;

	this.cylinderFaceTriangleArray = cylinderFaceTriangleArray;
	this.cylinderFaceColors = cylinderFaceColors;
	this.topFaceTriangleArray = topFaceTriangleArray;
	this.bottomFaceTriangleArray = bottomFaceTriangleArray;
	this.topFaceColors = topFaceColors;
	this.bottomFaceColors = bottomFaceColors;
}



