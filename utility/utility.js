let _ = require('lodash')

module.exports = {
  random: (min, max) => {
     return Math.random() * (max - min) + min;
  },
  weightedRandomElement: (list, weight) => {
    var total_weight = weight.reduce((prev, cur, i, arr) => {
        return prev + cur;
    });
     
    var random_num = module.exports.random(0, total_weight);
    var weight_sum = 0;
     
    for (var i = 0; i < list.length; i++) {
        weight_sum += weight[i];
        weight_sum = +weight_sum.toFixed(2);
         
        if (random_num <= weight_sum) {
            return list[i];
        }
    }
  }
}