// No colours assigned explicitly ... because lighting material properties will be used to 
// render the various facets ...
// Normals arrays are constructed ..


var coneFaceVertexNormals = [];
var coneBaseNormals = []; 


var spokeEnds = [];
var granularity = 60;
var circleFace = [];
var coneFaceTriangles = [];
var coneBaseTriangles = [];





var centre = vec3(0,0,0);

function generateProtoRimVertices() {
	var i;
	var radians = 0;
	var stepAngle = 360 / granularity;
	for (i = 0; i < granularity; i++) {
		radians = 2 * Math.PI * stepAngle * i / 360;
		spokeEnds.push(vec3(Math.cos(radians), 0, Math.sin(radians)));
	}
}

function generateProtoConeFaceTriangles() {
	var i;
	var surfaceNormal;
	var n1;
	var n2;

	for (i = 0; i < granularity - 1; i++) {
		coneFaceTriangles.push(vec3(0,1,0));		
		coneFaceTriangles.push(spokeEnds[i]);
		coneFaceTriangles.push(spokeEnds[i+1]);

		n1 = vec3(spokeEnds[i][0], 1,spokeEnds[i][2]);
		n2 = vec3(spokeEnds[i+1][0],1,spokeEnds[i+1][2]);
		coneFaceVertexNormals.push(normalize(add(n1,n2)));
		coneFaceVertexNormals.push(normalize(n1));
		coneFaceVertexNormals.push(normalize(n2));
	}
// join up the ends ...
	coneFaceTriangles.push(vec3(0,1,0));
	coneFaceTriangles.push(spokeEnds[granularity -1]);
	coneFaceTriangles.push(spokeEnds[0]);

	n1 = vec3(spokeEnds[granularity -1][0], 1,spokeEnds[granularity -1][2]);
	n2 = vec3(spokeEnds[0][0],1,spokeEnds[0][2]);
	coneFaceVertexNormals.push(normalize(add(n1,n2)));
	coneFaceVertexNormals.push(normalize(n1));
	coneFaceVertexNormals.push(normalize(n2));
}

function generateProtoConeBase() {
	var i;
	for (i = 0; i < granularity - 1; i++) {
		coneBaseTriangles.push(vec3(0,0,0));		
		coneBaseTriangles.push(spokeEnds[i]);
		coneBaseTriangles.push(spokeEnds[i+1]);

		coneBaseNormals.push(normalize(vec3(0,-1,0)));
		coneBaseNormals.push(normalize(vec3(0,-1,0)));
		coneBaseNormals.push(normalize(vec3(0,-1,0)));
		
	}
// join up the ends ...
	coneBaseTriangles.push(vec3(0,0,1));
	coneBaseTriangles.push(spokeEnds[granularity -1]);
	coneBaseTriangles.push(spokeEnds[0]);

	coneBaseNormals.push(normalize(vec3(0,-1,0)));
	coneBaseNormals.push(normalize(vec3(0,-1,0)));
	coneBaseNormals.push(normalize(vec3(0,-1,0)));
}


function SetupProtoCone() {
	// console.log("in setup proto cone");
	generateProtoRimVertices();
	// console.log("generated proto rim vertices");
	generateProtoConeBase();
	// console.log("generated proto cone base");
	generateProtoConeFaceTriangles();
	// console.log("generated cone face triangles");
}

function protoCone() {

	this.setup = SetupProtoCone;

	this.coneFaceTriangles = coneFaceTriangles;
	this.coneBaseTriangles = coneBaseTriangles;
	this.coneFaceVertexNormals = coneFaceVertexNormals;
	this.coneBaseNormals = coneBaseNormals;

}




