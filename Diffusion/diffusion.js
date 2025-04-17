import {Grid, GridCell} from './grid.js';

const canvas = document.getElementById('canvas');
const canvas2d = document.getElementById('canvas2d');
const btn = document.getElementById('start');
const btn2 = document.getElementById('start2d');
const ballCnt = document.getElementById('ballCnt');
const autoStart = document.getElementById('autoStart');
const speedCnt = document.getElementById('speedCnt');
const reset1 = document.getElementById('reset1');
const reset2 = document.getElementById('reset2');

canvas.width = 500;
canvas.height = 500;
canvas2d.width = 500;
canvas2d.height = 50;


const g = new Grid(canvas.height, canvas.width, 20, canvas, false, 20);
const g2 = new Grid(canvas2d.height, canvas2d.width, 50, canvas2d, true);
let speed = 1000;

function move(grid){
    for (let row = 0; row < grid.rows; row++) {
        for (let col = 0; col < grid.cols; col++) {
            let cell = grid.get(row, col);
            grid.diffuse(cell);
            
        }
    }
    for (let row = 0; row < grid.rows; row++) {
        for (let col = 0; col < grid.cols; col++) {
            let cell = grid.get(row, col);
            grid.redrawCell(cell);
            for (let ball of cell.balls){
                ball.visited = false;
            }
        }
    }
}


let started1 = false;

function autoDiffuse(){
    if (!started1){
        console.log("start")
        var myInterval = setInterval(() => move(g), speed);
        started1 = true;
    }
    else{
        clearInterval(myInterval);
        started1 = false;
    }
}

autoStart.addEventListener('click', function(){
    autoDiffuse()
})

speedCnt.addEventListener('change', function(){
    speed = parseInt(1000 - speedCnt.value);
    g.save_state();
    g.reset();
    g.restore();
    autoDiffuse();
    console.log(speed)
    started1 = false;
})

ballCnt.addEventListener('change', function(){
    g.ballCntAdd = parseInt(ballCnt.value);
    console.log(g.ballCntAdd)
})

btn.addEventListener('click', function(){
    move(g);
})

btn2.addEventListener('click', function(){
    move(g2);
})

reset1.addEventListener('click', function(){
    g.reset();
})
reset2.addEventListener('click', function(){
    g2.reset();
})
