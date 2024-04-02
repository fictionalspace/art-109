let canvas;
let angle = 0.7;

function setup() {
    //createCanvas(780, 400);
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0,0);
    canvas.style("z-index", -2);
  }
  
  function windowRezied(){
    resizeCanvas(windowWidth, windowHeight);
  }
  
  function draw() {
    fill (218, 230, 227, 70);
    rotate(angle);
    translate(mouseX, mouseY);
    ellipse(-15,-15,100,100);
    angle += 0.1;

  }
  function mouseMoved(){
    //background(220,220,200, 70, 90);
    strokeWeight(0);
    fill(random(200,255,0,90), random(200, 255, 0, 0, 50), random(200,255, 0, 0, 75));
    ellipse(mouseX, mouseY, 30, 30);
  }