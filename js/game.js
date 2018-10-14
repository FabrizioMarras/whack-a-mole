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

//Pop the mole from the hole:
function popMole(){
  //getting the random time for the pop
  const time = randomTime(500, 900); //reduce the numbers (time) to make the game more difficult
  //getting the random holes where to pop
  const hole = randomHole(holes);

  //add the "pop" class to our div containing the class of hole in order to generate the pop effect for the mole:
  hole.classList.add('pop');
  //remove the mole after a random amount of time by creating a setTimeout function:
   setTimeout(() => {
     // after a random amount of time it removes the pop class
     hole.classList.remove('pop');
     popMole(); //keeps popping moles one after the other by calling the popMole function.;
   }, time);
}
