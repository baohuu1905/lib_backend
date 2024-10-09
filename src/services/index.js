const sevices = require('require-all')({
    dirname: 'E:/node_js/buoi5/src/services',
    filter: /^(?!.*\.test\.js$).*\.js$/
  });
  
  module.exports = sevices;
  
export * from './user';
export * from './auth';
export * from './insert';
export * from './book'