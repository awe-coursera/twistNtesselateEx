var sphere_granularity = 30; 
var spokeEnds = [];

// Note: offest is of type vec3 co-ords (0,y,0)

function generateProtoRimVertices() {
	var i;
	var radians = 0;
	var stepAngle = 360 / sphere_granularity;
	for (i = 0; i < sphere_granularity; i++) {
		radians = 2 * Math.PI * stepAngle * i / 360;
		spokeEnds.push(vec3(Math.cos(radians), 0, Math.sin(radians)));
	}
}


//function generateYoffsetProtoCircle(offset, radius, index) {
//	var i;
//	yOffsetCircleSpokeEndsArrayOf[index] = [];
//	yOffsetCircleSpokeEndsArrayOf[index].push(offset);
//	for (i = 0; i < granularity; i++) {
//		yOffsetCircleSpokeEndsArrayOf[index].push( vec3(spokeEnds[i][0] * radius,
//							    	offset[1],
//								spokeEnds[i][2] * radius));
//	}
//}

var latitudeRingsArray = [];
// Note: y is vertical -- axis of rotation
// z and x are parallel to latitude slices

function generateLatProtoCircle(offset, radius, index) {
	var j;
	latitudeRingsArray[index] = [];
	for (j = 0; j < sphere_granularity; j++) {
		latitudeRingsArray[index].push( vec3(	spokeEnds[j][0] * radius,
							offset,
							spokeEnds[j][2] * radius));
	}
	//console.log("latitudeRingsArray[index][25]", index , latitudeRingsArray[index][25]);
}


function createProtoSphereVertexArrays() {
	var latitudeNumber = 0;
	var theta = 0; 
	var phi = 0;
	var i;
	var j;
	var offset = 0;
	var stepPhi = 180 / (sphere_granularity /2);
	var stepTheta = 360 / sphere_granularity;
	var latRadius = 0;	
	// latitudeRingsArray.push([]);
	for ( i = 0; i < sphere_granularity - 1; i++) {
		latitudeRingsArray.push([]);
		phi = Math.PI * stepPhi * (i + 1)  / 180;
		offset = Math.cos(phi);
		latRadius = Math.sin(phi);
		generateLatProtoCircle(offset, latRadius, i)
	}
	//console.log("latitudeRingsArray size" , latitudeRingsArray.length);
	//console.log("latitudeRingsArray[0] size", latitudeRingsArray[0].length);
}

var protoSphereMinusCapsArray = [];
var protoSphereMinusCapsColors = [];

function generateProtoSphereMinusCaps() {
	var i;
	var color = [];
	var array1;
	var array2;
	//console.log("in generateProtoSphereMinusCaps");
	//console.log("granularity" , sphere_granularity);
	for ( i = 0; i < sphere_granularity - 2; i++) {
		array1 = latitudeRingsArray[i];
		array2 = latitudeRingsArray[i + 1];
		for ( j = 0; j < sphere_granularity - 1; j++) {
			protoSphereMinusCapsArray.push(array1[j]);
			protoSphereMinusCapsArray.push(array2[j]);
			protoSphereMinusCapsArray.push(array2[j+1]);
			color = [Math.random(), Math.random(), Math.random()];
			protoSphereMinusCapsColors.push(color);
			protoSphereMinusCapsColors.push(color);
			protoSphereMinusCapsColors.push(color);
			protoSphereMinusCapsArray.push(array1[j]);
			protoSphereMinusCapsArray.push(array1[j+1]);
			protoSphereMinusCapsArray.push(array2[j+1]);
			color = [Math.random(), Math.random(), Math.random()];
			protoSphereMinusCapsColors.push(color);
			protoSphereMinusCapsColors.push(color);
			protoSphereMinusCapsColors.push(color);
		}
	// Now join up the two ends ...
		protoSphereMinusCapsArray.push(array1[sphere_granularity -1]);
		protoSphereMinusCapsArray.push(array2[sphere_granularity -1]);
		protoSphereMinusCapsArray.push(array2[0]);
		color = [Math.random(), Math.random(), Math.random()];
		protoSphereMinusCapsColors.push(color);
		protoSphereMinusCapsColors.push(color);
		protoSphereMinusCapsColors.push(color);
		protoSphereMinusCapsArray.push(array1[sphere_granularity -1]);
		protoSphereMinusCapsArray.push(array1[0]);
		protoSphereMinusCapsArray.push(array2[0]);
		color = [Math.random(), Math.random(), Math.random()];
		protoSphereMinusCapsColors.push(color);
		protoSphereMinusCapsColors.push(color);
		protoSphereMinusCapsColors.push(color);
	}
	//console.log("protoSphereMinusCapsArray size " , protoSphereMinusCapsArray.length);
	//console.log("protoSphereMinusCapsArray[1] size " , protoSphereMinusCapsArray[0].length);
	//console.log("protoSphereMinusCapsArray[1] size " , protoSphereMinusCapsArray[1].length);
}

var topCapTriangles = [];
var topCapColors = [];
var bottomCapTriangles = [];
var bottomCapColors = [];

function generateProtoSphereTopCap() {
	var topPole = vec3(0,1,0);	
	var j;
	var color = [];
	var array = latitudeRingsArray[0];
	for ( j = 0; j < sphere_granularity - 1; j++) {
		topCapTriangles.push(topPole);
		topCapTriangles.push(array[j]);
		topCapTriangles.push(array[j + 1]);
		color = [Math.random(), Math.random(), Math.random()];
		topCapColors.push(color);
		topCapColors.push(color);
		topCapColors.push(color);
	}
	// Now join up the two ends ...
	topCapTriangles.push(topPole);
	topCapTriangles.push(array[sphere_granularity -1]);
	topCapTriangles.push(array[0]);
	color = [Math.random(), Math.random(), Math.random()];
	topCapColors.push(color);
	topCapColors.push(color);
	topCapColors.push(color);
}

function generateProtoSphereBottomCap() {
	var bottomPole = vec3(0,0,0);
	var j;
	var color = [];
	var array = latitudeRingsArray[sphere_granularity - 2];
	for ( j = 0; j < sphere_granularity - 1; j++) {
		bottomCapTriangles.push(bottomPole);
		bottomCapTriangles.push(array[j]);
		bottomCapTriangles.push(array[j + 1]);
		color = [Math.random(), Math.random(), Math.random()];
		bottomCapColors.push(color);
		bottomCapColors.push(color);
		bottomCapColors.push(color);
	}
	// Now join up the two ends ...
	bottomCapTriangles.push(bottomPole);
	bottomCapTriangles.push(array[sphere_granularity -1]);
	bottomCapTriangles.push(array[0]);
	color = [Math.random(), Math.random(), Math.random()];
	bottomCapColors.push(color);
	bottomCapColors.push(color);
	bottomCapColors.push(color);
}

function SetupProtoSphere() {
	generateProtoRimVertices();
	createProtoSphereVertexArrays();
	generateProtoSphereMinusCaps();
	generateProtoSphereTopCap();
	generateProtoSphereBottomCap();
}

function protoSphere() {

	this.setup = SetupProtoSphere;

	this.protoSphereMinusCapsArray = protoSphereMinusCapsArray;
	this.protoSphereMinusCapsColors = protoSphereMinusCapsColors;
	this.topCapTriangles = topCapTriangles;
	this.topCapColors = topCapColors;
	this.bottomCapTriangles = bottomCapTriangles;
	this.bottomCapColors =  bottomCapColors;
}



