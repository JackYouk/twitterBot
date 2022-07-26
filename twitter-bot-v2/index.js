const rwClient = require('./twitterClient');

const tweet = async () => {
    try {
        await rwClient.v1.tweet('Good morning');
    } catch (error) {
        console.log(error);
    }
}

tweet();