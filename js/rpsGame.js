const playChoices = ["rock", "paper", "scissors"]
let playerInput;
let computerChoice;
let playerName;


function getPlayerInput(){
    let toolChoice = prompt('rock | paper | scissors');
    return toolChoice
}

function validateInput(input){
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

function getValidInput(){
    let input = getPlayerInput();
    return ((validateInput(input)) ? input : null)
}

function choiceComparison(computerChoice, playerInput){
    switch (true){
        case playerInput === computerChoice:
            console.log("it's a draw")
            return 0;
        case playerInput === 'rock' && computerChoice === 'scissors':
        case playerInput === 'paper' && computerChoice === 'rock':
        case playerInput === 'scissors' && computerChoice === 'paper':
            console.log('You won!')
            return 1
        default:
            console.log('Oooh you lost')
            return -1
    }
}
function intro(){
    const welcomeMessage = "Welcome to console Rock paper Scissors, to begin please enter your usernmae...";
    console.log(welcomeMessage);
    const playerName = prompt('You can call me...');
}
function game(){
    const pregameMessage = `
        Okay ${playerName} 
        Rock, Paper or Scissors`;
    playerInput = getValidInput();
    computerChoice = computerPlay();
    if (playerInput && computerChoice) {
        console.log(`${playerName}: ${playerInput}`)
        console.log(`computer:  ${computerChoice}`)
        return choiceComparison(computerChoice, playerInput)
    }
    else {console.log('Game stopped')}
}
