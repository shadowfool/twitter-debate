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
    this.readWords = function(inputText){
      let n = this.n
      let words = this.splitText(inputText);
      let wordCollection = {};
        for(let i = 0; i < words.length - n; i++){
          let word = words.slice(i, i + n).join(' ');
          let nextWord = words.slice(i + n, i + n + 1).join(' ');
          if(!wordCollection[word]){
            wordCollection[word] = {};
          }
          if(!wordCollection[word][nextWord]){
            wordCollection[word][nextWord] = 0;
          }
          wordCollection[word][nextWord] = wordCollection[word][nextWord] + 1;
        }
     return wordCollection;
    };

    this.sentanceParse = function(imputText){

    }

    this.dictionary = {};
    this.dictionary.words = this.readWords(inputText);

    this.generateTweet = function(length){
      length = length || 120;

      let words = Object.keys(this.dictionary.words),
      firstWord = words[Math.floor(Math.random()* words.length)];
      
      tweet = [];
      tweet.push(firstWord);

      length = length - firstWord.length;
      while(length >= 0){
        let lastWords = this.dictionary.words[tweet[tweet.length - 1]];
        let nextWords = this.chooseNextWord(lastWords);
        if(length - nextWords < 0){
          break;
        }
        if(this.n === 1){
          tweet.push(nextWords)
          length = length - nextWords.length;
        }
        else {
          let oldChain = tweet[tweet.length - 1].split(' ').slice(-(this.n - 1));
          let modifiedLast = tweet[tweet.length - 1].split(' ')
          modifiedLast.splice(-(this.n - 1));
          tweet[tweet.length - 1] = modifiedLast;
          oldChain.push(nextWords)
          oldChain = oldChain.join(' ');
          tweet.push(oldChain)
          length = length - nextWords.length;

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

let test = new module.exports.MarkovTweets(poetryMash, 2)
console.log(test.dictionary.words)
console.log(test.generateTweet(500));