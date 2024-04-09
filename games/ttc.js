// Глобальные переменные для хранения текущего игрока, состояния игрового поля и статуса игры
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Функция для проверки выигрышных комбинаций
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Горизонтали
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Вертикали
        [0, 4, 8], [2, 4, 6] // Диагонали
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            return board[a];
        }
    }

    if (board.every(cell => cell !== '')) {
        gameActive = false;
        return 'Tie'; // Ничья
    }

    return null; // Игра продолжается
}

// Функция для обработки хода игрока или робота
function handleMove(index) {
    if (!gameActive || board[index] !== '') return;

    // Установка значения в клетку
    board[index] = currentPlayer;
    document.getElementById('board').children[index].innerText = currentPlayer;

    // Проверка на победителя
    const winner = checkWinner();
    if (winner) {
        if (winner === 'Tie') {
            document.getElementById('status').innerText = "А как так-то?";
        } else {
            if (winner == 'X'){
                document.getElementById('status').innerText = `Подсказка`;

            }
            if (winner == 'O'){
                document.getElementById('status').innerText = `ЛОХ`;
            }
           
        }
        gameActive = false;
    } else {
        // Смена игрока
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if(currentPlayer == 'X'){
            document.getElementById('status').innerText = `Давай ходи`;

        }
        if(currentPlayer == 'O'){
            setTimeout(computerMove, 500);
            document.getElementById('status').innerText = `Комп думает`;

        }
    }
}

// Функция для хода робота
function computerMove() {
    // Получаем доступные для хода клетки
    const availableMoves = board.reduce((acc, cell, index) => {
        if (cell === '') acc.push(index);
        return acc;
    }, []);

    let bestMove;

    // Пытаемся найти выигрышный ход для робота
    for (let move of availableMoves) {
        const newBoard = [...board];
        newBoard[move] = currentPlayer;
        if (checkWinner(newBoard) === currentPlayer) {
            bestMove = move;
            break;
        }
    }

    // Если нет выигрышного хода, пытаемся заблокировать выигрышный ход игрока
    if (!bestMove) {
        for (let move of availableMoves) {
            const newBoard = [...board];
            newBoard[move] = currentPlayer === 'X' ? 'O' : 'X';
            if (checkWinner(newBoard) === (currentPlayer === 'X' ? 'O' : 'X')) {
                bestMove = move;
                break;
            }
        }
    }

    // Если не найдено ни выигрышных ходов, ни блокировок, выбираем случайный доступный ход
    if (!bestMove) {
        const randomIndex = Math.floor(Math.random() * availableMoves.length);
        bestMove = availableMoves[randomIndex];
    }

    // Обрабатываем лучший найденный ход
    handleMove(bestMove);
}
// Функция для сброса игры
function resetGame() {
    // Сбрасываем глобальные переменные и обновляем отображение игрового поля
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;

    const cells = document.getElementsByClassName('cell');
    for (let cell of cells) {
        cell.innerText = '';
    }

    document.getElementById('status').innerText = "Давай начинай";
}

// Инициализация игры
function initializeGame() {
    // Назначаем обработчики событий для каждой клетки игрового поля
    const cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', () => {
            handleMove(i);
        });
    }

    // Вызываем функцию сброса игры для начала новой игры
    resetGame();
}

// Вызываем функцию инициализации игры после загрузки документа
document.addEventListener('DOMContentLoaded', initializeGame);
