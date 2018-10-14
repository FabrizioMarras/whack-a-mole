// Getting HTML document elements.
const holes = document.querySelectorAll('.hole'); //select all the holes.
const scoreBoard = document.querySelector('.score'); //select the score.
const moles = document.querySelectorAll('.mole'); //select all the moles.

//generate random Time amount:
function randomTime(min, max) {
 return Math.round(Math.random() * (max - min) + min);
}

//Pick the hole randomly:
function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length); //generate a number between 1 and the max number of holes.
  const hole = holes[idx]; //assign the holes[number] in our holes list to the "hole".

  return hole;
}
