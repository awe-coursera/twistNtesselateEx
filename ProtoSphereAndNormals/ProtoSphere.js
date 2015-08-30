// This code sets up a prototype sphere and the normals for that sphere ...
// Prototype sphere has unit radius and is centred at the origin (0,0,0).
// Normals calculated for reference sphere ... 
// However ... to transform the normals we apply the inverse transpose of the model matrix in the shader ...
// Need to convince yourself that when we calculate normals at each vertex ... e.g. by averaging over the normals of adjacent
// facets .. which, in the simple approach taken here we are not doing ... 
// the normals will be transformed correctly ... 
// No colours assigned explicitly ... because lighting material properties will be used to 
// render the various facets ...



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
		generateLatProtoCircle(offset, latRadius, i);
	}
	//console.log("latitudeRingsArray size" , latitudeRingsArray.length);
	//console.log("latitudeRingsArray[0] size", latitudeRingsArray[0].length);
}

var protoSphereMinusCapsArray = [];
var protoSphereMinusCapsNormals = [];

function generateProtoSphereMinusCaps() {
	var i;
	var array1;
	var array2;
	// console.log("in generateProtoSphereMinusCaps");
	// console.log("granularity" , sphere_granularity);
	for ( i = 0; i < sphere_granularity - 2; i++) {
		array1 = latitudeRingsArray[i];
		array2 = latitudeRingsArray[i + 1];
		for ( j = 0; j < sphere_granularity - 1; j++) {
			protoSphereMinusCapsArray.push(array1[j]);
			protoSphereMinusCapsArray.push(array2[j]);
			protoSphereMinusCapsArray.push(array2[j+1]);

			protoSphereMinusCapsNormals.push(array1[j]);
			protoSphereMinusCapsNormals.push(array2[j]);
			protoSphereMinusCapsNormals.push(array2[j+1]);

			protoSphereMinusCapsNormals.push(array1[j]);
			protoSphereMinusCapsNormals.push(array1[j+1]);
			protoSphereMinusCapsNormals.push(array2[j+1]);

			protoSphereMinusCapsArray.push(array1[j]);
			protoSphereMinusCapsArray.push(array1[j+1]);
			protoSphereMinusCapsArray.push(array2[j+1]);
		}
	// Now join up the two ends ...
		protoSphereMinusCapsArray.push(array1[sphere_granularity -1]);
		protoSphereMinusCapsArray.push(array2[sphere_granularity -1]);
		protoSphereMinusCapsArray.push(array2[0]);

		protoSphereMinusCapsNormals.push(array1[sphere_granularity -1]);
		protoSphereMinusCapsNormals.push(array2[sphere_granularity -1]);
		protoSphereMinusCapsNormals.push(array2[0]);

		protoSphereMinusCapsArray.push(array1[sphere_granularity -1]);
		protoSphereMinusCapsArray.push(array1[0]);
		protoSphereMinusCapsArray.push(array2[0]);

		protoSphereMinusCapsNormals.push(array1[sphere_granularity -1]);
		protoSphereMinusCapsNormals.push(array1[0]);
		protoSphereMinusCapsNormals.push(array2[0]);

	}
	//console.log("protoSphereMinusCapsArray size " , protoSphereMinusCapsArray.length);
	//console.log("protoSphereMinusCapsArray[1] size " , protoSphereMinusCapsArray[0].length);
	//console.log("protoSphereMinusCapsArray[1] size " , protoSphereMinusCapsArray[1].length);
}

var topCapTriangles = [];
var topCapNormals = [];

var bottomCapTriangles = [];
var bottomCapNormals = [];

function generateProtoSphereTopCap() {
	var topPole = vec3(0,1,0);	
	var j;
	var color = [];
	var array = latitudeRingsArray[0];
	for ( j = 0; j < sphere_granularity - 1; j++) {

		topCapTriangles.push(topPole);
		topCapTriangles.push(array[j]);
		topCapTriangles.push(array[j + 1]);

		topCapNormals.push(topPole);
		topCapNormals.push(array[j]);
		topCapNormals.push(array[j + 1]);

	}
	// Now join up the two ends ...
	topCapTriangles.push(topPole);
	topCapTriangles.push(array[sphere_granularity -1]);
	topCapTriangles.push(array[0]);

	topCapNormals.push(topPole);
	topCapNormals.push(array[sphere_granularity -1]);
	topCapNormals.push(array[0]);

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

		bottomCapNormals.push(bottomPole);
		bottomCapNormals.push(array[j]);
		bottomCapNormals.push(array[j + 1]);


	}
	// Now join up the two ends ...
	bottomCapTriangles.push(bottomPole);
	bottomCapTriangles.push(array[sphere_granularity -1]);
	bottomCapTriangles.push(array[0]);

	bottomCapNormals.push(bottomPole);
	bottomCapNormals.push(array[sphere_granularity -1]);
	bottomCapNormals.push(array[0]);

}

function SetupProtoSphere() {
	//console.log("generateProtoRimVertices");
	generateProtoRimVertices();
	//console.log("createProtoSphereVertexArrays")
	createProtoSphereVertexArrays();
	//console.log("generateProtoSphereMinusCaps")
	generateProtoSphereMinusCaps();
	//console.log("generateProtoSphereTopCap");
	generateProtoSphereTopCap();
	//console.log("generateProtoSphereBottomCap");
	generateProtoSphereBottomCap();
}

function protoSphere() {

	this.setup = SetupProtoSphere;
	this.protoSphereMinusCapsArray = protoSphereMinusCapsArray;
	this.protoSphereMinusCapsNormals = protoSphereMinusCapsNormals;

	this.topCapTriangles = topCapTriangles;
	this.topCapNormals = topCapNormals;
	
	this.bottomCapTriangles = bottomCapTriangles;
	this.bottomCapNormals = bottomCapNormals;

}


function generateProtoSphereTopCapVertexNormalsFromTriangleMesh() {
// the pole is easy .. by symmetry ...
// for the bases of the triangles need to consider the ring of triangles immediately below as well 
// also need to take the right hand rule into account ...

// TO DO 


}



function generateProtoSphereBottomCapVertexNormalsFromTriangleMesh() {
// the pole is easy .. by symmetry ...
// for the bases of the triangles need to consider the ring of triangles immediately above as well 
// also need to take the right hand rule into account ...


// TO DO 

}



function generateProtoSphereBottomCapVertexNormalsFromTriangleMesh() {
// the pole is easy .. by symmetry ...
// for the bases of the triangles need to consider the ring of triangles immediately above as well 
// also need to take the right hand rule into account ...


// TO DO 

}



