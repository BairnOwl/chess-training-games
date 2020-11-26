import React from 'react';


interface OverlayProps {
  seconds: number // how long the countdown should be
  gameHandler: any
}

interface OverlayState {
}

export default class Countdown extends React.Component<OverlayProps, OverlayState> {

  render() {
    const { seconds } = this.props;

    return (
      <div style={boardsContainer}>
        <h1>{seconds}</h1>
      </div>
    );
  }

}

const boardsContainer = {
  background: "transparent",
  display: "flex",
  position: "absolute",
  top: 0,
  left: "center",
  justifyContent: "space-around",
  alignItems: "center",
  flexWrap: "wrap",
  zIndex: 10,
  width: "20vw",
  marginTop: "10rem",
  padding: 30,
} as React.CSSProperties;
