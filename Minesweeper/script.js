/*

> Display/ UI code here.

> we have to create a grid layout of 10x10 tiles.
> in this grid we will have 10 mines. which will be randomly spread over the grid 
> these mines will be revelead if we left click on them. 
> right click to mark a tile.
> left click to reveal a tile

> once mine is revealed game will stop and there will be a message saying you lose.
> near by tiles of mine will have numbers in it. which would show how close we are to a mine.
> and there will be empty which when clicked. which when clicked will reveal all the near by empty tiles if any are 
available.

> i have to use ES6 modules.
> i have to use the parcel.
> i have to use npm init.

*/

import {
  TILE_STATUS,
  createBoard,
  markTile,
  revealTile,
  checkWin,
  checkLose,
} from "./Minesweeper.js";

const BOARD_SIZE = 10;
const NUMBER_OF_MINES = 5;

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);
const boardElement = document.querySelector(".board");
const mineLeftText = document.querySelector("[data-mine-count]");
const messageText = document.querySelector(".subtext");

boardElement.style.setProperty("--size", BOARD_SIZE);
mineLeftText.textContent = NUMBER_OF_MINES;

board.forEach((row) => {
  row.forEach((tile) => {
    const { element } = tile;
    boardElement.appendChild(element);

    element.addEventListener("click", () => {
      revealTile(board, tile);
      checkGameEnd();
    });

    element.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      markTile(tile);
      listMinesLeft();
    });
  });
});

function checkGameEnd() {
  const win = checkWin(board);
  const lose = checkLose(board);

  if (win || lose) {
    boardElement.addEventListener("click", stopPropagation, { capture: true });
    boardElement.addEventListener("contextmenu", stopPropagation, {
      capture: true,
    });
  }

  if (win) messageText.textContent = "You Win";

  if (lose) {
    messageText.textContent = "You Lose";
    board.forEach((row) => {
      row.forEach((tile) => {
        if (tile.status === TILE_STATUS.MARKED) markTile(tile);
        if (tile.mine) revealTile(board, tile);
      });
    });
  }
}

function stopPropagation(e) {
  e.stopImmediatePropagation();
}

function listMinesLeft() {
  const markedTilesCount = board.reduce((count, row) => {
    return (
      count + row.filter((tile) => tile.status === TILE_STATUS.MARKED).length
    );
  }, 0);

  mineLeftText.textContent = NUMBER_OF_MINES - markedTilesCount;
}
