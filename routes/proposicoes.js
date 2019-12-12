const express = require('express');
const router = express.Router();
const axios = require('axios');
const util = require('../public/javascripts/util');
const utilProposicoes = require('../public/javascripts/util-proposicoes');
const utilTramitacao = require('../public/javascripts/util-tramitacoes');

const URL_API_PROPOSICOES = "https://dadosabertos.camara.leg.br/api/v2/proposicoes/";
const URL_Proposicoes = "https://dadosabertos.camara.leg.br/arquivos/proposicoes/json/proposicoes-";
const URL_ProposTema = "https://dadosabertos.camara.leg.br/arquivos/proposicoesTemas/json/proposicoesTemas-";
const URL_ProposAutores = "https://dadosabertos.camara.leg.br/arquivos/proposicoesAutores/json/proposicoesAutores-";

/* Camara dos deputados. */
router.get('/', async function (req, res, next) {

    let proposicoes = [];
    let timeFrame = util.GetTimeFrame(req);

    try {
        let responseP = timeFrame.years.map(val => axios.get(getURLProposicoes(val)));
        let responsePT = timeFrame.years.map(val => axios.get(getURLProposicoesTema(val)));
        let responsePA = timeFrame.years.map(val => axios.get(getURLProposicoesAutores(val)));

        let resolveP = await Promise.all(responseP);
        let resolvePT = await Promise.all(responsePT);
        let resolvePA = await Promise.all(responsePA);

        let proposicoesRaw = resolveP.reduce((acc, val) => acc.concat(val.data.dados), []);
        let proposicoesTema = resolvePT.reduce((acc, val) => acc.concat(val.data.dados), []);
        let proposicoesAutores = resolvePA.reduce((acc, val) => acc.concat(val.data.dados), []);

        if (util.IsEmpty(proposicoesRaw)) {
            res.send(util.EmptyResponse(req));
            return;
        }

        proposicoesRaw = proposicoesRaw.filter(proposicao =>
            parseInt(proposicao.dataApresentacao.substring(0, 10).replace(/-/g, '')) >= parseInt(timeFrame.begin.replace(/-/g, ''))
            &&
            parseInt(proposicao.dataApresentacao.substring(0, 10).replace(/-/g, '')) <= parseInt(timeFrame.end.replace(/-/g, ''))
            &&
            utilProposicoes.filterSubtipo(proposicao)
            &&
            utilProposicoes.filterUltimoStatus(proposicao)
        );

        proposicoesRaw.forEach(proposicaoRaw => {
            let temasFilter = proposicoesTema.filter(prop => prop.numero === proposicaoRaw.numero);
            let autoresFilter = proposicoesAutores.filter(prop => prop.idProposicao === proposicaoRaw.id);
            let temas = temasFilter.map(tema => utilProposicoes.filterAssunto(tema));
            let autores = autoresFilter.map(autor => autor.nomeAutor);
            let proposicao = proposicaoRaw;
            proposicao.temas = temas;
            proposicao.autores = autores;
            proposicoes.push(utilProposicoes.setProposicao(proposicao));
        });

        let responseData = {
            title: "All Propositions from Câmara dos Deputados  - Timeframe: " + timeFrame.begin + " to " + timeFrame.end,
            description: "Fetched from " + getURLProposicoes(timeFrame.years[0]),
            data: proposicoes,
            length: proposicoes.length,
            errors: ""
        }
        res.send(responseData);
    } catch (e) {
        util.ReturnError(e, res);
    }
});

function getURLProposicoes(ano) {
    return URL_Proposicoes + ano + ".json";
}

function getURLProposicoesTema(ano) {
    return URL_ProposTema + ano + ".json";
}

function getURLProposicoesAutores(ano) {
    return URL_ProposAutores + ano + ".json";
}

/* Camara dos deputados  */
router.get('/:numero', async function (req, res, next) {

    try {
        let proposicao = await utilProposicoes.getSingleProposicao(req.params.numero);

        if (util.IsNull(proposicao)){
            res.send(util.EmptyResponse(req));
            return;
        }

        let responseData = {
            title:          "Proposicao " + req.params.numero,
            description:    "Fetched from " + URL_API_PROPOSICOES,
            data:           proposicao,
            length:         1,
            errors:         ""
        }

        res.send(responseData);

    } catch (e) {
        util.ReturnError(e, res);
    }
});

module.exports = router;