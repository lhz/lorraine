ROWS = 16;

BOBS = 32;

GRAYS = [
    '#888888', '#999999', '#aaaaaa', '#bbbbbb',
    '#aaaaaa', '#bbbbbb', '#cccccc', '#dddddd'
]

function init() {
    screen = 0x000;
}

var rmin = 99.9, rmax = -99.9;

function draw_bob(ctx, bob) {
    ctx.beginPath();
    ctx.arc(bob.x, bob.y, bob.r, 0, TAU, true);
    ctx.fillStyle = GRAYS[bob.c];
    ctx.fill();
    ctx.stroke();
}

function draw() {}

function draw_canvas(ctx) {
    bobs = [];
    for (r = 0; r < ROWS; r++) {
	sr = r + floor(frame / 16);
	for (i = 0; i < BOBS; i++) {
	    rt = 0.27 * TAU * sin(TAU * (frame * 0.7 + 7 * sr) / 256.0 +
		 0.21 * TAU * sin(TAU * (frame * 0.4 - 11 * sr) / 318.0));
	    th = TAU * (i / BOBS) + rt;
	    x3 = sin(th);
	    y3 = ((r + 0.5 - ((frame % 16) / 16.0)) / 8.0) - 1.0;
	    z3 = cos(th) * 0.18;
	    zf = 1 / ((z3 + 2.0) / 2.0);
	    x2 = x3 * zf;
	    y2 = y3 * zf;
	    rr = 5.99 - 1.99 * (z3 / 0.18);
	    bobs.push({
		x: floor(192 + 160 * x2 * (0.6 + 0.6 * y2 * y2)),
		y: floor(144 + 160 * y2),
		z: z3,
		r: rr,
		c: floor((rr - 4) * 2)
	    });
	}
    }
    bobs.sort((a, b) => (a.z < b.z) ? 1 : -1);
    for (const bob of bobs) {
	draw_bob(ctx, bob);
    }
}
