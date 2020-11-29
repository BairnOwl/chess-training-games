import React from 'react';
import './GameOverlay.css';
import { Button } from '@material-ui/core';
import Pieces from "../pieces"


export enum Answer {
  NONE,
  RIGHT,
  WRONG,
}

const PieceMap = new Map([
    ['p', Pieces.wP],
    ['n', Pieces.wN],
    ['b', Pieces.wB],
    ['r', Pieces.wR],
    ['q', Pieces.wQ],
    ['k', Pieces.wK],
]);


interface OverlayProps {
  square: string
  text: string
  correctPiece: string
  allPieces: string[]
  setNextPosition: any
  loadNextOverlay: any
}

interface OverlayState {
  chosenPiece: string
  answer: Answer
}

export default class GameOverlay extends React.Component<OverlayProps, OverlayState> {
  interval: any;

  constructor(props: any) {
    super(props);

    this.state = {
      chosenPiece: '',
      answer: Answer.NONE
    }
  }

  clickHandler(piece: string) {
    const answer = piece === this.props.correctPiece ? Answer.RIGHT : Answer.WRONG;
    this.setState({ chosenPiece: piece, answer: answer });

    // after 0.5s destroy component and move to next question
    setTimeout(() => this.props.setNextPosition(answer), 500);
  }

  componentWillUnmount() {
    this.props.loadNextOverlay()
  }

  render() {
    const { square, text, allPieces } = this.props;
    const { chosenPiece, answer } = this.state;

    // todo temporary hotfix
    let squareStr = "";
    if (square) {
        squareStr = square.toUpperCase();
    }

    const pieceButtons = allPieces.map(piece => (
      <Button
        variant="outlined" color="primary"
        key={piece} onClick={() => this.clickHandler(piece)}>{PieceMap.get(piece)}</Button>
    ));

    let backgroundClass = "neutral";
    if (answer === Answer.RIGHT) {
      backgroundClass = "correct";
    } else if (answer === Answer.WRONG) {
      backgroundClass = "incorrect";
    }

    return (
      <div className={backgroundClass} style={boardsContainer}>
        <h1>{squareStr}</h1>
        <p>{text}</p>
        {pieceButtons}
      </div>
    );
  }

}

const boardsContainer = {
  // background: "white",
  display: "flex",
  position: "absolute",
  top: 0,
  left: "center",
  justifyContent: "space-around",
  alignItems: "center",
  flexWrap: "wrap",
  zIndex: 10,
  width: "20vw",
  marginTop: 30,
  padding: 30,
} as React.CSSProperties;
