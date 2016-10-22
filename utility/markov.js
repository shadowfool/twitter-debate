const bluebird = require('bluebird')
const _ = require('lodash');
const fs = require('fs');

//data
const trump = fs.readFileSync('../trumpdump.txt', {encoding: 'utf8'});
const ev = fs.readFileSync('../emily-vuong.txt', {encoding: 'utf8'});
const poetryMash = fs.readFileSync('../poetrymash.txt', {encoding: 'utf8'});
const dw = fs.readFileSync('../dickinson-whitman.txt', {encoding: 'utf8'});



const utility = require('./utility')

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
      }``
     return dictionary;
    };

    this.dictionary = this.readText(inputText);

    this.generateTweet = function(length){
      length = length || 120;
      let words = Object.keys(this.dictionary),
      firstWord = words[Math.floor(Math.random()* words.length)],
      tweet = [];
      tweet.push(firstWord);
      length = length - firstWord.length;
      while(length >= 0){
        let lastWord = this.dictionary[tweet[tweet.length - 1]];
        let nextWord = this.chooseNextWord(lastWord);
        if(length - nextWord < 0){
          break;
        }
        else{
         tweet.push(nextWord);
         length = length - nextWord.length;
        }
      }
      return tweet.join(' ');
    };
    this.chooseNextWord = function(lastWord){
      var keys = Object.keys(lastWord);
      var values = _.map(keys, (key) => lastWord[key]);
      return utility.weightedRandomElement(keys, values);
    }
  }
};

let test = new module.exports.MarkovTweets(dw, 1)
console.log(test.generateTweet(500));

// TODO VARIENTS OF A SPECIFIC  WORD. with a period? with a comma?