document.addEventListener("DOMContentLoaded", function () {
    const columns = document.querySelectorAll('.column');
    const whosTurn = document.getElementById('whosturn');
    let currentPlayer = 'Red';
    let gameOver = false;

    // Function to check for a win
    function checkForWin() {
        // Implement your win-checking logic here
        const directions = [
            [1, 0], // Horizontal
            [0, 1], // Vertical
            [1, 1], // Diagonal (bottom-left to top-right)
            [-1, 1] // Diagonal (bottom-right to top-left)
        ];

        for (let column = 0; column < 7; column++) {
            for (let row = 0; row < 6; row++) {
                if (columns[column].children[5 - row].classList.contains(currentPlayer.toLowerCase())) {
                    for (const [dx, dy] of directions) {
                        let count = 1;
                        for (let i = 1; i < 4; i++) {
                            const nextColumn = column + dx * i;
                            const nextRow = row + dy * i;
                            if (nextColumn < 0 || nextColumn >= 7 || nextRow < 0 || nextRow >= 6) break;
                            if (columns[nextColumn].children[5 - nextRow].classList.contains(currentPlayer.toLowerCase())) {
                                count++;
                            } else {
                                break;
                            }
                        }
                        if (count === 4) {
                            alert(`${currentPlayer} wins!`);
                            gameOver = true;
                            setTimeout(() => {
                                startNewGame();
                            }, 1000); // Wait for 1 second before starting a new game
                            return;
                        }
                    }
                }
            }
        }
    }

    // Function to handle player move
    function handleMove(column) {
        if (!gameOver) {
            const cells = column.querySelectorAll('p');
            for (let i = 0; i < cells.length; i++) {
                if (!cells[i].classList.contains('filled')) {
                    cells[i].classList.add('filled');
                    cells[i].classList.add(currentPlayer.toLowerCase());
                    cells[i].style.backgroundColor = currentPlayer.toLowerCase();
                    checkForWin();
                    currentPlayer = currentPlayer === 'Red' ? 'Yellow' : 'Red';
                    whosTurn.innerText = `${currentPlayer}'s Turn`;
                    break;
                }
            }
        }
    }

    // Function to start a new game
    function startNewGame() {
        columns.forEach(column => {
            const cells = column.querySelectorAll('p');
            cells.forEach(cell => {
                cell.classList.remove('filled', 'red', 'yellow');
                cell.style.backgroundColor = 'white';
            });
        });
        currentPlayer = 'Red';
        gameOver = false;
        whosTurn.innerText = `${currentPlayer}'s Turn`;
    }

    // Event listeners for column clicks
    columns.forEach(column => {
        column.addEventListener('click', function () {
            handleMove(column);
        });
    });
});
