var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database : 'turbizo'
});

connection.connect(function(err) {
    if (err) throw err;
    else
    console.log('connected');
});

module.exports = connection;