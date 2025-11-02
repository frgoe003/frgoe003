export class GridCell {
  constructor(id, row, col, visited = false, isPassable = true, fillColor = null, strokeColor = null) {
    this.id = id;
    this.row = row;
    this.col = col;
    this.visited = visited;
    this.isPassable = isPassable;
    this.fillColor = fillColor;
    this.strokeColor = strokeColor;
    this.text = '';
  }

  addText(text) {
    this.text = text;
  }

  get color() {
    if (this.fillColor) return this.fillColor;
    else return this.strokeColor;
  }

  set_color(color) {
    this.fillColor = this.fillColor == 'red' ? 'black' : color;
  }

  toString() {
    return `${this.id}`;
  }
}


export class Grid {
  constructor(gridHeight, gridWidth, cellSize, canvasElement, textDraw = true, initCnt = 1) {
    this.gridHeight = gridHeight;
    this.gridWidth = gridWidth;
    this.cellSize = cellSize; // Size of individual cell in pixel
    this.canvasElement = canvasElement;
    this.context = canvasElement.getContext('2d');
    this.ballCntAdd = initCnt;
    this.textDraw = textDraw;
    this.state = null;

    this.cols = Math.round(this.gridWidth / this.cellSize);
    this.rows = Math.round(this.gridHeight / this.cellSize);
    this._grid = [];
    this.correctHit = [[0,0],[0,0],[0,0]]
    this.initGrid();
    this.drawCells();

  }

  get_all_cells() {
    return this._grid.flat();
  }

  onCellClick(gridCell) {
    gridCell.set_color('red');
    //gridCell.addText('F');
  }

  get(row, col) {
    return this._grid[row][col];
  }
  save_state() {
    this.state = this._grid;
  }

  restore() {
    if (this.state) {
      this._grid = this.state;
      this.drawCells();
    }
  }

  set(row, col, gridCell, redrawCell = false) {
    const oldGridCell = this._grid[row][col];
    const newGridCell = Object.assign(oldGridCell, gridCell);
    if (redrawCell) this.redrawCell(newGridCell);
    return newGridCell;
  }

  getRandomLetter() {
    const letters = ['F', 'O', 'X'];
    return letters[Math.floor(Math.random() * letters.length)];
  }

