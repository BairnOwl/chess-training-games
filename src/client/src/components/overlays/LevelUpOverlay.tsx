import React from 'react';
import { Button } from '@material-ui/core';
import PieceMap from "../pieces";
import OverlayStyle from "./Style"


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
      <div style={OverlayStyle} className="level-up">
        <h2>{title}</h2>
        <img src={imageSource} alt={imageAlt} height={imageHeight} />
        <h3>New Piece:</h3>
        <div className="new-piece">
          {PieceMap.get(newPiece)}
          <h4>{" on "}{newSquare.toUpperCase()}</h4>
        </div>
        <Button variant="contained" color="primary" onClick={this.props.gameHandler} disableElevation>{buttonText}</Button>
      </div>
    );
  }

}
