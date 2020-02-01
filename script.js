const canvas = (() => {
//Local Variables
  const canvas = {};
  const webCanvas = document.getElementById("canvas");
  canvas.cell = [0,1,2,3,4,5,6,7,8,9];

//Takes inputs on the design of the next canvas
  canvas.getDesign = (x,y) => {
    canvas.x = x;
    canvas.y = y;
  }

//Generates the fill pattern for the next grid
  canvas.generate = () => {
    let i = 0;
    for (i = 0; i < (canvas.x*canvas.y); ++i ) {
      console.log(i);
    }
  }

//Picks a random cell pattern from the options
  canvas.randomCell = () => {
    let i = Math.floor(Math.random()*10);
    return i;
  }

//Draws the canvas to the display
  canvas.draw = () => {
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

  }
  return canvas;
})();

canvas.getDesign(40,40);
canvas.draw();
