const twitterAPI = require('../utility/twitter.js');

module.exports = {

  exampleFunction: (req, res) => {
    console.log(twitterAPI.someFunction)
    res.end(twitterAPI.streamFunction());
  },

  exampleFunctionTwo: (req, res) => {
    res.end('hello world2')
  },
};
