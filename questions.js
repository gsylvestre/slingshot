var questions = {
    math: {
        felix: [],
        pierrot: []
    },

    init: function(){
        for(let i = 1; i <= 10; i++){
            questions.math.felix.push({
                q: `${i} x ${i} = ?`,
                a: i*i
            });
        }
        for(let i = 1; i <= 10; i++){
            questions.math.pierrot.push({
                q: `${i} x ${i} = ?`,
                a: i*i
            });
        }
    },

    pickRandom: function(categ, person){
        var allQuestions = shuffle(questions[categ][person]);
        var question = allQuestions[0];
        return question;
    },

    
    generateAnswers: function(){
        let numberOfAnswers = 5;

        let tempAnswers = [state.question.a];
        for(let i = 1; i < numberOfAnswers; i++){
            tempAnswers.push(questions.randomIntExluding(tempAnswers));
        }
        tempAnswers = shuffle(tempAnswers);
        state.answers = [];
        for(let i = 0; i < tempAnswers.length; i++){
            let a = {
                number: tempAnswers[i],
                x: (state.vw) / (numberOfAnswers+2) * (i+1) + state.answerRadius,
                y: 50,
                energy: 100
            };
            state.answers.push(a);
        }

        state.answers = shuffle(state.answers);
    }, 

    randomIntExluding: function(excludes)
    {
        let num = Math.ceil(Math.random() * (state.question.a+20));
        if (excludes.indexOf(num) >= 0){
            return questions.randomIntExluding(excludes);
        }
        return num;
    }
};