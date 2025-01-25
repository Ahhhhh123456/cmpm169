// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;

let a = 0, b = 0, c = 0, d = 0, d2 = 0; 
let t = 0;
let r;

class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }

    myMethod() {
        // code to run when method is called
    }
}

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

// setup() function is called once when the program starts
function setup() {
  createCanvas(w = min(windowWidth, windowHeight), w);
  background(0, 6, 60);
  r = w / 4;

  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  // resize canvas is the page is resized

  // create an instance of the class
  myInstance = new MyClass("VALUE1", "VALUE2");

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();


}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  let n = noise;
  
  let targetA = n(t + 9) * r;
  let targetB = n(w) * r;
  let targetC = n(t) * 6;
  let targetD = n(t + 60) * 5;
  let targetD2 = n(t + 60) * 15;

  a = lerp(a, targetA, 1.5);
  b = lerp(b, targetB, 1.5);
  c = lerp(c, targetC, 1.5);
  d = lerp(d, targetD, 1.5);
  d2 = lerp(d2, targetD2, 1.5);

  t += 0.03;

  line(width / 2, 0, width / 2, height); 
  line(0, height / 2, width, height / 2); 

  stroke(w, 30);

  // Top-left
  push();
  line(cos(c) * a + r, sin(c) * a + r, cos(d) * b + r, -sin(d) * b + r);
  pop();

  // Top-right
  push();
  translate(width, 0);
  scale(-1, 1);
  line(cos(c + 100) * a + r, sin(c) * a + r, cos(d) * b + r, sin(d) * b + r);
  pop();

  // Bottom-left
  push();
  translate(0, height);
  scale(1, -1);
  line(cos(c + 100) * a + r, sin(c) * a + r, cos(d) * b + r, sin(d) * b + r);
  pop();

  // Bottom-right
  push();
  translate(width, height);
  scale(-1, -1);
  line(cos(c) * a + r, sin(c) * a + r, cos(d2) * b + r, sin(d2) * b + r);
  pop();
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
  background(0, 6, 60);
  redraw(); // Trigger a redraw of the entire canvas when mouse is clicked
}