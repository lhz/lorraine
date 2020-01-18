var x0 = 192, y0 = 96, l1 = 90, l2 = 70, m1 = 72, m2 = 56, g = 0.3;
var x1, y1, x2, y2, t1 = 0, t2 = 0, v1 = 0, v2 = 0, a1 = 0, a2 = 0;

const HSTEP = 20;
const HSIZE = 15*HSTEP;

var px = new Array(HSIZE);
var py = new Array(HSIZE);

function init() {
    //screen = 0xfff;
    screen = 0x000;
    t1 = TAU / 3.5;
    t2 = TAU / 3;
}


function update() {
    // Angle acceleration
    a1 = (-g*(2*m1+m2)*sin(t1) - m2*g*sin(t1-2*t2) - 2*sin(t1-t2)*m2*(v2*v2*l2+v1*v1*l1*cos(t1-t2))) / (l1*(2*m1+m2-m2*cos(2*t1-2*t2)));
    a2 = (2*sin(t1-t2) * (v1*v1*l1*(m1+m2) + g*(m1+m2)*cos(t1) + v2*v2*l2*m2*cos(t1-t2))) / (l2*(2*m1+m2-m2*cos(2*t1-2*t2)));
    // Angle velocity
    v1 += a1;
    v2 += a2;
    // Angle values
    t1 += v1;
    t2 += v2;
    // Coordinates
    x1 = x0 + l1*cos(t1 + TAU/4);
    y1 = y0 + l1*sin(t1 + TAU/4);
    x2 = x1 + l2*cos(t2 + TAU/4);
    y2 = y1 + l2*sin(t2 + TAU/4);

    // History
    px.push(x2); if (px.length > HSIZE) px.shift();
    py.push(y2); if (py.length > HSIZE) py.shift();
}


function draw() {
    update();

    if (px.length > 1) {
	for (i = 1; i < px.length; i++) {
	    //line(px[i - 1], py[i - 1], px[i], py[i], 0xfff - 0x110 * floor(i / HSTEP));
	    line(px[i - 1], py[i - 1], px[i], py[i], floor(i / HSTEP));
	}
    }

    line(x0, y0, x1, y1, 0x777);
    line(x1, y1, x2, y2, 0x777);
    rect(x0 - 4, y0 - 4, 8, 8, 0xf00);
    circle(x1, y1, m1 / 9, 0x0f0);
    circle(x2, y2, m2 / 9, 0x66f);
}
