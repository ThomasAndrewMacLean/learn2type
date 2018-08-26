import { setWord, resetCounter } from './game';
import { setupNavigation } from './navigation';
let typedWord;
let canSendHighScore = false;
let currentWord;
let gameIsOver;
let currentTime;
let startTime;
let score = 0;
const url = 'https://c4sf7djhcl.execute-api.eu-west-1.amazonaws.com/latest';
setupNavigation();

document.getElementById('setHighScoreButton').addEventListener('click', e => {
    e.preventDefault();
    if (!canSendHighScore) {
        return;
    }
    canSendHighScore = false;
    const name = document.getElementById('inputName').value;
    console.log(name);

    fetch(url + '/highscore', {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },

        method: 'POST',
        body: JSON.stringify({
            name: name,
            score: score
        })
    });
    document.getElementById('start').classList.remove('hide');
    document.getElementById('setHighScore').classList.remove('show');
});

export const stopGame = () => {
    gameIsOver = true;
    document.getElementById('start').classList.remove('hide');
    document.getElementById('inputId').innerText = '';
    resetCounter();

    canSendHighScore = false;
};
const setNewWord = () => {
    typedWord = '';
    currentWord = setWord();

    if (!currentWord) {
        gameIsOver = true;
        canSendHighScore = true;
        document.getElementById('setHighScore').classList.add('show');
        document.getElementById('timer').innerText = 0;

        setTimeout(() => {
            document.getElementById('inputName').focus();
        }, 300);
    }
};
document.getElementById('startTypingButton').addEventListener('click', () => {
    document.getElementById('start').classList.add('hide');
    startGame();
});

const startGame = () => {
    score = 0;
    resetCounter();
    setNewWord();
    gameIsOver = false;
    startTime = new Date().getTime();
    setScore(0);
    gameLoop();
};

const setNextWord = () => {
    setScore(-5);
    document.getElementById('inputId').innerText = '';

    startTime = new Date().getTime();
    setNewWord();
};

const setTimer = () => {
    if (gameIsOver) {
        return;
    }
    currentTime = new Date().getTime();
    const numberOfSecondsPassed =
    (localStorage.getItem('numberOfSeconds') || 5) -
    Math.floor((currentTime - startTime) / 1000);

    if (numberOfSecondsPassed < 1) {
        setNextWord();
    } else {
        document.getElementById('timer').innerText = numberOfSecondsPassed;
    }
};

const setScore = points => {
    document.getElementById('score').innerText = Math.floor((score += points));
};

const gameLoop = () => {
    window.requestAnimationFrame(gameLoop);
    setTimer();
};

document.addEventListener(
    'keydown',
    e => {
        if (gameIsOver) {
            return;
        }
        //check if key is a letter
        if (e.key.length === 1) {
            typedWord += e.key;
            if (currentWord[typedWord.length - 1] === e.key) {
                setScore(1);
            } else {
                typedWord = '';
                setScore(-1);
            }
        } else if (['Backspace', 'Enter', 'Escape'].includes(e.key)) {
            setScore(-2);
        } else {
            return;
        }

        if (typedWord === currentWord) {
            setScore(1.5 * (5 - (currentTime - startTime) / 1000));
            startTime = new Date().getTime();
            setNewWord();
        }

        document.getElementById('inputId').innerText = typedWord;
    },
    true
);
