import Board from './board';
import SquareFunctions from "./square"


export enum States {
    PRE_GAME,
    PLAY,
    GAME_OVER,
}

export default class GameState {
    readonly QUESTIONS_PER_LEVEL = 5;
    readonly MAX_LEVEL = 5;
    // for every level add the corresponding piece to the board
    readonly LEVELS = {
        1: "b",// Bishop
        2: "k",// Knight
        3: "r",// Rook
        4: "k",// King
        5: "q", // Queen    
    }

    board: Board;
    currentState: States;
    level: number;
    score: number;

    constructor() {
        this.board = new Board();
        this.currentState = States.PRE_GAME;
        this.level = 0;
        this.score = 0;
    }

    /** Reset board and set 2 initial pieces */
    setupPreGame() {
        this.currentState = States.PRE_GAME;
        this.level = 0;
        this.board.reset();

        // Compute initial piece positions
        let num1 = Math.floor(Math.random() * 64);
        let num2: number;

        do {
            num2 = Math.floor(Math.random() * 64);
        } while (num1 === num2)

        this.board.addPiece('n', SquareFunctions.fromIndex(num1));
        this.board.addPiece('b', SquareFunctions.fromIndex(num2));
    }
}