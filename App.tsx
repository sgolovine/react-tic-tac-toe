import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import RestoreIcon from "./restore";
import { useTicTacToe } from "./hook";

type BoardState = number[][];

export default function App() {
  const { turn, boardState, changeValue, resetBoard } = useTicTacToe();

  const renderBoard = () => {
    return boardState.map((row, rowIndex) => {
      return (
        <View style={styles.row}>
          {row.map((item, itemIndex) => {
            const textStyle = {
              ...styles.buttonText,
              ...(item === 1 ? styles.blue : styles.red),
            };
            const buttonStyle = {
              ...styles.button,
              ...(item === 1
                ? styles.blue
                : item === 2
                ? styles.red
                : styles.unselected),
            };
            return (
              <TouchableOpacity
                style={buttonStyle}
                key={`${rowIndex}-${itemIndex}`}
                onPress={() =>
                  item === -1 && changeValue(rowIndex, itemIndex, turn)
                }
                disabled={item !== -1}
              >
                <Text style={textStyle}>
                  {item === -1 ? "  " : item === 1 ? " X " : " O "}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View
        style={{
          ...styles.row,
          alignItems: "center",
        }}
      >
        <Text style={styles.header}>Tic Tac Toe</Text>
        <TouchableOpacity style={{ marginLeft: 20 }} onPress={resetBoard}>
          <RestoreIcon />
        </TouchableOpacity>
      </View>
      <View style={styles.boardContainer}>{renderBoard()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    alignSelf: "center",
  },
  boardContainer: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    marginTop: 50,
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
  },
  button: {
    // borderWidth: 1,
    height: 90,
    width: 90,
    margin: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3.5,
    borderWidth: 1,
  },
  buttonText: {
    fontWeight: "700",
    fontSize: 48,
  },
  red: {
    color: "#FF5722",
    borderColor: "#FF5722",
  },
  blue: {
    color: "#2196F3",
    borderColor: "#2196F3",
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  unselected: {
    borderColor: "#E0E0E0",
  },
});
