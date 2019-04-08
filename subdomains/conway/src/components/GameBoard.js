import React from "react";

const Row = ({ row, rowData, spawnCell }) => {
  // Create all the cells
  const cells = rowData.map((val, i) => {
    let statusClass;
    // Assign the appropriate class
    switch (val) {
      case 2:
        statusClass = "game-board__cell--alive-old";
        break;
      case 1:
        statusClass = "game-board__cell--alive-new";
        break;
      case 0:
      default:
        statusClass = "game-board__cell--dead";
        break;
    }
    return (
      <div
        className={`game-board__cell game-board__cell--animate ${statusClass}`}
        key={i}
        col={i}
        onClick={() => spawnCell(row, i)}
      />
    );
  });
  return (
    <div className="game-board__row" row={row}>
      {cells}
    </div>
  );
};

class GameBoard extends React.Component {
  render() {
    // If no boardData is given, don't return anything
    if (!this.props.boardData.length) return null;

    // Create all the rows
    const rows = [];
    for (let i = 0; i < this.props.height; i++) {
      rows.push(
        <Row
          key={i}
          row={i}
          rowData={this.props.boardData[i]}
          spawnCell={this.props.spawnCell}
        />
      );
    }
    return <section className="game-board">{rows}</section>;
  }
}

export default GameBoard;
