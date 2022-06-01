
let playerInput;
let computerChoice;
let playerName;
let wins = 0;
let losses = 0;
let draws = 0;
let result;



function computerPlay(){

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
    if (playerInput && computerChoice) {
        console.log(`${playerName}: ${playerInput}`)
        console.log(`computer:  ${computerChoice}`)
        return choiceComparison(computerChoice, playerInput)
    }
    else {console.log('Game stopped')}
}

function getSelections(){
    //Get computer and player selections and returns an object or undefined if
    // there's an error
    const playChoices = ["rock", "paper", "scissors"];

    const randomIndex = Math.floor(Math.random() * playChoices.length);
    const computerSelection = playChoices[randomIndex];

    const choice = this.getAttribute("id");
    const choiceIndex = playChoices.indexOf(choice);
    if (choiceIndex === -1) return
    playerSelections = playChoices[choiceIndex];

    const selections = {
        "playerSelection" : playerSelection,
        "computerSelection" : computerSelection
    };
    return selections
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

function playGame(){
    result = game();
    score(result);
}

//Events
intro()
const buttons = document.querySelectorAll(".option");
buttons.forEach((button) => {button.addEventListener("click",
                            playGame)
                        }
            )
