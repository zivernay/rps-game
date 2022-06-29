let playerName;
let pwins = 0;
let plosses = 0;
let pdraws = 0;
let compWins = 0;
let compLosses = 0;
let compDraws = 0;
let round = 1;
let rounds = 5;
let isfinite = true;
const playerScores = document.querySelectorAll(".player .score");
const computerScores = document.querySelectorAll(".computer .score");
const scoreSummary = document.querySelectorAll(".scores .summary")
const frame = document.querySelector(".frame");
const gameOverDiv = document.querySelector(".gameOver");
const choices = document.querySelector(".frame .choices");
const options = document.querySelector(".frame .options");
let winOrLoss;

function playGame(element){
    const selections = getSelections(element);
    if (isfinite && isGameOver()){
        gameOver();
    }
    else if (selections.computerSelection && selections.playerSelection) {
        showSelections(playerName, selections)
        showChoice(selections.playerSelection, choices.children[0]);
        showChoice(selections.computerSelection, choices.children[1]);
        const result = selectionComparison(selections.computerSelection, selections.playerSelection)
        score(result);
        showResults(result);
    }
    else {console.log('Game stopped')};
    round++;
}
function gameOver() {
    gameOverDiv.classList.remove("hidden")
    winOrLoss = (pwins > plosses) ? "you Win" : "you Lost"
    showScores(winOrLoss)
    choices.classList.add("hidden");
    options.classList.add("hidden")
    _ = (winOrLoss == "you Win") ? frame.classList.add("win") : frame.classList.add("lost");
}
function isGameOver(){
    if (round > rounds){
        return true
    }
    else false;
}

function showScores(winOrLoss){
    console.log(`pwins   :${pwins}`);
    console.log(`plosses :${plosses}`);
    console.log(`pdraws  :${pdraws}`);
    const textResult = document.querySelector(".endText.textResult");
    textResult.textContent = winOrLoss;
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
    const playerName = prompt('enter username');
    return playerName
}

function showSelections(playerName, selections){
    console.log(`${playerName}: ${selections.playerSelection}`);
    console.log(`computer:  ${selections.computerSelection}`);
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
};

function showResults(result) {
    playerScores[3].children[1].textContent = round
    computerScores[3].children[1].textContent = round
    const span = document.createElement("span");
    const compSpan = document.createElement("span");
    switch (result) {
        case -1 :
            console.log(`Oooh you lost ${plosses}`);
            playerScores[1].children[1].textContent = plosses;
            computerScores[0].children[1].textContent = compWins;
            //show summary score for player
            span.classList.add("lose");
            span.textContent = "-";

            //show summary score for comp
            compSpan.classList.add("win");
            compSpan.textContent = "+";
            break;
        case 0 :
            console.log(`It's a draw ${pdraws}`);
            playerScores[2].children[1].textContent = pdraws;
            computerScores[2].children[1].textContent = compDraws;

            span.classList.add("draw");
            span.textContent = "=";

            compSpan.classList.add("draw");
            compSpan.textContent = "=";
            break;
        case 1 :
            console.log(`You won! ${pwins}`);
            playerScores[0].children[1].textContent = pwins;
            computerScores[1].children[1].textContent = compLosses;

            span.classList.add("win")
            span.textContent = "+";

            compSpan.classList.add("lose");
            compSpan.textContent = "-";
    }
    scoreSummary[0].prepend(span);
    scoreSummary[1].prepend(compSpan);
};


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
};
//Events
const quickGameBtn = document.querySelector(".game .startQG");
const customGameBtn = document.querySelector(".game .startCG");
const profiles = document.querySelector(".profiles");
const playerProfile = document.querySelector(".profiles .player");
const gameSection = document.querySelector(".game");
const infinityBtn = document.querySelector("#infinity");
const numberOfRounds = document.querySelector("#numberOfRounds");
const quitBtn = document.querySelector(".controls .quit");
const restartBtn = document.querySelector(".controls .restart");
const PENDING_IMG = "./resources/icons/pending_FILL0_wght400_GRAD0_opsz48.svg";

quickGameBtn.addEventListener("click", startQuickGame);
function startQuickGame () {
    playerName = "Anonymous";
    startGame();
}
function startGame() {
    playerProfile.children[1].textContent = playerName;
    profiles.children[0].classList.remove("hidden"); //show player name
    profiles.children[2].classList.remove("hidden"); // show comp name
    gameSection.children[0].classList.add("hidden") // hide start buttons
    gameSection.children[1].classList.remove("hidden"); // show game screen
};

customGameBtn.addEventListener("click", startCustomGame);
function startCustomGame() {
    //get player name
    let name = document.querySelector("#playerName");
    playerName = name.value;
    if (playerName == undefined || playerName == "") {
        name.focus();
        return
    }
    // get number of rounds
    rounds = getRounds();
    startGame();
};
function getRounds() {
    rounds = parseInt(numberOfRounds.value);
}

// infinite rounds for custom game
infinityBtn.addEventListener("click", endLessMode);
function endLessMode() {
    // switch isfinite to false
    isfinite = false;
    // dim rounds section
    // highlight infinity button
    highlightSelections(this, numberOfRounds)
}

function highlightSelections(target, other) {
    if (!(target.classList.contains("selected"))){
        other.classList.remove("selected");
        target.classList.add("selected");
        other.classList.add("unselected");
        target.classList.remove("unselected");
    }
}

//finite rounds custom game
numberOfRounds.addEventListener("click",finiteMode);
function finiteMode () {
    console.log(this);
    console.log(infinityBtn);
    highlightSelections(this, infinityBtn);
};


//Edit player name with tooltip appearing and disappearing
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

restartBtn.addEventListener("click", restartGame);
function restartGame() {
    pwins = 0;
    plosses = 0;
    pdraws = 0;
    compWins = 0;
    compLosses = 0;
    compDraws = 0;
    round = 1;
    resetResults();
    startGame();
    scoreSummary[0].innerHTML = "";
    scoreSummary[1].innerHTML = "";
    gameOverDiv.classList.add("hidden");
    choices.classList.remove("hidden");
    options.classList.remove("hidden");
    frame.classList.remove("win");
    frame.classList.remove("lost");
}
function resetResults() {
    playerScores[3].children[1].textContent = round
    computerScores[3].children[1].textContent = round
    playerScores[1].children[1].textContent = plosses;
    computerScores[0].children[1].textContent = compWins;
    playerScores[2].children[1].textContent = pdraws;
    computerScores[2].children[1].textContent = compDraws;
    playerScores[0].children[1].textContent = pwins;
    computerScores[1].children[1].textContent = compLosses;
}

quitBtn.addEventListener("click", gameOver);
const gameOptions = document.querySelectorAll(".options figure");
gameOptions.forEach((option) => {option.addEventListener("click", play)});
function play (event) {
    playGame(this)
}

function showChoice(choice, figure) {
    switch (choice) {
        case ("rock"):
            figure.children[0].setAttribute("src", "./resources/rock.jpg");
            break
        case ("paper"):
            figure.children[0].setAttribute("src", "./resources/paper.jpg");
            break
        case ("scissors"):
            figure.children[0].setAttribute("src", "./resources/scissors.jpg")
    }
}