
    var gl;

    function initGL(canvas) {
        try {
            gl = canvas.getContext("experimental-webgl");
            gl.viewportWidth = canvas.width;
            gl.viewportHeight = canvas.height;
        } catch (e) {
        }
        if (!gl) {
            alert("Could not initialise WebGL, sorry :-(");
        }
    }


    function getShader(gl, id) {
        var shaderScript = document.getElementById(id);
        if (!shaderScript) {
            return null;
        }

        var str = "";
        var k = shaderScript.firstChild;
        while (k) {
            if (k.nodeType == 3) {
                str += k.textContent;
            }
            k = k.nextSibling;
        }

        var shader;
        if (shaderScript.type == "x-shader/x-fragment") {
            shader = gl.createShader(gl.FRAGMENT_SHADER);
        } else if (shaderScript.type == "x-shader/x-vertex") {
            shader = gl.createShader(gl.VERTEX_SHADER);
        } else {
            return null;
        }

        gl.shaderSource(shader, str);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert(gl.getShaderInfoLog(shader));
            return null;
        }

        return shader;
    }


    var shaderProgram;

    function initShaders() {
        var fragmentShader = getShader(gl, "shader-fs");
        var vertexShader = getShader(gl, "shader-vs");
	var float_texture_ext = gl.getExtension('OES_texture_float');

        shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);

        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }

        gl.useProgram(shaderProgram);

        shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

        shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
        gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);

        shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");
        gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);

        shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
        shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
        shaderProgram.nMatrixUniform = gl.getUniformLocation(shaderProgram, "uNMatrix");
        shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
        shaderProgram.useLightingUniform = gl.getUniformLocation(shaderProgram, "uUseLighting");
        shaderProgram.ambientColorUniform = gl.getUniformLocation(shaderProgram, "uAmbientColor");
        shaderProgram.lightingDirectionUniform = gl.getUniformLocation(shaderProgram, "uLightingDirection");
        shaderProgram.directionalColorUniform = gl.getUniformLocation(shaderProgram, "uDirectionalColor");
    }


    function handleLoadedTexture(texture) {
	console.log("handling loaded texture");
	sphereTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, sphereTexture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
        gl.generateMipmap(gl.TEXTURE_2D);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.bindTexture(gl.TEXTURE_2D, null);
    }


    var sphereTexture;
    var checkerTexture;   
    var checkerBoard = [];

    function CreateTexture() {

    	var i, j, c;
    	for (i=0; i<64; i++) {
		for (j=0; j<64; j++) {
			c = ((i & 8) ^ (j & 8))*255;
			// c = 255; // all white
			checkerBoard[(i*64+j)*4] = c; // Red component
			checkerBoard[(i*64+j)*4+1] = c; // Green component
			checkerBoard[(i*64+j)*4+2] = c; // Blue component
			checkerBoard[(i*64+j)*4+3] = 0xff; // Alpha component
        	}
	}
	
	sphereTexture = gl.createTexture();

	checkerBoardTexture = new Uint8Array(checkerBoard);

    	gl.bindTexture(gl.TEXTURE_2D, sphereTexture);

    	//gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    	//gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    	gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, 64, 64, 0, gl.RGBA, gl.UNSIGNED_BYTE, checkerBoardTexture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);

	// can also try gl.NEAREST instead of gl.LINEAR.
	//gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	//gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAX_FILTER, gl.LINEAR);
	// Prevents s-coordinate wrapping (repeating).
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	// Prevents t-coordinate wrapping (repeating).
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);	

        // gl.generateMipmap(gl.TEXTURE_2D);
        // gl.bindTexture(gl.TEXTURE_2D, null); 
	// gl.bindTexture(gl.TEXTURE_2D, null);
}

    function initTexture() {
        sphereTexture = gl.createTexture();
        sphereTexture.image = new Image();
	sphereTexture.image.onload = function () {
 	 	handleLoadedTexture(sphereTexture)
	}
	sphereTexture.image.src = "rawimage_16_8_8.jpg";
    }


    var mvMatrix = mat4.create();
    var mvMatrixStack = [];
    var pMatrix = mat4.create();

    function mvPushMatrix() {
        var copy = mat4.create();
        mat4.set(mvMatrix, copy);
        mvMatrixStack.push(copy);
    }

    function mvPopMatrix() {
        if (mvMatrixStack.length === 0) {
            throw "Invalid popMatrix!";
        }
        mvMatrix = mvMatrixStack.pop();
    }

    function setMatrixUniforms() {
        gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
        gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);

        var normalMatrix = mat3.create();
        mat4.toInverseMat3(mvMatrix, normalMatrix);
        mat3.transpose(normalMatrix);
        gl.uniformMatrix3fv(shaderProgram.nMatrixUniform, false, normalMatrix);
    }


    function degToRad(degrees) {
        return degrees * Math.PI / 180;
    }


    var sphereVertexPositionBuffer;
    var sphereVertexNormalBuffer;
    var sphereVertexTextureCoordBuffer;
    var sphereVertexIndexBuffer;

    function initBuffers() {
        var latitudeBands = 32;
        var longitudeBands = 32;
        var radius = 2;
	var longNumber = 0;
	var latNumber = 0;

        var vertexPositionData = [];
        var normalData = [];
        var textureCoordData = [];
        for ( latNumber=0; latNumber <= latitudeBands; latNumber++) {
            var theta = latNumber * Math.PI / latitudeBands;
            var sinTheta = Math.sin(theta);
            var cosTheta = Math.cos(theta);

            for ( longNumber=0; longNumber <= longitudeBands; longNumber++) {
                var phi = longNumber * 2 * Math.PI / longitudeBands;
                var sinPhi = Math.sin(phi);
                var cosPhi = Math.cos(phi);

                var x = cosPhi * sinTheta;
                var y = cosTheta;
                var z = sinPhi * sinTheta;
                var u = 1 - (longNumber / longitudeBands);
                var v = 1 - (latNumber / latitudeBands);

                normalData.push(x);
                normalData.push(y);
                normalData.push(z);
                textureCoordData.push(u);
                textureCoordData.push(v);
                vertexPositionData.push(radius * x);
                vertexPositionData.push(radius * y);
                vertexPositionData.push(radius * z);
            }
        }

        var indexData = [];
        for ( latNumber=0; latNumber < latitudeBands; latNumber++) {
            for ( longNumber=0; longNumber < longitudeBands; longNumber++) {
                var first = (latNumber * (longitudeBands + 1)) + longNumber;
                var second = first + longitudeBands + 1;
                indexData.push(first);
                indexData.push(second);
                indexData.push(first + 1);

                indexData.push(second);
                indexData.push(second + 1);
                indexData.push(first + 1);
            }
        }

        sphereVertexNormalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexNormalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalData), gl.STATIC_DRAW);
        sphereVertexNormalBuffer.itemSize = 3;
        sphereVertexNormalBuffer.numItems = normalData.length / 3;

        sphereVertexTextureCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexTextureCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordData), gl.STATIC_DRAW);
        sphereVertexTextureCoordBuffer.itemSize = 2;
        sphereVertexTextureCoordBuffer.numItems = textureCoordData.length / 2;

        sphereVertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexPositionData), gl.STATIC_DRAW);
        sphereVertexPositionBuffer.itemSize = 3;
        sphereVertexPositionBuffer.numItems = vertexPositionData.length / 3;

        sphereVertexIndexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sphereVertexIndexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), gl.STATIC_DRAW);
        sphereVertexIndexBuffer.itemSize = 1;
        sphereVertexIndexBuffer.numItems = indexData.length;
    }


    function drawScene() {
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);

        var lighting = document.getElementById("lighting").checked;
        gl.uniform1i(shaderProgram.useLightingUniform, lighting);
        if (lighting) {
            gl.uniform3f(
                shaderProgram.ambientColorUniform,
                parseFloat(document.getElementById("ambientR").value),
                parseFloat(document.getElementById("ambientG").value),
                parseFloat(document.getElementById("ambientB").value)
            );

            var lightingDirection = [
                parseFloat(document.getElementById("lightDirectionX").value),
                parseFloat(document.getElementById("lightDirectionY").value),
                parseFloat(document.getElementById("lightDirectionZ").value)
            ];
            var adjustedLD = vec3.create();
            vec3.normalize(lightingDirection, adjustedLD);
            vec3.scale(adjustedLD, -1);
            gl.uniform3fv(shaderProgram.lightingDirectionUniform, adjustedLD);

            gl.uniform3f(
                shaderProgram.directionalColorUniform,
                parseFloat(document.getElementById("directionalR").value),
                parseFloat(document.getElementById("directionalG").value),
                parseFloat(document.getElementById("directionalB").value)
            );
        }

        mat4.identity(mvMatrix);

        mat4.translate(mvMatrix, [0, 0, -6]);

        mat4.multiply(mvMatrix, sphereRotationMatrix);

	gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, sphereTexture);
        gl.uniform1i(shaderProgram.samplerUniform, 0);



        gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, sphereVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexTextureCoordBuffer);
        gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, sphereVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertexNormalBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, sphereVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sphereVertexIndexBuffer);
        setMatrixUniforms();
        gl.drawElements(gl.TRIANGLES, sphereVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
    }


    function tick() {
        requestAnimFrame(tick);
        drawScene();
    }


    function webGLStart() {
        var canvas = document.getElementById("gl-canvas");
        initGL(canvas);
        initShaders();
        initBuffers();
        initTexture();

        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);
	tick();
    }

