import React from 'react';
import './GameOverlay.css';
import { Button } from '@material-ui/core';
import PieceMap from "../pieces";
import OverlayStyle from "./Style"
var Sound = require('react-sound').default;

export enum Answer {
  NONE,
  RIGHT,
  WRONG,
}

interface OverlayProps {
  square: string
  text: string
  correctPiece: string
  allPieces: string[]
  evaluateAnswer: any
  loadNextOverlay: any,
  score: number
}

interface OverlayState {
  chosenPiece: string
  answer: Answer
  answerClicked: boolean
  playCorrectSound: typeof Sound.status,
  playWrongSound: typeof Sound.status
}

export default class GameOverlay extends React.Component<OverlayProps, OverlayState> {
  interval: any;

  constructor(props: any) {
    super(props);

    this.state = {
      chosenPiece: '',
      answer: Answer.NONE,
      answerClicked: false,
      playCorrectSound: Sound.status.STOPPED,
      playWrongSound: Sound.status.STOPPED,
    }
  }

  clickHandler(piece: string) {
    if (this.state.answerClicked) {
      return;
    }

    const answer = piece === this.props.correctPiece ? Answer.RIGHT : Answer.WRONG;
    const playCorrectSound = piece === this.props.correctPiece ? Sound.status.PLAYING : Sound.status.STOPPED;
    const playWrongSound = piece === this.props.correctPiece ? Sound.status.STOPPED : Sound.status.PLAYING;

    this.setState({ 
      chosenPiece: piece, 
      answer: answer, 
      answerClicked: true, 
      playCorrectSound: playCorrectSound, 
      playWrongSound: playWrongSound 
    });

    // after 0.5s destroy component and move to next question
    setTimeout(() => this.props.evaluateAnswer(answer), 500);
  }

  componentWillUnmount() {
    this.props.loadNextOverlay()
  }

  render() {
    const { square, text, allPieces, score } = this.props;
    const { chosenPiece, answer, playCorrectSound, playWrongSound } = this.state;

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
      <div className={`${backgroundClass} in-game`} style={OverlayStyle}>
        <h1>{squareStr}</h1>
        <p>{text}</p>
        <div className="game-choices">
          {pieceButtons}
        </div>
        <p>Score: {score}</p>
        <Sound url="/audio/correct.wav" playStatus={playCorrectSound} />
        <Sound url="/audio/wrong.wav" playStatus={playWrongSound} />
      </div>
    );
  }

}
