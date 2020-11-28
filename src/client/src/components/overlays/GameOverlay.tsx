import React from 'react';
import './GameOverlay.css';


enum Answer {
  NONE,
  RIGHT,
  WRONG,
}


interface OverlayProps {
  square: string
  text: string
  correctPiece: string
  allPieces: string[]
  checkGuess: any
  setNextPosition: any
}

interface OverlayState {
  chosenPiece: string
  answer: Answer
}

export default class GameOverlay extends React.Component<OverlayProps, OverlayState> {
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

    this.props.setNextPosition();
  }

  render() {
    const { square, text, allPieces } = this.props;
    const { chosenPiece, answer } = this.state;

    const pieceButtons = allPieces.map(piece => (
      <button key={piece} onClick={() => this.clickHandler(piece)}>{piece}</button>
    ));

    let backgroundClass = "neutral";
    if (answer === Answer.RIGHT) {
      backgroundClass = "correct";
    } else if (answer === Answer.WRONG) {
      backgroundClass = "incorrect";
    }

    return (
      <div className={backgroundClass} style={boardsContainer}>
        <h1>{square}</h1>
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
