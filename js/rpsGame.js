function intro(){
    const welcomeMessage = "Welcome to console Rock paper Scissors, to begin please enter your usernmae...";
    console.log(welcomeMessage);
}
intro()
const playerName = getPlayerName()
let wins = 0;
let losses = 0;
let draws = 0;

function playGame(){
    const selections = getSelections(this);
    if (isGameOver()){
        document.body.innerHTML = "<h1 align=center>Game Over</h1>";
        const result = (wins > losses) ? "you Win" : "you Lost"
        showScores(result)
    }
    else if (selections.computerSelection && selections.playerSelection) {
        showSelections(playerName, selections)
        const result = selectionComparison(selections.computerSelection, selections.playerSelection)
        showResults(result);
        score(result);
    }
    else {console.log('Game stopped')};
}
function isGameOver(){
    if (wins + losses + draws > 5){
        return true
    }
    else false;
}

function showScores(result){
    console.log(`wins   :${wins}`);
    console.log(`losses :${losses}`);
    console.log(`draws  :${draws}`);
    const div = document.createElement('div');
    div.innerHTML = `<h2 style="margin-top: 50px; text-align:center">${result}<h2>`;
    document.body.appendChild(div);

}

function getSelections(element){
    //Get computer and player selections and returns an object or undefined if
    // there's an error
    const playChoices = ["rock", "paper", "scissors"];
    // Get random selection for the computer
    const randomIndex = Math.floor(Math.random() * playChoices.length);
    const computerSelection = playChoices[randomIndex];
    // Get selected choice from player
    const choice = element.getAttribute("id");
    const choiceIndex = playChoices.indexOf(choice);
    if (choiceIndex === -1) return //stop excercution for invalid user index
    const playerSelection = playChoices[choiceIndex];

    const selections = {
        "playerSelection" : playerSelection,
        "computerSelection" : computerSelection
    };
    return selections
}

function getPlayerName(){
    const playerName = prompt('enter username')
    return playerName
}

function showSelections(playerName, selections){
    console.log(`${playerName}: ${selections.playerSelection}`)
    console.log(`computer:  ${selections.computerSelection}`)
}

function selectionComparison(computerSelection, playerSelection){
    switch (true){
        case playerSelection === computerSelection:
            return 0;
        case playerSelection === 'rock' && computerSelection === 'scissors':
        case playerSelection === 'paper' && computerSelection === 'rock':
        case playerSelection === 'scissors' && computerSelection === 'paper':
            return 1
        default:
            return -1
    }
}

function showResults(result) {
    switch (result) {
        case -1 :
            console.log('Oooh you lost');
            break;
        case 0 :
            console.log("It's a draw");
            break;
        case 1 :
            console.log("You won!")
    }
}

function score(result){
    switch (result){
        case 1:
            wins++;
            break;
        case 0:
            draws++;
            break;
        case -1:
            losses++;
            break;
        default:
            console.log('internal error, game stopped')
    }
}
//Events
intro()
const buttons = document.querySelectorAll(".option");
buttons.forEach((button) => {button.addEventListener("click",
                            playGame)
                        }
            )
