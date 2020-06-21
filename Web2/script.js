
var detectorSize = 9; 
var addItems = 25; 
var detectSound = new Audio("SOUNDS/detect.wav"); 

function Rover() {
    //positioning player's position 
	this.angle = 180;  
	this.vel = new Vector(15,5);
	this.vel.set_angle(this.angle - 90);
	this.width = 18;
	this.height = 35;
	this.items = []
    
    //position of a player's detection 
	this.get_arc = function() {
		let v = this.vel
		return this.pos.add(v).add(v);  
    }
    
    //detector's size
    this.analyse_radius = detectorSize; 
    
    //detector's scan and player's body 
	this.draw = function() {
		ctx.beginPath()
		ctx.strokeStyle = this.scan(world) &&
        this.items.length < 5? "blue": "black"
		

		ctx.arc(this.get_arc().x, this.get_arc().y,
				this.analyse_radius,0,2 * Math.PI); 

                
		ctx.stroke();
		ctx.closePath();
		ctx.save();
		ctx.translate(this.pos.x, this.pos.y);
		ctx.rotate(this.angle * Math.PI / 180);
		var imgPlayer = new Image(); 
		imgPlayer.src = "IMG/player.png"; 
		ctx.drawImage(imgPlayer, - 1.3 * this.width / 2, -4 * this.height / 5, 23, 30);

		
    }
    //positioning 
	this.set_pos = function(x,y) {
		this.pos = new Vector(x, y)
    }
    
    //player's movement 
	this.drive = function(d) {
		if(!d) {
			this.pos = this.pos.add(this.vel); 
		}
		else {
			this.pos = this.pos.sub(this.vel)
		}
    }
    
	this.turn = function(deg) {
		this.angle += deg
		this.vel.set_angle(this.angle - 90)
    }
    
    //detecting feature 
	this.scan = function(world) {
		for(let rock of world.items) {
			let v = this.get_arc().sub(rock.pos)
			if(distance(v.x,v.y)<this.analyse_radius + rock.size) {
				if(this.items.length < 5)

                    pick_up_button.disabled = 0
				return rock
			}
		} pick_up_button.disabled = 1; 
    }
    
    
    //picking up items
	this.pick_up = function() {
		var rock = this.scan(world)
		if(rock) {
			if(this.items.length < 5) {
				release_button.disabled = 0
				this.items.push(rock)
				let i = world.items.indexOf(rock)
				world.items.splice(i,1)
			}
			if (this.items.length === 5) {
				alert("cannot pick more then 5 items..."); 
			}
		}
    }
    
    //drop off items
	this.release = function() {
		if(this.items.length) {
			world.add(this.items[this.items.length-1],
					  this.get_arc().x, this.get_arc().y)
			this.items.splice(-1,1)
		} 
	}
}


function Item() {
	this.value = Math.ceil(60*Math.random())
	this.size = 3  
	var imgThing1 = new Image(); 
	var imgThing2 = new Image(); 
	var imgThing3 = new Image(); 
	var imgThing4 = new Image(); 

	imgThing1.src = "IMG/thing1.png"; 
	imgThing2.src = "IMG/thing2.png"; 
	imgThing3.src = "IMG/thing3.png"; 
	imgThing4.src = "IMG/thing4.png"; 

	let colors = [imgThing1, imgThing2, imgThing3, imgThing4]; 
	this.color = colors[Math.floor(colors.length*Math.random())]
	
	this.draw = function() { 
		ctx.drawImage(this.color, this.pos.x, this.pos.y, 15, 15); 
	}
	this.set_pos = function(x,y) {
		this.pos = new Vector(x,y)
	}
}


