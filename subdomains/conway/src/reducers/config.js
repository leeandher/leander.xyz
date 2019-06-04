const config = (state = {}, action) => {
  switch (action.type) {
    // Set the speed of the simulation
    case "SET_SPEED":
      let speed;
      switch (action.speed) {
        case "slow":
          speed = 400;
          break;
        case "moderate":
        default:
          speed = 200;
          break;
        case "fast":
          speed = 100;
          break;
      }
      return {
        ...state,
        speed
      };

    // Set the size of the simulation space
    case "SET_SIZE":
      return {
        ...state,
        height: action.height,
        width: action.width
      };

    // Set the theme of the simulation app
    case "SET_THEME":
      return {
        ...state,
        theme: action.theme
      };

    case "LOAD_PRESET":
      return {
        ...state,
        width: 50,
        height: 35
      };
    default:
      return state;
  }
};

export default config;
