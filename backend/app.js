const ApiBuilder = require('claudia-api-builder');
const fetch = require('node-fetch');
const api = new ApiBuilder();
const url = 'https://od-api.oxforddictionaries.com/api/v1/wordlist/en/';

api.get('/ping', () => {
    return 'pong';
});

api.get('/words', () => {
    //TODO check origin

    console.log('STARTING WORDS');

    return fetch(`${url}lexicalCategory=noun,adjective;domains=art`, {
        method: 'GET', // or 'PUT'
        headers: {
            Accept: 'application/json',
            app_id: process.env.app_id,
            app_key: process.env.app_key
        }
    }).then(response =>
        response.json().then(result => {
            console.log('GOT RESPONSE');
            console.log(result);

            return result;
        })
    );
});

module.exports = api;
