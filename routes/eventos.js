var express = require('express');
var router = express.Router();
const axios = require('axios');
const util = require('../public/javascripts/util');
const utilEventos = require('../public/javascripts/util-eventos');

let params = {
    params: {
        // ano: 2019,
        dataInicio: "2018-01-01",
        dataFim: new Date().toISOString().substring(0,10),
        itens: 100
    }
};

Date.now();

const URL = "https://dadosabertos.camara.leg.br/api/v2/eventos";
const URLData2018 = "https://dadosabertos.camara.leg.br/arquivos/eventos/json/eventos-2018.json";


/* GET users listing. */
router.get('/', function(req, res, next) {

    let responseData = {};
    let err = "";

    axios.get(URLData2018)
        .then( ({data}) => {

            var eventosList = [];
            let eventos = data.dados;
            
            // console.log(eventos);

            if (util.isEmpty(eventos)){
                err = "There is no Materias";
                console.log(err);
                return;
            }
            if (Array.isArray(eventos)){

                utilEventos.listDescricaoEvento(eventos);
            //     for (let i =0; i < eventos.length; i++) {
            //         listMaterias.push((util.setMateria(eventos[i])));
            //     }
            // }else{
            //     listMaterias.push(util.setMateria(eventos));
            }

            responseData = {
                title: "All Materias from Senado",
                description: "Fetched from " + URL,
                data: eventosList,
                length: eventosList.length,
                errors: err
            }

            console.log(responseData);

            res.send(responseData);

        })
        .catch(function (error) {
            console.log(error);
        });
});

module.exports = router;
