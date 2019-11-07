const mysql = require('mysql');
const config = require('./config.json');

const database = mysql.createConnection({
    host: config.host,
    user: config.username,
    password: config.password,
    database: config.database
});

database.connect(function(err) {
    if(err)
    {
        res.status(500).send(err);
    }

    console.log("¡Conexión con la base de datos establecida!");
});

module.exports = database;