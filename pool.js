var mysql=require('mysql')
var pool=mysql.createPool({
host:'localhost',
port:3306,
user:'root',
password:'123',
database:'webapp',
connectionLimit:100


})

module.exports = pool;