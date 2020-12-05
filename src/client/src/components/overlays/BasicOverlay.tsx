import React from 'react';
import { Button } from '@material-ui/core';
import OverlayStyle from "./Style"

interface OverlayProps {
  title: string
  text: string
  buttonText: string
  gameHandler: any
}

interface OverlayState {
}

export default class BasicOverlay extends React.Component<OverlayProps, OverlayState> {

  render() {
    const { title, text, buttonText } = this.props;

    return (
      <div className={"transparent-overlay"} style={OverlayStyle}>
        <h2>{title}</h2>
        <p>{text}</p>
        <Button variant="contained" color="primary" onClick={this.props.gameHandler} disableElevation>{buttonText}</Button>
      </div>
    );
  }

}
