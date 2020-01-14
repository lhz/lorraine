var vmap;

const BALLS = 5;

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
    var x, y, b, dx, dy, c, v;
    var bx = new Array(BALLS);
    var by = new Array(BALLS);

    for (b = 0; b < BALLS; b++) {
	bx[b] = 192.0 + 140.0 * cos(0.005*frame*(b + 1) + 0.653*b);
	by[b] = 144.0 +  80.0 * sin(0.003*frame*(b + 3) - 1.539*b);
    }

    for (y = 0; y < 288; y++) {
	for (x = 0; x < 384; x++) {
	    v = 0.0;
	    for (b = 0; b < BALLS; b++) {
		v += vmap[Math.abs(floor(x - bx[b]))][Math.abs(floor(y - by[b]))];
	    }
	    if (v > 15)
		v = 15;
	    c = floor(v);
	    //if (c < 15 && (v - c) > 0.0 + ((x + y) % 2) / 2.0) c += 1; // Dither
	    if (c < 3) c = 0; // small halo
	    //if (c > 4) c = 15; else c = 0; // black & white
	    plot(x, y, 0x111 * c);
	}
    }
}
