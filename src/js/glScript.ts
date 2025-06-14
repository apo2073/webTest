"use strict";
let gl: WebGLRenderingContext | null = null;

let dx = 0.0, dy = 0.0;
let vx = 0.01, vy = 0.008;
let isDragging = false;
let lastMouseX = 0, lastMouseY = 0;

window.onload = () => {
    const canvas = document.getElementById("webglCanvas") as HTMLCanvasElement;
    if (!canvas) {
        console.error("Canvas element not found.");
        return;
    }

    gl = initWebGL(canvas);
    if (!gl) return;

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    const vertices = new Float32Array([
        -0.5,  0.5,
        0.5,  0.5,
        -0.5, -0.5,
        -0.5, -0.5,
        0.5,  0.5,
        0.5, -0.5
    ]);

    const colors = new Float32Array([
        1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 1.0, 0.0,
        1.0, 1.0, 0.0
    ]);

    const vertexBuffer = gl.createBuffer();
    const colorBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

    const vertCode = `
        attribute vec2 coordinates;
        attribute vec3 color;
        varying vec3 vColor;
        uniform vec2 u_offset;
        uniform vec3 u_colorOffset;

        void main(void) {
            gl_Position = vec4(coordinates + u_offset, 0.0, 1.0);
            vColor = color + u_colorOffset;
        }
    `;

    const fragCode = `
        precision mediump float;
        varying vec3 vColor;
        void main(void) {
            gl_FragColor = vec4(vColor, 1.0);
        }
    `;

    const vertShader = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vertShader, vertCode);
    gl.compileShader(vertShader);
    if (!gl.getShaderParameter(vertShader, gl.COMPILE_STATUS)) {
        console.error('Vertex shader compile error:', gl.getShaderInfoLog(vertShader));
        return;
    }

    const fragShader = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fragShader, fragCode);
    gl.compileShader(fragShader);
    if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)) {
        console.error('Fragment shader compile error:', gl.getShaderInfoLog(fragShader));
        return;
    }

    const shaderProgram = gl.createProgram()!;
    gl.attachShader(shaderProgram, vertShader);
    gl.attachShader(shaderProgram, fragShader);
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.error('Shader program link error:', gl.getProgramInfoLog(shaderProgram));
        return;
    }
    gl.useProgram(shaderProgram);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    const coord = gl.getAttribLocation(shaderProgram, "coordinates");
    gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coord);

    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    const color = gl.getAttribLocation(shaderProgram, "color");
    gl.vertexAttribPointer(color, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(color);

    const offsetLocation = gl.getUniformLocation(shaderProgram, "u_offset");
    const colorOffsetLocation = gl.getUniformLocation(shaderProgram, "u_colorOffset");

    canvas.addEventListener("mousedown", (e) => {
        isDragging = true;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
    });

    canvas.addEventListener("mousemove", (e) => {
        if (isDragging) {
            const deltaX = e.clientX - lastMouseX;
            const deltaY = e.clientY - lastMouseY;
            lastMouseX = e.clientX;
            lastMouseY = e.clientY;

            dx += deltaX / canvas.width * 2;
            dy -= deltaY / canvas.height * 2;

            dx = Math.min(Math.max(dx, -1), 1);
            dy = Math.min(Math.max(dy, -1), 1);

            drawScene();
        }
    });

    canvas.addEventListener("mouseup", () => {
        isDragging = false;
    });

    canvas.addEventListener("mouseleave", () => {
        isDragging = false;
    });

    function animate() {
        if (!isDragging) {
            dx += vx;
            dy += vy;

            if (dx > 1 - 0.5 || dx < -1 + 0.5) vx = -vx;
            if (dy > 1 - 0.5 || dy < -1 + 0.5) vy = -vy;

            drawScene();
        }
        requestAnimationFrame(animate);
    }

    function drawScene() {
        gl!.clear(gl!.COLOR_BUFFER_BIT);
        gl!.uniform2f(offsetLocation, dx, dy);

        const r = Math.min(Math.max((dx + 1) / 2, 0.0), 1.0);
        const g = Math.min(Math.max((dy + 1) / 2, 0.0), 1.0);
        const b = 0.5;

        gl!.uniform3f(colorOffsetLocation, r, g, b);
        gl!.drawArrays(gl!.TRIANGLES, 0, 6);
    }

    drawScene();
    animate();
};

function initWebGL(canvas: HTMLCanvasElement): WebGLRenderingContext | null {
    let context: WebGLRenderingContext | null = null;

    try {
        context = canvas.getContext("webgl");
    } catch (e) {
        console.error("Error initializing WebGL:", e);
    }

    if (!context) {
        alert("Unable to initialize WebGL. Your browser may not support it.");
    }

    return context;
}
