var vmap;

function init() {
    screen = 0x000;
    vmap = new Array(384);
    for (dx = 0; dx < 384; dx++) {
	vmap[dx] = new Array(288);
	for (dy = 0; dy < 384; dy++) {
	    vmap[dx][dy] = (3000.0 / (dx*dx + dy*dy)) ** 2;
	}
    }
}


function draw() {
    var x, y, b, bx, by, dx, dy, c, v;
    for (y = 0; y < 288; y++) {
	for (x = 0; x < 384; x++) {
	    v = 0.0;
	    for (b = 0; b < 4; b++) {
		bx = 192.0 + 140.0 * cos(0.007*frame*(b + 1) + 0.653*b);
		by = 144.0 +  80.0 * sin(0.005*frame*(b + 3) - 1.539*b);
		v += vmap[Math.abs(floor(x - bx))][Math.abs(floor(y - by))];
	    }
	    if (v > 15)
		v = 15;
	    c = floor(v);
	    //if (c < 15 && (v - c) > 0.0 + ((x + y) % 2) / 2.0) c += 1; // Dither
	    //if (c < 3) c = 0; // small halo
	    if (c > 2) c = 15; else c = 0; // black & white
	    plot(x, y, 0x111 * c);
	}
    }
}
