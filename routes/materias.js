var express = require('express');
var router = express.Router();
const axios = require('axios');
const util = require('../public/javascripts/util');
const utilMateria = require('../public/javascripts/util-materias')

let params = {
    params: {
        ano: 2019,
        // codigoSituacao: 32,
        // numero: 28
    }
};

const URL = "http://legis.senado.leg.br/dadosabertos/materia/pesquisa/lista";

/* GET users listing. */
router.get('/', function(req, res, next) {

    let responseData = {};
    let err = "";

    axios.get(URL, params)
        .then( ({data}) => {

            var listMaterias = [];
            let materias = data.PesquisaBasicaMateria.Materias;

            // console.log(materias);

            if (util.isEmpty(materias)){
                err = "There is no Materias";
                console.log(err);
                return;
            }

            if (Array.isArray(materias.Materia)){
                for (let i =0; i < materias.Materia.length; i++) {
                    if(utilMateria.filterSiglaSubtipoMateria(materias.Materia[i])){
                        listMaterias.push((utilMateria.setMateria(materias.Materia[i])));
                    }
                }
            }else{
                if(utilMateria.filterSiglaSubtipoMateria(materias.Materia[i]))
                    listMaterias.push(utilMateria.setMateria(materias.Materia));
            }

            responseData = {
                title: "All Materias from Senado",
                description: "Fetched from " + URL,
                data: listMaterias,
                length: listMaterias.length,
                errors: err
            }

            // console.log(responseData);

            res.send(responseData);

        })
        .catch(function (error) {
            console.log(error);
        });
});

module.exports = router;