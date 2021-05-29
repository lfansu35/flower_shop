const conn = require('../config/db_async.js').pool


async function getEmploye() {
    const query = `SELECT u.login_user,
                          u.id_user,
                          c.id_commande,
                          b.id_bouquet,
                          b.nom_bouquet,
                          b.photo_url,
                          c.quantity,
                          date_format(c.create_date, "%D %b %Y %H:%i:%s") create_date,
                          e.etat etat_panier,
                          CASE WHEN c.completed = 0 THEN 'NON' ELSE 'OUI'
                          END completed,
                          GROUP_CONCAT(CONCAT(f.photo_url, '*', cc.quantity, '*', f.nom_flower) separator ',') compo
                    FROM user u,
                              commandes c,
                              bouquet b,
                              etat e,
                              composition cc,
                              flower f
                    WHERE u.id_user = c.id_user
                        AND c.id_bouquet = b.id_bouquet
                        and c.id_etat = e.id_etat
                        and b.id_bouquet = cc.id_bouquet
                        and cc.id_flower = f.id_flower
                        AND b.predefini = false
                        and c.id_etat = 1
                    GROUP BY u.login_user,
                            u.id_user,
                            c.id_commande,
                            b.id_bouquet,
                            b.nom_bouquet,
                            b.photo_url,
                            c.quantity,
                            c.create_date,
                            e.etat,
                            c.completed
                    ORDER BY c.create_date DESC`
    const data = []
    const result = await conn.query(query, data)
    const dataResult = result[0]
    for (let i = 0; i < dataResult.length; ++i) {
        composition = dataResult[i]['compo'] //get the composiiton
        list_composition = composition.split(',') //split with , return a list
        const infosList = []
        for (let y = 0; y < list_composition.length; ++y) {
            const info = {} 
            const split = list_composition[y].split('*')//split with *
            info['imageFlower'] = split[0] //fill the information
            info['quantity'] = split[1]
            info['nameFlower'] = split[2]
            infosList.push(info)
        }
        dataResult[i]['compo'] = infosList
      

    }
    console.log("resEmployee=", result)
    return result[0]
}

module.exports = {
    getEmploye
}



