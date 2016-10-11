const express = require('express');
const app = express();
const path = require('path');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const _ = require('lodash');

require('./routes/api-routes.js')(app);

app.use('/', express.static(path.join(__dirname, '/client/build')));

const Twitter = require('twitter');

const config = {
      "consumer_key": process.env.consumer_key ,
      "consumer_secret": process.env.consumer_secret,
      "access_token_key": process.env.access_token,
      "access_token_secret": process.env.access_token_secret,
}
const twitter = new Twitter(config);


server.listen(4000, () => {
  console.log('listening on port 4000');
});

io.on('connection', function (socket) {
  const stream = twitter.stream('statuses/filter', {track: 'Javascript'});
  const notRT = /(RT)\b/;
  stream.on('data', function(event) {
      // if(!event.text.match(notRT))
        socket.emit('tweet', { event: event, text: event.text });
      console.log(event && event.text);
  });
  stream.on('error', function(error) {
      console.error(error)
  });
});