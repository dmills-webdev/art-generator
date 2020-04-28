////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////// Canvas
////////////////////////////////////////////////////////////////////////////////
const canvas = (() => {
// Local Variables
  const canvas = {};
  const webCanvas = document.getElementById("canvas");
  canvas.cell = [0,1,2,3,4,5,6,7,8,9];
  canvas.previousx = null;
  canvas.previousy= null;


// Takes inputs on the design of the next canvas
  canvas.getDesign = () => {
    let x = document.getElementById("grid-width").value;
    let y = document.getElementById("grid-height").value;

    if ( x && y == false ) {  //Default values incase inputs are left at 0
      canvas.x = 10;
      canvas.y = 10;
    }
    else {              //Otherwise take user input
      canvas.x = x;
      canvas.y = y;
    }

    if (canvas.checkForChange()) {
      webCanvas.style.gridTemplateColumns=('repeat(' + canvas.x + ', ' + (800 / canvas.x) + 'px)');
      webCanvas.style.gridTemplateRows=('repeat(' + canvas.y + ', ' + (800 / canvas.y) + 'px)');
    }
  }

// Checks if a canvas re-draw is neeed or not
  canvas.checkForChange = () => {
    if (canvas.previousx==canvas.x && canvas.previousy==canvas.y) {
      return false;
    }
    else {
      return true;
    }
  }

////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////// Canvas creation
////////////////////////////////////////////////////////////////////////////////
// Controller for single canvas creation

  canvas.new = () => {
    canvas.getDesign();
    if (canvas.checkForChange()) { // Checks if a re-draw of the grid is needed
      canvas.previousx = canvas.x;
      canvas.previousy = canvas.y;
      canvas.drawGrid();
    }
    canvas.fillCells();
  }

// Create unstyled grid
  canvas.drawGrid = () => {
    for (let i = 0; i < (canvas.x*canvas.y); ++i) {
      const cell = document.createElement("div");
      cell.classList.add("cell-fill-0");
      webCanvas.appendChild(cell); // Adds grid of cells to DOM
    }
  }

// Style the unstyled grid on display
  canvas.fillCells = () => {
    const cells = webCanvas.children;
    const regexp =  new RegExp(/\d\b/);
      for (let i = 0; i < (canvas.x*canvas.y); ++i) {
      cells[i].className = cells[i].className.replace(regexp, canvas.randomCellFill());
     }
  }

// Picks a random cell pattern from the options
  canvas.randomCellFill = () => {
    let i = Math.floor(Math.random()*6); //CHANGE based on number of cell fill options
    return i;
  }

  return canvas;
})();

////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////// Auto Generation Controller
////////////////////////////////////////////////////////////////////////////////
const controller = (() => {
  const controller = {};
  controller.activeToggle = false;

// Starts auto generation if not currently active
  controller.startAuto = () => {
    if (controller.activeToggle == false) {
      controller.activeToggle = !controller.activeToggle;
      controller.auto();
    }
    else {
      return;
    }
  }

// Stops auto generation
  controller.stopAuto = () => {
    if (controller.activeToggle == true) {
      controller.activeToggle = !controller.activeToggle;
      clearInterval(controller.autoGenerate);
    }
    else {
      return;
    }

  }
// Starts auto generation
  controller.auto = () => {
    let autoInterval = (document.getElementById("auto-interval").value * 1000);
    canvas.new();
    controller.autoGenerate = setInterval(canvas.new, autoInterval);
  }

  return controller;
})();

canvas.new();
