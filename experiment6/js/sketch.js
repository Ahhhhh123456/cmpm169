// sketch.js - purpose and description here
// Author: Jason Li
// Date: 1/17/ 2024

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;
let centerHorz, centerVert;
let counts = {}; // Data storage
let allLevels, allDrops;
let datasets = [];
let myChart;
let currentStep = 0; // Counter to track data reveal
let updateSpeed = 0.1; // Speed of smooth update
let targetData = []; // Holds final values for interpolation
let wastedMinutes = 0; // Variable to track wasted minutes (increments each time mouse is pressed)

let levels = [
  "1","1","N/A","2","2","N/A","4","1","2","1",
  "N/A","2","2","2","3","N/A","N/A","2","1","N/A",
  "2","1","N/A","2","1","N/A","4","3","N/A","N/A",
  "3","N/A","1","3","3","4","N/A","N/A","N/A","1",
  "N/A","N/A","N/A","N/A","1","1","1","N/A","1"
];

let drops = [
  "Ring of Restraint","Crisis H Ring","Oz Point Pouches","Limit Ring","Crisis H Ring",
  "Broken Box Pieces","Stance Ring","Reflective Ring","Weapon Jump","Clean Stane Ring",
  "Broken Box Pieces","Weapon Jump","Crisis HM Ring","Clean Stance Ring","Beserker Ring",
  "Broken Box Pieces","Broken Box Pieces","Cleansing Ring","Weapon Jump","Oz Point Pouches",
  "Clean Stance Ring","Risk Taker Ring","Oz Point Pouches","Crisis M Ring","Weapon Jump",
  "Broken Box Pieces","Weapon Jump","Mana Cut Ring","Broken Box Pieces","2x Experience Couppons",
  "Clean Defense Ring","Broken Box Pieces","Level Jump Ring","Limit Ring","Ultimatum Ring",
  "Critical Damage Ring","Broken Box Pieces","Broken Box Pieces","2x Experience Coupons","Limit Ring",
  "Broken Box Pieces","Broken Box Pieces","2x Experience Coupons","2x Experience Coupons","Mana Cut Ring",
  "Cleansing Ring","Overdrive Ring","Broken Box Pieces","Tower Boose Ring"
];

// setup() function is called once when the program starts
function setup() {
  noCanvas(); // p5.js canvas is not needed

  counts = {}; // Reset counts

  // 1) Count occurrences of (level, drop)
  for (let i = 0; i < levels.length; i++) {
    let level = levels[i];
    let drop = drops[i];

    if (!counts[level]) counts[level] = {};
    if (!counts[level][drop]) counts[level][drop] = 0;

    counts[level][drop]++;
  }

  // 2) Unique levels & drops
  allLevels = Object.keys(counts);
  allDrops = [...new Set(drops)];

  // 3) Initialize datasets with zeroes
  datasets = allDrops.map((dropName, i) => ({
    label: dropName,
    data: new Array(allLevels.length).fill(0), // Start at 0
    backgroundColor: `hsl(${i * 20}, 70%, 60%)`,
    borderWidth: 1
  }));

  // 4) Initialize targetData for smooth interpolation
  targetData = datasets.map(ds => [...ds.data]);

  // 5) Create Chart.js stacked bar chart
  let ctx = document.getElementById('myChart').getContext('2d');
  myChart = new Chart(ctx, {
    type: 'bar',
    data: { labels: allLevels, datasets: datasets },
    options: {
      responsive: true,
      animation: false, // Custom animation
      plugins: {
        legend: { position: 'top' },
        title: { 
          display: true, 
          text: `Tower of Oz: You have wasted ${wastedMinutes} minutes` // Dynamic title text
        }
      },
      scales: {
        x: { stacked: true },
        y: { stacked: true, beginAtZero: true }
      }
    }
  });

  // Start smooth updates
  animateChart();
}

// resizeScreen() function to resize the canvas
function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
}

// Mouse event function to update the chart on mouse press
function mousePressed() {
  if (currentStep >= levels.length) return; // Stop when all data is added

  let level = levels[currentStep];
  let drop = drops[currentStep];

  let dropIndex = allDrops.indexOf(drop);
  let levelIndex = allLevels.indexOf(level);

  if (dropIndex !== -1 && levelIndex !== -1) {
    targetData[dropIndex][levelIndex]++; // Set target value
  }

  currentStep++; // Move to the next data entry

  // Increment wasted minutes each time mouse is pressed
  wastedMinutes += 45;

  // Update chart title dynamically
  myChart.options.plugins.title.text = `Tower of Oz: You have wasted ${wastedMinutes} minutes`;
  myChart.update(); // Refresh the chart with the new title
}

// Smoothly interpolate values for smooth animation
function animateChart() {
  let needsUpdate = false;

  datasets.forEach((dataset, i) => {
    dataset.data.forEach((val, j) => {
      let diff = targetData[i][j] - val;
      if (Math.abs(diff) > 0.001) {
        dataset.data[j] += diff * updateSpeed; // Gradually approach target
        needsUpdate = true;
      }
    });
  });

  if (needsUpdate) {
    myChart.update(); // Refresh only if needed
  }

  requestAnimationFrame(animateChart); // Keep animating
}
