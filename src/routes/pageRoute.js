const express = require('express');
const router = express.Router();
const pm = require('../model/panierModel');
const bm = require('../model/bouquetModel')
const commandes = require('../model/commandeModel');
const middleware = require('../middleware/admin')

/*-----page d'accueil employee----*/
router.get('/accueil_employee', middleware.admin_only, async function(req, res) {
    var v_nom = req.session.usr_nom;
    if (req.session.loggedin) {

        //get the information of the employee
        const data = await commandes.getEmploye();

        for (let i = 0; i < data.length; ++i) {
            const price = await pm.getPrice(data[i].id_bouquet)
            data[i].price = price
        }
        console.log(data)
        res.render('accueil_employee.ejs', {
            title: ' Liste de paniers',
            employeeData: data,
            v_nom: v_nom
        });

    } else {
        res.render('identify.ejs');
    }
});

/*-----page d'accueil client----*/
router.get('/accueil_client', function(req, res) {
    var v_nom = req.session.usr_nom;
    if (req.session.loggedin) {
        res.render('accueil_client.ejs', { v_nom: v_nom });
    } else {
        res.render('identify.ejs');
    }
    res.end();
});

/*-----page d'achat bouquet----*/
router.get('/bouquet', async function(req, res, next) {
    if (req.session.loggedin) {
        let bouquet_list = await bm.GetBouquetList();
        res.render('bouquet-list.ejs', {
            title: ' Liste de Bouquets',
            bouquetData: bouquet_list,
        });
    } else {
        res.render('identify.ejs');
    }

});


/*-----page d'achat flower-list-----*/
router.get('/flower', async function(req, res) {
    if (req.session.loggedin) {
        let flowerList = await pm.getFlowerList();
        res.render('flower-list.ejs', {
            title: ' Liste de fleurs',
            flowerData: flowerList,
        })
    } else {
        res.render('identify.ejs');
    }
});

/*-----page d'achat bouquet personnalise----*/
router.get('/personnalise', async function(req, res, next) {
    let v_nom = req.session.usr_nom;
    if (req.session.loggedin) {
        const customBouquet = await bm.GetCustomBouquet(v_nom)
        res.render('bouquet-perso.ejs', {
            title: ' Liste de Bouquets Personnalise',
            bouquetPersoData: customBouquet,
        });
    } else {
        res.render('identify.ejs');
    }
});

/*-----page de panier-list-clients-----*/
router.get('/panier', async function(req, res) {
    var v_nom = req.session.usr_nom;
    if (req.session.loggedin) {
        const panierList = await pm.getPanierList(v_nom)
        const totalPrice = await pm.getTotalPrice(v_nom)
        const getPrice = totalPrice['SUM(prix_total)']
        res.render('panier-list.ejs', {
            title: ' Liste de paniers',
            panierData: panierList,
            TotalPrice: getPrice
        });
    } else {
        res.render('identify.ejs');
    }
});


/*-----page de history-list-clients-----*/
router.get('/history', async function(req, res) {
    var v_nom = req.session.usr_nom;
    if (req.session.loggedin) {
        const historyList = await pm.getHistoryList(v_nom)
        console.log("historyList=", historyList);

        res.render('history-list.ejs', {
            title: ' Liste de paniers',
            historyData: historyList,
        });
    } else {
        res.render('identify.ejs');
    }
});

module.exports = router;