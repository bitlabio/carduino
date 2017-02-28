var Pixels = function (img, context) {
	this.img = img;
	this.context = context;
}

Pixels.prototype.noise = function () {
	/* fills the frame with random noise */
    for (var a = 0; a < this.img.width*this.img.height*4; a++)
    {
        this.img.data[a] = Math.random()*255
    }
}

Pixels.prototype.putpixel = function (x,y,r,g,b,a) {
	/* puts a pixel at x y using rgba colours */
	var calcposition = (y*this.img.width)+x;
	calcposition *= 4; //rgba takes 4 spots in the array

    this.img.data[calcposition] = r;
	this.img.data[calcposition+1] = g;
	this.img.data[calcposition+2] = b;
	this.img.data[calcposition+3] = a;
}

Pixels.prototype.update = function () {
	/* updates the buffer to the screen */
	this.context.putImageData( img , 0, 0);   
}
