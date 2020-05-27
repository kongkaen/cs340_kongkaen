var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_kongkaen',
  password        : '0873',
  database        : 'cs340_kongkaen'
});
module.exports.pool = pool;
