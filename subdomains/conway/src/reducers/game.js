const game = (state = {}, action) => {
  switch (action.type) {
    case "PLAY_GAME":
      return {
        ...state,
        isPlaying: true
      };
    case "PAUSE_GAME":
      return {
        ...state,
        isPlaying: false
      };
    case "INCREMENT_BOARD":
      return {
        ...state,
        generation: state.generation + 1
      };
    case "RANDOMIZE_BOARD":
    case "CLEAR_BOARD":
    case "LOAD_PRESET":
    case "SET_SIZE":
      return {
        ...state,
        isPlaying: false,
        generation: 0
      };
    default:
      return state;
  }
};

export default game;
