const TTT = require('./ttt');

class ComputerPlayer {

  static getValidMoves(grid) {
    let moves = [];

    grid.forEach((row, rowIndex) => {
      row.forEach((pos, colIndex) => {
        if (pos === ' ') {
          moves.push({row: rowIndex, col: colIndex});
        }
      });
    });

    return moves;
  }

  static randomMove(grid) {
    const moves = ComputerPlayer.getValidMoves(grid);
    const randomInt = Math.floor(Math.random() * moves.length);
    const randomMove = moves[randomInt];

    return randomMove;
  }

  static getWinningMoves(grid, symbol) {
    let moves = ComputerPlayer.getValidMoves(grid);
    let winningMoves = [];
    
    moves.forEach(move => {
      const { row, col } = moves;
      grid[row][col] = symbol;

      if (TTT.checkWin(grid)) {
        winningMoves.push(move);
      }
    });

    return winningMoves;
  }

  static getSmartMove(grid, symbol) {

    // Your code here

  }

}

module.exports = ComputerPlayer;
