const mysql = require('mysql2/promise');
const conn = require('../config/db_async.js').pool

async function GetBouquetList() {
    const quert = `SELECT b.id_bouquet, b.nom_bouquet, b.photo_url , GROUP_CONCAT(CONCAT(cc.quantity, \' * \', f.nom_flower) separator \'<br/> \') composition , sum(cc.quantity  * f.prix_flower) prix_bouquet FROM bouquet b, composition cc , flower f  WHERE b.id_bouquet = cc.id_bouquet and cc.id_flower = f.id_flower and b.predefini=true group by  b.id_bouquet , b.nom_bouquet, b.photo_url;`
    const data = []
    const res = await conn.query(quert, data)
    return res[0];

}

async function filterByPrice(min, max) {
    const query = `SELECT b.id_bouquet, b.nom_bouquet, b.photo_url , GROUP_CONCAT(CONCAT(cc.quantity, ' * ', f.nom_flower) separator ', ') composition , sum(cc.quantity  * f.prix_flower) prix_bouquet FROM bouquet b, composition cc , flower f WHERE b.id_bouquet = cc.id_bouquet
    AND cc.id_flower = f.id_flower AND b.predefini=true GROUP BY  b.id_bouquet , b.nom_bouquet, b.photo_url HAVING  prix_bouquet > ? AND prix_bouquet < ?;`
    const data = [min, max]
    const res = await conn.query(query, data)
    return res[0]
}

async function GetCustomBouquet(userName) {
    const query = `SELECT b.id_bouquet,
                          b.nom_bouquet,
                          b.photo_url,
                          GROUP_CONCAT(CONCAT(f.photo_url, ' * ' ,cc.quantity, ' * ', f.nom_flower) separator ',') composition,
                                sum(cc.quantity * f.prix_flower) prix_bouquet
                    FROM bouquet b,
                         composition cc,
                         flower f
                    WHERE b.id_bouquet = cc.id_bouquet
                        AND cc.id_flower = f.id_flower
                        AND b.predefini=false
                        AND b.id_createur=
                                (SELECT id_user
                                 FROM user
                                 WHERE login_user= ? )
                    GROUP BY b.id_bouquet,
                             b.nom_bouquet,
                             b.photo_url;`
    const data = [userName]
    const res = await conn.query(query, data)
    const dataResult = res[0]
    for (let i =0; i < dataResult.length; ++i){
        composition = dataResult[i]['composition'] //get the composiiton
        list_composition = composition.split(',') //split with , return a list
        const infosList = []
        for (let y = 0; y < list_composition.length; ++y){
            const info = {} //create an object
            const split = list_composition[y].split('*') //split with *
            info['imageFlower'] = split[0] //fill the information
            info['quantity'] = split[1]
            info['nameFlower'] = split[2]
            infosList.push(info)
        }
        dataResult[i]['composition'] = infosList
    }
    console.log("resGetCustomB", res)
    return res[0]
}


module.exports = {
    GetBouquetList,
    filterByPrice,
    GetCustomBouquet
}