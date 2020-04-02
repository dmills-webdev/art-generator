////////////////////////////////////////////////////////////////////////////////
const canvas = (() => {
//Local Variables
  const canvas = {};
  const webCanvas = document.getElementById("canvas");
  canvas.cell = [0,1,2,3,4,5,6,7,8,9];



//Takes inputs on the design of the next canvas
  canvas.getDesign = () => {
    let x = document.getElementById("grid-width").value;
    let y = document.getElementById("grid-height").value;

    if (x && y == 0) {  //Default values incase inputs are left empty
      canvas.x = 20;
      canvas.y = 20;
    }
    else {              //Otherwise take user input
      canvas.x = x;
      canvas.y = y;
    }
  }


//Picks a random cell pattern from the options
  canvas.randomCell = () => {
    let i = Math.floor(Math.random()*10);
    return i;
  }


//Draws the canvas to the display
  canvas.draw = () => {
    canvas.clear();
    canvas.getDesign();
    for (i = 0; i < (canvas.x*canvas.y); ++i) {
      const cell = document.createElement("div");

      cell.classList.add("canvas-cell");
      cell.classList.add("cell-fill-" + canvas.randomCell());
      webCanvas.style.gridTemplateColumns=('repeat(' + canvas.x + ', ' + (800 / canvas.x) + 'px)');
      webCanvas.style.gridTemplateRows=('repeat(' + canvas.y + ', ' + (800 / canvas.y) + 'px)');
      webCanvas.appendChild(cell);
    }
  }


//Clears the current canvas on display
  canvas.clear = () => {
    let child = document.getElementsByClassName("canvas-cell");
    while(child[0]) { // Loop removes the entirity of the previous display output
      child[0].parentNode.removeChild(child[0]);
    }
  }
  return canvas;
})();

////////////////////////////////////////////////////////////////////////////////
const controller = (() => {
  const controller = {};
  controller.activeToggle = false;


  controller.startAuto = () => {
    if (controller.activeToggle == false) {
      controller.activeToggle = !controller.activeToggle;
      controller.auto();
    }
    else {
      return;
    }
  }


  controller.stopAuto = () => {
    controller.activeToggle = !controller.activeToggle;
    clearInterval(controller.autoGenerate);
  }


  controller.auto = () => {
    let autoInterval = (document.getElementById("auto-interval").value * 1000);
    canvas.draw()
    controller.autoGenerate = setInterval(canvas.draw,autoInterval);
  }


  return controller
})();

canvas.draw();
