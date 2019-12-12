// nossovoto

const util = require('./util');
const axios = require('axios');
const URL_API_Materia = "http://legis.senado.leg.br/dadosabertos/materia/";

// return empty Materia
function cleanMateria() {
	return {
		id: "",
		ano: "",
		titulo: "",
		tema: "",
		materia: "",
		dataPublicacao: "",
		siglaSubTipo: "",
		numeroMateria: "",
		ementa: "",
		resumo: "",
		status: "",
		url: "",
		autoria: "",
		local: "",
		verified: true
	}
}

function filterAssuntoOld(materia){
	let codigo = util.GetSafe(() => materia.Assunto.AssuntoEspecifico.Codigo, '');
	if (codigo === "101") return "Administração Pública";
	if (codigo === "102") return "Administração Pública";
	if (codigo === "103") return "Administração Pública";
	if (codigo === "104") return "Administração Pública";
	if (codigo === "105") return "Administração Pública";
	if (codigo === "106") return "Agricultura, Pecuária, Pesca e Extrativismo";
	if (codigo === "107") return "Cidades e Desenvolvimento Urbano";
	if (codigo === "108") return "Administração Pública";
	if (codigo === "109") return "Indústria, Comércio e Serviços";
	if (codigo === "110") return "Energia, Recursos Hídricos e Minerais";
	if (codigo === "111") return "Agricultura, Pecuária, Pesca e Extrativismo";
	if (codigo === "112") return "Finanças Públicas e Orçamento";
	if (codigo === "113") return "Economia";
	if (codigo === "114") return "Estrutura Fundiária";
	if (codigo === "115") return "Cidades e Desenvolvimento Urbano";
	if (codigo === "116") return "Energia, Recursos Hídricos e Minerais";
	if (codigo === "117") return "Finanças Públicas e Orçamento";
	if (codigo === "118") return "Turismo";
	if (codigo === "119") return "Viação, Transporte e Mobilidade";
	if (codigo === "120") return "Relações Internacionais e Comércio Exterior";
	if (codigo === "121") return "Homenagens e Datas Comemorativas";
	if (codigo === "122") return "Homenagens e Datas Comemorativas";
	if (codigo === "123") return "Direito e Defesa do Consumidor";
	if (codigo === "124") return "Defesa e Segurança";
	if (codigo === "125") return "Ciência, Tecnologia e Inovação";
	if (codigo === "126") return "Direito Civil e Processual Civil";
	if (codigo === "127") return "Economia";
	if (codigo === "128") return "Direto Constitucional";
	if (codigo === "129") return "Política, Partidos e Eleições";
	if (codigo === "130") return "Viação, Transporte e Mobilidade";
	if (codigo === "131") return "Direito Penal e Processual Penal";
	if (codigo === "132") return "Direto Constitucional";
	if (codigo === "133") return "Processo Legislativo e Atuação Parlamentar";
	if (codigo === "134") return "Processo Legislativo e Atuação Parlamentar";
	if (codigo === "135") return "Defesa e Segurança";
	if (codigo === "136") return "Viação, Transporte e Mobilidade";
	if (codigo === "137") return "Arte, Cultura e Religião";
	if (codigo === "138") return "Previdência e Assistência Social";
	if (codigo === "139") return "Ciência, Tecnologia e Inovação";
	if (codigo === "140") return "Comunicações";
	if (codigo === "141") return "Esporte e Lazer";
	if (codigo === "142") return "Previdência e Assistência Social";
	if (codigo === "143") return "Direitos Humanos e Minorias";
	if (codigo === "144") return "Educação";
	if (codigo === "145") return "Direito Constitucional";
	if (codigo === "146") return "Meio Ambiente e Desenvolvimento Sustentável";
	if (codigo === "147") return "Previdência e Assistência Social";
	if (codigo === "148") return "Trabalho e Emprego";
	if (codigo === "149") return "Saúde";
	if (codigo === "161") return "Finanças Públicas e Orçamento";
	if (codigo === "162") return "Finanças Públicas e Orçamento";
	if (codigo === "163") return "Finanças Públicas e Orçamento";
	if (codigo === "164") return "Finanças Públicas e Orçamento";
	if (codigo === "165") return "Finanças Públicas e Orçamento";
	if (codigo === "166") return "Finanças Públicas e Orçamento";
	if (codigo === "167") return "Finanças Públicas e Orçamento";
	if (codigo === "168") return "Finanças Públicas e Orçamento";
	if (codigo === "169") return "Finanças Públicas e Orçamento";
	if (codigo === "181") return "Finanças Públicas e Orçamento";
	return "";
}

function filterSiglaSubtipoMateria(materia) {
	let siglaSubtipoMateria = util.GetSafe(() => materia.IdentificacaoMateria.SiglaSubtipoMateria, '');
	if (siglaSubtipoMateria === 'ECD' || // Emenda da Camara dos Deputados a projeto de lei no senado
		siglaSubtipoMateria === 'EDS' || // Emenda da Camada dos Deputados a proejeto de decreto legislatico
		siglaSubtipoMateria === 'MPV' || // Medida Provrisoria
		siglaSubtipoMateria === 'PDC' || // Projeto de Decreto Legislativo - Camara dos Deputados
        siglaSubtipoMateria === 'PDN' || // Projeto de Decreto Legislativo - Congresso Nacional
        siglaSubtipoMateria === 'PDS' || // Projeto de Decreto Legislativo - Senado Federal
        siglaSubtipoMateria === 'PEC' || // Projeto de emenda constitucional
        siglaSubtipoMateria === 'PLC' || // Projeto de Lei - Camara dos Deputados
		siglaSubtipoMateria === 'PLN' || // Projeto de Lei - Congresso Nacional
		siglaSubtipoMateria === 'PLN' || // Projeto de Lei - Complementar
		siglaSubtipoMateria === 'PLS' || // Projeto de Lei - Senado Federal
		siglaSubtipoMateria === 'PDL' || // Projeto de Decreto Legislativo
		siglaSubtipoMateria === 'VET' || // Veto
        siglaSubtipoMateria === 'PL') 	 // Projeto de Lei
            return true;
    else return false;
}

