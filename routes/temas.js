const express = require('express');
const router = express.Router();
const utilTemas = require('../public/javascripts/util-temas')

/* GET users listing. */
router.get('/', async function(req, res, next) {

    let responseData = {};

    try {
        
        let listTemas = utilTemas.listTemas();

        responseData = {
            title:          "All Temas",
            description:    "Temas for nossovoto",
            data:           listTemas,
            length:         listTemas.length,
            errors:         ""
        }
        res.send(responseData);

    } catch (e) {
        console.error(e); // 💩 - SHIT - Remove it on production
        let title = (e.response === undefined) ? e.message : e.response.statusText;
        responseData = {
            title:          title,
            description:    "Failed",
            data:           {},
            length:         0,
            errors:         e.message,
        }
        res.send(responseData);
    }
});

module.exports = router;