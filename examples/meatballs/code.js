function init() {
    screen = 0x000;
}


function draw() {
    var x, y, b, bx, by, dx, dy, c, cc, v;
    for (y = 0; y < 288; y++) {
	for (x = 0; x < 388; x++) {
	    v = 0.0;
	    for (b = 0; b < 3; b++) {
		bx = 192.0 + 140.0 * cos(0.017*frame + 0.653*b);
		by = 144.0 +  80.0 * sin(0.025*frame - 1.539*b);
		dx = 0.05*(x - bx);
		dy = 0.05*(y - by);
		v += (1.0 / (dx*dx + dy*dy)); // Speed up with table lookup?
	    }
	    c = (v * 30.0);
	    if (c > 15)
		c = 15;
	    cc = floor(c);
	    if (cc < 15 && (c - cc) > 0.0 + ((x + y) % 2) / 2.0)
		cc += 1; // Dither
	    plot(x, y, 0x111 * cc);
	}
    }
}
