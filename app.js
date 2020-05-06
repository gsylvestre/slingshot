var state = {
    vw: null,
    vh: null,
    mousedown: false,
    mousedownOnBall: false,
    elasticGoingOn: false,
    ball: {
        el: null,
        size: 24,
        x: null,
        y: null,
        init: function(){
            state.ball.el = new Image();
            state.ball.el.src = "football.png";

            state.originX = state.vw / 2;
            state.originY = state.vh / 2 + 100;

            state.ball.x = state.originX  - state.ball.size / 2;
            state.ball.y = state.originY - state.ball.size / 2;
        }      
    },
    originX: null,
    originY: null,
    xSpeed: 0,
    ySpeed: 0,    
}

var ctx = null;

function init(){
    var canvasElement = document.getElementById('canvas');
    state.vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    state.vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    canvasElement.width = state.vw;
    canvasElement.height = state.vh;

    state.ball.init();
    ctx = canvasElement.getContext('2d');
    canvasElement.addEventListener('pointerdown', handleCanvasMouseDown);
    canvasElement.addEventListener('pointerup', handleCanvasMouseUp);
    canvasElement.addEventListener('pointermove', handleCanvasMouseMove);

    draw();
}

function handleCanvasMouseMove(evt){
    if (state.mousedownOnBall){        
        state.ball.x = evt.offsetX - state.ball.size / 2;
        state.ball.y = evt.offsetY - state.ball.size / 2;
        state.ball.y = state.ball.y < state.originY ? state.originY : state.ball.y;
    }
}

function handleCanvasMouseDown(evt){
    state.mousedown = true;
    if (evt.offsetX >= state.ball.x && evt.offsetX <= (state.ball.x+state.ball.size) && 
    evt.offsetY >= state.ball.y && evt.offsetY <= (state.ball.y + state.ball.size)){
        state.mousedownOnBall = true;
    }
}

function handleCanvasMouseUp(evt){
    state.mousedown = false;
    state.mousedownOnBall = false;
    state.elasticGoingOn = true;

    var xDelta = state.originX - state.ball.x - state.ball.size/2;
    var yDelta = state.originY - state.ball.y - state.ball.size/2;

    console.log(yDelta);
    state.xSpeed = xDelta / 20;
    state.ySpeed = yDelta / 20;
}

function reset(){
    state.ball.init();
    state.xSpeed = 0;
    state.ySpeed = 0;
    console.log(state);
}

function draw() {
    
    if ((state.ball.x+state.ball.size) < 0 || (state.ball.x > state.vw) ||(state.ball.y+state.ball.size) < 0){
        console.log("ball out");
        reset();
    }

    state.ball.x += state.xSpeed;
    state.ball.y += state.ySpeed;


    ctx.clearRect(0,0,state.vw,state.vh); // effacer le canvas

    //line holding point
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.arc(state.originX, state.originY, 5, 0, Math.PI * 2);
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#000000';
    ctx.fillStyle = "lightblue";
    ctx.fill();
    ctx.stroke();

    if (state.ball.y >= state.originY){
        //line to ball
        ctx.beginPath();
        ctx.lineCap = 'round';
        ctx.moveTo(state.originX, state.originY);
        var lineLength = Math.hypot(state.ball.x-state.originX, state.ball.y-state.originY);
        var coeff = 1 / lineLength * 200;
        ctx.lineWidth = coeff > 3 ? 3 : coeff;
        ctx.lineTo(state.ball.x + state.ball.size / 2, state.ball.y + state.ball.size / 2);
        ctx.stroke();

        //aimer
        if (state.mousedownOnBall){
            ctx.beginPath();
            ctx.lineCap = 'butt';
            ctx.setLineDash([5, 10]);
            var lineLength = Math.hypot(state.ball.x-state.originX, state.ball.y-state.originY);
            var coeff = 1 / lineLength * 100;
            ctx.lineWidth = coeff > 3 ? 3 : coeff;
            ctx.strokeStyle = 'rgba(255,0,255,'+coeff+')';
            ctx.moveTo(state.originX, state.originY);
            var toX = ((state.originX - (state.ball.x - state.originX) - state.ball.size/2) + state.originX) / 2;
            var toY = ((state.originY - (state.ball.y - state.originY) - state.ball.size/2) + state.originY) / 2;
            ctx.lineTo(toX, toY);
            ctx.stroke();
        }
    }

    ctx.drawImage(state.ball.el, state.ball.x, state.ball.y, state.ball.size, state.ball.size);

    window.requestAnimationFrame(draw);
};  

init();