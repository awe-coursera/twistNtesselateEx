// add a vertex to GPU for each click
// Converting to canvas co-ordinates ... 
// Buffer to hold vertices has already been set up ... 

canvas.addEventListener("click", function () {
	gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
	var t = vec2 (-1 + 2*event.clientX/canvas.width,
		-1 + 2*(canvas.height-event.clientY) / canvas.height);
	gl.bufferSubData(gl.ARRAY_BUFFER, sizeof['vec2'] * index, t);
// sizeof['vec2'] ... provided as a utility ... 
	index++;
});


window.onresize = function() {
	var min = innerWidth;
	if (innerHeight < min ) {
		min = innerHeight;
	}
	if (min < canvas.width || min < canvas.height) {
		gl.viewport(0,canvas.height-min, min, min);
	}
// size of viewport smaller of height and width ... 
};


// Getting object being pointed at as opposed to getting pixel being pointed at ... 




