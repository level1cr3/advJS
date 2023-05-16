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

export function markTile(tile) {
  if (tile.status !== TILE_STATUS.HIDDEN && tile.status !== TILE_STATUS.MARKED)
    return;

  tile.status =
    tile.status === TILE_STATUS.HIDDEN
      ? TILE_STATUS.MARKED
      : TILE_STATUS.HIDDEN;
}

export function revealTile(board, tile) {
  if (tile.status !== TILE_STATUS.HIDDEN) return;

  if (tile.mine) {
    tile.status = TILE_STATUS.MINE;
    return;
  }

  tile.status = TILE_STATUS.NUMBER;
  const adjacentTile = nearbyTiles(board, tile);
  const mines = adjacentTile.filter((t) => t.mine);

  if (mines.length === 0) {
    adjacentTile.forEach(revealTile.bind(null, board));
  } else {
    tile.element.textContent = mines.length;
  }
}

function nearbyTiles(board, { x, y }) {
  const tiles = [];

  for (let xOffset = -1; xOffset <= 1; xOffset++)
    for (let yOffset = -1; yOffset <= 1; yOffset++) {
      const tile = board[x + xOffset]?.[y + yOffset];

      if (tile) tiles.push(tile);
    }

  return tiles;
}
