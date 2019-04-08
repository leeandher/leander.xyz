import { makeRandomBoard } from "../helper";
import { presets } from "../data/presets.json";

/* BOARD ACTIONS */

// Randomize board
export const randomizeBoard = (height, width) => {
  return {
    type: "RANDOMIZE_BOARD",
    newBoard: makeRandomBoard(height, width)
  };
};

// Increment the board by one step
export const incrementBoard = height => ({
  type: "INCREMENT_BOARD",
  height
});

// Clear the board
export const clearBoard = () => ({
  type: "CLEAR_BOARD"
});

// Load a preset board
export const loadPreset = preset => {
  const { board } = presets.find(val => val.name === preset);
  return {
    type: "LOAD_PRESET",
    newBoard: board
  };
};

export const spawnCell = (row, col) => ({
  type: "SPAWN_CELL",
  row,
  col
});

/* GAME ACTIONS */

// Play the game
export const playGame = () => ({
  type: "PLAY_GAME"
});

// Pause the game
export const pauseGame = () => ({
  type: "PAUSE_GAME"
});

/* CONFIG ACTIONS */

export const setSpeed = speed => ({
  type: "SET_SPEED",
  speed
});

// Resize the board
export const setSize = size => {
  let width, height;
  switch (size) {
    case "small":
      width = 20;
      height = 15;
      break;
    case "medium":
    default:
      width = 35;
      height = 20;
      break;
    case "large":
      width = 50;
      height = 35;
      break;
  }
  return {
    type: "SET_SIZE",
    newBoard: makeRandomBoard(height, width),
    width,
    height
  };
};

// Change the theme of the board
export const setTheme = theme => ({
  type: "SET_THEME",
  theme
});
