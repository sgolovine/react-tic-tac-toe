import React, { useState, useEffect } from "react";
import styled from "styled-components";

// Positions are keyed by [x][y]
type PositionOptions = 11 | 12 | 13 | 21 | 22 | 23 | 31 | 32 | 33;

// Values are 0 for nothing, 1 for X, 2 for O
type ValueOptions = 0 | 1 | 2;

type State = {
  [Key in PositionOptions]: ValueOptions;
};

type TurnState = 1 | 2;

type BoardProps = {
  boardState: State;
  onClick: (key: PositionOptions) => void;
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

const label = {
  0: "   ",
  1: " X ",
  2: " O ",
};

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

const Board = ({ onClick, boardState }: BoardProps) => {
  return (
    <BoardContainer>
      <BoardRow>
        <BoardButton onClick={() => onClick(11)}>
          {label[boardState[11]]}
        </BoardButton>
        <BoardButton onClick={() => onClick(12)}>
          {label[boardState[12]]}
        </BoardButton>
        <BoardButton onClick={() => onClick(13)}>
          {label[boardState[13]]}
        </BoardButton>
      </BoardRow>
      <BoardRow>
        <BoardButton onClick={() => onClick(21)}>
          {label[boardState[21]]}
        </BoardButton>
        <BoardButton onClick={() => onClick(22)}>
          {label[boardState[22]]}
        </BoardButton>
        <BoardButton onClick={() => onClick(23)}>
          {label[boardState[23]]}
        </BoardButton>
      </BoardRow>
      <BoardRow>
        <BoardButton onClick={() => onClick(31)}>
          {label[boardState[31]]}
        </BoardButton>
        <BoardButton onClick={() => onClick(32)}>
          {label[boardState[32]]}
        </BoardButton>
        <BoardButton onClick={() => onClick(33)}>
          {label[boardState[33]]}
        </BoardButton>
      </BoardRow>
    </BoardContainer>
  );
};

const App = () => {
  const [turn, setTurn] = useState<TurnState>(1);
  const [boardState, setBoardState] = useState<State>(initialState);

  useEffect(() => {
    const winner = computeWinScenarios(boardState);
    if (winner > 0) {
      if (winner === 1) {
        resetBoard();
        alert("X won");
      } else {
        resetBoard();
        alert("Y won");
      }
    } else if (computeTie(boardState)) {
      resetBoard();
      alert("It's a TIE!");
    }
  }, [boardState]);

  const resetBoard = () => setBoardState(initialState);

  const handleClick = (key: PositionOptions) => {
    setBoardState({
      ...boardState,
      [key]: turn,
    });
    setTurn(turn === 1 ? 2 : 1);
  };

  return (
    <PageContainer>
      <Label>Tic Tac Toe!</Label>
      <Label>Turn: {turn === 1 ? "X (Player 1)" : "O (Player 2)"}</Label>
      <button onClick={resetBoard}>Reset</button>
      <Board boardState={boardState} onClick={handleClick} />
    </PageContainer>
  );
};

export default App;

const PageContainer = styled.div``;

const Label = styled.p``;

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const BoardRow = styled.div`
  display: flex;
  flex-direction row;
`;

const BoardButton = styled.button`
  height: 100px;
  width 100px;
`;
