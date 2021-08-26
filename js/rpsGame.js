const welcomeMessage = "Welcome to console Rock paper Scissors, to begin please enter your usernmae...";
const playerName = prompt('You can call me...');
const pregameMessage = `
    Okay ${playerName} 
    Rock, Paper or Scissors`;
const playChoices = ["rock", "paper", "scissors"]
let playerInput;
let computerChoice;

function getPlayerInput(){
    let toolChoice = prompt('rock | paper | scissors');
    return toolChoice
}
function validateInput(){
    playerInput = getPlayerInput()
    let inputLowerCase = input.toLowerCase();
    if (inputLowerCase === "rock" || inputLowerCase === "paper" || inputLowerCase === "scissors"){
        console.log("...");
        return true
    }
    console.log(`${playerName} your supposed to pick rock, paper or scissors.`)
    return false
}
function computerPlay(){
    let randomIndex = Math.floor(Math.random() * playChoices.length);
    computerChoice = playChoices[randomIndex];
    return playChoices[randomIndex]
}
function choiceComparison(){
    (validateInput()) ? console.log(computerPlay()) : console.log('try again..');
    switch (true){
        case playerInput === computerChoice:
            console.log('draw');
            break;
        
    }
}
