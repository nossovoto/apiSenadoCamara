const express = require('express');
const router = express.Router();
const axios = require('axios');
const util = require('../public/javascripts/util');
const utilProposicoes = require('../public/javascripts/util-proposicoes');

const URL_API =            "https://dadosabertos.camara.leg.br/api/v2/proposicoes";
const URL_Proposicoes =    "https://dadosabertos.camara.leg.br/arquivos/proposicoes/json/proposicoes-";
const URL_ProposTema =     "https://dadosabertos.camara.leg.br/arquivos/proposicoesTemas/json/proposicoesTemas-";
const URL_ProposAutores =  "https://dadosabertos.camara.leg.br/arquivos/proposicoesAutores/json/proposicoesAutores-";

/* Camara dos deputados. */
router.get('/', async function(req, res, next) {

    let paramsList =    {};
    let responseData =  {};
    let proposicoes =   [];
    let timeFrame =     util.getTimeFrame(req);

    try {
        let responseP =     timeFrame.years.map( val => axios.get(getURLProposicoes(val)));
        let responsePT =    timeFrame.years.map( val => axios.get(getURLProposicoesTema(val)));
        let responsePA =    timeFrame.years.map( val => axios.get(getURLProposicoesAutores(val)));

        let resolveP =      await Promise.all(responseP);
        let resolvePT =     await Promise.all(responsePT);
        let resolvePA =     await Promise.all(responsePA);

        let proposicoesRaw =        resolveP.reduce( (acc, val) => acc.concat(val.data.dados), []);
        let proposicoesTema =       resolvePT.reduce( (acc, val) => acc.concat(val.data.dados), []);
        let proposicoesAutores =    resolvePA.reduce( (acc, val) => acc.concat(val.data.dados), []);

        if (util.isEmpty(proposicoesRaw)){
            responseData = {
                title:          "API Câmara dos Deputados - @nossovoto",
                description:    "No Proposições from Senado",
                data:           {},
                length:         0,
                errors:         "",
            }
            res.send(responseData);
            return;
        }

        //TODO REMOVE TRASH
        // var p = proposicoesRaw.filter( proposicao => proposicao.id == '2193540');
        // p = p[0];
        // var verified = utilProposicoes.filterSubtipo(p);
        // var verified2= utilProposicoes.filterUltimoStatus(p);
        //

        proposicoesRaw = proposicoesRaw.filter( proposicao => 
            parseInt(proposicao.dataApresentacao.substring(0,10).replace(/-/g,'')) >= parseInt(timeFrame.begin.replace(/-/g,''))
            &&
            parseInt(proposicao.dataApresentacao.substring(0,10).replace(/-/g,'')) <= parseInt(timeFrame.end.replace(/-/g,''))
            &&
            utilProposicoes.filterSubtipo(proposicao)
            &&
            utilProposicoes.filterUltimoStatus(proposicao)
            );

        proposicoesRaw.forEach(proposicaoRaw => {
            let temasFilter =       proposicoesTema.filter( val => proposicaoRaw.numero === val.numero);
            let autoresFilter =     proposicoesAutores.filter( val => proposicaoRaw.id === val.idProposicao);
            let temas =             temasFilter.map( tema => utilProposicoes.filterAssunto(tema));
            let autores =           autoresFilter.map( autor => autor.nomeAutor);
            let proposicao =        proposicaoRaw;
            proposicao.temas =      temas;
            proposicao.autores =    autores;
            proposicoes.push(utilProposicoes.setProposicao(proposicao));
        });

        let responseData = {
            title:              "All Propositions from Câmara dos Deputados  - Timeframe: " + timeFrame.begin + " to " + timeFrame.end,
            description:        "Fetched from " + getURLProposicoes(timeFrame.years[0]),
            data:               proposicoes,
            length:             proposicoes.length,
            errors:             ""
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

function getURLProposicoes(ano){
    return URL_Proposicoes + ano + ".json";
}

function getURLProposicoesTema(ano){
    return URL_ProposTema + ano + ".json";
}

function getURLProposicoesAutores(ano){
    return URL_ProposAutores + ano + ".json";
}

module.exports = router;