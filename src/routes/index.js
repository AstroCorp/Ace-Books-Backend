const { Router } = require('express');
const router = Router();

router.get('/api', (req, res) => {
    res.render('index');
});

router.get('/api/test', (req, res) => {
    const db = req.app.get('db');

    db.query("SELECT * FROM test", function (err, result, fields) {
        if(err)
        {
            res.status(500).send(err);
        }

        res.send(result);
    });
});

router.post('/api/register', (req, res) => {
    const { email, password } = req.body;
    
    req.session.user_data = { email, password };
    
    res.status(200).send({
        message: "¡Usuario registrado con éxito!"
    });
});

router.get('/api/profile', (req, res) => 
{
    const user = req.session.user_data;

    res.status(200).send({
        user
    });
});

router.get('/api/logout', (req, res) => {
    delete req.session.user_data;

    res.status(200).send({
        message: "¡Sesión cerrada!"
    });
})

module.exports = router;