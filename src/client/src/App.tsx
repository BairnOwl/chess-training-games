import React from 'react';
import logo from './logo.svg';
import './App.css';

import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js';

class App extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      boardPosition: 'start'
    }
  }

  componentDidMount() {
    // this.setState({
    //   board: Chessboard('chess-board', 'start')
    // });
  }

  render() {
    return (
      <Chessboard position="{this.state.boardPosition}" />
    );
  }

}

export default App;
