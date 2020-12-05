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
  justifyContent: "space-around",
  alignItems: "center",
  flexWrap: "wrap",
  zIndex: 2,
  width: "20vw",
  padding: "30px",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
} as React.CSSProperties;
