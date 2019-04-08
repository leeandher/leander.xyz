import React from "react";

import { Layout } from "antd";

import Sidebar from "./Sidebar";
import Game from "./Game";

class Main extends React.Component {
  state = {
    gameTimer: null
  };

  componentDidMount() {
    // If set to play on load, start right away
    if (this.props.game.isPlaying) {
      const gameTimer = setInterval(
        () => this.props.incrementBoard(this.props.config.height),
        this.props.config.speed
      );
      this.setState({ gameTimer });
    }
  }

  componentDidUpdate(prevProps) {
    // Only update change the state if the new props affect the game being played
    if (
      prevProps.game.isPlaying === this.props.game.isPlaying &&
      prevProps.config.speed === this.props.config.speed
    )
      return;

    // Play the game
    if (this.props.game.isPlaying) {
      clearInterval(this.state.gameTimer);
      this.props.incrementBoard(this.props.config.height);
      const gameTimer = setInterval(
        () => this.props.incrementBoard(this.props.config.height),
        this.props.config.speed
      );
      this.setState({ gameTimer });
    }
    // Pause the game
    else {
      clearInterval(this.state.gameTimer);
    }
  }

  componentWillUnmount() {
    // Stop the game if unmounting
    if (this.props.game.isPlaying) {
      clearInterval(this.state.gameTimer);
    }
  }

  render() {
    return (
      <Layout className={`${this.props.config.theme}-style`}>
        <Sidebar {...this.props} />
        <Game {...this.props} />
      </Layout>
    );
  }
}

export default Main;
