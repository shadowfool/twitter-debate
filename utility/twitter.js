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
  }
};
