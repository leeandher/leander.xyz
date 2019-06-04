const board = (state = [], action) => {
  switch (action.type) {
    // Generate a new board or a preset
    case "RANDOMIZE_BOARD":
    case "SET_SIZE":
    case "LOAD_PRESET":
      return action.newBoard;
    // Increment to the next generation of the board
    case "INCREMENT_BOARD":
      const newBoard = state.map(row => [...row]);
      state.forEach((row, i) => {
        row.forEach((cell, j) => {
          // Get the values of the surrounding 8 cells
          const neighbours = [
            i !== 0 ? state[i - 1][j - 1] || 0 : 0, // Top left
            i !== 0 ? state[i - 1][j] || 0 : 0, // Above
            i !== 0 ? state[i - 1][j + 1] || 0 : 0, // Top right
            row[j - 1] || 0, // Left
            row[j + 1] || 0, // Right
            i !== action.height - 1 ? state[i + 1][j - 1] || 0 : 0, // Bottom left
            i !== action.height - 1 ? state[i + 1][j] || 0 : 0, // Below
            i !== action.height - 1 ? state[i + 1][j + 1] || 0 : 0 // Bottom right
          ];

          // Ignore the 'old'/'new' alive values and sum them as ones
          const neighbourValue = neighbours.reduce(
            (total, val) => total + Boolean(val),
            0
          );

          // Now take a look at the existing cell
          switch (cell) {
            // If alive...
            case 2:
            case 1:
              newBoard[i][j] =
                neighbourValue <= 1 || neighbourValue >= 4 ? 0 : 2;
              break;

            //If dead...
            case 0:
            default:
              newBoard[i][j] = neighbourValue === 3 ? 1 : 0;
              break;
          }
        });
      });

      return newBoard;

    // Clear the board completely
    case "CLEAR_BOARD":
      // Kill every cell on the board
      return state.map(row => row.map(cell => 0));

    case "SPAWN_CELL":
      const changedBoard = state.map(row => [...row]);
      changedBoard[action.row][action.col] =
        changedBoard[action.row][action.col] > 0 ? 0 : 1;
      return changedBoard;
    default:
      return state;
  }
};

export default board;
