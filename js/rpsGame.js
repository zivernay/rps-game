let playerName;
let pwins = 0;
let plosses = 0;
let pdraws = 0;
let compWins = 0;
let compLosses = 0;
let compDraws = 0;
let round = 1;

function playGame(element){
    const selections = getSelections(element);
    if (isGameOver()){
        document.body.innerHTML = "<h1 align=center>Game Over</h1>";
        const result = (pwins > plosses) ? "you Win" : "you Lost"
        showScores(result)
    }
    else if (selections.computerSelection && selections.playerSelection) {
        showSelections(playerName, selections)
        const result = selectionComparison(selections.computerSelection, selections.playerSelection)
        score(result);
        showResults(result);
    }
    else {console.log('Game stopped')};
    round++;
}
function isGameOver(){
    if (round > 5){
        return true
    }
    else false;
}

function showScores(result){
    console.log(`pwins   :${pwins}`);
    console.log(`plosses :${plosses}`);
    console.log(`pdraws  :${pdraws}`);
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
    const playerScores = document.querySelectorAll(".player .score");
    const computerScores = document.querySelectorAll(".computer .score");
    playerScores[3].children[1].textContent = round
    computerScores[3].children[1].textContent = round
    switch (result) {
        case -1 :
            console.log(`Oooh you lost ${plosses}`);
            playerScores[1].children[1].textContent = plosses;
            computerScores[0].children[1].textContent = compWins;
            break;
        case 0 :
            console.log(`It's a draw ${pdraws}`);
            playerScores[2].children[1].textContent = pdraws;
            computerScores[2].children[1].textContent = compDraws;
            break;
        case 1 :
            console.log(`You won! ${pwins}`);
            playerScores[0].children[1].textContent = pwins;
            computerScores[1].children[1].textContent = compLosses;
    }
}

function score(result){
    switch (result){
        case 1:
            pwins++;
            compLosses++;
            break;
        case 0:
            pdraws++;
            compDraws++;
            break;
        case -1:
            plosses++;
            compWins++;
            break;
        default:
            console.log('internal error, game stopped')
    }
}
//Events
const quickGameBtn = document.querySelector(".game .startQG");
const profiles = document.querySelector(".profiles")
const playerProfile = document.querySelector(".profiles .player")
const gameSection = document.querySelector(".game");

quickGameBtn.addEventListener("click", startQuickGame);
function startQuickGame () {
    playerName = "Anonymous";
    playerProfile.children[1].textContent = playerName;
    profiles.children[0].classList.remove("hidden")
    profiles.children[2].classList.remove("hidden");
    gameSection.children[0].classList.add("hidden")
    gameSection.children[1].classList.remove("hidden")
}

playerProfile.children[2].addEventListener('mouseover', showToolTip);
function showToolTip (event) {
    const toolTip = document.querySelector(".tooltip");
    toolTip.classList.remove("hidden");
    this.classList.add("show")
}
playerProfile.children[2].addEventListener("click", editPlayerName);
function editPlayerName () {
    playerName = prompt("Enter player name");
    playerProfile.children[1].textContent = playerName;
}
playerProfile.addEventListener("mouseleave", removeToolTip, {capture: true});
function removeToolTip (event) {
    if (event.target == this) {
        const toolTip = document.querySelector(".tooltip");
        toolTip.classList.add("hidden");
        toolTip.parentElement.classList.remove("show")
    }
}

const options = document.querySelectorAll(".options figure");
options.forEach((option) => {option.addEventListener("click", play)});
function play (event) {
    playGame(this)

}