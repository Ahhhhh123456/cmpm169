// sketch.js - purpose and description here
// Author: Jason Li
// Date: 1/17/ 2024

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js


// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

let grammar;
let generatedText;

const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;

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
  centerHorz = canvasContainer.width() / 2;
  centerVert = canvasContainer.height() / 2;
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
}

// setup() function is called once when the program starts
function setup() {
  createCanvas(600, 400);
  textSize(20);
  textAlign(CENTER, CENTER);

  let rawGrammar = {
      "origin": ["The #adjective# tower #action#!", "A #adjective# structure collapses!"],
      "adjective": ["tall", "massive", "unstable", "ancient"],
      "action": ["falls apart", "crumbles", "shatters into dust", "breaks down"]
  };

  grammar = tracery.createGrammar(rawGrammar);
  generatedText = grammar.flatten("#origin#");

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
  background(220);
  text(generatedText, width / 2, height / 2);
}


function mousePressed() {
  generatedText = grammar.flatten("#origin#");
}
