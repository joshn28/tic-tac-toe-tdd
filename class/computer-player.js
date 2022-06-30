
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

    // Your code here

  }

  static getSmartMove(grid, symbol) {

    // Your code here

  }

}

module.exports = ComputerPlayer;
