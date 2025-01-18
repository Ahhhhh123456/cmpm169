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
let count = 0; // Declare the count variable in the global scope
let clicked = false; // Flag to track mouse clicks
let currentColor; // Variable to store the current stroke color
let lastColorChange = 0; // Tracks the last time the color changed
let colorChangeInterval = 100; // Number of frames between color changes

class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }

    myMethod() {
        // code to run when method is called
    }
}


// setup() function is called once when the program starts
function setup() {
  createCanvas(800, 800);
  background(0);
  currentColor = color(255);
  noFill();

}

function draw() {

  background(0, 20);

  beginShape();
  
  for (let x = 0; x <= width; x += 10) {
    
    let vert_y = 10;
    let vert2_y = noise(x * 5, count * 0.01) * height;
    
    if (mouseX > x && mouseY > vert2_y) {
      vertex(x, vert2_y);
      if (clicked) {
        vertex(x, x);
      }
      if (frameCount - lastColorChange > colorChangeInterval) {
      currentColor = color(random(255), random(255), random(255)); 
      lastColorChange = frameCount;
      }
      fill(currentColor);
      
    } else {
      vertex(x, vert_y + width / 2); //straight line
      stroke(255); // Default stroke color
    }
  }
  endShape();
  
  // Draw the cursor-following circle for fun
  ellipse(mouseX, mouseY, 20, 20);
  // Increment the global count variable to modify noise over time
  count++;
}
