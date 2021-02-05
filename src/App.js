import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from 'react';
import {getRandomCode, getError, getResults, win} from "./game";
import 'lodash';
import 'bootstrap';

// Displayed if the player loses
function YouLost({reset}) {
    return (
        <div className="App">
            <div className="container">
                <h1>Loser!</h1>
                <p>
                    <button className="btn-info" onClick={reset}>
                        New Game
                    </button>
                </p>
            </div>
        </div>
    );
}

// Displayed if the player wins
function YouWon({reset}) {
    return (
        <div className="App">
            <div className="container">
                <h1>Congrats! You Won! :)</h1>
                <p>
                    <button className="btn-info" onClick={reset}>
                        New Game
                    </button>
                </p>
            </div>
        </div>
    );
}

function App() {

    // Game state
    const [state, setState] = useState({
        code: getRandomCode(),
        guesses: [],
        dispError: ""
    })

    // Control state for input
    const [number, setNumber] = useState("");

    let w = win(state.guesses, state.code);
    let results = getResults(state.guesses, state.code);
    let e = getError(number, state.guesses);
    let indices = [1, 2, 3, 4, 5, 6, 7, 8];

    // verifies valid guess and then updates game state based on a user guess
    function guess() {
        console.log(state.code)
        let n = number;
        setNumber("");

        let newGuesses = state.guesses;
        if (e === "") {
            newGuesses = newGuesses.concat(n);
        }
        setState({code: state.code, guesses: newGuesses, dispError: e});
    }

    // resets game state to starting state
    function newGame() {
        setState({code: getRandomCode(), guesses: [], dispError: ""});
    }

    //mostly from "updateText" in lecture notes for Hangman
    function updateNumber(ev) {
        let val = ev.target.value;
        if (val.length > 4) {
            val = val.slice(0, 4);
        }
        setNumber(val);
    }

    // From lecture notes for Hangman
    function keyUp(ev) {
        if (ev.key === "Enter") {
            guess();
        }
    }

    // If the use has won, change the displayed component
    if (w) {
        return <YouWon reset={newGame}/>;
    }

    // From lecture notes for Hangman
    if (state.guesses.length >= 8) {
        return <YouLost reset={newGame}/>
    }

    return (
        <div className="App">
            <div className="container">
                <h1>4Digit Game!</h1><br/>
                <p>
                    <button className="btn-info" onClick={newGame}>New Game</button>
                    <br/><br/>
                </p>
                <div className="centered">
                    <p>Try to guess the secret code! Make a guess, you have eight tries to figure it out!</p>
                    <p>Bulls are right numbers in the right place. Cows are right numbers in the wrong place.</p>
                    <br/><br/>
                </div>
                <div className="row">
                    <div className="col-sm-4"></div>
                    <div className="col">
                        <p>Enter 4 digits to make a guess:</p>
                        <input type="text" value={number} onChange={updateNumber} onKeyUp={keyUp}/>
                        <button className="btn-info" onClick={guess}>Guess!</button>
                        <p>{state.dispError}</p>
                    </div>
                    <div className="col-sm-1">
                        <div className="new-line">
                            {indices.join("\n")}
                        </div>
                    </div>
                    <div className="col-sm-1">
                        <div className="new-line">
                            {state.guesses.join("\n")}
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <div className="new-line">
                            {results.join('\n')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
