import { words } from './words';

let counter = 0;

export const setWord = () => {
    const newWord = words[counter].word;
    document.getElementById('wordId').innerText = newWord;
    counter++;
    return newWord;
};