function World(width, height) {
	init_canvas(width, height)
	this.width = width
	this.height = height
	this.items = []
	this.rover = null
	this.add = function(object, x, y) {
		object.set_pos(x,y)
		if(object instanceof Item) 
			this.items.push(object)
		
		if(object instanceof Rover)
			this.rover = object
	}
	this.draw = function() {
		var img = new Image(); 
		img.src = "IMG/background.jpg"; 
		ctx.drawImage(img, 0, 0);
		
		for(let rock of this.items) rock.draw()
		this.rover.draw()
	}
	pick_up_button.disabled = 1
	
}


//applied linear algebra player's movement and detector 
function Vector(dx, dy) {
	this.x = dx; 
	this.y = dy; 
	this.angle = 0; 
	this.get_magnitude = () => distance(this.x, this.y); 
	this.add = (other) => {
		if (other instanceof Vector) {
			return new Vector(this.x + other.x,
			this.y + other.y); 
		} 
	}
	this.sub = (other) => {
		if(other instanceof Vector) {
			return new Vector(this.x - other.x, this.y -
			other.y); 
		}
	}
	this.mult = (n) => {
		this.x *= n; this.y *= n; 
		return new Vector(this.x, this.y); 
    }
    
    this.set_magnitude = (m) => this.mult(m/this.get_magnitude()); 
    
    this.dot = (v) =>  this.x*v.x + this.y*v.y; 
    
	this.draw = (point, color, mult) => {
		ctx.beginPath(); 
        ctx.moveTo(point.x, point.y);
		if(mult) m = mult; 
		else m = 1;
		ctx.lineTo(m*this.x+point.x,m*this.y+point.y);
		if(color) ctx.strokeStyle = color; 
		else ctx.strokeStyle = "purple";
		ctx.lineWidth = 2;
		ctx.stroke();
		ctx.closePath();
	}
	this.set_angle = function(degree) {
		this.angle = degree;
		m = this.get_magnitude();
		this.x = Math.cos(this.angle*Math.PI/180);
		this.y = Math.sin(this.angle*Math.PI/180);
		this.set_magnitude(m);
	}
}

//add items 
function add_items(i) {
	for(let j = 0; j < i; j++) {
		world.add(new Item(), 300*Math.random()+20,
							  260*Math.random()+20)
	}
}


function distance(x,y) {
	return Math.sqrt(x**2+y**2)
}


function init_canvas(w,h) {
	c   = document.getElementById("cvs");
	ctx = c.getContext("2d"); 
	c.width = w // window.innerWidth
    c.height = h // window.innerHeight 

}



function down() { 
	world.rover.drive()
	update()
}

function up() {
	world.rover.drive("r")
	update()
}

function left() {
	world.rover.turn(20)
	update()
}

function right() {
	world.rover.turn(-20)
	update()
}



function pick_up() {
	var picked = new Audio("SOUNDS/pickup.wav");
	picked.play(); 
	world.rover.pick_up()
	update()
	release_button.innerHTML = world.rover.items.length?
	"DROP ("+world.rover.items.length+")": "DROP"
}

function release() {
	var dropped = new Audio("SOUNDS/drop.wav");
	dropped.play(); 
	world.rover.release()
	update()
	release_button.innerHTML = world.rover.items.length?
	"DROP ("+world.rover.items.length+")": "DROP"
}


function update() {
	clear()
	world.draw()
}

function clear() {
	c.width = c.width
}


function incDetectSize() {
	detectSound.play(); 
    world.rover.analyse_radius = detectorSize++; 
    if (detectorSize == 30) {
        world.rover.analyse = detectorSize--;  
    }
    update(); 
}

function decDetectSize() {
	detectSound.play(); 
    world.rover.analyse_radius = detectorSize--; 
    if (detectorSize < 9) {
        world.rover.analyse_radius = detectorSize++; 
    }
    update(); 
}



setTimeout(()=> {

release_button = document.getElementById("release")
pick_up_button = document.getElementById("pick")
increase_detectSize = document.getElementById("incdetectSize"); 
decrease_detectSize = document.getElementById("decdetectSize");



world = new World(400,350) 
rover = new Rover()
world.add(rover, 50,50)
add_items(25); 
world.draw()






},10)
