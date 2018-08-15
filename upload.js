if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}
const fs = require('fs');
const NeoCities = require('neocities');

const api = new NeoCities('learn2type', process.env.NEO_PW);

const cssFile = fs.readdirSync('dist').find(files => files.includes('.css'));
const jsFile = fs.readdirSync('dist').find(files => files.includes('.js'));

api.upload(
    [
        { name: 'index.html', path: 'dist/index.html' },
        { name: cssFile, path: 'dist/' + cssFile },
        { name: jsFile, path: 'dist/' + jsFile }
    ],
    function(resp) {
        console.log(resp);
    }
);
