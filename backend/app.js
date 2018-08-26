const ApiBuilder = require('claudia-api-builder');
const fetch = require('node-fetch');
const AWS = require('aws-sdk');

const api = new ApiBuilder();
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const url = 'https://od-api.oxforddictionaries.com/api/v1/wordlist/en/';

/**
 * @api {get} /ping Test server
 * @apiName GetPing
 * @apiGroup Learn2Type
 * @apiVersion 1.0.0
 *
 * @apiSuccess {String} pong Always returns pong
 */
api.get('/ping', () => {
    return 'pong';
});

/**
 * @api {get} /words Test server
 * @apiName GetWords
 * @apiGroup Learn2Type
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Object[]} words Return list of words
 */
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

/**
 * @api {post} /highscore Test server
 * @apiName PostHighscore
 * @apiGroup Learn2Type
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} Accept application/json
 * @apiHeader {String} Content-Type application/json
 *
 * @apiParam {Number} score     Mandatory score.
 * @apiParam {String} name     Mandatory name.
 *
 * @apiSuccess (201) {String} success Created if successful
 */
api.post(
    '/highscore',
    function(request) {
        const params = {
            TableName: 'topScoreLearn2Type',
            Item: {
                id: Date.now().toString(),
                score: request.body.score,
                name: request.body.name
            }
        };
        return dynamoDb.put(params).promise();
    },
    { success: 201 }
); // returns HTTP status 201 - Created if successful

/**
 * @api {get} /highscores Test server
 * @apiName GetHighscores
 * @apiGroup Learn2Type
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Object[]} highscores List of highscoreObjects
 */
api.get('/highscores', () => {
    // GET all users
    return dynamoDb
        .scan({ TableName: 'topScoreLearn2Type' })
        .promise()
        .then(response => response.Items);
});
module.exports = api;
