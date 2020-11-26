import React from 'react';

import Chessboard from 'chessboardjsx';
import GameState, { States } from '../game_engine/game_state';
import BasicOverlay from './overlays/BasicOverlay';
import Countdown from './overlays/Countdown';
import GameOverlay from './overlays/GameOverlay';


const EMPTY_FEN: string = "8/8/8/8/8/8/8/8 w - - 0 1";

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
    this.startCountdown = this.startCountdown.bind(this)
  }

  startCountdown() {
    this.setState({ state: States.COUNTDOWN });
  }

  startGame() {
    // TODO: For some reason, after fen is set to EMPTY,
    // pieces start disappearing one by one
    this.setState({ 
      state: States.PLAY, 
      fen: EMPTY_FEN 
    });
  }

  render() {
      const { fen, state } = this.state;

      // default overlay defaults to empty area
      let overlay: JSX.Element = <area />;

      if (state === States.PRE_GAME) {
        overlay = <BasicOverlay
            title="Visualization Training"
            text="The aim of the game: Say which piece can 
            reach a given square. You start with 2 pieces 
            and get 1 more for every 10 right answers.
            The catch - you cannot see where your pieces are!"
            buttonText="Start"
            gameHandler={this.startCountdown} />;
      } else if (state === States.COUNTDOWN) {
        overlay = <Countdown seconds={3} gameHandler={this.startGame} />
      } else if (state === States.PLAY) {
        overlay = <GameOverlay 
            square="d3" text="Which piece can reach this square?"
            correctPiece="b" allPieces={["b", "n"]}
            gameHandler={this.startGame}
        />
      }

      console.log(fen, state)
      return (
        <div style={boardsContainer} >
          <Chessboard position={fen} />
          {overlay}
        </div>
      );
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
