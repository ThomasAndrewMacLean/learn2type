import { setWord } from './game';
import { setupNavigation } from './navigation';
let typedWord;
let currentWord;

setupNavigation();

const setNewWord = () => {
    typedWord = '';
    currentWord = setWord();
};

setNewWord();

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
            setNewWord();
        }

        document.getElementById('inputId').innerText = typedWord;
    },
    true
);
