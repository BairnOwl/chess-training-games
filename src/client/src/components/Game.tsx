import React from 'react';

import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js';
import Board from '../game_engine/board';
import { SquareFunctions } from "../game_engine/square"

interface MyProps {
}

interface MyState {
  board: Board,
  boardPosition: string
}

class Game extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);

    let board = new Board();

    this.state = {
      board: board,
      boardPosition: board.chess.fen()
    }
  }

  componentDidMount() {
    this.setInitialBoard();
  }

  setInitialBoard() {
    let num1 = Math.floor(Math.random() * 64);
    let num2: number;

    do {
      num2 = Math.floor(Math.random() * 64);
    } while (num1 === num2)

    console.log(num1);
    console.log(num2);


    this.state.board.addPiece('n', SquareFunctions.fromIndex(num1));
    this.state.board.addPiece('b', SquareFunctions.fromIndex(num2));

    console.log(this.state.board.chess.ascii());
    console.log(this.state.board.chess.fen());

    this.setState({
      boardPosition: this.state.board.chess.fen()
    });

    // this.state.boardPosition = this.state.board.chess.fen();
  }

  render() {
      console.log("in render");
      console.log(this.state.boardPosition);
      console.log(this.state.board.chess.ascii());

      const elem = <Chessboard position={this.state.boardPosition} />;
      console.log(elem);

      return (
        <Chessboard position={this.state.boardPosition} />
      );
  }

}

export default Game;
