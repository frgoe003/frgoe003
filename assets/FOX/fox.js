import {Grid, GridCell} from './grid.js';

const canvas = document.getElementById('canvas');
canvas.width = 500;
canvas.height = 500;
canvas2d.width = 500;
canvas2d.height = 50;

const g = new Grid(canvas.height, canvas.width, 20, canvas, false, 20);

