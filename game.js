var game = {

    init: function (){
        questions.init();
        var canvasElement = document.getElementById('canvas');
        state.vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        state.vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        canvasElement.width = state.vw;
        canvasElement.height = state.vh;
    
        state.ball.init();
        ctx = canvasElement.getContext('2d');
        canvasElement.addEventListener('pointerdown', game.handleCanvasMouseDown);
        canvasElement.addEventListener('pointerup', game.handleCanvasMouseUp);
        canvasElement.addEventListener('pointermove', game.handleCanvasMouseMove);
    
        state.question = questions.pickRandom("math", "felix");
        questions.generateAnswers();
    
        state.shouldDraw = true;
        game.draw();
    },
    
    handleCanvasMouseMove: function (evt){
        if (state.mousedownOnBall){        
            state.ball.x = evt.offsetX - state.ball.size / 2;
            state.ball.y = evt.offsetY - state.ball.size / 2;
            state.ball.y = state.ball.y < state.originY ? state.originY : state.ball.y;
        }
    },
    
    handleCanvasMouseDown: function (evt){
        state.mousedown = true;
        if (evt.offsetX >= state.ball.x && evt.offsetX <= (state.ball.x+state.ball.size) && 
        evt.offsetY >= state.ball.y && evt.offsetY <= (state.ball.y + state.ball.size)){
            state.mousedownOnBall = true;
        }
    },
    
    handleCanvasMouseUp: function (evt){
        state.mousedown = false;
        state.mousedownOnBall = false;
        state.elasticGoingOn = true;
    
        var xDelta = state.originX - state.ball.x - state.ball.size/2;
        var yDelta = state.originY - state.ball.y - state.ball.size/2;
    
        state.currentSpeed = Math.hypot(xDelta, yDelta);
    
        state.xSpeed = xDelta / 20;
        state.ySpeed = yDelta / 20;
    },
    
    //when ball go out
    reset: function (){
        state.elasticGoingOn = false;
        state.elasticGoingOn = 0;
        state.ball.init();
        state.xSpeed = 0;
        state.ySpeed = 0;
    },
    
    
    
    handleAnswerCollisions: function (){
        
        for(let i = 0; i < state.answers.length; i++){
            let answer = state.answers[i];
            var answerCircle = {radius: state.answerRadius, x: answer.x, y: answer.y};
            var ball = {radius: state.ball.size/2, x: state.ball.x+state.ball.size/2, y: state.ball.y+state.ball.size/2};
    
            var dx = answerCircle.x - ball.x;
            var dy = answerCircle.y - ball.y;
            var distance = Math.sqrt(dx * dx + dy * dy);
    
            if (distance < answerCircle.radius + ball.radius) {
                game.reset();
                if (state.answers[i].number == state.question.a){        
                    state.answers[i].energy -= state.currentSpeed / 4;
                    if (state.answers[i].energy <= 0){
                        state.shouldDraw = false;
                        screens.showWinScreen();
                    }
                }
                return true;
            }
        }
    
        return false;
    },
    
    draw: function () {
        console.log(state.vw);
        //erase all
        ctx.clearRect(0,0,state.vw,state.vh); 
    
        //ball is out, reset stuff
        if ((state.ball.x+state.ball.size) < 0 || 
            (state.ball.x > state.vw) ||
            (state.ball.y+state.ball.size) < 0){
            game.reset();
        }
    
        //collision with answer ?
        game.handleAnswerCollisions();
        state.ball.x += state.xSpeed;
        state.ball.y += state.ySpeed;
    
        drawer.drawElasticHolder();
    
        //if under the origin point of the ball
        if (state.ball.y >= state.originY){
            drawer.drawElastic();
            drawer.drawAimer();
        }
    
        drawer.drawAnswers();
        drawer.drawQuestion();
        drawer.drawBall();
    
        if(state.shouldDraw){
            window.requestAnimationFrame(game.draw);
        }
    },  
    
};
