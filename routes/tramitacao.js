const express =         require('express');
const router =          express.Router();
const util =            require('../public/javascripts/util');
const utilTramitacao =  require('../public/javascripts/util-tramitacoes');

let status =        utilTramitacao.NewStatus();

router.get('/', async function(req, res, next) {
    res.send({error: "This endpoint is either /senado/{id_materia} or /camara/{numero_proposicao}"});
});

/* Senado Federal  */
router.get('/senado/:id', async function(req, res, next) {

    try {
        let tramitacoes = await utilTramitacao.GetTramitacaoSenado(req.params.id);

        if (util.IsEmpty(tramitacoes)){
            res.send(util.EmptyResponse(req));
            return;
        }
    
        let responseData = {
            title:          "Tramitação da proposta" + req.params.id,
            description:    "Fetched from Dados Abertos",
            data:           {status: status, tramitacoes: tramitacoes},
            length:         1,
            errors:         ""
        }
        res.send(responseData);

    } catch (e) {
        util.ReturnError(e, res);
    }
});

/* Camara dos Deputados  */
router.get('/camara/:numero', async function(req, res, next) {

    try {
        let tramitacoes = await utilTramitacao.GetTramitacaoCamara(req.params.numero);

        if (util.IsEmpty(tramitacoes)){
            res.send(util.EmptyResponse(req));
            return;
        }
        
        let responseData = {
            title:          "Tramitação da proposta" + req.params.numero,
            description:    "Fetched from Dados Abertos",
            data:           {status: status, tramitacoes: tramitacoes},
            length:         1,
            errors:         ""
        }
        res.send(responseData);

    } catch (e) {
        util.ReturnError(e, res);
    }
});

module.exports = router;