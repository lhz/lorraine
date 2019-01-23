# Lorraine

A JavaScript framework for fast prototyping of Amige demo effects

## Usage

Effect code goes into the file `code.js`. It is expected to contain the following functions:

```js
function init() {
}
```
The `init()` function will be called once at the start, and should contain code that performs initial setup.
Inside this function, you may set the value of the following variables:
- `screen`: The background color of the screen (12-bit)
- `frames`: The redraw frame rate (1 = 50Hz, 2 = 25Hz)

```js
function draw() {
}
```
The `draw()` function will be called every time it's time to redraw the screen. All drawing will be done to a back buffer before being copied into the canvas.

The value of the `frame` variable increases by 1 for each redraw.

There are some graphic primitives that can be called to update the drawing buffer.
All x/y positions are given relative to the top left corner of the screen.

The drawing functions are:

```js
plot(x, y, color)
```
Plot a single pixel at the given position.

```js
rect(x, y, w, h, color)
```
Fill a rectangle with the given position and size.

## Examples

To check the examples, copy or symlink a `code.js` file from one of the `examples` subdirs to the project root, then open `index.html` in a browser.
