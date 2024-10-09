"use strict";

var getUser = function getUser(req, res) {
  return res.send('user controller');
};
module.exports = {
  getUser: getUser
};