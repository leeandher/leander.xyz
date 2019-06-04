export const makeRandomBoard = (height, width) => {
  const newBoard = [];
  for (let i = 0; i < height; i++) {
    const rowData = [];
    for (let j = 0; j < width; j++) {
      rowData.push(Math.round(Math.random()));
    }
    newBoard.push(rowData);
  }
  return newBoard;
};
