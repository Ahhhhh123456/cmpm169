import * as CANNON from 'https://cdn.jsdelivr.net/npm/cannon-es@0.20.0/+esm';

// Ensure p5.js functions are accessible
window.setup = setup;
window.draw = draw;
window.mousePressed = mousePressed;

const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;

let angle = 0;
let boxSize = 20; 
let spacing = boxSize;
let stackOffset = 100;
let stackCount = 4;
let cols = 2;
let stackHeights = [];
let world;
let physicsBodies = [];
let physicsEnabled = false;

class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }
}

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2;
  centerVert = canvasContainer.height() / 2;
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
}

function setup() {
  createCanvas(400, 400, WEBGL);

  // ✅ Correct Cannon-ES World Setup
  world = new CANNON.World({
    gravity: new CANNON.Vec3(0, -9.8, 0), // Gravity pulls objects down
  });

  // ✅ Ground Plane (Prevents Boxes from Falling Infinitely)
  let groundBody = new CANNON.Body({
    type: CANNON.Body.STATIC, // Static (not affected by gravity)
    shape: new CANNON.Plane(),
  });
  groundBody.position.set(0, -100, 0);
  world.addBody(groundBody);

  // Generate random stack heights for each stack
  for (let i = 0; i < stackCount; i++) {
    stackHeights[i] = int(random(3, 8));
  }

  // Create physics-enabled stacks
  for (let i = 0; i < stackCount; i++) {
    let row1 = floor(i / cols);
    let col = i % cols;

    let xOffset = (col - 0.5) * stackOffset * 2;
    let zOffset = (row1 - 0.5) * stackOffset * 2;
    
    let stackHeight = stackHeights[i];

    for (let y = 0; y < stackHeight; y++) {
      for (let x = 0; x <= 2; x++) {
        for (let z = 0; z <= 2; z++) {
          let body = createPhysicsBox(xOffset + x * spacing, -y * spacing, zOffset + z * spacing);
          physicsBodies.push(body);
        }
      }
    }
  }

  // Place our canvas in the container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");

  myInstance = new MyClass("VALUE1", "VALUE2");

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
}

function createPhysicsBox(x, y, z) {
  let body = new CANNON.Body({
    mass: 1, // Dynamic (affected by gravity)
    shape: new CANNON.Box(new CANNON.Vec3(boxSize / 2, boxSize / 2, boxSize / 2)),
  });
  body.position.set(x, y, z);
  world.addBody(body);
  return body;
}

function mousePressed() {
  physicsEnabled = true;
}

function draw() {
  background(0);
  rotateX(angle);
  rotateY(angle);

  if (physicsEnabled) {
    world.fixedStep(); // ✅ Update physics simulation
  } else {
    for (let body of physicsBodies) {
      body.velocity.set(0, 0, 0);
      body.angularVelocity.set(0, 0, 0);
    }
  }

  for (let body of physicsBodies) {
    push();
    translate(body.position.x, body.position.y, body.position.z);
    box(boxSize);
    pop();
  }

  angle += 0.004;
}
