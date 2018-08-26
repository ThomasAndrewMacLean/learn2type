import { words } from './words';

let counter = 0;

export const resetCounter = () => {
    counter = 0;
};

export const setWord = () => {
    if (counter === words.length) {
        return false;
    }
    const newWord = words[counter].word;
    document.getElementById('wordId').innerText = newWord;
    counter++;
    return newWord;
};
