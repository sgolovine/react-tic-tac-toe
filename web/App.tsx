import React from "react";
import styled from "styled-components";
import useTicTacToe, { State, PositionOptions } from "./hook";

type BoardProps = {
  boardState: State;
  onClick: (key: PositionOptions) => void;
};

const label = {
  0: "   ",
  1: " X ",
  2: " O ",
};

const Board = ({ onClick, boardState }: BoardProps) => {
  return (
    <BoardContainer>
      <BoardRow>
        <BoardButton
          disabled={boardState[11] !== 0}
          onClick={() => onClick(11)}
        >
          {label[boardState[11]]}
        </BoardButton>
        <BoardButton
          disabled={boardState[12] !== 0}
          onClick={() => onClick(12)}
        >
          {label[boardState[12]]}
        </BoardButton>
        <BoardButton
          disabled={boardState[13] !== 0}
          onClick={() => onClick(13)}
        >
          {label[boardState[13]]}
        </BoardButton>
      </BoardRow>
      <BoardRow>
        <BoardButton
          disabled={boardState[21] !== 0}
          onClick={() => onClick(21)}
        >
          {label[boardState[21]]}
        </BoardButton>
        <BoardButton
          disabled={boardState[22] !== 0}
          onClick={() => onClick(22)}
        >
          {label[boardState[22]]}
        </BoardButton>
        <BoardButton
          disabled={boardState[23] !== 0}
          onClick={() => onClick(23)}
        >
          {label[boardState[23]]}
        </BoardButton>
      </BoardRow>
      <BoardRow>
        <BoardButton
          disabled={boardState[31] !== 0}
          onClick={() => onClick(31)}
        >
          {label[boardState[31]]}
        </BoardButton>
        <BoardButton
          disabled={boardState[32] !== 0}
          onClick={() => onClick(32)}
        >
          {label[boardState[32]]}
        </BoardButton>
        <BoardButton
          disabled={boardState[33] !== 0}
          onClick={() => onClick(33)}
        >
          {label[boardState[33]]}
        </BoardButton>
      </BoardRow>
    </BoardContainer>
  );
};

const App = () => {
  const { winner, turn, boardState, onSelect, resetBoard } = useTicTacToe();

  if (winner) {
    if (winner === -1) {
      alert("Its a tie!");
      resetBoard();
    }
    if (winner === 1) {
      alert("X won!");
      resetBoard();
    }
    if (winner === 2) {
      alert("O won!");
      resetBoard();
    }
  }

  return (
    <PageContainer>
      <Label>Tic Tac Toe!</Label>
      <Label>Turn: {turn === 1 ? "X (Player 1)" : "O (Player 2)"}</Label>
      <button onClick={resetBoard}>Reset</button>
      <Board
        boardState={boardState}
        onClick={(key: PositionOptions) => onSelect(key)}
      />
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
