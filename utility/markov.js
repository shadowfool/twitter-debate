const bluebird = require('bluebird')
const _ = require('lodash');
const fs = require('fs');
const trump = fs.readFileSync('../trumpdump.txt', {encoding: 'utf8'});

module.exports = {
  MarkovTweets: function(inputText, n){
    this.n = n || 1;

    this.splitText = function(inputText){
      return inputText.split(/\s+/);
    };
    this.readText = function(inputText){
      let n = this.n
      let words = this.splitText(inputText);
      let dictionary = {};
      for(let i = 0; i < words.length - n; i++){
        if(!dictionary[words.slice(i, i + n).join(' ')]){
          dictionary[words.slice(i, i + n).join(' ')] = {};
        }
        if(!dictionary[words.slice(i, i + n).join(' ')][words[i + n]]){
          dictionary[words.slice(i, i + n).join(' ')][words[i + n]] = 0;
        }
        dictionary[words.slice(i, i + n).join(' ')][words[i + n]] = dictionary[words.slice(i, i + n).join(' ')][words[i + n]] + 1;
      }
     return dictionary;
    };

    this.dictionary = this.readText(inputText);
    this.generateTweet = function(){

    };
  }
};

var test = new module.exports.MarkovTweets(trump, 1)
console.log(test.dictionary)