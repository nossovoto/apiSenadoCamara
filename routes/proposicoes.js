var express = require('express');
var router = express.Router();
const axios = require('axios');
const util = require('../public/javascripts/util');
const utilProposicoes = require('../public/javascripts/util-proposicoes');

let params = {
    params: {
        // ano: 2019,
        dataInicio: "2018-01-01",
        dataFim: new Date().toISOString().substring(0,10),
        itens: 100
    }
};

const URL = "https://dadosabertos.camara.leg.br/api/v2/proposicoes";
const URLData2018 = "https://dadosabertos.camara.leg.br/arquivos/proposicoes/json/proposicoes-2018.json";
const URLData2019 = "https://dadosabertos.camara.leg.br/arquivos/proposicoes/json/proposicoes-2019.json";

/* GET users listing. */
router.get('/', function(req, res, next) {

    axios.get(URLData2018)
        .then( ({data}) => {
                
            let err = "";
            var proposicoesList = [];
            let proposicoes = data.dados;

            if (util.isEmpty(proposicoes)){
                err = "There is no Materias";
                console.log(err);
                return;
            }
            if (Array.isArray(proposicoes)){
                for (let i =0; i < proposicoes.length; i++) {
                    proposicoesList.push(utilProposicoes.setProposicao(proposicoes[i]));
                }
            }else{
                listMaterias.push(utilProposicoes.setProposicao(eventos));
            }
            let responseData = {
                title: "All Propositions from Senado",
                description: "Fetched from " + URL,
                data: proposicoesList,
                length: proposicoesList.length,
                errors: err
            }
            res.send(responseData);
        })
        .catch(function (error) {
            console.log(error);
        });
});

module.exports = router;
