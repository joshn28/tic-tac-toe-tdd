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

    const moves = ComputerPlayer.getValidMoves(grid);
    let winningMoves = [];
    
    moves.forEach(move => {
      const { row, col } = move;
      grid[row][col] = symbol;

      if (TTT.checkWin(grid)) {
        winningMoves.push(move);
      }

      grid[row][col] = ' ';
    });

    return winningMoves;
  }

  static getSmartMove(grid, symbol) {

    const winningMoves = ComputerPlayer.getWinningMoves(grid, symbol);
    const opposingSymbol = symbol === 'X' ? 'O' : 'X';
    const opposingWins = ComputerPlayer.getWinningMoves(grid, opposingSymbol);
    
    if (winningMoves.length > 0) {
      return winningMoves[0];
    } else if (opposingWins.length > 0) {
      return opposingWins[0];
    }

  }

}

module.exports = ComputerPlayer;
