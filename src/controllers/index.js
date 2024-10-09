const controllers = require('require-all')({
    dirname: 'E:/node_js/buoi5/src/controllers',
    filter: /^(?!.*\.test\.js$).*\.js$/
  });
  
  module.exports = controllers;

export * from './auth'
export * from './user'
export * from './insert'
export * from './book'