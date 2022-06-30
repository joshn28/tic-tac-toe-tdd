
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

      if (ComputerPlayer.checkWin(grid)) {
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
    const sMove = ComputerPlayer.smartMove(grid, opposingSymbol);
    
    if (winningMoves.length > 0) {
      return winningMoves[0];
    } else if (opposingWins.length > 0) {
      return opposingWins[0];
    } else if (sMove) {
      return sMove;
    } else {
      return ComputerPlayer.randomMove(grid);
    }

  }

  static smartMove(grid, opposingSymbol) {

    let sMove = false;

    const topLeft = { row: 0, col: 0 };
    const topRight  = { row: 0, col: 2 };
    const bottomLeft = { row: 2, col: 0 };
    const bottomRight = { row: 2, col: 2 };

    const topMid = { row: 0, col: 1 };
    const midLeft = { row: 1, col: 0 };
    const midRight = { row: 1, col: 2};
    const bottomMid = { row: 2, col: 1 };

    if (grid[1][1] === ' ') {
      return { row: 1, col: 1 };
    } else if ((grid[0][0] === opposingSymbol && grid[2][2] === opposingSymbol) || 
    (grid[0][2] === opposingSymbol && grid[2][0] === opposingSymbol)) {
      
      [topMid, midLeft, midRight, bottomMid].forEach(move => {
        const { row, col } = move;
        if (grid[row][col] === ' ') {
          sMove = move;
          return;
        }
      });
    } else if (grid[0][0] === opposingSymbol) {
      if (grid[1][2] === opposingSymbol) {
        return topRight;
      } else if (grid[2][1] === opposingSymbol) {
        return bottomLeft;
      }
    } else if (grid[0][2] === opposingSymbol) {
      if (grid[1][0] === opposingSymbol) {
        return topLeft;
      } else if (grid[2][1] === opposingSymbol) {
        return bottomRight;
      }
    } else if (grid[2][0] === opposingSymbol) {
      if (grid[1][2] === opposingSymbol) {
        return bottomRight;
      } else if (grid[0][1] === opposingSymbol) {
        return topLeft;
      }
    } else if (grid[2][2] === opposingSymbol) {
      if (grid[0][1] === opposingSymbol) {
        return topRight;
      } else if (grid[1][0] === opposingSymbol) {
        return bottomLeft;
      }
    } else if (
      grid[0][0] === ' ' || 
      grid[0][2] === ' ' ||
      grid[2][0] === ' ' ||
      grid[2][2] === ' '
      ) {
        [topLeft, topRight, bottomLeft, bottomRight].forEach(move => {
          const { row, col } = move;
          
          if (grid[row][col] === ' ') {
            sMove = move;
            return;
          }
        });
    }

    return sMove;
  }

  static checkWin(grid) {

    if (ComputerPlayer.gridIsEmpty(grid)) {
      return false;
    } else if (ComputerPlayer.checkHorizontalWin(grid, 'X')) {
      return 'X';
    } else if (ComputerPlayer.checkHorizontalWin(grid, 'O')) {
      return 'O';
    } else if (ComputerPlayer.checkVerticalWin(grid, 'X')) {
      return 'X';
    } else if (ComputerPlayer.checkVerticalWin(grid, 'O')) {
      return 'O';
    } else if (ComputerPlayer.checkDiagonalWin(grid, 'X')) {
      return 'X';
    } else if (ComputerPlayer.checkDiagonalWin(grid, 'O')) {
      return 'O';
    } else if (ComputerPlayer.checkTie(grid)) {
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

}

module.exports = ComputerPlayer;
