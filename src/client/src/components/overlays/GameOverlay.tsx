import React from 'react';


enum Answer {
  CORRECT,
  WRONG
}

interface OverlayProps {
  square: string
  text: string
  correctPiece: string
  allPieces: string[]
  gameHandler: any
}

interface OverlayState {
  chosenPiece: string
}

export default class GameOverlay extends React.Component<OverlayProps, OverlayState> {

  render() {
    const { square, text, allPieces } = this.props;

    // <button onClick={this.props.gameHandler}>{buttonText}</button>
    return (
      <div style={boardsContainer}>
        <h1>{square}</h1>
        <p>{text}</p>
        
      </div>
    );
  }

}

const boardsContainer = {
  background: "white",
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
