// we want our mutation to happen over here because this is top level.

import {
  TILE_STATUS,
  createBoard,
  markTile,
  revealTile,
  checkWin,
  checkLose,
  positionMatch,
  markedTilesCount,
} from "./Minesweeper.js";

// for cypress testing
let testBoard;
if (process.env.NODE_ENV !== "production" && window.testBoard) {
  testBoard = window.testBoard;
}

const BOARD_SIZE = testBoard?.length ?? 3;
const NUMBER_OF_MINES = testBoard?.flat().filter((t) => t.mine).length ?? 1;

let board =
  testBoard ??
  createBoard(BOARD_SIZE, getMinePositions(BOARD_SIZE, NUMBER_OF_MINES));

const boardElement = document.querySelector(".board");
const mineLeftText = document.querySelector("[data-mine-count]");
const messageText = document.querySelector(".subtext");

function render() {
  boardElement.innerHTML = "";
  getTileElements().forEach((element) => {
    boardElement.append(element);
  });

  checkGameEnd();
  listMinesLeft();
}

function getTileElements() {
  return board.flatMap((row) => {
    return row.map(tileToElement);
  });
}

function tileToElement(tile) {
  const element = document.createElement("div");
  element.dataset.status = tile.status;
  element.dataset.x = tile.x;
  element.dataset.y = tile.y;
  element.textContent = tile.adjacentMinesCount || "";
  return element;
}

boardElement.addEventListener("click", (e) => {
  if (!e.target.matches("[data-status]")) return;

  board = revealTile(board, {
    x: parseInt(e.target.dataset.x),
    y: parseInt(e.target.dataset.y),
  });

  render();
});

boardElement.addEventListener("contextmenu", (e) => {
  e.preventDefault();

  if (!e.target.matches("[data-status]")) return;

  board = markTile(board, {
    x: parseInt(e.target.dataset.x),
    y: parseInt(e.target.dataset.y),
  });

  render();
});

boardElement.style.setProperty("--size", BOARD_SIZE);
render();

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
        if (tile.status === TILE_STATUS.MARKED) board = markTile(board, tile);
        if (tile.mine) board = revealTile(board, tile);
      });
    });
  }
}

function stopPropagation(e) {
  e.stopImmediatePropagation();
}

function listMinesLeft() {
  mineLeftText.textContent = NUMBER_OF_MINES - markedTilesCount(board);
}

function getMinePositions(boardSize, numberOfMines) {
  const positions = [];

  while (positions.length < numberOfMines) {
    const position = {
      x: getRandomNumber(boardSize),
      y: getRandomNumber(boardSize),
    };

    if (!positions.some(positionMatch.bind(null, position))) {
      positions.push(position);
    }
  }
  return positions;
}

function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}
