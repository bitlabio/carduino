console.log("carduino ui loaded.")

var CarduinoUI = {}

CarduinoUI.dial = function (canvas, style, min, max) {
	this.value = 100; 
	this.pr = {}
	this.width = 400;
	this.height = 400;
	this.size = 400; //ALWAYS SQUARE.
	this.min = min
	this.max = max

	this.dialvector = new Vector({x:0,y:1,z:0,w:0}); //up. this points to where the dial is.
	this.dialaxis = new Vector({x:0,y:0,z:1,w:0}); //out of screen. we rotate around this imaginary line
	this.dialshape = [[3,140],[-3,140],[-20,85],[20,85]];

	var selfobj = this;
	var font = {}

	var processing = function (pr) 
	{
		

	  pr.setup = function() 
	  { 
	  	this.pr = pr;
	  	prglobal = pr;
	    pr.size( selfobj.width , selfobj.height ); 



	  } 

	  pr.draw = function() 
	  { 
	    pr.background(style.bg.r, style.bg.g, style.bg.b)
	    
	    //DIALBACK
	    pr.strokeWeight(3)
	    pr.stroke(255)
	    pr.fill(0)
	    pr.ellipse(selfobj.size/2,selfobj.size/2,selfobj.size*0.95,selfobj.size*0.95)
		pr.strokeWeight(1)

		pr.fill(style.bg.r+5, style.bg.g+5, style.bg.b+5)
		pr.ellipse(selfobj.size/2,selfobj.size/2,selfobj.size*0.90,selfobj.size*0.90)
	    
	    //pr.ellipse(selfobj.size/2,selfobj.size/2,selfobj.value,selfobj.value)

	    //STRIPES

		var font = pr.loadFont("Courier New");
		pr.textFont(font,24 * selfobj.size/400); 
		pr.fill(255, 255, 255);			
		pr.textAlign(pr.CENTER);

	    pr.stroke(255)
	    pr.strokeWeight(3)
	    var linescale = (selfobj.size/2)*0.90
	    var linescaleB = (selfobj.size/2)*0.80
	    var linescaleBthin = (selfobj.size/2)*0.85
	    for (var a = 0; a <= 6; a++) {

	    	//THICK LINES
	    	pr.strokeWeight(4)
	    	var linevec = new Vector({x:0,y:1,z:0,w:0})
	    	//linevec.rotate(selfobj.dialaxis, 0.1 + (Math.PI*1.5 *a/6) ); //increate 0.1 to move dial lines
	    	linevec.rotate(selfobj.dialaxis, 0.0 + (Math.PI*1.5 *a/6) );
	    	pr.line(linevec.x*linescale + selfobj.size/2,linevec.y*linescale + selfobj.size/2, linevec.x*linescaleB + selfobj.size/2, linevec.y*linescaleB + selfobj.size/2)	
	    	
	    	//THIN LINES
	    	pr.strokeWeight(2)
	    	var linevecthin = new Vector({x:0,y:1,z:0,w:0})
	    	linevecthin.rotate(selfobj.dialaxis, 0.0 + (Math.PI*1.5 * (a+0.5)/6) );
	    	pr.line(linevecthin.x*linescale + selfobj.size/2,linevecthin.y*linescale + selfobj.size/2, linevecthin.x*linescaleBthin + selfobj.size/2, linevecthin.y*linescaleBthin + selfobj.size/2)		    	

	    	pr.text(a, linevec.x*linescaleB*0.85 + selfobj.size/2, (linevec.y*linescaleB*0.85 + selfobj.size/2)+6*(selfobj.size/400));
	    }
	    




	    
		//MOVING RED
		pr.fill(255,25,25)
		pr.noStroke()
		pr.beginShape();
		pr.strokeWeight(4)
		var tempfirst = {}
		for (var a in selfobj.dialshape) {
			var tempvec = new Vector({x:selfobj.dialshape[a][0]*selfobj.size/400,y:selfobj.dialshape[a][1]*selfobj.size/400,z:0,w:0})
			tempvec.rotate(selfobj.dialaxis, selfobj.value)
			pr.vertex(tempvec.x+selfobj.size/2, tempvec.y+selfobj.size/2);	
			if (a == 0) { tempfirst = new Vector(tempvec); }
		}

		pr.vertex(tempfirst.x+selfobj.size/2, tempfirst.y+selfobj.size/2);	

		pr.endShape();
		pr.strokeWeight(1)


		//DIAL MID FRONTSHAPE
	    pr.stroke(255)
	    pr.fill(0)
	    //pr.ellipse(selfobj.size/2,selfobj.size/2,selfobj.size*0.5,selfobj.size*0.5)
	    pr.beginShape();
	    var shapevec = new Vector({x:0,y:selfobj.size*0.25, z:0, w:0})

	    
	    var depthofdent = 0.3;
	    var depthofdentmax = 0.1;
	    var resolutionofdial = 50;
	    var sizeofdent = 30 * resolutionofdial/1000;

	    var closevert = [0,0]
	    for (var a = 0; a < resolutionofdial; a++) {
	    	var shapevectemp = new Vector(shapevec);
	    	if (Math.abs(a-(resolutionofdial/2)) < sizeofdent) { 
	    		var dist = 1 - Math.abs(a-(resolutionofdial/2))/sizeofdent;
	    		
	    		var scale = depthofdent * dist;
	    		if (scale > depthofdentmax) { scale = depthofdentmax; }
	    		shapevectemp.scale( 1 - scale); 
	    	}
	    	shapevectemp.rotate(selfobj.dialaxis, (a/resolutionofdial*(Math.PI*2))- Math.PI + selfobj.value); 
	    	var x = shapevectemp.x + selfobj.size/2
	    	var y = shapevectemp.y + selfobj.size/2
	    	pr.vertex(x, y)
	    	if (a == 0) { closevert[0] = x; closevert[1] = y}
	    }
	    pr.vertex(closevert[0], closevert[1])
	    pr.endShape();
	    //END FRONTSHAPE

	  }
	}



	var processingInstance = new Processing(canvas, processing); 
	this.make = true;
}

CarduinoUI.dial.prototype.val = function(value) {
	console.log("updating dial value")
	this.value = value/this.max;
};
