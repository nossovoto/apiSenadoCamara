var express = require('express');
var router = express.Router();
const axios = require('axios');
const util = require('../public/javascripts/util');

let params = {
    params: {
        ano: 2018,
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

            let materiaBuff = materias.Materia;

            if (Array.isArray(materiaBuff)){
                for (let i =0; i < materiaBuff.length; i++) {
                    listMaterias.push((util.setMateria(materiaBuff[i])));
                }
            }else{
                listMaterias.push(util.setMateria(materiaBuff));
            }

            responseData = {
                title: "All Materias from Senado",
                description: "Fetched from " + URL,
                data: listMaterias,
                length: listMaterias.length,
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
