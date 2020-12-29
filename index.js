
var gamestatus = document.querySelector(".game-status");

var gameactive = true;
var currentPlayer = "X";
let cellarr = ["", "", "", "", "", "", "", "", ""];

const winningConditionsArr = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
]

// this is called when you clicked the cell and its's empty , 
// to insert the value i.e. "X" and "O" 

const whenCellEmpty = (clickedcell, clickedcellindex) => {
    cellarr[clickedcellindex] = currentPlayer;
    clickedcell.innerHTML = currentPlayer;
}

//to change player 
const whenPlayerChange = () => {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

// to validate the result i.e. player won or lost
const whenResultValidation = () => {
    let roundWon = false;
    for (i = 0; i <= 7; i++) {
        const wincondition = winningConditionsArr[i];
        let a = cellarr[wincondition[0]];
        let b = cellarr[wincondition[1]];
        let c = cellarr[wincondition[2]];

        if (a === "" || b === "" || c === "") {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gamestatus.innerHTML = `${currentPlayer}" Won The Game"`;
        gameactive = false;
        return;
    }

    whenPlayerChange();
}

const whenCellClick = (clickedovercell) => {
    const clickedcell = clickedovercell.target;
    const clickedcellindex = clickedcell.getAttribute("data-cell-index");

    if (cellarr[clickedcellindex] !== "" || !gameactive) {
        return ;
    }

    whenCellEmpty(clickedcell, clickedcellindex);
    whenResultValidation();
}

// to restart the game on pressing button
const whenRestartGame = () => {
    gameactive = true;
    currentPlayer = "X";
    // cellarr = ["", "", "", "", "", "", "", "", ""];
    gamestatus.innerHTML = "Game Status";
    document.querySelectorAll(".cell").forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll(".cell").forEach(cell => cell.addEventListener("click", whenCellClick));
document.querySelector(".restart").addEventListener("click", whenRestartGame);