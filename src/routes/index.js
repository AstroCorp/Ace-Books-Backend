const { Router } = require('express');
const router = Router();
const db = require('../database.js');

router.get('/api', (req, res) => 
{
    res.render('index');
});

router.get('/api/test', (req, res) =>
{
    db.query("SELECT * FROM test", function (err, result, fields)
    {
        if(err)
        {
            res.status(500).send(err);
        }

        res.send(result);
    });
});

router.post('/api/register', (req, res) => 
{
    const { email, password } = req.body;
    
    req.session.user = { email, password };
    
    res.status(200).send(
    {
        message: "¡Usuario registrado con éxito!"
    });
});

router.get('/api/profile', (req, res, next) => 
{
    const user = req.session.user;

    console.log(user)

    res.status(200).send(
    {
        user
    });
});

router.get('/api/logout', (req, res) =>
{
    delete req.session.user_data;

    res.status(200).send(
    {
        message: "¡Sesión cerrada!"
    });
})

module.exports = router;