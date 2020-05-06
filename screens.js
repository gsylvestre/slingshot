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
        screens.hideAllScreens();
        screens.playScreen.style.display = "block";
        game.init();

    }, 

    handlePlayButtonClick: function(evt){
        screens.showPlayScreen();
    }
};

screens.init();
