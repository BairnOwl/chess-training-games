import React from 'react';
import { Button } from '@material-ui/core';
import PieceMap from "../pieces";


interface OverlayProps {
  title: string
  newPiece: string
  newSquare: string
  imageSource: string
  imageAlt: string
  imageHeight: string
  buttonText: string
  gameHandler: any
  loadNextOverlay: any
}

interface OverlayState {
}

export default class LevelUpOverlay extends React.Component<OverlayProps, OverlayState> {
  componentWillUnmount() {
      this.props.loadNextOverlay()
  }

  render() {
    const { title, newPiece, newSquare, buttonText, imageSource, imageAlt, imageHeight } = this.props;

    return (
      <div style={boardsContainer}>
        <h2>{title}</h2>
        <img src={imageSource} alt={imageAlt} height={imageHeight} />
        <h3>New Piece:</h3>
        {PieceMap.get(newPiece)}
        <h4>{" on "}{newSquare.toUpperCase()}</h4>
        <Button variant="contained" color="primary" onClick={this.props.gameHandler} disableElevation>{buttonText}</Button>
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