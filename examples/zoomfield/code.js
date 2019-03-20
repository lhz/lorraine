L = 8;

function init() {
    screen = 0x000;
}

function draw() {
    var x, y, z, w, p, s;
    for (l = 0; l < L; l++) {
	z = Math.pow(2, (L - l - 1) / -2.0);
	w = 8.0 * z;
	s = 64.0 * z;
	o = (frame % 64) * z;
	p = (l + 1) * (0x111);
	if (frame == 0)
	    console.log("l="+l+", z="+z+", s="+s+", p="+p);
	for (y = ((144 - (w / 2.0)) % s) - s; y < 288; y += s) {
	    for (x = ((192 + o - (w / 2.0)) % s) - s; x < 384; x += s) {
		rect(floor(x), floor(y), floor(w), floor(w), p);
	    }
	}
    }
}
