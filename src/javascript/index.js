import { setWord } from './game';
let typedWord;
let currentWord;

const setNewWord = () => {
    typedWord = '';
    currentWord = setWord();
};

setNewWord();
// fetch('https://si2wuq30eb.execute-api.eu-west-1.amazonaws.com/latest/words')
//     .then(r => {
//         return r.json();
//     })
//     .then(result => {
//         console.log(result.map(r => r.word));
//     });

document.addEventListener(
    'keydown',
    e => {
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
