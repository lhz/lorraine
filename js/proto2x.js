const PI  = Math.PI;
const TAU = Math.PI * 2;

var sin   = Math.sin;
var cos   = Math.cos;
var ceil  = Math.ceil;
var floor = Math.floor;

var BUFFER_WIDTH  = 384;
var BUFFER_HEIGHT = 288;

var cc, bc, image, frame;

var frames = 1;
var screen = 0x333;

function Color(rgb12) {
    this.r = 17 * ((rgb12 & 0xF00) >> 8);
    this.g = 17 * ((rgb12 & 0x0F0) >> 4);
    this.b = 17 *  (rgb12 & 0x00F);
}

function start() {
    canvas = document.getElementById("display");
    cc = canvas.getContext("2d");
    cc.mozImageSmoothingEnabled = false;
    cc.imageSmoothingEnabled = false;

    buffer = document.createElement("canvas");
    buffer.width  = BUFFER_WIDTH;
    buffer.height = BUFFER_HEIGHT;

    bc = buffer.getContext("2d");
    image = bc.createImageData(BUFFER_WIDTH, BUFFER_HEIGHT);
    frame = 0;

    if (typeof(init) === typeof(Function))
	init();

    setInterval(function() {
	redraw()
	frame++;
    }, 20 * frames);
}

function plot(x, y, color) {
    var c = new Color(color);
    var i = BUFFER_WIDTH * y + x;
    image.data[i * 4 + 0] = c.r;
    image.data[i * 4 + 1] = c.g;
    image.data[i * 4 + 2] = c.b;
    image.data[i * 4 + 3] = 255;
}

function rect(x, y, w, h, color) {
    var c = new Color(color);
    var i = BUFFER_WIDTH * y + x;
    for (j = 0; j < h; j++) {
	for (k = 0; k < w; k++) {
	    image.data[i * 4 + 0] = c.r;
	    image.data[i * 4 + 1] = c.g;
	    image.data[i * 4 + 2] = c.b;
	    image.data[i * 4 + 3] = 255;
	    i++;
	}
	i += BUFFER_WIDTH - w;
    }
}

function clear() {
    var c = new Color(screen);
    var i = 0;
    for (var y = 0; y < BUFFER_HEIGHT; y++) {
	for (var x = 0; x < BUFFER_WIDTH; x++) {
	    image.data[i * 4 + 0] = c.r;
	    image.data[i * 4 + 1] = c.g;
	    image.data[i * 4 + 2] = c.b;
	    image.data[i * 4 + 3] = 255;
	    i++;
	}
    }
}

function redraw() {
    clear();
    draw();
    bc.putImageData(image, 0, 0);
    cc.drawImage(buffer, 0, 0, BUFFER_WIDTH, BUFFER_HEIGHT, 0, 0, 768, 576);
}
