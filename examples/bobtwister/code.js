function init() {
    screen = 0x000;
}

ROWS = 16;
BOBS = 32;

function draw() {
    for (r = 0; r < ROWS; r++) {
	for (i = 0; i < BOBS; i++) {
	    rt = 0.27 * TAU * sin(TAU * (frame * 0.7 + 7 * r) / 256.0 +
		 0.21 * TAU * sin(TAU * (frame * 1.3 - 11 * r) / 318.0));
		    
	    th = TAU * (i / BOBS) + rt;
	    x3 = sin(th);
	    y3 = ((r + 0.5) / 8.0) - 1.0;
	    z3 = cos(th) * 0.18;
	    zf = 1 / ((z3 + 2.0) / 2.0);
	    x2 = x3 * zf;
	    y2 = y3 * zf;
	    zc = floor(10.99 - 4.99 * (z3 / 0.18)) * 0x111;
	    plot(floor(260 + 100 * x2), floor(144 + 160 * y2), zc);
	}
    }
}
