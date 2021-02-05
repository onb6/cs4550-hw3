// a method that generates a random 4 digit code where all digits are unique
export function getRandomCode() {
    let ints = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    // eslint-disable-next-line no-undef
    let four = _.shuffle(ints).slice(0, 4);
    let code = four.join('');
    return code;
}

// based on the guess and the previous guesses, determines whether it is a valid guess, and returns an error if not
export function getError(g, guesses) {
    if (isNaN(g)) {
        return "Please input a number";
    } else if (g.length < 4) {
        return "Please input 4 digits";
    } else if (!areDigitsUnique(g)) {
        return "Four digits must be unique";
    } else if (guesses.includes(g)) {
        return "You already guessed that!";
    } else {
        return "";
    }
}

// determines whether or not all the digits in a number are unique
function areDigitsUnique(x) {
    return (new Set(x.toString().split(''))).size === x.length;
}

// creates the list of results based on the list of guesses and the code
export function getResults(guesses, code) {
    let res = [];
    if (guesses) {
        // eslint-disable-next-line no-undef
        res = _.map(guesses, guess => getOneResult(guess, code));
    }
    return res;
}

// gets the results of a guess when compared to the code (# of bulls and cows)
function getOneResult(guess, code) {
        let b = 0;
        for (let i = 0; i < 4; i++) {
            if (guess.charAt(i) === code.charAt(i)) {
                b += 1;
            }
        }
        let str = guess + code;
        let c = (8 - new Set(str.split('')).size) - b;
        return "Bulls: " + b + ", Cows: " + c;
}

// has the user won?
export function win(guesses, code) {
    return guesses.includes(code);
}