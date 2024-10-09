"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = void 0;
var _index = _interopRequireDefault(require("../models/index"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var register = exports.register = function register() {
  return new Promise(function (resolve, reject) {
    try {
      resolve('register service');
      console.log('after resolve');
    } catch (error) {
      reject(error);
    }
  });
};