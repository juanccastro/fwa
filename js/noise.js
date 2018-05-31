(function() {
	var lastTime = 0;
	var vendors = ['webkit', 'moz'];
	for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
		window.cancelAnimationFrame =
			window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
	}

	if (!window.requestAnimationFrame)
		window.requestAnimationFrame = function(callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function() {
					callback(currTime + timeToCall);
				},
				timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};

	if (!window.cancelAnimationFrame)
		window.cancelAnimationFrame = function(id) {
			clearTimeout(id);
		};
})();

var h;
var w;
var blocksize;
var tilesize;
var tiles_w;
var tiles_h;
var blocks_w = 0
var blocks_h = 0
var context;
var drawing;
var offBlockCanvas;
var offBlockContext;

var colors = [
	[255, 255, 255, 255],
	[220, 220, 220, 255],
	[170, 170, 170, 255],
	[120, 120, 120, 255],
	[0, 0, 0, 255]
];

function snowloop()  {
	requestAnimationFrame(snowloop);

	for (i = 0; i <= tiles_h; i++) {
		for (j = 0; j <= tiles_w; j++) {
			var next_x = Math.floor(Math.random() * (blocksize - tilesize))
			var next_y = Math.floor(Math.random() * (blocksize - tilesize))
			context.drawImage(offBlockCanvas, next_x, next_y, tilesize, tilesize, j * tilesize, i * tilesize, tilesize, tilesize);
		}
	}

}

function snowinit() {
	var doc = document;
	h = Math.max(
		doc.body.scrollHeight, doc.documentElement.scrollHeight,
		doc.body.offsetHeight, doc.documentElement.offsetHeight,
		doc.body.clientHeight, doc.documentElement.clientHeight
	);
	w = Math.max(
		doc.body.scrollWidth, doc.documentElement.scrollWidth,
		doc.body.offsetWidth, doc.documentElement.offsetWidth,
		doc.body.clientWidth, doc.documentElement.clientWidth
	);

	blocksize = Math.floor(h / 2);
	tilesize = Math.floor(blocksize / 8);

	tiles_w = Math.floor(w / tilesize);
	tiles_h = Math.floor(h / tilesize);

	drawing = document.getElementById("noise");
	drawing.width = w;
	drawing.height = h;

	context = drawing.getContext("2d");
	context.beginPath();
	context.rect(0, 0, w, h);
	context.fillStyle = 'black';
	context.fill();
	offBlockCanvas = document.createElement("canvas");
	offBlockContext = offBlockCanvas.getContext("2d");
	offBlockCanvas.width = blocksize;
	offBlockCanvas.height = blocksize;

	imageData = offBlockContext.getImageData(0, 0, blocksize, blocksize);
	var imagedata = imageData.data;

	for (i = 0; i < blocksize * blocksize * 4; i += 4) {
		var pixelcolor = parseInt(Math.random() * 8)

		if (pixelcolor > 3) {
			pixelcolor = 4;
		}

		imagedata[i] = colors[pixelcolor][0];
		imagedata[i + 1] = colors[pixelcolor][1];
		imagedata[i + 2] = colors[pixelcolor][2];
		imagedata[i + 3] = colors[pixelcolor][3];
	}

	offBlockContext.putImageData(imageData, 0, 0);

	snowloop();
}
snowinit();