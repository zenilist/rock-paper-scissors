const counts = {
    "computer": 0,
    "player": 0
}
let playCount = 0
const game = document.getElementById("game");
const round = document.getElementById("result");

const replayButton = document.getElementById("replayButton");

replayButton.addEventListener("click", resetGame);

const selections = document.querySelectorAll(".button");
selections.forEach((selection) => {
    selection.addEventListener('click', (e) => {
        if (playCount < 5) buttonClicked(e);
        else gameOver();
    })
})
function buttonClicked(e) {
    const round = playRound(e.currentTarget.querySelector('img').getAttribute('alt'), getComputerChoice())
    displayRound(round);
    adjustCount(round);
}
function displayRound(round) {
    const div = document.getElementById("result");
    div.innerText = round;
}


function getComputerChoice() {
    const random = Math.floor(Math.random() * 3) + 1;
    let choice;
    switch (random) {
        case 1:
            choice = "rock";
            break;
        case 2:
            choice = "paper";
            break;
        case 3:
            choice = "scissors";
            break;
    }
    return choice;
}
function playRound(playerSelection, computerSelection) {
    let playerSelectionLower = playerSelection.toLowerCase();
    const scenario = {
        "rock paper": "You lose! Paper beats Rock.",
        "paper rock": "You win! Rock beats Paper.",
        "rock scissors": "You win! Rock beats Scissors.",
        "scissors rock": "You lose! Rock beats Scissors.",
        "paper scissors": "You lose! Scissors beats Paper.",
        "scissors paper": "You win! Scissors beats Paper."
    }
    if (playerSelectionLower === computerSelection)
        return `Draw! Both of yall chose ${playerSelectionLower}!`
    return scenario[playerSelectionLower + " " + computerSelection]
}

function adjustCount(round) {
    playCount += 1;
    let outcome = round.charAt(4);
    if (outcome === "l") counts["computer"] += 1;
    else if (outcome === "w") counts["player"] += 1;

}

function gameOver() {
    let winner;
    if (counts["computer"] === counts["player"]) winner = `There's no winner! Tied with ${counts["computer"]} wins!`
    winner = (counts["player"] > counts["computer"]) ? `You win with ${counts["player"]} wins` : `Too bad, you lose! The computer wins with ${counts["computer"]} wins.`

    
    round.innerText = "";
    game.innerText = winner;

    replayButton.classList.remove("hidden");
}

function resetGame() {
    
    counts["computer"] = 0;
    counts["player"] = 0;
    playCount = 0;
    
    game.textContent = "";

    replayButton.classList.add("hidden");
}
