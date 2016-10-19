const Twitter = require('twitter');

const config = {
      "consumer_key": process.env.consumer_key ,
      "consumer_secret": process.env.consumer_secret,
      "access_token_key": process.env.access_token,
      "access_token_secret": process.env.access_token_secret,
}
const twitter = new Twitter(config);

module.exports = {
  streamFunction: function(){
   console.log('hi')
  },
  searchTweets: function(q){
    twitter.get()
  },
  getTweetsFromTimeLine: function(q){
    twitter.get(`statuses/user_timeline`, q, function(error, tweets, response){
      console.log(tweets)
    })
  }
};


var queryTemplate = {
  screen_name: 'realDonaldTrump',
  q:'trump',
  lang: 'en',
  result_type: 'mixed',
  count: 100,
  trim_user: true,
  include_rts: false,
  exclude_replies: true,
}

module.exports.getTweetsFromTimeLine(queryTemplate)