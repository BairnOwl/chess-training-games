import React from 'react';

import Chessground from 'react-chessground'
import 'react-chessground/dist/styles/chessground.css'

import GameState, { States } from '../game_engine/game_state';
import BasicOverlay from './overlays/BasicOverlay';
import Countdown from './overlays/Countdown';
import GameOverlay, { Answer } from './overlays/GameOverlay';
import LevelUpOverlay from './overlays/LevelUpOverlay';
import GameOverOverlay from './overlays/GameOverOverlay';
import './overlays/Base.css';


const EMPTY_FEN: string = "8/8/8/8/8/8/8/8 w - - 0 1";

interface GameProps {
}

interface GameStates {
  fen: string
  state: States
  questionNumber: number
  isGameOver: boolean
  isLevelUp: boolean
  isGameWon: boolean
}

export default class Game extends React.Component<GameProps, GameStates> {
  gameState: GameState;

  constructor(props: any) {
    super(props);

    // GameState is not a direct part of the component state,
    // FEN & STATE are considered the sole drivers of Game rendering.
    this.gameState = new GameState();
    this.gameState.setupPreGame();

    this.state = {
      fen: this.gameState.board.chess.fen(),
      state: this.gameState.currentState,
      questionNumber: this.gameState.score,
      isGameOver: false,
      isLevelUp: false,
      isGameWon: false
    }

    this.startGame = this.startGame.bind(this);
    this.startCountdown = this.startCountdown.bind(this);
    this.evaluateAnswer = this.evaluateAnswer.bind(this);
    this.loadNextOverlay = this.loadNextOverlay.bind(this);
    this.playAgain = this.playAgain.bind(this);
    this.continueGame = this.continueGame.bind(this);
  }

  startCountdown() {
    this.setState({ state: States.COUNTDOWN });
  }

  startGame() {
    this.gameState.startGame();

    // TODO: For some reason, after fen is set to EMPTY,
    // pieces start disappearing one by one
    this.setState({
      state: States.PLAY,
      fen: EMPTY_FEN 
    });
  }

  playAgain() {
    this.gameState.setupPreGame();
    this.setState({
      fen: this.gameState.board.chess.fen(),
      state: this.gameState.currentState,
      questionNumber: this.gameState.score,
      isGameOver: false,
      isLevelUp: false,
      isGameWon: false,
    })
  }

  loadNextOverlay() {
    if (this.state.isGameOver) {
      this.setState({ state: States.GAME_OVER, fen: this.gameState.board.chess.fen() });
    } else if (this.state.isGameWon) {
      this.setState({ state: States.WIN, fen: this.gameState.board.chess.fen() });
    } else if (this.state.isLevelUp) {
      this.setState({ state: States.LEVEL_UP });
    } else {
      this.setState({ state: States.PLAY });
    }
  }

  continueGame() {
    this.setState({ state: States.BETWEEN, isLevelUp: false });
  }

  evaluateAnswer(answer: Answer) {
    let levelUp = false;
    let gameWon = false;
    if ( answer === Answer.RIGHT ) {
      const gameResult = this.gameState.setNextPosition();
      levelUp = gameResult.levelUp;
      gameWon = gameResult.win;
      // add logic for the overlay
    }

    this.setState({
      questionNumber: this.gameState.score,
      isGameOver: answer === Answer.WRONG,
      isLevelUp: levelUp,
      isGameWon: gameWon,
      state: States.BETWEEN,
    });
  }

  render() {
      const { fen, state, questionNumber } = this.state;

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
      }
      else if (state === States.COUNTDOWN) {
        overlay = <Countdown seconds={3} gameHandler={this.startGame} />
      }
      else if (state === States.PLAY) {
        // convert pieces to strings
        let pieces = this.gameState.board.pieces.map(piece => piece as string);
        // sort them alphabetically
        pieces = pieces.sort();
        console.log(pieces);
        // Remove duplicate pieces (i.e. we can have 2 knights etc.)
        let piecesSet = new Set(pieces);
        pieces = Array.from(piecesSet); // convert back to array

        overlay = <GameOverlay
            square={this.gameState.square as string}
            text="Which piece can reach this square?"
            correctPiece={this.gameState.pieceForSquare.piece as string}
            allPieces={pieces}
            score={this.state.questionNumber}
            evaluateAnswer={this.evaluateAnswer}
            loadNextOverlay={this.loadNextOverlay} />;
      }
      else if (state === States.GAME_OVER) {
        overlay = <GameOverOverlay
            title="GAME OVER"
            buttonText="Play Again"
            score={questionNumber}
            imageSource="game_over.svg"
            // Need to somehow give credit to the authors if we want to use this image
            // https://www.flaticon.com/free-icon/cancel_753345?term=error&page=1&position=1
            imageAlt="Icons made by Vectors Market (www.flaticon.com)"
            imageHeight="100"
            gameHandler={this.playAgain} />;
      } 
      else if (state === States.LEVEL_UP) {
        overlay = <LevelUpOverlay
            title="LEVEL UP"
            buttonText="Continue"
            newPiece={this.gameState.levelUpPiece.piece}
            newSquare={this.gameState.levelUpPiece.square}
            imageSource="flame.svg"
            // Need to somehow give credit to the authors if we want to use this image
            // It was taken from here https://www.flaticon.com/free-icon/flame_426833?term=fire&page=1&position=9
            imageAlt="Icons made by Vectors Market (www.flaticon.com)"
            imageHeight="100"
            gameHandler={this.continueGame} 
            loadNextOverlay={this.loadNextOverlay} />;
      }
      else if (state === States.WIN) {
        overlay = <GameOverOverlay
            title="YOU WIN"
            buttonText="Play Again"
            score={questionNumber}
            imageSource="winner.svg"
            // Need to somehow give credit to the authors if we want to use this image
            // It was taken from here https://www.flaticon.com/free-icon/winner_1021220?term=trophy&page=1&position=22
            imageAlt="Icons made by Freepik (www.flaticon.com)"
            imageHeight="100"
            gameHandler={this.playAgain} />;
      }

      return (
        <div style={boardsContainer} >
          <Chessground fen={fen} viewOnly={true} resizable={true} />
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
