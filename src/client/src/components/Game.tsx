import React from 'react';

import Chessboard from 'chessboardjsx';
import GameState, { States } from '../game_engine/game_state';
import Overlay from './Overlay';


interface GameProps {
}

interface GameStates {
  fen: string
  state: States
}

class Game extends React.Component<GameProps, GameStates> {
  gameState: GameState;

  constructor(props: any) {
    super(props);

    // GameState is not a direct part of the component state,
    // FEN & STATE are considered the sole drivers of Game rendering.
    this.gameState = new GameState();
    this.gameState.setupPreGame();

    this.state = {
      fen: this.gameState.board.chess.fen(),
      state: this.gameState.currentState
    }

    this.startGame = this.startGame.bind(this)
  }

  startGame() {
    this.setState({ state: States.PLAY });
  }

  render() {
      const { fen, state } = this.state;

      // TODO this is a bad approach but it's only for testing purposes
      if (state === States.PRE_GAME) {
        return (
          <div style={boardsContainer} >
            <Chessboard position={fen} />
            <Overlay 
              title="Visualization Training"
              text="The aim of the game: Say which piece can 
                reach a given square. You start with 2 pieces 
                and get 1 more for every 10 right answers.
                The catch - you cannot see where your pieces are!"
              buttonText="Start"
              gameHandler={this.startGame} />
          </div>
        );
      } else {
          return (
            <div style={boardsContainer} >
                <Chessboard position={fen} />
            </div>
          );
      }
  }

}

const boardsContainer = {
  display: "flex",
  position: "relative",
  justifyContent: "space-around",
  alignItems: "center",
  flexWrap: "wrap",
  width: "100vw",
  marginTop: 30,
  marginBottom: 50
} as React.CSSProperties;

export default Game;
