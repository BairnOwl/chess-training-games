import Board, { PieceOption } from './board';
import SquareFunctions from "./square"
import { PieceType, Square } from "chess.js"


export enum States {
    PRE_GAME,
    COUNTDOWN,
    PLAY,
    BETWEEN,
    LEVEL_UP,
    GAME_OVER
}

export default class GameState {
    readonly QUESTIONS_PER_LEVEL = 1;
    readonly MAX_LEVEL = 5;
    // for every level add the corresponding piece to the board
    readonly LEVELS = [
        'b',// Bishop
        'n',// Knight
        'r',// Rook
        'k',// King
        'q', // Queen
    ];

    board: Board;
    currentState: States;
    level: number;
    score: number;

    square: Square;
    pieceForSquare: PieceOption;

    constructor() {
        this.board = new Board();
        this.currentState = States.PRE_GAME;
        this.level = 0;
        this.score = 0;

        // question square & piece that can reach it is assigned after game
        // is already setup
        this.square = "" as any;
        this.pieceForSquare = "" as any;

        this.chooseSquareAndPiece = this.chooseSquareAndPiece.bind(this);
        this.updateScore = this.updateScore.bind(this);
        this.generateSquareIndex = this.generateSquareIndex.bind(this);
    }

    /** Reset board and set 2 initial pieces */
    setupPreGame() {
        this.currentState = States.PRE_GAME;
        this.level = 0;
        this.score = 0;
        this.square = "" as any;
        this.pieceForSquare = "" as any;

        this.board.reset();

        // Compute initial piece positions
        let num1 = this.generateSquareIndex();
        let num2: number;

        do {
            num2 = this.generateSquareIndex();
        } while (num1 === num2);

        this.board.addPiece('n', SquareFunctions.fromIndex(num1));
        this.board.addPiece('b', SquareFunctions.fromIndex(num2));
    }

    startGame() {
        this.chooseSquareAndPiece();
    }

    /** Generates the next position of the board by moving the chosen piece. 
        Return true if level up is hit otherwise, false.
    */
    setNextPosition(): boolean {
        this.board.movePiece(this.pieceForSquare, this.square);

        let levelUp = this.updateScore();
        this.chooseSquareAndPiece();

        return levelUp;
    }

    /** Chooses a singular square and the piece that can reach it. */
    chooseSquareAndPiece() {
        const squares = this.board.getSingularSquares();
        const num = Math.floor(Math.random() * squares.length);

        this.square = squares[num];

        try {
            this.pieceForSquare = this.board.getPieceThatReachesSquare(this.square);
        } catch(e) {
            console.log(e);
        }
    }

    /** Updates the score after a correct answer and levels up if necessary. */
    updateScore(): boolean {
        let levelUp = false;
        this.score += 1;

        if (this.score % this.QUESTIONS_PER_LEVEL === 0) {
            console.log('level up');

            let i: number;

            do {
              i = this.generateSquareIndex();
            } while (this.board.isOccupied(SquareFunctions.fromIndex(i)));

            let piece = this.LEVELS[this.level] as PieceType;
            this.level += 1;

            this.board.addPiece(piece, SquareFunctions.fromIndex(i));
            levelUp = true;
        }
        return levelUp;
    }

    generateSquareIndex(): number {
        return Math.floor(Math.random() * 64);
    }
}
