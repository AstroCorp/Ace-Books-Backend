const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');

// Settings
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'ace-books',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

app.use((req, res, next) => {
    app.locals.messages = req.flash('success');
    next();
});

app.use(require('./routes/index'));

app.listen(3000);
console.log('Servidor iniciado en el puerto 3000');