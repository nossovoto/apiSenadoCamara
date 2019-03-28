// nossovoto

const util = require('./util');

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

function listSiglaTipoProposicao(listProposicoes) {

	let listSiglas = [];
	let listDesc = [];
	for (let i = 0; i < listProposicoes.length; i++) {
		listSiglas.push(listProposicoes[i].siglaTipo);
		listDesc.push(listProposicoes[i].descricaoTipo);
	}
	let list = [];
	for (let i = 0; i < listSiglas.length; i++) {
		if (!list.some(e => e.sigla === listSiglas[i]) && !list.some(e => e.descricao === listDesc[i])){
			list.push({ sigla: listSiglas[i], descricao: listDesc[i]});
		}
	}
	return list;
}

function filterUltimoStatus(proposicao) {
	if (proposicao.ultimoStatus.idTipoTramitacao === '131'  ||
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

	if (proposicao.siglaTipo === 'MPV' ||
		proposicao.siglaTipo === 'PL'  ||
		proposicao.siglaTipo === 'PLV' ||
		proposicao.siglaTipo === 'PLP' ||
		proposicao.siglaTipo === 'PEC' )
		// proposicao.siglaTipo === 'PLN' ||
		// proposicao.siglaTipo === 'PDL' )
		return true;
	else return false;
}

function filterAutoria(){
	if (true) return '';
}

function filterAssunto(proposicao) {
	if (proposicao.codTema === 34) 	    return 'Transparência, Fiscalização e Defesa ao Consumidor';
	if (proposicao.codTema === 35) 		return 'Assuntos Sociais';
	if (proposicao.codTema === 37) 	    return 'Comunicação';
	if (proposicao.codTema === 39) 		return 'Educação, Cultura e Esporte';
	if (proposicao.codTema === 40) 	    return 'Economia';
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



function setProposicao(proposicao) {

	let newProposicao = cleanProposicao();

	newProposicao.id = proposicao.id;
	newProposicao.ano = proposicao.ano;
	newProposicao.titulo = proposicao.descricaoTipo;
	newProposicao.tema = proposicao.temas;
	newProposicao.status = proposicao.ultimoStatus.descricaoTramitacao;
	newProposicao.proposicao = proposicao.descricaoTipo;
	newProposicao.dataPublicacao = proposicao.dataApresentacao;
	newProposicao.siglaSubTipo = proposicao.siglaTipo;
	newProposicao.numeroProposicao = proposicao.numero;
	newProposicao.ementa = proposicao.ementa;
	if (proposicao.ementaDetalhada !== null)
		newProposicao.resumo = proposicao.ementaDetalhada;
	else
		newProposicao.resumo = "";
	newProposicao.autoria = proposicao.autores;
	newProposicao.url = "https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=" + proposicao.id;
	newProposicao.local = "Camara";
	newProposicao.verified = !util.IsAnyValueEmpty(newProposicao);

	return newProposicao;
}

module.exports.cleanProposicao = 		cleanProposicao;
module.exports.filterAssunto = 			filterAssunto;
module.exports.filterSubtipo = 			filterSubtipo;
module.exports.filterAutoria = 			filterAutoria;
module.exports.filterUltimoStatus = 	filterUltimoStatus;
module.exports.listSiglaTipoProposicao = listSiglaTipoProposicao;
module.exports.setProposicao = 			setProposicao;