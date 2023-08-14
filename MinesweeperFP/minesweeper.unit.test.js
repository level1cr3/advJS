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

describe("minesweeper", () => {
  describe("position match", () => {
    test("testing position Match", () => {
      const a = { x: 2, y: 3 };
      const b = { x: 2, y: 3 };
      expect(positionMatch(a, b)).toBe(true);
    });
    test("test position don't Match", () => {
      const a = { x: 2, y: 1 };
      const b = { x: 2, y: 3 };
      expect(positionMatch(a, b)).toBe(false);
    });
  });

  describe("create board", () => {
    test("generates the board with no mines", () => {
      const boardSize = 2;
      const minePositions = [];
      const result = createBoard(boardSize, minePositions);
      expect(result).toEqual([
        [
          {
            x: 0,
            y: 0,
            mine: false,
            status: TILE_STATUS.HIDDEN,
          },
          {
            x: 0,
            y: 1,
            mine: false,
            status: TILE_STATUS.HIDDEN,
          },
        ],
        [
          {
            x: 1,
            y: 0,
            mine: false,
            status: TILE_STATUS.HIDDEN,
          },
          {
            x: 1,
            y: 1,
            mine: false,
            status: TILE_STATUS.HIDDEN,
          },
        ],
      ]);
    });

    test("generates the board with mine", () => {
      const boardSize = 2;
      const minePositions = [{ x: 1, y: 1 }];
      const result = createBoard(boardSize, minePositions);
      expect(result).toEqual([
        [
          {
            x: 0,
            y: 0,
            mine: false,
            status: TILE_STATUS.HIDDEN,
          },
          {
            x: 0,
            y: 1,
            mine: false,
            status: TILE_STATUS.HIDDEN,
          },
        ],
        [
          {
            x: 1,
            y: 0,
            mine: false,
            status: TILE_STATUS.HIDDEN,
          },
          {
            x: 1,
            y: 1,
            mine: true,
            status: TILE_STATUS.HIDDEN,
          },
        ],
      ]);
    });
  });

  describe("mark tile", () => {
    test("when tile status is mine", () => {
      const board = createBoard(2, [{ x: 1, y: 1 }]);
      const positionToMark = { x: 1, y: 1 };

      const [arr1, arr2] = board;
      const [obj1, obj2] = arr2;
      obj2.status = TILE_STATUS.MINE;

      expect(markTile(board, positionToMark)).toBe(board);
    });

    test("when tile status is number", () => {
      const board = createBoard(2, [{ x: 1, y: 1 }]);
      const positionToMark = { x: 1, y: 1 };

      const [arr1, arr2] = board;
      const [obj1, obj2] = arr2;
      obj2.status = TILE_STATUS.NUMBER;

      expect(markTile(board, positionToMark)).toBe(board);
    });

    test("when tile status is hidden", () => {
      const board = createBoard(2, [{ x: 1, y: 1 }]);
      const positionToMark = { x: 1, y: 1 };

      expect(markTile(board, positionToMark)).toEqual([
        [
          { x: 0, y: 0, mine: false, status: TILE_STATUS.HIDDEN },
          { x: 0, y: 1, mine: false, status: TILE_STATUS.HIDDEN },
        ],
        [
          { x: 1, y: 0, mine: false, status: TILE_STATUS.HIDDEN },
          { x: 1, y: 1, mine: true, status: TILE_STATUS.MARKED },
        ],
      ]);
    });

    test("when tile status is marked", () => {
      const board = createBoard(2, [{ x: 1, y: 1 }]);
      const positionToMark = { x: 1, y: 1 };

      const [arr1, arr2] = board;
      const [obj1, obj2] = arr2;
      obj2.status = TILE_STATUS.MARKED;

      expect(markTile(board, positionToMark)).toEqual([
        [
          { x: 0, y: 0, mine: false, status: TILE_STATUS.HIDDEN },
          { x: 0, y: 1, mine: false, status: TILE_STATUS.HIDDEN },
        ],
        [
          { x: 1, y: 0, mine: false, status: TILE_STATUS.HIDDEN },
          { x: 1, y: 1, mine: true, status: TILE_STATUS.HIDDEN },
        ],
      ]);
    });
  });

  describe("reveal tile", () => {
    test("when status is not hidden", () => {
      const board = createBoard(2, [{ x: 1, y: 1 }]);
      const positionToReveal = { x: 1, y: 0 };
      const [arr1, arr2] = board;
      const [obj1, obj2] = arr2;
      obj1.status = TILE_STATUS.NUMBER;

      expect(revealTile(board, positionToReveal)).toBe(board);
    });

    test("when tile is mine", () => {
      const board = createBoard(2, [{ x: 1, y: 1 }]);
      const positionToReveal = { x: 1, y: 1 };

      expect(revealTile(board, positionToReveal)).toEqual([
        [
          { x: 0, y: 0, mine: false, status: TILE_STATUS.HIDDEN },
          { x: 0, y: 1, mine: false, status: TILE_STATUS.HIDDEN },
        ],
        [
          { x: 1, y: 0, mine: false, status: TILE_STATUS.HIDDEN },
          { x: 1, y: 1, mine: true, status: TILE_STATUS.MINE },
        ],
      ]);
    });

    test("when tile is hidden ", () => {
      const board = createBoard(3, [{ x: 2, y: 2 }]);
      const positionToReveal = { x: 0, y: 0 };

      expect(revealTile(board, positionToReveal)).toEqual([
        [
          {
            x: 0,
            y: 0,
            mine: false,
            status: TILE_STATUS.NUMBER,
            adjacentMinesCount: 0,
          },
          {
            x: 0,
            y: 1,
            mine: false,
            status: TILE_STATUS.NUMBER,
            adjacentMinesCount: 0,
          },
          {
            x: 0,
            y: 2,
            mine: false,
            status: TILE_STATUS.NUMBER,
            adjacentMinesCount: 0,
          },
        ],
        [
          {
            x: 1,
            y: 0,
            mine: false,
            status: TILE_STATUS.NUMBER,
            adjacentMinesCount: 0,
          },
          {
            x: 1,
            y: 1,
            mine: false,
            status: TILE_STATUS.NUMBER,
            adjacentMinesCount: 1,
          },
          {
            x: 1,
            y: 2,
            mine: false,
            status: TILE_STATUS.NUMBER,
            adjacentMinesCount: 1,
          },
        ],
        [
          {
            x: 2,
            y: 0,
            mine: false,
            status: TILE_STATUS.NUMBER,
            adjacentMinesCount: 0,
          },
          {
            x: 2,
            y: 1,
            mine: false,
            status: TILE_STATUS.NUMBER,
            adjacentMinesCount: 1,
          },
          { x: 2, y: 2, mine: true, status: TILE_STATUS.HIDDEN },
        ],
      ]);
    });
  });

  describe("check win", () => {
    test("check win when mines are not marked and numbers are not revealed", () => {
      const board = createBoard(2, [{ x: 1, y: 1 }]);
      expect(checkWin(board)).toBe(false);
    });
    test("check win when mines are marked or hidden and numbers are revealed", () => {
      const board = createBoard(2, [
        { x: 1, y: 1 },
        { x: 1, y: 0 },
      ]);

      board[0][0].status = TILE_STATUS.NUMBER;
      board[0][1].status = TILE_STATUS.NUMBER;
      board[1][1].status = TILE_STATUS.MARKED;

      expect(checkWin(board)).toBe(true);
    });
  });

  describe("check lose", () => {
    test("returns true if tiles status is mine", () => {
      const board = createBoard(2, [{ x: 1, y: 1 }]);
      board[1][1].status = TILE_STATUS.MINE;
      expect(checkLose(board)).toBe(true);
    });
  });

  describe("marked tiles count", () => {
    test("returns marked tile count", () => {
      const board = createBoard(2, [{ x: 1, y: 1 }]);
      board[1][0].status = TILE_STATUS.MARKED;
      board[1][1].status = TILE_STATUS.MARKED;
      expect(markedTilesCount(board)).toBe(2);
    });

    test("When all tiles are marked", () => {
      const board = createBoard(2, [{ x: 1, y: 1 }]);
      board[0][0].status = TILE_STATUS.MARKED;
      board[0][1].status = TILE_STATUS.MARKED;
      board[1][0].status = TILE_STATUS.MARKED;
      board[1][1].status = TILE_STATUS.MARKED;
      expect(markedTilesCount(board)).toBe(4);
    });

    test("When no tile is marked count", () => {
      const board = createBoard(2, [{ x: 1, y: 1 }]);
      expect(markedTilesCount(board)).toBe(0);
    });
  });
});

// Note : board variable he passed as manually written board ( ex:> [[x:0,y:0][]]). in all cases except createBoard.
