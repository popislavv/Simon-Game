var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern =[];
var level = 0;

//things that happen when you click on buttons
$(".btn").on("click", function() {
    handleButtonClick(this.id);
});

$(document).on("keydown", function(event) {
    if (!gameStarted) {
        handleGameStart();
    }
});

$(document).on("click", function() {
    if (!gameStarted) {
        handleGameStart();
    }
});

function handleGameStart() {
    nextSequence();
    gameStarted = true;
}

function handleButtonClick(userChosenColour) {
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
}
//things function generetes you a random sequence and calls 2 functions that 
// play sound and animate button
function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(200).fadeIn(200);
    
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
    
    level++;
    $("#level-title").text("Level " + level);

}

//function for playing sound
function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
//function for animation
function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");

    setTimeout(function() {
        $("." + currentColour).removeClass("pressed");
    }, 100);
}

var gameStarted = false;
//check if the game started
$(document).keydown(function() {
    if (!gameStarted) { 
        nextSequence();
        gameStarted = true;
    }
});
//check if the last answer is right and if the patterns are the same
function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(gamePattern.length === userClickedPattern.length) {
            setTimeout(nextSequence(), 1000);
            userClickedPattern = [];
        }
    }
    else{
        gameOver();
    }  
}

function gameOver() {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

    $("body").addClass("game-over");

    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);

    level = 0;
    gamePattern = [];

    $("#level-title").text("Game Over, Press Any Key to Restart");

    $(document).keydown(function() {
        if (gameStarted) {
            location.reload();
            gameStarted = false;
        }
    });
}


