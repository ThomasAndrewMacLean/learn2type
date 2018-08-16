import { setWord } from './game';
import { setupNavigation } from './navigation';
let typedWord;
let currentWord;

setupNavigation();

const setNewWord = () => {
    typedWord = '';
    currentWord = setWord();
};
document.getElementById('startTypingButton').addEventListener('click', () => {
    document.getElementById('start').classList.add('hide');
    startGame();
});

setNewWord();
let gameIsOver;
let currentTime;
let startTime;
let score = 0;
const startGame = () => {
    gameIsOver = false;
    startTime = new Date().getTime();
    setScore(0);
    gameLoop();
};

const setTimer = () => {
    if (gameIsOver) {
        return;
    }
    currentTime = new Date().getTime();
    const numberOfSecondsPassed = Math.floor((currentTime - startTime) / 1000);
    document.getElementById('timer').innerText = numberOfSecondsPassed;
};

const setScore = points => {
    document.getElementById('score').innerText = score += points;
};

const gameLoop = () => {
    window.requestAnimationFrame(gameLoop);
    setTimer();
};

document.addEventListener(
    'keydown',
    e => {
        if (location.hash !== '#/Learn2Type') {
            return;
        }
        //check if key is a letter
        if (e.key.length === 1) {
            typedWord += e.key;
        } else if (['Backspace', 'Enter', 'Escape'].includes(e.key)) {
            typedWord = '';
        } else {
            return;
        }

        if (typedWord === currentWord) {
            setScore(10);
            setNewWord();
        }

        document.getElementById('inputId').innerText = typedWord;
    },
    true
);
