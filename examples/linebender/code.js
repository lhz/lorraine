function init() {
    screen = 0x000;
}


function draw() {
    var a, r, rp;
    for (var y = 0; y < 288; y++) {
	for (var l = 0; l < 15; l++) {
	    a = TAU * (frame * 0.005 + 0.31 * y / 512.0)
	    r = 150 - 0.55 * l * l;
	    x = 40 + 16.0 * l + r * sin(a) * sin(a);
	    c = 0xfff; // 0x111 * (l + 1);
	    plot(floor(x), y, c);
	}
    }
}