function filterAssunto(materia) {
	let siglaLocal = util.GetSafe(() => materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal, '');
	if (siglaLocal === 'CE') 		return 'Educação, Cultura e Esporte';
	if (siglaLocal === 'SLCN') 		return 'Legislação Interna';
	if (siglaLocal === 'CMO') 		return 'Orçamentos do Governo';
	if (siglaLocal === 'SACTFC')	return 'Transparência, Fiscalização e Defesa ao Consumidor';
	if (siglaLocal === 'SACE') 		return 'Educação, Cultura e Esporte';
	if (siglaLocal === 'CRA') 		return 'Agricultura';
	if (siglaLocal === 'CAE') 		return 'Economia';
	if (siglaLocal === 'CAS') 		return 'Assuntos Sociais';
	if (siglaLocal === 'CRE') 		return 'Relações Exteriores e Defesa';
	if (siglaLocal === 'SACIFR')	return 'Infraestrutura';
	if (siglaLocal === 'CDR') 		return 'Desenvolvimento Regional e Turismo';
	if (siglaLocal === 'SACRE') 	return 'Relações Exteriores e Defesa';
	if (siglaLocal === 'SACCJ') 	return 'Constituição, Justiça e Cidadania';
	if (siglaLocal === 'SACCT') 	return 'Ciência, Tecnologia e Inovação';
	if (siglaLocal === 'SACDH') 	return 'Direitos Humanos';
	if (siglaLocal === 'CEDP') 		return 'Ética';
	if (siglaLocal === 'CCS') 		return 'Comunicação';
	if (siglaLocal === 'CCT') 		return 'Ciência, Tecnologia e Inovação';
	if (siglaLocal === 'CCJ') 		return 'Constituição, Justiça e Cidadania';
	if (siglaLocal === 'SACAE') 	return 'Econômia';
	if (siglaLocal === 'CTFC') 		return 'Transparência, Fiscalização e Defesa ao Consumidor';
	if (siglaLocal === 'SACMA') 	return 'Meio Ambiente';
	if (siglaLocal === 'CDH') 		return 'Direitos Humanos';
	if (siglaLocal === 'SACAS') 	return 'Assuntos Sociais';
	if (siglaLocal === 'SACDR') 	return 'Desenvolvimento Regional e Turismo';
	if (siglaLocal === 'SACRA') 	return 'Agricultura';
	if (siglaLocal === 'CMA') 		return 'Meio Ambiente';
	if (siglaLocal === 'CI') 		return 'Insfraestrutura';
	let siglaSubtipoMateria = util.GetSafe(() => materia.IdentificacaoMateria.SiglaSubtipoMateria, '');
	if (siglaSubtipoMateria === 'MPV' || 
		siglaSubtipoMateria === 'VET') return 'Decreto Presidêncial';
    return '';
}

async function getSingleMateria(codigo){	
	//TODO status:"" tema:""
	let response = await axios.get(URL_API_Materia + codigo);
	let materia = response.data.DetalheMateria.Materia;
	let autorPrincipal = materia.Autoria.Autor[0].NomeAutor;
	materia = setMateria(materia);
	materia.autoria = autorPrincipal;
	return materia;
}

function setMateria(materia) {

	let newMateria = cleanMateria();

	newMateria.id = 				materia.IdentificacaoMateria.CodigoMateria;
	newMateria.ano = 				materia.IdentificacaoMateria.AnoMateria;
	newMateria.titulo = 			materia.IdentificacaoMateria.DescricaoIdentificacaoMateria;
	newMateria.tema = 				filterAssunto(materia);
	newMateria.status = 			util.GetSafe(() => materia.SituacaoAtual.Autuacoes.Autuacao.Situacao.DescricaoSituacao, '');
	newMateria.materia = 			materia.IdentificacaoMateria.DescricaoSubtipoMateria;
	newMateria.dataPublicacao = 	materia.DadosBasicosMateria.DataApresentacao;
	newMateria.siglaSubTipo = 		materia.IdentificacaoMateria.SiglaCasaIdentificacaoMateria;
	newMateria.numeroMateria = 		materia.IdentificacaoMateria.NumeroMateria;
	newMateria.ementa = 			materia.DadosBasicosMateria.EmentaMateria;
	newMateria.resumo = 			util.GetSafe(() => materia.DadosBasicosMateria.ExplicacaoEmentaMateria, '');
	newMateria.autoria = 			util.GetSafe(() => materia.AutoresPrincipais.AutorPrincipal.NomeAutor, '');
	newMateria.local = 				"Senado";
	newMateria.url = 				"https://www25.senado.leg.br/web/atividade/materias/-/materia/" + materia.IdentificacaoMateria.CodigoMateria;	
	newMateria = 					util.ReplaceUndefined(newMateria);
	newMateria.verified = 			!util.IsAnyValueEmpty(newMateria);
	
	return newMateria;
}



module.exports.filterSiglaSubtipoMateria = filterSiglaSubtipoMateria;
module.exports.getSingleMateria = getSingleMateria;
module.exports.setMateria = setMateria;