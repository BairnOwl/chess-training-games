import React from 'react';

import Chessboard from 'chessboardjsx';
import Board from '../game_engine/board';
import { SquareFunctions } from "../game_engine/square"


interface GameProps {
}

interface GameState {
  fen: string
}

class Game extends React.Component<GameProps, GameState> {
  board: Board;

  constructor(props: any) {
    super(props);

    // board is not a direct part of the component state,
    // FEN is considered the sole driver of Game rendering.
    this.board = new Board();
    this.setInitialBoard();

    this.state = {
      fen: this.board.chess.fen()
    }
  }

  componentDidMount() {
    
  }

  handleClick(event: React.MouseEvent) {
    console.log(event);
  }

  setInitialBoard() {
    let num1 = Math.floor(Math.random() * 64);
    let num2: number;

    do {
      num2 = Math.floor(Math.random() * 64);
    } while (num1 === num2)

    this.board.addPiece('n', SquareFunctions.fromIndex(num1));
    this.board.addPiece('b', SquareFunctions.fromIndex(num2));
  }

  render() {
      const { fen } = this.state;

      return (
        <div style={boardsContainer} onClick={this.handleClick}>
          <Chessboard position={fen} />
        </div>
      );
  }

}

const boardsContainer = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  flexWrap: "wrap",
  width: "100vw",
  marginTop: 30,
  marginBottom: 50
} as React.CSSProperties;

export default Game;
