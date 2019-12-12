const express = require('express');
const router = express.Router();
const util = require('../public/javascripts/util');
const utilTramitacao = require('../public/javascripts/util-tramitacoes');

router.get('/', async function (req, res, next) {
    res.send({ error: "This endpoint is either /senado/{id_materia} or /camara/{numero_proposicao}" });
});

/* Senado Federal  */
router.get('/senado/:id', async function (req, res, next) {

    try {
        let movimentacaoMateria = await utilTramitacao.GetTramitacaoSenado(req.params.id);
        // TODO -> get single materia to see apensado status
        if (util.IsEmpty(movimentacaoMateria)) {
            res.send(util.EmptyResponse(req));
            return;
        }

        let tramitacoes = movimentacaoMateria.Tramitacoes.Tramitacao;
        let status = utilTramitacao.GetStatusSenado(movimentacaoMateria);
        status.sequencia = tramitacoes.length;

        res.send(status); // only for test

        // let responseData = {
        //     title: "Tramitação da proposta" + req.params.id,
        //     description: "Fetched from Dados Abertos",
        //     data: { status: status, tramitacoes: tramitacoes },
        //     length: 1,
        //     errors: ""
        // }
        // res.send(responseData);

    } catch (e) {
        util.ReturnError(e, res);
    }
});

/* Camara dos Deputados  */
router.get('/camara/:numero', async function (req, res, next) {

    try {
        let tramitacoes = await utilTramitacao.GetTramitacaoCamara(req.params.numero);
        // TODO -> get single proposicao to see apensado status
        if (util.IsEmpty(tramitacoes)) {
            res.send(util.EmptyResponse(req));
            return;
        }

        let status = await utilTramitacao.GetStatusCamara(tramitacoes);
        res.send(status); // only for test
        // let responseData = {
        //     title:          "Tramitação da proposta " + req.params.numero,
        //     description:    "Fetched from Dados Abertos",
        //     data:           {status: status, tramitacoes: tramitacoes},
        //     length:         1,
        //     errors:         ""
        // }
        // res.send(responseData);

    } catch (e) {
        util.ReturnError(e, res);
    }
});

module.exports = router;