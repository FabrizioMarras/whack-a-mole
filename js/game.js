// Getting HTML document elements.
const holes = document.querySelectorAll('.hole'); //select all the holes.
const scoreBoard = document.querySelector('.score'); //select the score.
const moles = document.querySelectorAll('.mole'); //select all the moles.

let lastHole; //this variable is needed in the randomHole function to avoid that the same hole is picked twice or more consecutively.
let timeUp = false; //this variable is used for being able to control the time frame in which the mole pops up and down from the holes...it is used in the popMole function.
let score;

//generate random Time amount:
function randomTime(min, max) {
 return Math.round(Math.random() * (max - min) + min);
}

//Pick the hole randomly:
function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);//generate a number between 1 and themax number of holes.
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
  //getting the random time for the pop
  const time = randomTime(500, 900); //reduce the numbers (time) to make the game more difficult.
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
  popMole(); //start making the mole popping up and down from random holes.
  setTimeout(() => timeUp = true, 10000); //stop the popping of the moles after 15 sec.
}

//Click on the mole:
function clickMole(event) {
  if(!event.isTrusted) return; //avoid cheating the clicks!
  score++; //increase the score by one point every time the mole is clicked.
  scoreBoard.textContent = score; //update the score.
}

moles.forEach(mole => mole.addEventListener("click", clickMole)); //listen to the DOM fopr clicks on the mole.
