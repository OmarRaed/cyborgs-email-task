const express = require('express');
const mailRouters = require('./lib/routes/mail-routes');
const {connection} = require('./config/mysql-config');

// initialize express application
const app = express();

// JSON parser middleware
app.use(express.json());

connection.connect((err) => {
    if (err) throw err;
    console.log('MySql Database Server Connected!');

    var server = app.listen(3000);
    console.log('NodeJS Server started at port 3000');
});

// apply mail routes
app.use(mailRouters);