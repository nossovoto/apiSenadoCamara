const express =         require('express');
const router =          express.Router();
const axios =           require('axios');
const util =            require('../public/javascripts/util');
const utilMateria =     require('../public/javascripts/util-materias');
const utilTramitacao =  require('../public/javascripts/util-tramitacoes');

const URL_API_Lista =   "http://legis.senado.leg.br/dadosabertos/materia/pesquisa/lista";
const URL_API_Materia = "http://legis.senado.leg.br/dadosabertos/materia/";

/* Senado Federal  */
router.get('/', async function(req, res, next) {

    let responseData = {};
    let timeFrame = util.GetTimeFrame(req);

    let paramsList = {
        params: {
            dataInicioApresentacao: timeFrame.begin.replace(/-/g,''),
            dataFimApresentacao:    timeFrame.end.replace(/-/g,''),
            tramitando:             'S'
        }
    };

    try {
        let response = await axios.get(URL_API_Lista, paramsList);
        let materias = response.data.PesquisaBasicaMateria.Materias.Materia;

        if (util.IsEmpty(materias)){
            res.send(util.EmptyResponse(req));
            return;
        }

        materias =  materias.filter( materia => utilMateria.filterSiglaSubtipoMateria(materia));
        materias =  materias.map( materia => utilMateria.setMateria(materia));

        let listMaterias =  materias.map( materia => utilMateria.setMateria(materia))

        responseData = {
            title:          "All Materias from Senado - Timeframe: " + timeFrame.begin + " to " + timeFrame.end,
            description:    "Fetched from " + URL_API_Lista,
            data:           materias,
            length:         materias.length,
            errors:         ""
        }
        res.send(responseData);

    } catch (e) {
        util.ReturnError(e, res);
    }
});

module.exports = router;