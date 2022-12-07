const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'trabalho_sa'
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