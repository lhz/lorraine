function init() {
    screen = 0x000;
}


function draw() {
    for (var y = 0; y < 288; y++) {
	for (var x = 0; x < 388; x++) {
	    var v = 0.0;
	    for (var b = 0; b < 3; b++) {
		var bx = 192.0 + 140.0 * cos(0.017*frame + 0.653*b);
		var by = 144.0 +  80.0 * sin(0.025*frame - 1.539*b);
		var dx = 0.05*(x - bx);
		var dy = 0.05*(y - by);
		v += (1.0 / (dx*dx + dy*dy)); // Speed up with table lookup?
	    }
	    var c = (v * 30.0);
	    if (c > 15)
		c = 15;
	    var cc = floor(c);
	    if (cc < 15 && (c - cc) > 0.0 + ((x + y) % 2) / 2.0)
		cc += 1; // Dither
	    plot(x, y, 0x111 * cc);
	}
    }
}
