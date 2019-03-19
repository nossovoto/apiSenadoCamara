const express = require('express');
const router = express.Router();
const axios = require('axios');
const util = require('../public/javascripts/util');
const utilMateria = require('../public/javascripts/util-materias')

const URLLista = "http://legis.senado.leg.br/dadosabertos/materia/pesquisa/lista";
const URLMateria = "http://legis.senado.leg.br/dadosabertos/materia/";


/* GET users listing. */
router.get('/', async function(req, res, next) {

    let responseData = {};

    let timeFrame = util.getTimeFrame(req);

    let paramsList = {
        params: {
            dataInicioApresentacao: timeFrame.begin.replace(/-/g,''),
            dataFimApresentacao:    timeFrame.end.replace(/-/g,''),
            tramitando: 'S'
        }
    };

    try {

        let response = await axios.get(URLLista, paramsList);
        let materias = response.data.PesquisaBasicaMateria.Materias.Materia;

        if (util.isEmpty(materias)){
            responseData = {
                title: "API Senado - @nossovoto",
                description: "No Matérias from Senado",
                data: {},
                length: 0,
                errors: "",
            }
            res.send(responseData);
            return;
        }

        let listMaterias = materias.map( val =>  utilMateria.setMateria(val))
        
        responseData = {
            title: "All Materias from Senado - Timeframe: " + timeFrame.begin + " to " + timeFrame.end,
            description: "Fetched from " + URLLista,
            data: listMaterias,
            length: listMaterias.length,
            errors: ""
        }
        res.send(responseData);

    } catch (e) {
        console.error(e); // 💩 - SHIT - Remove it on production
        let title = (e.response === undefined) ? e.message : e.response.statusText;
        responseData = {
            title: title,
            description: "Failed",
            data: {},
            length: 0,
            errors: e.message,
        }
        res.send(responseData);
    }
});


module.exports = router;