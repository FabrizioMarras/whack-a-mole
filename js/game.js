// Getting HTML document elements.
const holes = document.querySelectorAll('.hole'); //select all the holes.
const scoreBoard = document.querySelector('.score'); //select the score.
const moles = document.querySelectorAll('.mole'); //select all the moles.

let lastHole; //this variable is needed in the randomHole function to avoid that the same hole is picked twice or more consecutively.

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
