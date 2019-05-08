L = 8;

function init() {
    screen = 0xFFF;

    images.push("assets/text.png");
}

function draw() {
    var i = loadedImages["assets/text.png"];

    var r, g, b, rgb;

    for (var y = 0; y < 76; y++) {
	var sx = frame;
	for (var x = 0; x < 384; x++) {
	    var f = 0.499 + 0.499 * sin(TAU * (x - 0.5*frame) / 128.0);
	    var s = 1.0 / (1.0 + f);
	    var sy = (y - 32) * s + 16;
	    if (sy >= 0 && sy < 38) {
		var xx = floor(sx) % 256;
		var yy = floor(sy);
		var oo = yy * i.image.width + xx;
		r = i.data[4 * oo + 0];
		g = i.data[4 * oo + 1];
		b = i.data[4 * oo + 2];
		r += (255 - r) * (0.85 - f * 0.85);
		g += (255 - g) * (0.85 - f * 0.85);
		b += (255 - b) * (0.85 - f * 0.85);
		rgb = ((r >> 4) << 8) + ((g >> 4) << 4) + ((b >> 4))
	    } else {
		rgb = 0xFFF;
	    }
	    plot(x, 100 + y, rgb);
	    sx += s;
	}
    }
}
