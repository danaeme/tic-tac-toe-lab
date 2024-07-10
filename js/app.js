/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8], //rows
    [0,3,6],
    [1,4,7],
    [2,5,8],//columns
    [0,4,8],
    [2,4,6] //diagonal
];

/*---------------------------- Variables (state) ----------------------------*/

//Array for the state of squares on the board 
let board = Array(9).fill(''); 

//Track whose turn it is
let turn = 'X';

//Whether there is a winner
let winner = false;

//If game has ended in a tie
let tie =  false;

/*------------------------ Cached Element References ------------------------*/

//Element for game's squares
const squareEls = document.querySelectorAll('.sqr');

// Element that displays game's status.
const messageEl = document.getElementById('message');

const resetButtonEl = document.getElementById('reset');

// console.log(squareEls);
// console.log(messageEl);

/*-------------------------------- Functions --------------------------------*/

function init () {
    //Initialize board array 
    board = Array(9).fill('');
    turn = 'X'; 
    winner = false;
    tie = false;
    render();
    console.log("Initializing game");
}

function handleClick(event) {
    const squareIdx = parseInt(event.target.id);// get the index of the element that triggered a click event, parse converts to int
    if (board[squareIdx] !== '' || winner) { //if square is alr selected or if there is a winner, return
        return;
    }
    placePiece(squareIdx);

    checkForWinner();

    checkforTie();

    switchPlayerTurn();

    render();

   // console.log("Winner:", winner);
}

function placePiece(index) {
    board[index] = turn;
    console.log(board);
}


function checkForWinner(){
    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            winner = true;
            return;
        }
    }
}

function checkforTie() {
    if (winner) return;

    tie = !board.includes(''); 

}

function switchPlayerTurn() {
    if (winner) return;
    turn = turn === 'X' ? 'O' : 'X'; 


}

function updateBoard() { 
    squareEls.forEach((square, index) => {
        square.textContent = board[index];
        square.style.color = board[index] === 'X' ? 'blue' : 'red'; //alternate between blue (X) and red
    })}

function updateMessage() {
    if (winner) {
        messageEl.textContent = `Player ${turn} is the winner!`
    } 
    else if (tie) {
        messageEl.textContent = "The game is a tie"
    }
    else {
        messageEl.textContent = `Player ${turn}'s turn`
    }
}

function render() {
    updateBoard();
    updateMessage();
}

document.addEventListener('DOMContentLoaded', () => {
    init();
    squareEls.forEach(square => {
        square.addEventListener('click', handleClick);
    });
    resetButtonEl.addEventListener('click', init);
});

/*----------------------------- Event Listeners -----------------------------*/
// squareEls.forEach(square => {
//     square.addEventListener('click,' handleClick);
// });
// function handleClick(event) {
//     const square = event.target; //get clicked square
//     const squareIdx = square.id; 
//     if (board[squareIdx] !== '' || winner) { //if square is alr selected or if there is a winner
//         return;
//     }


