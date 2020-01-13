#!/usr/bin/env node

const TAU = Math.PI * 2;
const floor = Math.floor, cos = Math.cos, sin = Math.sin;

var frame = 0;

// Create pixel matrix
var pix = new Array(256).fill(0).map(row => new Array(256).fill(0));

// Draw circle
var r, x, y, t, c, xf;
for (n = 6; n < 7; n++) {
    t = 0 // TAU * (frame * 0.005 + n * 0.042);
    for (a = 0; a < 32; a++) {
		r = 23.99 + 15.89 * n + 0.279 * a; // console.log(r);
		for (b = 0; b < 1024; b++) {
			x = floor(127.99 + r * cos(TAU * b / 1024) * cos(t));
			y = floor(127.99 + r * sin(TAU * b / 1024));
			pix[y][x] = 1;
		}
    }
}


// Detect edges per line
var edges = [];
for (y = 0; y < 128; y++) {
 	var e = 0;
	for (x = 0; x < 256; x++) {
		if (e != pix[y][x]) {
			e = pix[y][x];
			edges.push(x);
		}
	}
	if (e == 1)	edges.push(255);
}

console.log(edges.join(","));
console.log(edges.length);
