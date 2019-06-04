import React from "react";
import { Layout, Icon } from "antd";

import GameBoard from "./GameBoard";

import { names } from "../data/silly-names.json";

const randomName = names[Math.floor(Math.random() * names.length)];

const { Header, Content, Footer } = Layout;
const Game = props => {
  return (
    <Layout style={{ height: "100vh" }}>
      <Header style={{ background: "#fff" }}>
        <h1 className="app-header">
          Conway's Game of Life
          <a
            href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#c8c8c8", float: "right", margin: "0px" }}
          >
            <Icon type="question-circle" />
          </a>
        </h1>
      </Header>
      <Content style={{ margin: "16px" }}>
        <h2 className="game-board__species">
          The Evolution of <br />
          <input placeholder={randomName} type="text" />
        </h2>
        <GameBoard
          height={props.config.height}
          width={props.config.width}
          boardData={props.board}
          spawnCell={props.spawnCell}
        />
        <h2 className="game-board__generation">
          Generation: <br />
          <span className="number">{props.game.generation}</span>
        </h2>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Made with ❤ by{" "}
        <a href="https://leander.xyz" target="_blank" rel="noopener noreferrer">
          Leander
        </a>
      </Footer>
    </Layout>
  );
};

export default Game;
