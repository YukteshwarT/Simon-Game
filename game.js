var buttonColor = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedpattern = [];

var started = false;
var level = 0;

$("body").on("touch keydown",function(){
   if(!started){
    nextSequence();
    started=true;
    $("h1").text("Level "+ level);
   }
})

function nextSequence(){
  userClickedpattern = [];
  level++;
  $("h1").text("Level "+ level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColor[randomNumber];
  gamePattern.push(randomChosenColor);
  var sound = $("#"+ randomChosenColor);
  sound.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  var audio = new Audio("sounds/" + randomChosenColor +".mp3");
  audio.play();
}

$(".btn").on("click",function(){
  userChosenColor = $(this).attr("id");
  userClickedpattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedpattern.length - 1);
})

function playSound(name){
  var audio = new Audio("sounds/" + name +".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100)
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]==userClickedpattern[currentLevel]){
    if(gamePattern.length==userClickedpattern.length){
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  }else{
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200)
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;    
}
