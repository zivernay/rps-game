const playChoices = ["rock", "paper", "scissors"]
let playerInput;
let computerChoice;
let playerName;
let wins = 0;
let losses = 0;
let draws = 0;
let result;

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
    console.log(`${playerName} you are supposed to pick rock, paper or scissors.`)
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
    playerName = prompt('You can call me...');
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

function playGame(){
            result = game();
            score(result);
    }

function score(result){
    switch (true){
        case result === 1:
            wins++;
            break;
        case result === 0:
            draws++;
            break;
        case result ===-1:
            losses++;
            break;
        default:
            console.log('internal error, game stopped')
    }
}

function showStats(){
    console.log(`
    ${playerName}   wins = ${wins}
                  losses = ${losses}
                   draws = ${draws}
    Overally out of 5 games you ${(wins>losses) ? 'won' : 'lost'}`)
}
function start(){
    intro();
    playGame(5);
    showStats();
}
start();
