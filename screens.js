var screens = {
    playScreen: document.getElementById("play-screen"),
    winScreen: document.getElementById("win-screen"),
    homeScreen: document.getElementById("home-screen"),
    allScreens: document.getElementsByClassName("screen"),

    init: function(){
        let playButton = document.getElementById("play-btn");
        playButton.addEventListener("click", screens.handlePlayButtonClick);
        let playAgainButton = document.getElementById("play-again-btn");
        playAgainButton.addEventListener("click", screens.handlePlayButtonClick);
        window.addEventListener('resize', screens.resizeStuff);
    },

    resizeStuff: function(){
        state.vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        state.vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        canvasElement.width = state.vw;
        canvasElement.height = state.vh;
    },

    hideAllScreens: function(){
        for(let i = 0; i < screens.allScreens.length; i++){
            screens.allScreens[i].style.display = "none";
        }
    },

    showWinScreen: function(){
        screens.hideAllScreens();
        screens.winScreen.style.display = "block";

    }, 

    showPlayScreen: function(){
        document.body.requestFullscreen();
        screens.hideAllScreens();
        screens.playScreen.style.display = "block";
        game.init();

    }, 

    handlePlayButtonClick: function(evt){
        screens.showPlayScreen();
    }
};

screens.init();
