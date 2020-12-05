import React from 'react';
import { Button } from '@material-ui/core';


interface OverlayProps {
  title: string
  score: number
  imageSource: string
  imageAlt: string
  imageHeight: string
  buttonText: string
  gameHandler: any
}

interface OverlayState {
}

export default class GameOverOverlay extends React.Component<OverlayProps, OverlayState> {

  render() {
    const { title, score, buttonText, imageSource, imageAlt, imageHeight } = this.props;

    return (
      <div style={boardsContainer}>
        <h2>{title}</h2>
        <img src={imageSource} alt={imageAlt} height={imageHeight} />
        <h3>Score: {score}</h3>
        <Button variant="contained" color="primary" onClick={this.props.gameHandler} disableElevation>{buttonText}</Button>
      </div>
    );
  }

}

const boardsContainer = {
  opacity: "0.90",
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
