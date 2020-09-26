
let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

//Start the game
function startGame() {
    if (!started) {
      started = true;
      level=0;
      $(".mobile-button").hide();
    nextSequence();
    }
}
//Start game on computer
  $(document).keydown(function() {
  startGame();
});
//Start game on phone
$(".mobile-button").click(function() {
startGame();
});

//Game pattern generator
function nextSequence() {
  userClickedPattern = [];
  $("h1").text("Level " + level);
  level++;
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
//Repeat The Sequence
//for the first round
  if (gamePattern.length === 0) {
      gamePattern.push(randomChosenColor);
      animateRandom(randomChosenColor);
      playSound(randomChosenColor);
    } else {
      var i = 0;
      oldLoop();
      //for next rounds
      function oldLoop() {
        setTimeout(function() {
          //loop that plays back game pattern
          if (i < gamePattern.length) {
            animateRandom(gamePattern[i]);
            playSound(gamePattern[i]);
            i++;
            oldLoop();
          } else {
            //after playing game pattern, plays latest color/sounds
            setTimeout(function() {
              gamePattern.push(randomChosenColor);
              animateRandom(randomChosenColor);
              playSound(randomChosenColor);
            }, 100);
          }
        }, 400);
      }
    }
  }

//User interraction detection
$(".btn").click(function() {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

//Check answers
function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      console.log("success");
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 100);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("#mobile-score").text("Game Over");
    $(".mobile-button").show();
    startOver();
  }
}

//Restart the game
function startOver(){
  started = false;
  level=0;
  gamePattern = [];
}
//Sound
function playSound(name) {
  let audio = new Audio("sounds/" + (name) + ".mp3");
  audio.play();
}
//Animation
function animatePress(currentColor) {
  let activeButton = $("." + currentColor);
  activeButton.addClass("pressed");

  setTimeout(function() {
    activeButton.removeClass("pressed");
  }, 100);
}

function animateRandom(randomColor){
  $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
}
