require('dotenv').config();
const Twit = require('twit');
const TwitterBot = new Twit({
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const tweet = () => {
    TwitterBot.post('statuses/update', { status: 'Whats up yall botted this acc. I <3 programming. #nodejs' }, function(err, data, response) {
        console.log(data, 'tweet successful');
    });
}

tweet();