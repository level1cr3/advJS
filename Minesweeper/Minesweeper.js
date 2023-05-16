// game logic will be in here.

const TILE_STATUS = {
  MINE: "mine",
  MARKED: "marked",
  HIDDEN: "hidden",
  NUMBER: "number",
};

export function createBoard(boardSize, numberOfMines) {
  const board = [];

  const minePositions = getMinePositions(boardSize, numberOfMines);

  for (let x = 0; x < boardSize; x++) {
    const row = [];

    for (let y = 0; y < boardSize; y++) {
      const element = document.createElement("div");
      element.dataset.status = TILE_STATUS.HIDDEN;

      const tile = {
        element,
        x,
        y,
        mine: minePositions.some(positionMatch.bind(null, { x, y })),
        get status() {
          return this.element.dataset.status;
        },
        set status(value) {
          return (this.element.dataset.status = value);
        },
      };

      row.push(tile);
    }

    board.push(row);
  }

  return board;
}

function getMinePositions(boardSize, numberOfMines) {
  const positions = [];

  while (positions.length < numberOfMines) {
    const position = {
      x: getRandomNumber(boardSize),
      y: getRandomNumber(boardSize),
    };

    // working.
    // if (!positions.some((p) => p.x === position.x && p.y === position.y)) {
    //   positions.push(position);
    // }

    if (!positions.some(positionMatch.bind(null, position))) {
      positions.push(position);
    }
  }
  return positions;
}

function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

function positionMatch(a, b) {
  return a.x === b.x && a.y === b.y;
}
