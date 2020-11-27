import Board from './board';
import SquareFunctions from "./square"
import { Square, PieceType } from "chess.js"


export enum States {
    PRE_GAME,
    COUNTDOWN,
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

    square: Square | null;
    pieceForSquare: PieceType | null;

    constructor() {
        this.board = new Board();
        this.currentState = States.PRE_GAME;
        this.level = 0;
        this.score = 0;

        // question square & piece that can reach it is assigned after game 
        // is already setup
        this.square = null;
        this.pieceForSquare = null;
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

    /** Chooses a singular square and the piece that can reach it. */
    startGame() {
        const squares = this.board.getSingularSquares();
        this.square = squares[Math.round(Math.random() * squares.length)];

        this.pieceForSquare = this.board.getPieceThatReachesSquare(this.square);
    }
}