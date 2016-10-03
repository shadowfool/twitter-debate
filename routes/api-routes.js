const controller = require('./../controller/controller.js');

module.exports = (app) => {
  app.get('/api/test', controller.exampleFunction);
  app.get('/api/test2', controller.exampleFunctionTwo);
};
