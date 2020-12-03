import React from 'react';


interface OverlayProps {
  seconds: number // how long the countdown should be
  gameHandler: any
}

interface OverlayState {
  seconds: number // current amount of seconds remaining
}

export default class Countdown extends React.Component<OverlayProps, OverlayState> {
  interval: any;

  constructor(props: any) {
    super(props)
    this.state = {
      seconds: this.props.seconds
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    let newSeconds = this.state.seconds - 1;
    
    if (newSeconds > 0) {
      this.setState({ seconds: newSeconds });
    } else {
      this.props.gameHandler();
    }
  }

  render() {
    const { seconds } = this.state;

    return (
      <div style={boardsContainer}>
        <h1>{seconds}</h1>
      </div>
    );
  }

}

const boardsContainer = {
  fontSize: "220%",
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
