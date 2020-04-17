import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import useTicTacToe, { State, PositionOptions } from "./hook";

type BoardProps = {
  boardState: State;
  onPress: (key: PositionOptions) => void;
};

const label = {
  0: "   ",
  1: " X ",
  2: " O ",
};

const Board = ({ boardState, onPress }: BoardProps) => {
  return (
    <View style={styles.board}>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => onPress(11)}
          style={styles.boardButton}
        >
          <Text style={styles.boardButtonText}>{label[boardState[11]]}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onPress(12)}
          style={styles.boardButton}
        >
          <Text style={styles.boardButtonText}>{label[boardState[12]]}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onPress(13)}
          style={styles.boardButton}
        >
          <Text style={styles.boardButtonText}>{label[boardState[13]]}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => onPress(21)}
          style={styles.boardButton}
        >
          <Text style={styles.boardButtonText}>{label[boardState[21]]}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onPress(22)}
          style={styles.boardButton}
        >
          <Text style={styles.boardButtonText}>{label[boardState[22]]}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onPress(23)}
          style={styles.boardButton}
        >
          <Text style={styles.boardButtonText}>{label[boardState[23]]}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => onPress(31)}
          style={styles.boardButton}
        >
          <Text style={styles.boardButtonText}>{label[boardState[31]]}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onPress(32)}
          style={styles.boardButton}
        >
          <Text style={styles.boardButtonText}>{label[boardState[32]]}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onPress(33)}
          style={styles.boardButton}
        >
          <Text style={styles.boardButtonText}>{label[boardState[33]]}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function App() {
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
    <View style={styles.container}>
      <Text style={styles.labelText}>Tic Tac Toe!</Text>
      <Text style={styles.labelText}>
        Turn: {turn === 1 ? "X (Player 1)" : "O (Player 2)"}
      </Text>
      <Button title="Reset" onPress={resetBoard} />
      <Board
        boardState={boardState}
        onPress={(key: PositionOptions) => onSelect(key)}
      />
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
  labelText: {},
});
