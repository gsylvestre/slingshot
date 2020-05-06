var drawer = {

    drawBall: function(){
        ctx.drawImage(state.ball.el, state.ball.x, state.ball.y, state.ball.size, state.ball.size);
    },
    
    drawElastic: function(){
        //line to ball
        ctx.beginPath();
        ctx.lineCap = 'round';
        ctx.moveTo(state.originX, state.originY);
        var lineLength = Math.hypot(state.ball.x-state.originX, state.ball.y-state.originY);
        var coeff = 1 / lineLength * 200;
        ctx.lineWidth = coeff > 3 ? 3 : coeff;
        ctx.lineTo(state.ball.x + state.ball.size / 2, state.ball.y + state.ball.size / 2);
        ctx.stroke();
    },

    drawAimer: function(){
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
    },

    drawAnswers: function(){
        //answers
        ctx.font = state.answerRadius + "px Arial";
        state.answers.forEach(answer => {
            ctx.fillStyle = "#F0F";
            ctx.textAlign = 'center';
            ctx.fillText(answer.number, answer.x, answer.y+state.answerRadius/3);

            ctx.beginPath();
            ctx.setLineDash([]);
            ctx.arc(answer.x, answer.y, state.answerRadius, 0, Math.PI * 2);
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#000000';
            ctx.fillStyle = "transparent";
            ctx.fill();
            ctx.stroke();
            ctx.strokeStyle = 'red';
        });
    },

    drawElasticHolder: function(){
        //line holding point
        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.arc(state.originX, state.originY, 5, 0, Math.PI * 2);
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#000000';
        ctx.fillStyle = "lightblue";
        ctx.fill();
        ctx.stroke();
    },

};