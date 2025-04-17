export class GridCell {
  constructor(id, row, col, visited = false, isPassable = true, fillColor = null, strokeColor = null) {
    this.id = id;
    this.row = row;
    this.col = col;
    this.visited = visited;
    this.isPassable = isPassable;
    this.fillColor = fillColor;
    this.balls = [];
    this.strokeColor = strokeColor;
  }

  get color() {
    if (this.fillColor) return this.fillColor;
    else return this.strokeColor;
  }

  toString() {
    return `${this.id}`;
  }
}

class Ball {
  constructor(x, y, radius = 10, color = 'rgba(0,0,255,0.1)', visited = false) {
    let spreadFact = parseInt(radius * 0.7)
    this.x = x + Math.floor(Math.random() * (2 * spreadFact + 1) - spreadFact);
    this.y = y + Math.floor(Math.random() * (2 * spreadFact + 1) - spreadFact);
    this.radius = radius;
    this.color = color;
    this.visited = visited;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
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
    this.initGrid();
    this.drawCells();
  }

  onCellClick(gridCell) {
    this.addBall(gridCell, this.ballCntAdd, false);
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

  initGrid() {
    let counter = 0;
    for (let row = 0; row < this.rows; row++) {
      this._grid[row] = [];
      for (let col = 0; col < this.cols; col++) {
        this._grid[row][col] = new GridCell(counter++, row, col, false, true);
      }
    }

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

  drawCells() {
    //console.log(this._grid, this.rows, this.cols)
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const gridCell = this._grid[row][col];
        this.drawRect(gridCell.row, gridCell.col, 'black');
        if (this.textDraw) {
          this.drawText(row, col, `${gridCell.id}`);
        }
        for (let i = 0; i < gridCell.balls.length; i++) {
          //console.log(gridCell.row, gridCell.col)
          gridCell.balls[i].draw(this.context);
        }
      }
    }
  }

  getNeighbours(gridCell, includeDiagonals = false, excludeVisitedNeighbours = false, excludeClosedNeighbours = false) {
    const x = gridCell.row;
    const y = gridCell.col;

    const top = [x - 1, y];
    const right = [x, y + 1];
    const bottom = [x + 1, y];
    const left = [x, y - 1];

    const topRight = [x - 1, y + 1];
    const bottomRight = [x + 1, y + 1];

    const topLeft = [x - 1, y - 1];
    const bottomLeft = [x + 1, y - 1];

    return [top, right, bottom, left, ...(includeDiagonals ? [topRight, bottomRight, bottomLeft, topLeft] : [])]
      .filter(([row, col]) => row >= 0 && col >= 0 && row < this.rows && col < this.cols)
      .map(([row, col]) => this.get(row, col))
      .filter((gridCell) => (excludeVisitedNeighbours ? !gridCell.visited : true))
      .filter((gridCell) => (excludeClosedNeighbours ? gridCell.isPassable : true));
  }

  diffuse(cell) {
    let neighbours = this.getNeighbours(cell);
    let n = neighbours.length;
    let visited = [];
    for (let i = 0; i < cell.balls.length; i++) {
      let ball = cell.balls[i];
      if (ball.visited) continue;
      let idx = Math.floor(Math.random() * n);
      let randomNeighbour = neighbours[idx];
      this.addBall(randomNeighbour, 1, true);
      visited.push(i);
    }
    if (visited.length == 0) return;
    for (let i = visited.length - 1; i >= 0; i--) {
      cell.balls.splice(visited[i], 1);
    }
  }

  addBall(cell, n, visited = false) {
    for (let i = 0; i < n; i++) {
      let x = cell.col * this.cellSize + this.cellSize / 2;
      let y = cell.row * this.cellSize + this.cellSize / 2;
      let ball = new Ball(x, y, parseInt(this.cellSize * 0.3), 'rgba(0,0,255,0.1)', 7, visited);
      cell.balls.push(ball);
    }
  }

  redrawCell(gridCell) {

    this.drawRect(gridCell.row, gridCell.col, gridCell.color);
    if (this.textDraw) {
      this.drawText(gridCell.row, gridCell.col, `${gridCell.id}`);
    }
    for (let i = 0; i < gridCell.balls.length; i++) {
      gridCell.balls[i].draw(this.context);
    }
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

  drawText(col, row, text, style = 'black') {
    this.context.font = '10px Arial';
    const fillStyle = this.context.fillStyle;
    this.context.fillStyle = style;
    this.context.fillText(
      `${text}`,
      this.cellSize * row + 10,
      this.cellSize * col + 20
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
