import { useMemo, useState, useEffect } from "react";

type BoardState = number[][];

const initialState: BoardState = [
  [-1, -1, -1],
  [-1, -1, -1],
  [-1, -1, -1],
];

// Checks if  the values in an array _match
const _match = (value1: number, value2: number, value3: number) => {
  if (value1 !== -1 && value2 !== -1 && value3 !== -1) {
    if (value1 === value2 && value1 === value3) {
      return true;
    }
  }
  return false;
};

export const useTicTacToe = () => {
  const [turn, setTurn] = useState<1 | 2>(1);
  const [boardState, setBoardState] = useState<BoardState>(initialState);

  // In a game of Tic Tac Toe, there are 8 possible ways to win the game.

  // Memozied to avoid unnecessary computation
  const row1 = useMemo(
    () => _match(boardState[0][0], boardState[0][1], boardState[0][2]),
    [boardState[0][0], boardState[0][1], boardState[0][2]]
  );
  const row2 = useMemo(
    () => _match(boardState[1][0], boardState[1][1], boardState[1][2]),
    [boardState[1][0], boardState[1][1], boardState[1][2]]
  );
  const row3 = useMemo(
    () => _match(boardState[2][0], boardState[2][1], boardState[2][2]),
    [boardState[2][0], boardState[2][1], boardState[2][2]]
  );

  const col1 = useMemo(
    () => _match(boardState[0][0], boardState[1][0], boardState[2][0]),
    [boardState[0][0], boardState[1][0], boardState[2][0]]
  );
  const col2 = useMemo(
    () => _match(boardState[0][1], boardState[1][1], boardState[2][1]),
    [boardState[0][1], boardState[1][1], boardState[2][1]]
  );
  const col3 = useMemo(
    () => _match(boardState[0][2], boardState[1][2], boardState[0][2]),
    [boardState[0][2], boardState[1][2], boardState[2][2]]
  );

  const diag1 = useMemo(
    () => _match(boardState[0][0], boardState[1][1], boardState[2][2]),
    [boardState[0][0], boardState[1][1], boardState[2][2]]
  );
  const diag2 = useMemo(
    () => _match(boardState[0][2], boardState[1][1], boardState[2][0]),
    [boardState[0][2], boardState[1][1], boardState[2][0]]
  );

  useEffect(() => {
    if (row1 || row2 || row3 || col1 || col2 || col3 || diag1 || diag2) {
      // These are backwards because the turn is flipped in the change
      alert(`${turn === 1 ? "O" : "X"} Won the game!`);
      // Set the board state back to the initial state
      resetBoard();
    }
  }, [row1, row2, row3, col1, col2, col3, diag1, diag2]);

  const flipTurn = () => (turn === 2 ? setTurn(1) : setTurn(2));

  const changeValue = (
    indexRow: number,
    indexCol: number,
    newValue: number | string
  ) => {
    setBoardState(
      Object.assign([...boardState], {
        [indexRow]: Object.assign([...boardState[indexRow]], {
          [indexCol]: newValue,
        }),
      })
    );
    flipTurn();
  };

  const resetBoard = () => {
    setTurn(1);
    setBoardState(initialState);
  };

  return {
    turn,
    boardState,
    changeValue,
    resetBoard,
  };
};
