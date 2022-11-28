const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'node_luciano_atv_4'
});

const testConnect = () => {
    connection.connect((err) => {
        if(err){
            console.log('Error connecting to Db', err);
            return;
        }
        console.log('Connection established');
    });
}

module.exports = {
    connection,
    testConnect
}