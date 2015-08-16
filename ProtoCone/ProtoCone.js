var spokeEnds = [];
var granularity = 60;
var circleFace = [];
var coneFaceTriangles = [];
var coneBaseTriangles = [];
var coneFaceColors = [];
var coneBaseColors = [];




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

	for (i = 0; i < granularity - 1; i++) {
		coneFaceTriangles.push(vec3(0,1,0));		
		coneFaceTriangles.push(spokeEnds[i]);
		coneFaceTriangles.push(spokeEnds[i+1]);
		color = [Math.random(), Math.random(), Math.random()];
		coneFaceColors.push(color);
		coneFaceColors.push(color);
		coneFaceColors.push(color);
	}
// join up the ends ...
	coneFaceTriangles.push(vec3(0,1,0));
	coneFaceTriangles.push(spokeEnds[granularity -1]);
	coneFaceTriangles.push(spokeEnds[0]);
	coneFaceColors.push(color);
	coneFaceColors.push(color);
	coneFaceColors.push(color);
}

function generateProtoConeBase() {
	var i;
	for (i = 0; i < granularity - 1; i++) {
		coneBaseTriangles.push(vec3(0,0,0));		
		coneBaseTriangles.push(spokeEnds[i]);
		coneBaseTriangles.push(spokeEnds[i+1]);
		color = [Math.random(), Math.random(), Math.random()];
		coneBaseColors.push(color);
		coneBaseColors.push(color);
		coneBaseColors.push(color);
	}
// join up the ends ...
	coneBaseTriangles.push(vec3(0,0,1));
	coneBaseTriangles.push(spokeEnds[granularity -1]);
	coneBaseTriangles.push(spokeEnds[0]);
	coneBaseColors.push(color);
	coneBaseColors.push(color);
	coneBaseColors.push(color);
}


function SetupProtoCone() {
	generateProtoRimVertices();
	generateProtoConeBase();
	generateProtoConeFaceTriangles();
}

function protoCone() {

	this.setup = SetupProtoCone;

	this.coneFaceTriangles = coneFaceTriangles;
	this.coneFaceColors = coneFaceColors;
	this.coneBaseTriangles = coneBaseTriangles;
	this.coneBaseColors = coneBaseColors;

}




