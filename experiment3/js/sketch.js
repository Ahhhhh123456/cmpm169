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

var tileCountX = 3;
var tileCountY = 4;
var tileWidth;
var tileHeight;
var currentImage = 0;
var movie;
var song;
var loopCount = 0;

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

function preload() {
  movie = createVideo(['./js/data/video.mp4']);
  song = createVideo(['./js/data/video.ogg']);
  song.loop();
  movie.hide();
}

// setup() function is called once when the program starts
function setup() {
  createCanvas(1024, 1024);
  background(0);
  frameRate(2);
  pixelDensity(5);
  updateTileSize();
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

function draw() {
  if (movie.elt.readyState == 4) {
    for (var gridY = 0; gridY < tileCountY; gridY++) {
      for (var gridX = 0; gridX < tileCountX; gridX++) {
        var posX = tileWidth * gridX;
        var posY = tileHeight * gridY;
        image(movie, posX, posY, tileWidth, tileHeight);
      }
    }

    currentImage++;
    var nextTime = map(currentImage, 0, tileCountX * tileCountY, 0, movie.duration());
    movie.time(nextTime);

    if (currentImage >= tileCountX * tileCountY) {
      currentImage = 0;
      loopCount++;
      increaseGridSize();
    }
  }
}


function increaseGridSize() {
  tileCountX = min(tileCountX + 1, 20);
  tileCountY = min(tileCountY + 1, 20);
  updateTileSize();
}

function updateTileSize() {
  tileWidth = width / tileCountX;
  tileHeight = height / tileCountY;
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas('snapshot_' + frameCount, 'webp');
}