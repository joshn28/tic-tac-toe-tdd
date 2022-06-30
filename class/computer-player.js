
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

    // Your code here
  }

  static getWinningMoves(grid, symbol) {

    // Your code here

  }

  static getSmartMove(grid, symbol) {

    // Your code here

  }

}

module.exports = ComputerPlayer;
