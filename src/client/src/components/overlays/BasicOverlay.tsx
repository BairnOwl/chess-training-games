import React from 'react';


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
      <div style={boardsContainer}>
        <h2>{title}</h2>
        <p>{text}</p>
        <button onClick={this.props.gameHandler}>{buttonText}</button>
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
