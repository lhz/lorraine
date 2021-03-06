const PI  = Math.PI;
const TAU = Math.PI * 2;

var sin   = Math.sin;
var cos   = Math.cos;
var ceil  = Math.ceil;
var floor = Math.floor;
var abs   = Math.abs;
var sign  = Math.sign;

var BUFFER_WIDTH  = 384;
var BUFFER_HEIGHT = 288;

var cc, bc, image, frame;
var images = [];
var loadedImages = {};

var frames = 1;
var screen = 0x333;

function Color(rgb12) {
    this.r = 17 * ((rgb12 & 0xF00) >> 8);
    this.g = 17 * ((rgb12 & 0x0F0) >> 4);
    this.b = 17 *  (rgb12 & 0x00F);
}

function hsv(h, s, v) {
    var r, g, b;
    s = (s == undefined) ? 255.0 : s;
    v = (v == undefined) ? 255.0 : v;
    if (s == 0) {
	r = v;
	g = v;
	b = v;
    } else {
	s /= 255.0;
	var i = ((h / 60) ^ 0) % 6,
	    f = h / 60 - i;
	var p = v * (1.0 - s),
	    q = v * (1.0 - s * f),
	    t = v * (1.0 - s * (1 - f));
	switch(i) {
	case 0: r = v, g = t, b = p; break;
	case 1: r = q, g = v, b = p; break;
	case 2: r = p, g = v, b = t; break;
	case 3: r = p, g = q, b = v; break;
	case 4: r = t, g = p, b = v; break;
	case 5: r = v, g = p, b = q; break;
	}
    }
    return ((r & 0xF0) << 4) + (g & 0xF0) + ((b & 0xF0) >> 4);
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

    var promiseArray = images.map(function(imgurl) {
	var prom = new Promise(function(resolve,reject){
	    var img = new Image();
	    img.onload = function() {
		var iCanvas = document.createElement("canvas");
		var iContext = iCanvas.getContext("2d");
		iContext.drawImage(img, 0, 0);
		loadedImages[imgurl] = {
		    image: img,
		    data: iContext.getImageData(0, 0, img.width, img.height).data,
		};
		resolve();
	    };
	    img.src = imgurl;
	});
	return prom;
    });

    Promise.all(promiseArray).then(imagesLoaded);

    function imagesLoaded() {
	setInterval(function() {
	    redraw()
	    frame++;
	}, 20 * frames);
    }
}

function plot(x, y, color) {
    var c = new Color(color);
    var i = BUFFER_WIDTH * floor(y) + floor(x);
    image.data[i * 4 + 0] = c.r;
    image.data[i * 4 + 1] = c.g;
    image.data[i * 4 + 2] = c.b;
    image.data[i * 4 + 3] = 255;
}

function plot2(x, y, im, sx, sy) {
    var i = BUFFER_WIDTH * y + x;
    var j = im.image.width * sy + sx;
    image.data[i * 4 + 0] = im.data[j * 4 + 0];
    image.data[i * 4 + 1] = im.data[j * 4 + 1];
    image.data[i * 4 + 2] = im.data[j * 4 + 2];
    image.data[i * 4 + 3] = 255;
}

function rect(x, y, w, h, color) {
    var c = new Color(color);
    var i = BUFFER_WIDTH * floor(y) + floor(x);
    for (j = 0; j < floor(h); j++) {
	for (k = 0; k < floor(w); k++) {
	    image.data[i * 4 + 0] = c.r;
	    image.data[i * 4 + 1] = c.g;
	    image.data[i * 4 + 2] = c.b;
	    image.data[i * 4 + 3] = 255;
	    i++;
	}
	i += BUFFER_WIDTH - floor(w);
    }
}

function circle(x, y, r, color) {
    var d = floor(r * 2);
    var c = new Color(color);
    var i = BUFFER_WIDTH * floor(y - r) + floor(x - r);
    for (j = 0; j < d; j++) {
	for (k = 0; k < d; k++) {
	    if ((j - r)*(j - r) + (k - r)*(k - r) < r * r) {
		image.data[i * 4 + 0] = c.r;
		image.data[i * 4 + 1] = c.g;
		image.data[i * 4 + 2] = c.b;
		image.data[i * 4 + 3] = 255;
	    }
	    i++;
	}
	i += BUFFER_WIDTH - d;
    }
}

function line(x0, y0, x1, y1, color) {
    var dx = x1 - x0;
    var dy = y1 - y0;
    var ax = floor(abs(dx));
    var ay = floor(abs(dy));
    if (ax >= ay) {
	var sx = sign(dx);
	var sy = dy/ax;
	var y  = y0;
	for (x = x0; ax >= 0; ax -= 1) {
	    plot(x, y, color);
	    x += sx;
	    y += sy;
	}
    } else {
	var sy = sign(dy);
	var sx = dx/ay;
	var x  = x0;
	for (y = y0; ay >= 0; ay -= 1) {
	    plot(x, y, color);
	    x += sx;
	    y += sy;
	}
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
