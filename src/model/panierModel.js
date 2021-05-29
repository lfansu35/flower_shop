// const mysql = require('mysql2/promise');
const conn = require('../config/db_async.js').pool


async function setStatus(idStatus, idCommande) {
    console.log('setStatus', idStatus, idCommande)
    const query = 'UPDATE commandes SET id_etat=? WHERE id_commande=?'
    const data = [idStatus, idCommande]
    const res2 = await conn.query(query, data)
    console.log("UPDATE", res2);
}


async function addBouquetPerso(v_nom, nameBouquet, idAddFleur, nombreFleur) {
    console.log("addPerson", nameBouquet);
    console.log("addPerson", idAddFleur);
    console.log("addPerson", nombreFleur);
    conn.query(`INSERT INTO BOUQUET (nom_bouquet,id_createur, photo_url, predefini) VALUES ( "${nameBouquet}" , (SELECT id_user FROM user WHERE login_user="${v_nom}"), NULL , false );`)
        .then((res) => {
            let idBouquet = res[0].insertId
            for (i = 0; i < idAddFleur.length; i++) {
                if (nombreFleur[i] > 0) {
                    let id_flower = idAddFleur[i]
                    let quantity = nombreFleur[i]
                    conn.query(`INSERT INTO composition (id_bouquet, id_flower, quantity) VALUES (${idBouquet}, ${id_flower}, ${quantity})`)
                }
            }
        })
}

async function addBouquet(v_nom, idAddBouquet, nombreBouquet) {
    const query = `INSERT INTO commandes(id_user, id_bouquet, quantity, id_etat, create_date) VALUES((select id_user from user where login_user ="${v_nom}"), ${idAddBouquet}, ${nombreBouquet}, 0, now())`
        // const data = [v_nom, idAddBouquet, nombreBouquet]
        // console.log("DATA addBouquet", data);
    conn.query(query).then((res) => {
        console.log(res)
    })
}


async function getFlowerList() {
    const query = `SELECT * FROM flower`
    const res = await conn.query(query)
    return res[0]
}

async function getPanierList(userName) {
    const query = `SELECT u.login_user, u.id_user, c.id_commande, b.nom_bouquet, b.photo_url, GROUP_CONCAT(CONCAT( cc.quantity, '*', f.nom_flower) separator '<br/>') composition , c.quantity , sum(cc.quantity  * f.prix_flower ) prix_unitaire, sum(c.quantity  * f.prix_flower * cc.quantity ) prix_total  FROM user as u, commandes as c, bouquet as b ,composition as cc , flower f WHERE u.id_user = c.id_user  AND c.id_bouquet = b.id_bouquet AND b.id_bouquet = cc.id_bouquet AND cc.id_flower = f.id_flower and c.id_etat = 0 and u.login_user = "${userName}" GROUP BY u.login_user, u.id_user, c.id_commande, b.nom_bouquet, b.photo_url, c.quantity ORDER BY id_commande DESC`
    const res = await conn.query(query)
    console.log(userName);
    return res[0]
}


async function getHistoryList(userName) {
    const query = `SELECT date_format(c.create_date, \" %D %b %Y %H:%i:%s\") create_date, u.login_user, u.id_user, c.id_commande, e.etat, b.nom_bouquet, b.photo_url, c.quantity , sum(cc.quantity  * f.prix_flower ) prix_unitaire, sum(c.quantity  * f.prix_flower * cc.quantity ) prix_total  FROM user as u, commandes as c, etat as e, bouquet as b ,composition as cc , flower f WHERE u.id_user = c.id_user AND c.id_etat=e.id_etat AND c.id_bouquet = b.id_bouquet AND b.id_bouquet = cc.id_bouquet AND cc.id_flower = f.id_flower and u.login_user = "${userName}" AND e.id_etat != 0 GROUP BY u.login_user, u.id_user, c.id_commande, b.nom_bouquet, b.photo_url, c.quantity ORDER BY id_commande DESC`
    const res = await conn.query(query)
    return res[0]
}

async function getPrice(idBouquet) {
    // console.log('getPrice', idBouquet)
    const query = 'SELECT sum(f.prix_flower * c.quantity) as price  from flower as f, composition as c where f.id_flower = c.id_flower and id_bouquet = ?'
    const data = [idBouquet]
    const res2 = await conn.query(query, data)
    const price = res2[0][0].price;
    // console.log("get price id bouquet", idBouquet, "->", price)

    return price
}

async function getTotalPrice(v_nom) {
    const query = `With TotalPrice AS
    (SELECT u.login_user, u.id_user, c.id_commande, b.nom_bouquet, b.photo_url, GROUP_CONCAT(CONCAT(cc.quantity, '*', f.nom_flower) separator ', ') composition , c.quantity , sum(cc.quantity  * f.prix_flower ) prix_unitaire, sum(c.quantity  * f.prix_flower * cc.quantity ) prix_total  FROM user as u, commandes as c, bouquet as b ,composition as cc , flower f WHERE u.id_user = c.id_user  AND c.id_bouquet = b.id_bouquet AND b.id_bouquet = cc.id_bouquet AND cc.id_flower = f.id_flower and c.id_etat = 0 and u.login_user = ? GROUP BY u.login_user, u.id_user, c.id_commande, b.nom_bouquet, b.photo_url, c.quantity ORDER BY id_commande DESC) SELECT SUM(prix_total) FROM TotalPrice;`
    const data = [v_nom]
    const res = await conn.query(query, data)
    return res[0][0]
}


async function validePanier(v_nom) {
    const query = 'UPDATE commandes SET id_etat = CASE WHEN id_bouquet in (select id_bouquet from bouquet where predefini = false) then 1 WHEN id_bouquet in (select id_bouquet from bouquet where predefini = true) then 2 END WHERE id_etat = 0 AND  id_user = ( select id_user from user where login_user = ?)'
    const data = [v_nom]
    const res2 = await conn.query(query, data)
    console.log("Valide", res2);
}

async function supprimeCommandes(v_nom, idCommande) {
    const query = 'DELETE FROM commandes WHERE id_user in (select id_user from user where login_user = ?) AND id_commande = ?'
    const data = [v_nom, idCommande]
    const res2 = await conn.query(query, data)
    console.log("Valide", res2);
}




module.exports = {
    setStatus,
    getPrice,
    validePanier,
    supprimeCommandes,
    addBouquet,
    addBouquetPerso,
    getTotalPrice,
    getPanierList,
    getHistoryList,
    getFlowerList
}