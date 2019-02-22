// nossovoto

schemaProposicao = {
	"ano": 0,
	"apreciacao": {
	  "descricao": "string",
	  "id": 0
	},
	"autor": {
	  "codPartido": 0,
	  "ideCadastro": 0,
	  "nome": "string",
	  "siglaPartido": "string",
	  "siglaUF": "string"
	},
	"dataApresentacao": "string",
	"ementa": "string",
	"explicacaoEmenta": "string",
	"id": 0,
	"indGenero": "string",
	"nome": "string",
	"numero": 0,
	"orgaoNumerador": {
	  "id": 0,
	  "nome": "string",
	  "sigla": "string"
	},
	"qtdAutores": 0,
	"qtdOrgaosComEstado": 0,
	"regime": {
	  "descricao": "string",
	  "id": 0
	},
	"situacao": {
	  "descricao": "string",
	  "id": 0,
	  "orgao": {
		"codOrgaoEstado": 0,
		"siglaOrgaoEstado": "string"
	  },
	  "principal": {
		"codProposicaoPrincipal": 0,
		"proposicaoPrincipal": "string"
	  }
	},
	"tipo": {
	  "id": 0,
	  "nome": "string",
	  "sigla": "string"
	},
	"ultimoDespacho": {
	  "data": "2019-02-10T18:57:39.426Z",
	  "descricao": "string"
	}
  }


function cleanProposicao() {
	return {
		id: "",
		ano: "",
		titulo: "",
		tema: "",
		proposicao: "",
		dataPublicacao: "",
		siglaSubTipo: "",
		numeroProposicao: "",
		ementa: "",
		resumo: "",
		status: "",
		url: "",
		autoria: "",
		local: "",
		veryfied: false
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

function setProposicao(proposicao) {

	let filterProposicao = cleanProposicao();

	filterProposicao.id = proposicao.id;
	filterProposicao.ano = proposicao.ano;
	filterProposicao.titulo = proposicao.descricaoTipo;
	filterProposicao.tema = "";
	filterProposicao.status = proposicao.ultimoStatus.descricaoTramitacao;
	filterProposicao.proposicao = proposicao.descricaoTipo;
	filterProposicao.dataPublicacao = proposicao.dataApresentacao;
	
	filterProposicao.siglaSubTipo = proposicao.siglaTipo;
	filterProposicao.numeroProposicao = proposicao.numero;
	filterProposicao.ementa = proposicao.ementa;

	if (proposicao.ementaDetalhada !== null)
		filterProposicao.resumo = proposicao.ementaDetalhada;
	else
		filterProposicao.resumo = "";
	filterProposicao.url = proposicao.urlInteiroTeor;
	filterProposicao.local = "Camara";

	// console.log(filterProposicao);
	return filterProposicao;
}

module.exports.cleanProposicao = cleanProposicao;
module.exports.listSiglaTipoProposicao = listSiglaTipoProposicao;
module.exports.setProposicao = setProposicao;