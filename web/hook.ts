import { useState, useEffect } from "react";

// Positions are keyed by [x][y]
export type PositionOptions = 11 | 12 | 13 | 21 | 22 | 23 | 31 | 32 | 33;

// Values are 0 for nothing, 1 for X, 2 for O
type ValueOptions = 0 | 1 | 2;

export type State = {
  [Key in PositionOptions]: ValueOptions;
};

const initialState: State = {
  11: 0,
  12: 0,
  13: 0,
  21: 0,
  22: 0,
  23: 0,
  31: 0,
  32: 0,
  33: 0,
};

function useTicTacToe() {
  const [turn, setTurn] = useState<1 | 2>(1);
  const [boardState, setBoardState] = useState<State>(initialState);
  const [winner, setWinner] = useState<-1 | 1 | 2 | null>(null);

  useEffect(() => {
    const winner = computeWinScenarios(boardState);
    if (winner > 0) {
      if (winner === 1) {
        setWinner(1);
      } else {
        setWinner(2);
      }
    } else if (computeTie(boardState)) {
      setWinner(-1);
    }
  }, [boardState]);

  useEffect(() => {
    setTurn(turn === 1 ? 2 : 1);
  }, [boardState]);

  const computeWinScenarios = (boardState: State) => {
    // When computing win scenarios there are
    // 8 Possible win scenarios
    //  - 3 Across
    //  - 3 Down
    //  - 2 Diagonally

    // This will compute whether a row has all of the same numbers
    // AND that those numbers are not 0
    const computeRow = (x: number, y: number, z: number) => {
      if (x === y && x === z && z !== null && x + y + z > 0) {
        return x;
      }
      return 0;
    };

    // This is very verbose and while I don't like the lack of DRYness
    // here, this has the advantage that as soon as a win scenario is computed
    // it's returned without computing the rest

    // Compute row1
    const row1 = computeRow(boardState[11], boardState[12], boardState[13]);
    if (row1 > 0) {
      return row1;
    }
    // Compute row2
    const row2 = computeRow(boardState[21], boardState[22], boardState[23]);
    if (row2 > 0) {
      return row2;
    }
    // Compute row3
    const row3 = computeRow(boardState[31], boardState[32], boardState[33]);
    if (row3 > 0) {
      return row3;
    }
    // Compute col1
    const col1 = computeRow(boardState[11], boardState[21], boardState[31]);
    if (col1 > 0) {
      return col1;
    }
    // Compute col2
    const col2 = computeRow(boardState[12], boardState[22], boardState[32]);
    if (col2 > 0) {
      return col2;
    }
    // Compute col3
    const col3 = computeRow(boardState[13], boardState[23], boardState[33]);
    if (col3 > 0) {
      return col3;
    }
    // Compute Diag1
    const diag1 = computeRow(boardState[11], boardState[22], boardState[33]);
    if (diag1 > 0) {
      return diag1;
    }
    // Compute Diag2
    const diag2 = computeRow(boardState[13], boardState[22], boardState[31]);
    if (diag2 > 0) {
      return diag2;
    }

    return 0;
  };

  // This function will compute whether
  // the game is a tie
  // This checks for the minimum value
  // on the board, if minValue > 0 AND
  // we do not have a winner then it's a tie
  const computeTie = (boardState: State) =>
    Math.min(...Object.values(boardState)) > 0;

  const resetBoard = () => {
    setBoardState(initialState);
    setWinner(null);
  };

  const onSelect = (key: PositionOptions) =>
    setBoardState({ ...boardState, [key]: turn });

  return { winner, turn, boardState, onSelect, resetBoard };
}

export default useTicTacToe;
