function init() {
    screen = 0x000;
}


function draw() {
    var a, r, rp;
    for (var y = 0; y < 288; y++) {
	for (var l = 0; l < 15; l++) {
	    a = TAU * (frame * 0.002 + 0.31 * y / 512.0)
	    b = TAU * (frame * 0.003 - 0.73 * y / 279.0)
	    r = 120 - 0.45 * l * l;
	    x = 120 + 14.0 * l + r * sin(a) * sin(b);
	    c = 0xfff; // 0x111 * (l + 1);
	    plot(floor(x), y, c);
	}
    }
}
