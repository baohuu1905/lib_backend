"use strict";

var _user = _interopRequireDefault(require("../controllers/user"));
var _auth = _interopRequireDefault(require("../controllers/auth"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// const router = require('express').Router()

// app.use('/', (req, res) => {
//     res.send('Hello World!');
// })

// module.exports = router

var initRouter = function initRouter(app) {
  app.use('/api/v1/user', Users);
  app.use('/api/v1/auth', _auth["default"]);
  return app.use('/', function (req, res) {
    return res.send('sever on');
  });
};
module.exports = initRouter;