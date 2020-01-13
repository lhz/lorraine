function init() {
    screen = 0x000;
}


function draw() {
    var r, x, y, s, t, v, c, h, xf;
    for (n = 0; n < 7; n++) {
	t = TAU * (frame * 0.005 + n * 0.042);
	h = floor((n * 360.0) / 7.0 + 330) % 360;
	v = floor(155.0 + 100.0 * cos(2 * t));
	c = hsv(h, 255.0, v);
	for (a = 0; a < 32; a++) {
	    r = 23.99 + 15.99 * n + 0.279 * a;
	    for (b = 0; b < 1024; b++) {
		s  = (b < 256 || b > 767) ? 1 : -1;
		if (cos(t) * s >= 0) {
		    x = 191.99 + r * cos(TAU * b / 1024) * cos(t);
		    y = 143.99 + r * sin(TAU * b / 1024);
		    plot(floor(x), floor(y), c);
		}
	    }
	}
    }
    for (n = 6; n >= 0; n--) {
    	t = TAU * (frame * 0.005 + n * 0.042);
    	h = floor((n * 360.0) / 7.0 + 330) % 360;
    	v = floor(155.0 + 100.0 * cos(2 * t));
    	c = hsv(h, 255.0, v);
    	for (a = 0; a < 32; a++) {
    	    r = 23.99 + 15.99 * n + 0.279 * a;
    	    for (b = 0; b < 1024; b++) {
    		s  = (b < 256 || b > 767) ? 1 : -1;
    		if (cos(t) * s < 0) {
    		    x = 191.99 + r * cos(TAU * b / 1024) * cos(t);
    		    y = 143.99 + r * sin(TAU * b / 1024);
    		    plot(floor(x), floor(y), c);
    		}
    	    }
    	}
    }
}
