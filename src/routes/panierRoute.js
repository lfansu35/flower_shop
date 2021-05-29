const PanierModel = require('../model/panierModel')
const express = require('express')
const router = express.Router()


router.post('/update_bouquet', async function(req, res) {
    const idCommande = req.body.idCommande
    const newIdStatus = req.body.newIdStatus
    const result = await PanierModel.setStatus(newIdStatus, idCommande)
    res.redirect('accueil_employee');
});



router.post('/add_bouquet', async function(req, res) {
    // console.log("add bouquet");
    var v_nom = req.session.usr_nom;
    const idAddBouquet = req.body.idBouquet
    const newBouquet = req.body.nombreBouquet
    const result = await PanierModel.addBouquet(v_nom, newBouquet, idAddBouquet)
    await new Promise(timeout => setTimeout(timeout, 500))
    res.redirect('panier');

})

router.post('/add_flower', async function(req, res) {
    console.log('in add flower`')
    var v_nom = req.session.usr_nom;
    const idAddFleur = req.body.idFleur
    const nbFleur = req.body.nbFleur
    const nameBouquet = req.body.nameBouquet
    const result = await PanierModel.addBouquetPerso(v_nom, nameBouquet, idAddFleur, nbFleur)
    await new Promise(timeout => setTimeout(timeout, 500))
    res.redirect('personnalise');
})

router.post('/valide_panier', async function(req, res) {
    var v_nom = req.session.usr_nom;
    const result = await PanierModel.validePanier(v_nom)
    res.redirect('history');
});

router.post('/commande_delete', async function(req, res) {
    const idCommande = req.body.idCommande;
    console.log("idCommande", idCommande);
    var v_nom = req.session.usr_nom;
    const result = await PanierModel.supprimeCommandes(v_nom, idCommande)
    res.redirect('panier');
});


module.exports = router;