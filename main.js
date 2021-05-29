/*----------Require---------*/
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const routesAuth = require('./src/routes/authentificationRoute');
const routesPage = require('./src/routes/pageRoute');
const routesBouquet = require('./src/routes/bouquetRoute');
const User = require('./src/model/userModel')
const routesPanier = require('./src/routes/panierRoute');
const server = express();

//Embedded Javascript
server.set('view engine', 'ejs');


/*----------Rendre le repertoire accessible par le serveur express---------*/
server.use(express.static('public/js'));
server.use(express.static('public/css'));
server.use(express.static('public/image'));
server.use(express.static('public/src'));
server.use(express.static('public/html'));


server.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));


server.use(express.json());
server.use(express.urlencoded({ extended: true }));
//server.use(bodyParser.urlencoded({ extended: true }));
//server.use(bodyParser.json());

/*-----login : utilisateur ou employee-----*/
server.use('', routesAuth);

/*-----get('routes') : tous les routes PAGE -----*/
server.use('', routesPage);

/*-----get('routes') : tous les routes PAGE -----*/
server.use('', routesPanier);

server.use('', routesBouquet)


//default route
server.get('/', async function(req, res) {
    req.session.destroy(); /* make sur there's no session connect*/
    res.sendFile(path.join(__dirname + '/main.html'));
});


server.listen(8080, 'localhost');
console.log('Server connected on 8080');