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
    answerRadius: 15,
    answers: [],
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

    generateAnswers();

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

    state.xSpeed = xDelta / 20;
    state.ySpeed = yDelta / 20;
}

//when ball go out
function reset(){
    state.ball.init();
    state.xSpeed = 0;
    state.ySpeed = 0;
}

function generateAnswers(){
    let numberOfAnswers = 5;
    for(let i = 1; i <= numberOfAnswers; i++){
        let a = {
            number: Math.ceil(Math.random() * 50),
            x: (state.vw) / (numberOfAnswers+2) * (i) + state.answerRadius,
            y: 250
        };
        state.answers.push(a);
    }
    console.log(state);
}

function checkForAnswerCollisions(){
    for(let i = 0; i < state.answers.length; i++){
        let answer = state.answers[i];
        var circle1 = {radius: state.answerRadius, x: answer.x, y: answer.y};
        var ball = {radius: state.ball.size/2, x: state.ball.x+state.ball.size/2, y: state.ball.y+state.ball.size/2};

        var dx = circle1.x - ball.x;
        var dy = circle1.y - ball.y;
        var distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < circle1.radius + ball.radius) {
            // collision détectée !
            console.log("collision", answer);
            console.log(ball);
            return answer;
        }
    }
    return false;
}

function draw() {
    //erase all
    ctx.clearRect(0,0,state.vw,state.vh); 

    //ball is out, reset stuff
    if ((state.ball.x+state.ball.size) < 0 || 
        (state.ball.x > state.vw) ||
        (state.ball.y+state.ball.size) < 0){
        reset();
    }

    //collision with answer ?
    var collided = checkForAnswerCollisions();
    if (collided === false){
        state.ball.x += state.xSpeed;
        state.ball.y += state.ySpeed;
    }
    else {
        console.log(collided);
    }

    drawer.drawElasticHolder();

    //if under the origin point of the ball
    if (state.ball.y >= state.originY){
        drawer.drawElastic();
        drawer.drawAimer();
    }

    drawer.drawAnswers();
    drawer.drawBall();

    window.requestAnimationFrame(draw);
};  

init();