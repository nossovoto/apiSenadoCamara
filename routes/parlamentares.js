const express = require('express');
const router = express.Router();
const axios = require('axios');

const URL_Parlamentares =   "http://legis.senado.leg.br/dadosabertos/autor/lista/atual";
const URL_Senadores =       "http://legis.senado.leg.br/dadosabertos/senador/lista/atual";
const URL_Deputados =       "https://dadosabertos.camara.leg.br/api/v2/deputados";


/* GET users listing. */
router.get('/', async function(req, res, next) {

    let responseData =  {};
    let parlamentares = {};

    try {
        let response =      await axios.get(URL_Senadores);
        let senadores =     response.data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar;
        response =          await axios.get(URL_Deputados);
        let deputados =     response.data.dados;

        senadores =                 senadores.map( senador => senador.IdentificacaoParlamentar.NomeParlamentar);
        deputados =                 deputados.map( deputado => deputado.nome);
        parlamentares.senadores =   senadores;
        parlamentares.deputados =   deputados;
        parlamentares.length =      senadores.length + deputados.length;

        responseData = {
            title:          "All Deputados and Senadores",
            description:    "Fetched from " + URL_Senadores + "and " + URL_Deputados,
            data:           parlamentares,
            length:         parlamentares.length,
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