const express = require('express');
const router = express.Router();
const bm = require('../model/bouquetModel');


router.post("/filter_by_price", async function (req, res) {
    const min = req.body.min
    const max = req.body.max
    console.log('min', min)
    console.log('max', max)

    const listBouquets = await bm.filterByPrice(min, max)
    console.log(listBouquets)
    res.render('bouquet-list.ejs',{
        title: ' Liste de Bouquets',
        bouquetData: listBouquets,
    })

})


module.exports = router;

