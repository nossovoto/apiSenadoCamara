// nossovoto

const util = require('./util');
const axios = require('axios');
const URL_API_PROPOSICOES = "https://dadosabertos.camara.leg.br/api/v2/proposicoes/";

// return empty Proposição
function cleanProposicao() {
	return {
		id: "",
		ano: "",
		titulo: "",
		tema: [],
		proposicao: "",
		dataPublicacao: "",
		siglaSubTipo: "",
		numeroProposicao: "",
		ementa: "",
		resumo: "",
		status: "",
		url: "",
		autoria: [],
		local: "",
		verified: true
	}
}

function filterUltimoStatus(proposicao) {
	if (proposicao.ultimoStatus.idTipoTramitacao === '128'	||
		proposicao.ultimoStatus.idTipoTramitacao === '131'  ||
		proposicao.ultimoStatus.idTipoTramitacao === '134'  ||
		proposicao.ultimoStatus.idTipoTramitacao === '502'  ||
		proposicao.ultimoStatus.idTipoTramitacao === '630'  ||
		proposicao.ultimoStatus.idTipoTramitacao === '1024' ||
		proposicao.ultimoStatus.idTipoTramitacao === '1034' ||
		proposicao.ultimoStatus.idTipoTramitacao === '1035')
		return false;
	else return true;
}

function filterSubtipo(proposicao) {
	if (proposicao.siglaTipo === 'PDC' ||
		proposicao.siglaTipo === 'MPV' ||
		proposicao.siglaTipo === 'PL'  ||
		proposicao.siglaTipo === 'PLV' ||
		proposicao.siglaTipo === 'PLP' ||
		proposicao.siglaTipo === 'PEC' )
		return true;
	else return false;
}

function getSubTipo(proposicao){
	if (proposicao.siglaTipo === 'PDC') return 'PDL'; 
	return proposicao.siglaTipo;
}

function filterAssunto(proposicao) {
	if (proposicao.codTema === 34) 	    return 'Transparência, Fiscalização e Defesa ao Consumidor';
	if (proposicao.codTema === 35) 		return 'Assuntos Sociais';
	if (proposicao.codTema === 37) 	    return 'Comunicação';
	if (proposicao.codTema === 39) 		return 'Educação, Cultura e Esporte';
	if (proposicao.codTema === 40) 	    return 'Econômia';
	if (proposicao.codTema === 41) 		return 'Desenvolvimento Regional e Turismo';
	if (proposicao.codTema === 42) 		return 'Constituição, Justiça e Cidadania';
	if (proposicao.codTema === 43) 	    return 'Constituição, Justiça e Cidadania';
	if (proposicao.codTema === 44) 		return 'Direitos Humanos';
	if (proposicao.codTema === 46) 	    return 'Educação, Cultura e Esporte';
	if (proposicao.codTema === 48) 	    return 'Meio Ambiente';
	if (proposicao.codTema === 51) 	    return 'Agricultura';
	if (proposicao.codTema === 52) 	    return 'Assuntos Sociais';
	if (proposicao.codTema === 53) 		return 'Legislação Interna';
	if (proposicao.codTema === 54) 		return 'Energia, Recursos Hídricos e Minerais';
	if (proposicao.codTema === 55) 		return 'Relações Exteriores e Defesa';
	if (proposicao.codTema === 56) 		return 'Saúde';
	if (proposicao.codTema === 57) 		return 'Relações Exteriores e Defesa';
	if (proposicao.codTema === 58) 		return 'Constituição, Justiça e Cidadania';
	if (proposicao.codTema === 60) 	    return 'Desenvolvimento Regional e Turismo';
	if (proposicao.codTema === 61) 		return 'Viação, Transporte e Mobilidade';
	if (proposicao.codTema === 62) 		return 'Ciência, Tecnologia e Inovação';
	if (proposicao.codTema === 64) 		return 'Agricultura';
	if (proposicao.codTema === 66) 		return 'Indústria, Comércio e Serviços';
	if (proposicao.codTema === 67) 		return 'Transparência, Fiscalização e Defesa ao Consumidor';
	if (proposicao.codTema === 68) 		return 'Constituição, Justiça e Cidadania';
	if (proposicao.codTema === 70) 		return 'Orçamentos do Governo';
	if (proposicao.codTema === 72)     	return 'Homenagens e Datas Comemorativas';
	if (proposicao.codTema === 74) 		return 'Política, Partidos e Eleições';
	if (proposicao.codTema === 76)     	return 'Constituição, Justiça e Cidadania';
	if (proposicao.codTema === 85) 		return 'N/A';
	if (proposicao.codTema === 86) 		return 'N/A';
	return '';
}

async function getSingleProposicao(numero){
	let responseP = await axios.get(URL_API_PROPOSICOES + numero);
	let responseT = await axios.get(URL_API_PROPOSICOES + numero + "/temas");
	let responseA = await axios.get(URL_API_PROPOSICOES + numero + "/autores");
	let proposicao = responseP.data.dados;
	let temas = responseT.data.dados.map(tema => filterAssunto(tema));
	let autores = responseA.data.dados.map(autor => autor.nome);
	proposicao.temas = temas;
	proposicao.autores = autores;
	proposicao = setProposicao(proposicao);
	return 	proposicao;
	
}

function setProposicao(proposicao) {

	let newProposicao = cleanProposicao();

	newProposicao.id = 					proposicao.id;
	newProposicao.ano = 				proposicao.ano;
	newProposicao.titulo = 				getSubTipo(proposicao) + ' ' + proposicao.numero + '/' + proposicao.ano;
	newProposicao.tema = 				proposicao.temas;
	newProposicao.status = 				proposicao.ultimoStatus ? proposicao.ultimoStatus.descricaoTramitacao : proposicao.statusProposicao.descricaoTramitacao;
	newProposicao.proposicao = 			proposicao.descricaoTipo;
	newProposicao.dataPublicacao = 		proposicao.dataApresentacao;
	newProposicao.siglaSubTipo = 		proposicao.siglaTipo;
	newProposicao.numeroProposicao = 	proposicao.numero;
	newProposicao.ementa = 				proposicao.ementa;
	newProposicao.resumo = 				proposicao.ementaDetalhada;
	newProposicao.autoria = 			proposicao.autores;
	newProposicao.url = 				"https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=" + proposicao.id;
	newProposicao.local = 				"Camara";
	newProposicao = 					util.ReplaceUndefined(newProposicao);
	newProposicao.verified = 			!util.IsAnyValueEmpty(newProposicao);

	return newProposicao;
}

module.exports.filterAssunto = 			filterAssunto;
module.exports.filterSubtipo = 			filterSubtipo;
module.exports.filterUltimoStatus = 	filterUltimoStatus;
module.exports.getSingleProposicao = 	getSingleProposicao;
module.exports.setProposicao = 			setProposicao;