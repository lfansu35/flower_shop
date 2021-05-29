const User = require('../model/userModel')
const express = require('express')
const router = express.Router()

router.post('/login', async function(req, res) {

    let usr_nom = req.body.username;
    let mdp = req.body.password;

    //if user try to sign in without login and password
    if (usr_nom === "" && mdp === "") {
        res.render('identify.ejs');
        return
    }

    let user = await User.getUser(usr_nom, mdp);

    //if user sign in with wrong login or password
    if (user === null || user === undefined) {
        res.render('server_red.ejs', { v_nom: usr_nom });
    } else {
        req.session.loggedin = true;
        req.session.usr_nom = usr_nom;
        req.session.user_id = user.id_user
        console.log('New connection : ', usr_nom, user.id_user);
        if (user.is_employee == 1) {
            res.redirect('/accueil_employee');
        } else {
            res.redirect('/accueil_client');
        }
    }
    res.end();
});

router.get('/logout', async function(req, res) {
    res.redirect('/');
})

module.exports = router;