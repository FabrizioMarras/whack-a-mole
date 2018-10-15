// Getting HTML document elements.
const holes = document.querySelectorAll('.hole'); //select all the holes.
const scoreBoard = document.querySelector('.score'); //select the score.
const moles = document.querySelectorAll('.mole'); //select all the moles.
const countDown = document.querySelector('.timer'); //select the score.
const startScreen = document.querySelector('.start-screen'); //select the score.
const gameBoard = document.querySelector('.game'); //select the score.
const newGame = document.querySelector('.new-game'); // select the new-game button.

let lastHole; //this variable is needed in the randomHole function to avoid that the same hole is picked twice or more consecutively.
let timeUp = false; //this variable is used for being able to control the time frame in which the mole pops up and down from the holes...it is used in the popMole function.
let score; //variable used in startGame and popMole functions to set the score of the game.
let minTime; //variable used to set the min time for the pop of the mole
let maxTime; //variable used to set the max time for the pop of the mole

//generate random Time amount:
function randomTime(min, max) {
 return Math.round(Math.random() * (max - min) + min);
}

//Pick the hole randomly:
function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length); //generate a number between 1 and themax number of holes.
  const hole = holes[idx]; //assign to "hole" a random hole in our holes list.
  // next we make sure that the same number for the hole doesn't appear consecutively.
  if(hole === lastHole) {
    return randomHole(holes); // run the function again to pick a new hole.
  }
  lastHole = hole; //set the lastHole equal to the last picked hole.
  return hole;
}

//Pop the mole from the hole:
function popMole() {
  //getting the random time for the pop depending on the difficulty level selected:
    const time = randomTime(minTime, maxTime);
   //reduce the numbers (time) to make the game more difficult.
  //getting the random holes where to pop
  const hole = randomHole(holes);
  //add the "pop" class to our div containing the class of hole in order to generate the pop effect for the mole:
  hole.classList.add('pop');
  //remove the mole after a random amount of time by creating a setTimeout function:
   setTimeout(() => {
     // after a random amount of time it removes the pop class
     hole.classList.remove('pop');
     if (!timeUp) popMole(); //keeps popping moles one after the other by calling the popMole function. unless the timeUp variable is set to true - timeUp is set to false at the beginning;
   }, time);
}

//Start the Game:
function startGame() {
  scoreBoard.textContent = 0; // reset the score to 0;
  timeUp = false; //make sure that the timeUp is false at the bneginning of each game.
  score = 0; // set the score to 0 at the beginning of the game.

    // Add a Countdown time:
    var timeleft = 10;
    var downloadTimer = setInterval(function(){
    timeleft--;
    countDown.textContent = timeleft;
    if(timeleft <= 0)
        clearInterval(downloadTimer);
    },1000);

  popMole(); //start making the mole popping up and down from random holes.
  setTimeout(() => timeUp = true, 10000); //stop the popping of the moles after 10 seconds.
  setTimeout(newGameButton, 11000);
}

// Check which button is clicked and run the function:
  // click on the easy button:
  document.querySelector('.easy').addEventListener('click', function easy() {
    minTime = 500; // 0.5 seconds
    maxTime = 1000; // 1 seconds
    startScreen.classList.toggle('hide'); // toggle the class in order to make the start screen disappear once the level button is clicked.
    // show the game board to start playing the game:
    gameBoard.classList.remove('hide');
    gameBoard.classList.add('show');
    // set a time delay of 1 second before the game start:
    setTimeout(startGame, 1000);
  }, false);
  //click on the difficult button:
  document.querySelector('.difficult').addEventListener('click', function difficult() {
    minTime = 400; // 0.4 seconds
    maxTime = 800; // 0.8 seconds
    startScreen.classList.toggle('hide'); // toggle the class in order to make the start screen disappear once the level button is clicked.
    // show the game board to start playing the game:
    gameBoard.classList.remove('hide');
    gameBoard.classList.add('show');
    // set a time delay of 1 second before the game start:
    setTimeout(startGame, 1000);
  }, false);

//Click on the "new Game" button to start over the game:
newGame.addEventListener('click', function newGame() {
  window.location.reload();
}, false);

// make the new game button appear:
function newGameButton() {
  newGame.classList.remove('hide'); //remove the hide class
  newGame.classList.add('show'); // add the show class.
}


//Click on the mole:
function clickMole(event) {
  if(!event.isTrusted) return; //avoid cheating the clicks!
  score++; //increase the score by one point every time the mole is clicked.
  this.classList.remove("pop"); //make sure that the mole goes down after it is clicked - this avoid that the mole is clicked more than once.
  scoreBoard.textContent = score; //update the score.
}

moles.forEach(mole => mole.addEventListener("click", clickMole)); //listen to the DOM for clicks on the mole.
