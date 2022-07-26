require('dotenv').config();
const twit = require('./twit');
const fs = require('fs');
const path = require('path');

const paramsPath = path.join(__dirname, 'params.json');

const writeParams = (data) => {
    console.log('Writing params......');
    return(fs.writeFileSync(paramsPath, JSON.stringify(data)));
}

const readParams = () => {
    console.log('Reading params......');
    const data = fs.readFileSync(paramsPath);
    return JSON.parse(data.toString());
}

const getTweets = (since_id) => {
    return new Promise((resolve, reject) => {
        let params = {
            q: '#shrooms',
            count: 10,
        };

        if(since_id){
            params.since_id = since_id;
        }

        twit.get('search/tweets', params, (err, data) => {
            if(err){
                return reject(err);
            }
            return resolve(data);
        });
    });
}

const postRetweet = (id) => {
    return new Promise((resolve, reject) => {
        let params = {
            id,
        };

        twit.post('statuses/retweet/:id', params, (err, data) => {
            if(err){
                return reject(err);
            }
            return resolve(data);
        });
    });
}

async function main() {
    try {
        const params = readParams();
        const data = await getTweets(params.since_id);
        const tweets = data.statuses;
        console.log('caught a tweety bird');

        for await (let tweet of tweets){
            try {
                await postRetweet(tweet.id_str);
                console.log('RETWEET WAS SUCCESSFUL YOU ODB');
            } catch (error) {
                console.log('TRY AGAIN LMAO UR RETWEET CODE IS TRASH');
            }
            params.since_id = tweet.id_str;
        }
        writeParams(params);
    } catch (error) {
        console.error(error);
    }
}

console.log('starting tha twitter bot');

setInterval(main, 10000);