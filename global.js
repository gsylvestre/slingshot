var state = {
    vw: null,
    vh: null,
    mousedown: false,
    mousedownOnBall: false,
    currentSpeed: null,
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
    question: null,
    answers: [],
    shouldDraw: false,
}

var ctx = null;


function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