  initGrid() {
    let counter = 0;
    let foxhits = 0;

    for (let row = 0; row < this.rows; row++) {
      this._grid[row] = [];
      for (let col = 0; col < this.cols; col++) {
        this._grid[row][col] = new GridCell(counter++, row, col, false, true);
        this._grid[row][col].text = this.getRandomLetter();
      }
    }


    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        if (this.checkHit(row, col, foxhits == 0)) {
          foxhits++;
        }
        console.log(this.correctHit)

        if (row == this.correctHit[0][0] && col == this.correctHit[0][1] &&
            row == this.correctHit[1][0] && col == this.correctHit[1][1] &&
            row == this.correctHit[2][0] && col == this.correctHit[2][1]
        ) {
          continue
        }
        
        if (foxhits > 1) {
          while (foxhits > 1 && this.checkHit(row, col)) {
            this._grid[row][col].text = this.getRandomLetter();
            if (!this.checkHit(row, col)) {
              foxhits-=1
            }
          }
        }
      }
    }

    this._grid[0][0].text = 'F'
    this._grid[0][1].text = 'O'
    this._grid[0][2].text = 'X'

    this.canvasElement.addEventListener('click', (e) => {
      let x = e.pageX;
      let y = e.pageY;
      x -= this.canvasElement.offsetLeft;
      y -= this.canvasElement.offsetTop;
      const coords = this.canvasToGrid({ x, y });
      const gridCell = this.get(coords.row, coords.col)
      this.onCellClick(gridCell);
      this.redrawCell(gridCell);
    });
  }
  checkHit(row, col, isFirst = false) {
    const rowCount = this._grid.length;
    const colCount = this._grid[0].length;
  
    // Check for horizontal hit
    if (col + 2 < colCount &&
        this._grid[row][col].text == 'F' && 
        this._grid[row][col+1].text == 'O' && 
        this._grid[row][col+2].text == 'X') {
          if (isFirst) {
            this.correctHit[0] = [row, col]
            this.correctHit[1] = [row, col+1]
            this.correctHit[2] = [row, col+2]
          }
      return true;
    }
  
    // Check for vertical hit
    if (row + 2 < rowCount &&
        this._grid[row][col].text == 'F' && 
        this._grid[row+1][col].text == 'O' && 
        this._grid[row+2][col].text == 'X') {
          if (isFirst) {
            this.correctHit[0] = [row, col]
            this.correctHit[1] = [row+1, col]
            this.correctHit[2] = [row+2, col]
          }
      return true;
    }
  
    // Check for diagonal hit (bottom-right)
    if (row + 2 < rowCount && col + 2 < colCount &&
        this._grid[row][col].text == 'F' && 
        this._grid[row+1][col+1].text == 'O' && 
        this._grid[row+2][col+2].text == 'X') {
          if (isFirst) {
            this.correctHit[0] = [row, col]
            this.correctHit[1] = [row+1, col+1]
            this.correctHit[2] = [row+2, col+2]
          }
      return true;
    }
  
    // Check for diagonal hit (bottom-left)
    if (row + 2 < rowCount && col - 2 >= 0 &&
        this._grid[row][col].text == 'F' && 
        this._grid[row+1][col-1].text == 'O' && 
        this._grid[row+2][col-2].text == 'X') {
          if (isFirst) {
            this.correctHit[0] = [row, col]
            this.correctHit[1] = [row+1, col-1]
            this.correctHit[2] = [row+2, col-2]
          }
      return true;
    }
  
    // Check for vertical hit above
    if (row - 2 >= 0 &&
        this._grid[row][col].text == 'F' && 
        this._grid[row-1][col].text == 'O' && 
        this._grid[row-2][col].text == 'X') {
          if (isFirst) {
            this.correctHit[0] = [row, col]
            this.correctHit[1] = [row-1, col]
            this.correctHit[2] = [row-2, col]
          }
      return true;
    }
  
    // Check for diagonal hit above (top-right)
    if (row - 2 >= 0 && col + 2 < colCount &&
        this._grid[row][col].text == 'F' && 
        this._grid[row-1][col+1].text == 'O' && 
        this._grid[row-2][col+2].text == 'X') {
          if (isFirst) {
            this.correctHit[0] = [row, col]
            this.correctHit[1] = [row-1, col+1]
            this.correctHit[2] = [row-2, col+2]
          }
      return true;
    }
  
    // Check for diagonal hit above (top-left)
    if (row - 2 >= 0 && col - 2 >= 0 &&
        this._grid[row][col].text == 'F' && 
        this._grid[row-1][col-1].text == 'O' && 
        this._grid[row-2][col-2].text == 'X') {
          if (isFirst) {
            this.correctHit[0] = [row, col]
            this.correctHit[1] = [row-1, col-1]
            this.correctHit[2] = [row-2, col-2]
          }
      return true;
    }
  
    // Check for horizontal hit above
    if (col - 2 >= 0 &&
        this._grid[row][col].text == 'F' && 
        this._grid[row][col-1].text == 'O' && 
        this._grid[row][col-2].text == 'X') {
          if (isFirst) {
            this.correctHit[0] = [row, col]
            this.correctHit[1] = [row, col-1]
            this.correctHit[2] = [row, col-2]
          }
      return true;
    }

    // Check for reversed horizontal hit
    if (col + 2 < colCount &&
        this._grid[row][col].text == 'X' && 
        this._grid[row][col+1].text == 'O' && 
        this._grid[row][col+2].text == 'F') {
          if (isFirst) {
            this.correctHit[0] = [row, col]
            this.correctHit[1] = [row, col+1]
            this.correctHit[2] = [row, col+2]
          }
      return true;
    }
  
    // Check for reversed horizontal hit
    if (col - 2 >= 0 &&
        this._grid[row][col].text == 'X' && 
        this._grid[row][col-1].text == 'O' && 
        this._grid[row][col-2].text == 'F') {
          if (isFirst) {
            this.correctHit[0] = [row, col]
            this.correctHit[1] = [row, col-1]
            this.correctHit[2] = [row, col-2]
          }
      return true;
    }
  
    // Check for reversed vertical hit
    if (row - 2 >= 0 &&
        this._grid[row][col].text == 'X' && 
        this._grid[row-1][col].text == 'O' && 
        this._grid[row-2][col].text == 'F') {
          if (isFirst) {
            this.correctHit[0] = [row, col]
            this.correctHit[1] = [row-1, col]
            this.correctHit[2] = [row-2, col]
          }
      return true;
    }

    // Check for reversed vertical hit
    if (row + 2 < rowCount &&
        this._grid[row][col].text == 'X' && 
        this._grid[row+1][col].text == 'O' && 
        this._grid[row+2][col].text == 'F') {
          if (isFirst) {
            this.correctHit[0] = [row, col]
            this.correctHit[1] = [row+1, col]
            this.correctHit[2] = [row+2, col]
          }
      return true;
    }

    // Check for reversed diagonal hit (bottom-right to top-left)
    if (row + 2 < rowCount && col + 2 < colCount &&
        this._grid[row][col].text == 'X' && 
        this._grid[row+1][col+1].text == 'O' && 
        this._grid[row+2][col+2].text == 'F') {
          if (isFirst) {
            this.correctHit[0] = [row, col]
            this.correctHit[1] = [row+1, col+1]
            this.correctHit[2] = [row+2, col+2]
          } 
      return true;
    }

    // Check for reversed diagonal hit (bottom-left to top-right)
    if (row + 2 < rowCount && col - 2 >= 0 &&
        this._grid[row][col].text == 'X' && 
        this._grid[row+1][col-1].text == 'O' && 
        this._grid[row+2][col-2].text == 'F') {
          if (isFirst) {
            this.correctHit[0] = [row, col]
            this.correctHit[1] = [row+1, col-1]
            this.correctHit[2] = [row+2, col-2]
          }
      return true;
    }

    // Check for reversed diagonal hit (top-left to bottom-right)
    if (row - 2 >= 0 && col - 2 >= 0 &&
        this._grid[row][col].text == 'X' && 
        this._grid[row-1][col-1].text == 'O' && 
        this._grid[row-2][col-2].text == 'F') {
          if (isFirst) {
            this.correctHit[0] = [row, col]
            this.correctHit[1] = [row-1, col-1]
            this.correctHit[2] = [row-2, col-2]
          }
      return true;
    }
  
    // Check for reversed diagonal hit (top-right to bottom-left)
    if (row - 2 >= 0 && col + 2 < colCount &&
        this._grid[row][col].text == 'X' && 
        this._grid[row-1][col+1].text == 'O' && 
        this._grid[row-2][col+2].text == 'F') {
          if (isFirst) {
            this.correctHit[0] = [row, col]
            this.correctHit[1] = [row-1, col+1]
            this.correctHit[2] = [row-2, col+2]
          }
      return true;
    }
  
    return false;
  }


  drawCells() {
    //console.log(this._grid, this.rows, this.cols)
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const gridCell = this._grid[row][col];
        this.drawRect(gridCell.row, gridCell.col, 'black');

        this.drawText(gridCell.row, gridCell.col, gridCell.text);
      }
    }
  }


  redrawCell(gridCell) {
    this.drawRect(gridCell.row, gridCell.col, gridCell.color);
    this.drawText(gridCell.row, gridCell.col, gridCell.text);
  }


  drawRect(row, col, strokeColor = 'black', fillStyle = 'rgba(255,229,204,1)') {
    const strokeDefaultColor = this.context.strokeStyle;
    this.context.strokeStyle = strokeColor;
    this.context.lineWidth = toString(this.cellSize / 30)
    this.context.fillStyle = fillStyle;
    this.context.beginPath();
    this.context.rect(
      this.cellSize * col,
      this.cellSize * row,
      this.cellSize,
      this.cellSize
    );
    this.context.fill();
    this.context.stroke();
    this.context.strokeStyle = strokeDefaultColor;
  }

  drawText(row, col, text) {
    this.context.font = this.cellSize + 'px Arial';
    const fillStyle = this.context.fillStyle;
    this.context.fillStyle = 'black';
    this.context.fillText(
      `${text}`,
      this.cellSize * col + 4,
      this.cellSize * (row + 1) - 2,
    );
    this.context.fillStyle = fillStyle;
  }

  canvasToGrid(e) {
    let x = Math.floor(e.x / this.cellSize);
    let y = Math.floor(e.y / this.cellSize);
    if (x >= 0 && y >= 0 && x < this.cols && y < this.rows) {
      return { row: y, col: x };
    } else {
      return null;
    }
  }

  reset() {
    this._grid = [];
    this.initGrid();
    this.drawCells();
  }
}
