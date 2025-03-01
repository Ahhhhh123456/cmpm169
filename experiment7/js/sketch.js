// sketch.js - purpose and description here
// Author: Jason Li
// Date: 1/17/ 2024

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

let mic; // Microphone input
let amp; // Amplitude level
let count = 0;
let clicked = false;
let currentColor;
let lastColorChange = 0;
let colorChangeInterval = 100;

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
  //redrawCanvas(); // Redraw everything based on new size
}

function mouseClicked() {
  clicked = !clicked; // Toggle the clicked state
}

// setup() function is called once when the program starts
function setup() {
  createCanvas(800, 800);
  background(0);
  currentColor = color(255);
  noFill();

  // Initialize microphone input
  mic = new p5.AudioIn();
  mic.start(); // Start listening to mic input

  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  // resize canvas is the page is resized
  // ... some other stuff
  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();


}

function draw() {
  background(0, 20);
  
  // Get microphone amplitude level (0 to 1)
  let micLevel = mic.getLevel(1);

  beginShape();
  for (let x = 0; x <= width; x += 10) {
    let vert_y = 10;

    // Use micLevel to modify the y-position dynamically
    let vert2_y = noise(x * 5, count * 0.01) * height * micLevel * 2;

    if (mouseX > x && mouseY > vert2_y) {
      vertex(x, vert2_y);
      vertex(vert2_y, x);
      if (clicked) {
        vertex(x, x);
      }
      if (frameCount - lastColorChange > colorChangeInterval) {
        currentColor = color(random(255), random(255), random(255));
        lastColorChange = frameCount;
      }
      fill(currentColor);
    } else {
      vertex(x, vert_y + width/2);
      stroke(255);
    }
  }
  endShape();

  ellipse(mouseX, mouseY, 20, 20);
  count++;
}
