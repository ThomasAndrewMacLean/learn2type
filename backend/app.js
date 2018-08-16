const ApiBuilder = require('claudia-api-builder');
const fetch = require('node-fetch');
const AWS = require('aws-sdk');

const api = new ApiBuilder();
const dynamoDb = new AWS.DynamoDB.DocumentClient();

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

api.post(
    '/highscore',
    function(request) {
    // SAVE your icecream
        const params = {
            TableName: 'topScoreLearn2Type',
            Item: {
                id: Date.now().toString(),
                score: request.body.score,
                name: request.body.name // your icecream name
            }
        };
        return dynamoDb.put(params).promise(); // returns dynamo result
    },
    { success: 201 }
); // returns HTTP status 201 - Created if successful

api.get('/highscores', () => {
    // GET all users
    return dynamoDb
        .scan({ TableName: 'topScoreLearn2Type' })
        .promise()
        .then(response => response.Items);
});
module.exports = api;
