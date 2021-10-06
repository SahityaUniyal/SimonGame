// Rules visibility toggle
const rulesHeading = document.querySelector(".rulesHeading");
const rulesContent = document.querySelector(".rulesContent");
rulesHeading.addEventListener("click", rulesToggle)

function rulesToggle() {
    rulesContent.classList.toggle("active");
    rulesHeading.classList.toggle("rulesHeadingClick");
}

// game handling

var buttonColor = ["green", "red", "yellow", "blue"];
var gameSequence = [];
var userSequence = [];
var level = 0;





// keypress handler
$(document).on("keypress", function(event) {
    if (event.key === "Enter" && level == 0) {
        nextSequence();
        $("#instruction").css("display", "none");
        $('#startButton').text("level:" + level);

    }
    if (event.key === 'g' || event.key === 'r' || event.key === 'y' || event.key === 'b') {
        if (level !== 0) {
            if (event.key === 'g')
                var userChosenColor = "green";
            else if (event.key === 'r')
                var userChosenColor = "red";
            else if (event.key === 'y')
                var userChosenColor = "yellow";
            else if (event.key === 'b')
                var userChosenColor = "blue";
            userSequence.push(userChosenColor);
            animatePress(userChosenColor);
            playSound(userChosenColor);
            checkAnswer(userSequence.length);
        }
    }
});



// click handler
// start button
$("#startButton").click(function() {
    if (this.id === "startButton" && level == 0) {
        nextSequence();
        $("#instruction").css("display", "none");
        $('#startButton').text("level:" + level);
    }
});
// button press during game handling
$(".btn").click(function() {

    if (level != 0) {
        var userChosenColor = this.id;
        userSequence.push(userChosenColor);
        animatePress(userChosenColor);
        playSound(userChosenColor);
        checkAnswer(userSequence.length);
    }
});



// check answers
function checkAnswer(cur) {
    if (gameSequence[cur - 1] === userSequence[cur - 1]) {} else {
        $("body").addClass("game-over");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        setTimeout(function() {
            var text = $("#instruction").text();
            text = "Game Over!!! " + text;
            $("#instruction").text(text);
            $("#instruction").css("display", "block")
            $('#startButton').text("Start");
            $("body").removeClass("game-over");
        }, 300);
        level = 0;
        gameSequence = [];
        userSequence = [];
    }
    if (cur === gameSequence.length) {
        setTimeout(function() {
            nextSequence()
        }, 300);
    }
}


//Next Sequence
function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var colorChosen = buttonColor[randomNumber];
    gameSequence.push(colorChosen);
    $("#" + colorChosen).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(colorChosen);

    userSequence = [];
    level++;
}





// animation and sound handling in game
function playSound(color) {
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

function animatePress(color) {
    $("#" + color).addClass("pressed");
    setTimeout(function() {
        $('#' + color).removeClass("pressed");
    }, 100)
}