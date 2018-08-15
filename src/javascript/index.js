let typedWord = '';
document.addEventListener(
    'keyup',
    e => {
        typedWord += e.key;
        document.getElementById('inputId').innerText = typedWord;
    },
    true
);
