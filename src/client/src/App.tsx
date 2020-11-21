import React from 'react';
import logo from './logo.svg';
import './App.css';

import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js';
import Game from './components/Game';

class App extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      // game: new Game()
    }
  }

  componentDidMount() {
    // this.setState({
    //   board: Chessboard('chess-board', 'start')
    // });

  }

  render() {
    return (
      <Game />
    );
  }

}

export default App;
