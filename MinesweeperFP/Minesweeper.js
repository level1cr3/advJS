// we don't want the mutation over here. we want the pure functions over here.
// big thing to worry about when we are making these changes. inside mine sweeper js we need to make sure
// we are returning a board from function. If you have a pure function and it doesn't ever return anything then its never going to be
// a pure function because you have some hidden side-effect init.

// force it into your mind to try to write the pure functions.

import { times, range } from "lodash/fp";

export const TILE_STATUS = {
  MINE: "mine",
  MARKED: "marked",
  HIDDEN: "hidden",
  NUMBER: "number",
};

export function createBoard(boardSize, minePositions) {
  return times((x) => {
    return times((y) => {
      return {
        x,
        y,
        mine: minePositions.some(positionMatch.bind(null, { x, y })),
        status: TILE_STATUS.HIDDEN,
      };
    }, boardSize);
  }, boardSize);
}

export function positionMatch(a, b) {
  return a.x === b.x && a.y === b.y;
}

export function markTile(board, { x, y }) {
  const tile = board[x][y];

  if (tile.status !== TILE_STATUS.HIDDEN && tile.status !== TILE_STATUS.MARKED)
    return board;

  if (tile.status === TILE_STATUS.MARKED) {
    return replaceTile(
      board,
      { x, y },
      { ...tile, status: TILE_STATUS.HIDDEN }
    );
  }

  return replaceTile(board, { x, y }, { ...tile, status: TILE_STATUS.MARKED });
}

function replaceTile(board, position, newTile) {
  return board.map((row, x) => {
    return row.map((tile, y) => {
      if (positionMatch(position, { x, y })) {
        return newTile;
      }
      return tile;
    });
  });
}

export function revealTile(board, { x, y }) {
  const tile = board[x][y];

  if (tile.status !== TILE_STATUS.HIDDEN) return board;

  if (tile.mine) {
    return replaceTile(board, { x, y }, { ...tile, status: TILE_STATUS.MINE });
  }

  tile.status = TILE_STATUS.NUMBER;
  const adjacentTile = nearbyTiles(board, tile);
  const mines = adjacentTile.filter((t) => t.mine);

  const newBoard = replaceTile(
    board,
    { x, y },
    { ...tile, status: TILE_STATUS.NUMBER, adjacentMinesCount: mines.length }
  );

  if (mines.length === 0) {
    return adjacentTile.reduce((b, t) => {
      return revealTile(b, t);
    }, newBoard);
  }

  return newBoard;
}

export function checkWin(board) {
  return board.every((row) => {
    return row.every((tile) => {
      return (
        tile.status === TILE_STATUS.NUMBER ||
        (tile.mine &&
          (tile.status === TILE_STATUS.HIDDEN ||
            tile.status === TILE_STATUS.MARKED))
      );
    });
  });
}

export function checkLose(board) {
  return board.some((row) => {
    return row.some((tile) => {
      return tile.status === TILE_STATUS.MINE;
    });
  });
}

function nearbyTiles(board, { x, y }) {
  const offsets = range(-1, 2);

  return offsets
    .flatMap((xOffset) => {
      return offsets.map((yOffset) => {
        return board[x + xOffset]?.[y + yOffset];
      });
    })
    .filter((tile) => tile != null);
}

export function markedTilesCount(board) {
  return board.reduce((count, row) => {
    return (
      count + row.filter((tile) => tile.status === TILE_STATUS.MARKED).length
    );
  }, 0);
}
