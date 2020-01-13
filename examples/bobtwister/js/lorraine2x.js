const PI  = Math.PI;
const TAU = Math.PI * 2;

var sin   = Math.sin;
var cos   = Math.cos;
var ceil  = Math.ceil;
var floor = Math.floor;

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
    var i = BUFFER_WIDTH * y + x;
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

function peek(x, y) {
    var i = BUFFER_WIDTH * y + x;
    return {
	r: image.data[i * 4 + 0],
	g: image.data[i * 4 + 1],
	b: image.data[i * 4 + 2]
    }
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
    if (typeof(draw_canvas) === typeof(Function))
	draw_canvas(bc);
    cc.drawImage(buffer, 0, 0, BUFFER_WIDTH, BUFFER_HEIGHT, 0, 0, 768, 576);
}
