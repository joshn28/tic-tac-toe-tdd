const Screen = require("./screen");
const Cursor = require("./cursor");

class TTT {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' '],
                 [' ',' ',' '],
                 [' ',' ',' ']]

    this.cursor = new Cursor(3, 3);

    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);

    this.cursor.setBackgroundColor();

    Screen.addCommand('w', 'move cursor up', () => {
      this.cursor.up();
    });
    Screen.addCommand('a', 'move cursor left', () => {
      this.cursor.left();
    });
    Screen.addCommand('s', 'move cursor down', () => {
      this.cursor.down();
    });
    Screen.addCommand('d', 'move cursor right', () => {
      this.cursor.right();
    });
    Screen.addCommand('p', 'place a move at the cursor\'s position', () => {
      this.placeMove();
      
      const winner = TTT.checkWin(this.grid);

      if (['O', 'X', 'T'].includes(winner)) {
        TTT.endGame(winner);
      }
    });
    Screen.addCommand('l', 'list all commands', () => {
      Screen.printCommands();
    });

    Screen.setMessage(`It's ${this.playerTurn}'s turn`);

    Screen.render();

    Screen.printCommands();
  }

  placeMove() {
    const row = this.cursor.row;
    const col = this.cursor.col;

    if (this.grid[row][col] === ' ') {
      this.grid[row][col] = this.playerTurn;
      
      Screen.setGrid(row, col, this.playerTurn);

      if (this.playerTurn === 'X') {
        this.playerTurn = 'O';
      } else {
        this.playerTurn = 'X';
      }

      Screen.setMessage(`It's ${this.playerTurn}'s turn`);
      Screen.render();
    } else {
      console.log('space is occupied');
    }
  }

  static checkWin(grid) {

    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended

    if (TTT.gridIsEmpty(grid)) {
      return false;
    } else if (TTT.checkHorizontalWin(grid, 'X')) {
      return 'X';
    } else if (TTT.checkHorizontalWin(grid, 'O')) {
      return 'O';
    } else if (TTT.checkVerticalWin(grid, 'X')) {
      return 'X';
    } else if (TTT.checkVerticalWin(grid, 'O')) {
      return 'O';
    } else if (TTT.checkDiagonalWin(grid, 'X')) {
      return 'X';
    } else if (TTT.checkDiagonalWin(grid, 'O')) {
      return 'O';
    } else if (TTT.checkTie(grid)) {
      return 'T';
    } else {
      return false;
    }

  }

  static gridIsEmpty(grid) {

    let isEmpty = true;
    grid.forEach(row => {
      if (!row.every(char => char === ' ')) {
        isEmpty = false;
      }
    });

    return isEmpty;

  }

  static checkHorizontalWin(grid, player) {

    let win = false;
    grid.forEach(row => {
      if (row.every(char => char === player) && !(' ' in row)) {
        win = true;
        return;
      }
    });

    return win;
  }

  static checkVerticalWin(grid, player) {

    for (let col = 0; col < grid.length; col++) {
      const char1 = grid[0][col];
      const char2 = grid[1][col];
      const char3 = grid[2][col];

      if ([char1, char2, char3].every(char => char === player)) {
        return true;
      }
    }

    return false;
  }

  static checkDiagonalWin(grid, player) {

    if ([grid[0][0], grid[1][1], grid[2][2]].every(char => char === player)) {
      return true;
    } else if ([grid[0][2], grid[1][1], grid[2][0]].every(char => char === player)) {
      return true;
    } else {
      return false;
    }
  }

  static checkTie(grid) {

    let isTie = true;
    grid.forEach(row => {
      if (row.some(char => char === ' ')) {
        isTie = false;
      }
    });

    return isTie;
  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = TTT;
