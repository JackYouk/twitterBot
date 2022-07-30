const rwClient = require('./twitterClient');

const tweet = async () => {
    try {
        await rwClient.tweets.createTweet({
            // The text of the Tweet
            text: "Finally got this thang workin",
      
            // Options for a Tweet with a poll
            // poll: {
            //   options: ["Yes", "Maybe", "No"],
            //   duration_minutes: 120,
            // },
          });
    } catch (error) {
        console.error(error);
    }
}

tweet();

// ugggghghghgghhgh