let rolledDice = [0, 0, 0, 0, 0];
let timesRolled = 0;
let gameScore = 0;
let availableAssignments=6;

/*****************************************
  ROLL
  The ROLL function is called when the "roll"
  button is pressed. It should do the following:
   - Update any NON-SELECTED dice
   - Only allow <=3 rolls per turn
******************************************/
function roll() {
  if (timesRolled < 3) {
    updateDice();
    timesRolled++;
  }
}

/*****************************************
  ROLL DICE
  This function will actually roll the dice 
  by generating 5 random numbers each between 1-6
******************************************/
function rollDice() {
  let output = [];
  for (i = 0; i < 5; i++) {
    output.push(Math.floor(Math.random() * (6)) + 1);
  }
  return output;
}

/*****************************************
  UPDATE DICE
  This function should:
   - update the image to the corrisponding dice value
   for any NON-SELECTED die
******************************************/
function updateDice() {
  rolledDice = rollDice();
  for (let i = 0; i < rolledDice.length; i++) {
    let source = document.getElementById("die" + i + "Image").src;
    if (source.includes("dieWhite")) {
      document.getElementById("die" + i + "Image").src = "/yahtzee/img/dice/dieWhite_border" + rolledDice[i] + ".png";
    }
  }
}

/***************************************** 
  TOGGLE HOLD
   The toggle hold function should do the following when called:
    - Turn the die clicked to RED (selected) if it is currently WHITE (not selected)
    - Turn the die clicked to WHITE (not selected) if it is currently RED (selected) 
*****************************************/
function toggleHold(diceSelect) {
  let source = document.getElementById("die" + diceSelect + "Image").src;
  if (source.includes("dieWhite")) {
    document.getElementById("die" + diceSelect + "Image").src = document.getElementById("die" + diceSelect + "Image").src.replace("dieWhite", "dieRed");
  } else {
    document.getElementById("die" + diceSelect + "Image").src = document.getElementById("die" + diceSelect + "Image").src.replace("dieRed", "dieWhite");
  }
}

/***************************************** 
  ASSIGN
*****************************************/
function assign(selectedNumber) {
  let countOfValidDice = 0;
  let scoreForThisRound = 0;


  for (let heldDieSrc of getHeldDice()) {
    if (selectedNumber === getDieValue(heldDieSrc)) {
      countOfValidDice++;
    }
  }

  scoreForThisRound = selectedNumber * countOfValidDice;
  document.getElementById(selectedNumber + "Count").innerHTML = countOfValidDice;
  document.getElementById(selectedNumber + "Score").innerHTML = scoreForThisRound;
  gameScore += scoreForThisRound;
  document.getElementById("totalScore").innerHTML = gameScore;

  availableAssignments--;
  
  if(availableAssignments===0){
    gameOver();
  }
  
  resetRoll();
  
}

/******************************************
RESET ROLL
******************************************/
function resetRoll() {
  let resetDice = [];
  for (let dieImage of document.querySelectorAll(".die > img")) {    
    dieImage.src = "/yahtzee/img/dice/dieWhite_border0.png";    
  }

  timesRolled = 0;
  return resetDice;
}

/******************************************
GAME OVER
******************************************/
function gameOver(){
  alert("Game Over! You your score is " + gameScore + ". Good job!");
  newGame()    
}


/******************************************
NEW GAME
******************************************/
function newGame(){

  gameScore = 0

  timesRolled = 0
  
  document.getElementById("1Count").innerHTML = '<button onclick="assign(1)">Assign</button>';
  document.getElementById("2Count").innerHTML = '<button onclick="assign(2)">Assign</button>';
  document.getElementById("3Count").innerHTML = '<button onclick="assign(3)">Assign</button>';
  document.getElementById("4Count").innerHTML = '<button onclick="assign(4)">Assign</button>';
  document.getElementById("5Count").innerHTML = '<button onclick="assign(5)">Assign</button>';
  document.getElementById("6Count").innerHTML = '<button onclick="assign(6)">Assign</button>';

   document.getElementById("1Score").innerHTML = 0;
  document.getElementById("2Score").innerHTML = 0;
  document.getElementById("3Score").innerHTML = 0;
  document.getElementById("4Score").innerHTML = 0;
  document.getElementById("5Score").innerHTML = 0;
  document.getElementById("6Score").innerHTML = 0;

   let resetDice = [];
  for (let dieImage of document.querySelectorAll(".die > img")) {    
    dieImage.src = "/yahtzee/img/dice/dieWhite_border0.png";    
  }

  return resetDice;
  
}



/******************************************
GET HELD DICE
******************************************/
function getHeldDice() {
  let heldDice = [];
  for (let die of document.querySelectorAll(".die > img")) {
    if (die.src.includes("Red")) {
      heldDice.push(die.src);
    }
  }
  return heldDice;
}


/******************************************
GET DIE VALUE
******************************************/
function getDieValue(imageSource) {
  return Number(imageSource.split("/img/")[1].replace(/[^0-9]/ig, ""));
}






