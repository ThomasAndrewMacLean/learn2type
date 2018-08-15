if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

const fs = require('fs');
const NeoCities = require('neocities');

const api = new NeoCities('learn2type', process.env.NEO_PW);

const files = fs
    .readdirSync('dist')
    .filter(file => !file.includes('.map'))
    .map(file => {
        return { name: file, path: 'dist/' + file };
    });

api.upload(
    files,
    function(resp) {
        console.log(resp);
    }
);
