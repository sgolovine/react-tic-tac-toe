import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

type BoardState = number[][];

type BoardButtonProps = {
  onPress: () => void;
  value: number;
};

type BoardProps = {
  boardState: BoardState;
  onChange: (newState: BoardState) => void;
  turn: 1 | 2;
};

const initialState: BoardState = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 2, 0],
];

const BoardButton = (props: BoardButtonProps) => {
  return (
    <TouchableOpacity style={styles.boardButton} onPress={props.onPress}>
      <Text style={styles.boardButtonText}>
        {props.value === 1 ? "X" : props.value === 2 ? "O" : ""}
      </Text>
    </TouchableOpacity>
  );
};

const Board = ({ boardState, onChange, turn }: BoardProps) => {
  const handleChange = (x: number, y: number) => {
    let newBoardState = boardState;
    newBoardState[x][y] = turn;
    onChange(newBoardState);
  };

  const board = boardState.map((row, rowIndex) => {
    const rowItems = row.map((item, colIndex) => {
      return (
        <BoardButton
          key={`row-${colIndex}`}
          value={item}
          onPress={() => handleChange(rowIndex, colIndex)}
        />
      );
    });
    return (
      <View key={`col-${rowIndex}`} style={styles.row}>
        {rowItems}
      </View>
    );
  });

  return <View style={styles.board}>{board}</View>;
};

export default function App() {
  const [turn, setTurn] = useState<1 | 2>(1);
  const [boardState, setBoardState] = useState<BoardState>(initialState);

  useEffect(() => {
    console.log(boardState);
  }, [boardState]);

  const handleChange = (newBoardState: BoardState) => {
    setBoardState(newBoardState);
  };

  return (
    <View style={styles.container}>
      <Text>Tic Tac Toe!</Text>
      <Text>Turn: {turn === 1 ? "X" : "O"}</Text>
      <Board turn={turn} boardState={boardState} onChange={handleChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  boardButton: {
    borderWidth: 1,
    height: 100,
    width: 100,
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    margin: 2,
  },
  boardButtonText: {
    fontSize: 52,
    fontWeight: "bold",
  },
  board: {},
  row: {
    display: "flex",
    flexDirection: "row",
  },
});
