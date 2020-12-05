import React from 'react';
import { Button } from '@material-ui/core';
import OverlayStyle from "./Style"


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
      <div style={OverlayStyle} className="game-over transparent-overlay">
        <h2>{title}</h2>
        <img src={imageSource} alt={imageAlt} height={imageHeight} />
        <h3>Score: {score}</h3>
        <Button variant="contained" color="primary" onClick={this.props.gameHandler} disableElevation>{buttonText}</Button>
      </div>
    );
  }

}
