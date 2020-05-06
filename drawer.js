var drawer = {
    rot: 0,

    drawBall: function(){
        ctx.save();

        ctx.translate(state.ball.x+state.ball.size/2, state.ball.y+state.ball.size/2);
        
        if (state.elasticGoingOn){
            drawer.rot += Math.abs(state.ySpeed)/100;
            ctx.rotate(drawer.rot);
        }
    
        ctx.drawImage(state.ball.el, -state.ball.size/2, -state.ball.size/2, state.ball.size, state.ball.size);
        ctx.restore();
    },
    
    drawElastic: function(){
        //line to ball
        ctx.beginPath();
        ctx.lineCap = 'round';
        ctx.moveTo(state.originX, state.originY);
        let hyp = Math.hypot(state.ball.x-state.originX, state.ball.y-state.originY);
        var coeff = 1 / hyp * 200;
        ctx.lineWidth = coeff > 3 ? 3 : coeff;
        ctx.lineTo(state.ball.x + state.ball.size / 2, state.ball.y + state.ball.size / 2);
        ctx.stroke();
    },

    drawAimer: function(){
        //aimer
        if (state.mousedownOnBall){
            ctx.beginPath();
            ctx.lineCap = 'butt';
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgba(255,0,255)';
            ctx.setLineDash([5,5]);

            var hypotenuseBall = Math.hypot(state.ball.x+state.ball.size/2-state.originX, state.ball.y+state.ball.size/2-state.originY);
            var hypotenuseAimer = Math.round(1/hypotenuseBall*5000);

            var angleInRadians = Math.atan2(state.ball.y+state.ball.size/2-state.originY, state.ball.x+state.ball.size/2-state.originX);

            var adjLength = Math.cos(angleInRadians) * hypotenuseAimer;
            var oppLength = Math.sin(angleInRadians) * hypotenuseAimer;

            var toX = state.originX - adjLength;
            var toY = state.originY - oppLength;

            ctx.moveTo(state.originX, state.originY);
            ctx.lineTo(toX, toY);
            ctx.stroke();
        }
    },

    drawAnswers: function(){
        //answers
        ctx.font = state.answerRadius + "px Muli";
        state.answers.forEach(answer => {
            ctx.beginPath();
            ctx.setLineDash([]);
            ctx.arc(answer.x, answer.y, state.answerRadius, 0, Math.PI * 2 * answer.energy / 100);
            ctx.lineWidth = 2;
            ctx.fillStyle = "lightblue";
            ctx.strokeStyle = '#000000';
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = "#000";
            ctx.textAlign = 'center';
            ctx.fillText(answer.number, answer.x, answer.y+state.answerRadius/3);
            ctx.stroke();
        });
    },

    drawQuestion: function(){
        ctx.font = "" + 50 + "px Muli";
        ctx.fillStyle = "rgba(255,0,255,0.4)";
        ctx.textAlign = 'center';
        ctx.fillText(state.question.q, state.originX, state.originY - 100);
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