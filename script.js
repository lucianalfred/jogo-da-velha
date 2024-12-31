const board = document.getElementById('board');
const statusText = document.getElementById('status');
const restButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameAtive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function initializedBoard(){
    board.innerHTML = "";
    gameState ['', '', '', '', '', '', '', '', ''];
    gameAtive = true;
    currentPlayer = "X";
    statusText.textContent =  `Jogador Atual: ${currentPlayer}`;

    for(let i = 0; i < 9; i++){
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}

function handleCellClick(event){
    const clickedCell = event.target;
    const cellIndex= clickedCell.dataset.index;

    if(gameState[cellIndex] !== "" || !gameAtive) return;

    gameState[cellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add("taken");

    if(checkWinner()){
        statusText.textContent = `Jogador ${currentPlayer} venceu!`;
        gameAtive = false;
        return;
    }

    if(gameState.every(cell => cell !=="")){
        statusText.textContent = "Empate";
        gameAtive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Jogador Atual ${currentPlayer}`;

}

function checkWinner(){
    return winningConditions.some(condition =>{
        return condition.every(index=> gameState[index] === currentPlayer);
    });
}

restButton.addEventListener('click', initializedBoard);

initializedBoard();
