// nossovoto - orgaos

const axios = require('axios');
const util = require('./util');


const URL_API_TramitacaoSenado = "http://legis.senado.leg.br/dadosabertos/materia/movimentacoes/";
const URL_API_TramitacaoCamara = "https://dadosabertos.camara.leg.br/api/v2/proposicoes/";

function NewStatus() {
	status = {
		dataInicio: '',
		comissaoExtra: [{ local: '', siglaLocal: '', situacao: '', dataInicio: '', dataFim: '' }],
		CCJC: { situacao: '', dataInicio: '', dataFim: '' },
		plenario: { situacao: '', dataInicio: '', dataFim: '' },
		dataFinalizada: '',
		dataUltimaMovimentacao: '',
		apensada: { isApensada: false, propostaPrincipal: 0 },
		aprovado: false,
		sequencia: 0,
		local: '',
		siglaLocal: '',
		situacao: '',
		encaminhado: { casa: '', id: '' } // casa = senado || camara  && remetido == codigo 52
	}
	return status;
}

function FilterTramicaoCamara(tramitacao) {
	if (tramitacao.siglaOrgao === 'MESA'
		|| tramitacao.siglaOrgao === 'PLEN'
		|| tramitacao.siglaOrgao === 'CAPADR'
		|| tramitacao.siglaOrgao === 'CCTCI'
		|| tramitacao.siglaOrgao === 'CCJC'
		|| tramitacao.siglaOrgao === 'CDC'
		|| tramitacao.siglaOrgao === 'CDU'
		|| tramitacao.siglaOrgao === 'CDHM'
		|| tramitacao.siglaOrgao === 'CDEICS'
		|| tramitacao.siglaOrgao === 'CE'
		|| tramitacao.siglaOrgao === 'CFT'
		|| tramitacao.siglaOrgao === 'CME'
		|| tramitacao.siglaOrgao === 'CSSF'
		|| tramitacao.siglaOrgao === 'CTASP'
		|| tramitacao.siglaOrgao === 'CVT'
		|| tramitacao.siglaOrgao === 'CINDRA'
		|| tramitacao.siglaOrgao === 'CREDN'
		|| tramitacao.siglaOrgao === 'CLP'
		|| tramitacao.siglaOrgao === 'CSPCCO'
		|| tramitacao.siglaOrgao === 'CTUR'
		|| tramitacao.siglaOrgao === 'CMADS'
		|| tramitacao.siglaOrgao === 'CCULT'
		|| tramitacao.siglaOrgao === 'CESPO'
		|| tramitacao.siglaOrgao === 'CMULHER'
		|| tramitacao.siglaOrgao === 'CIDOSO'
		|| tramitacao.siglaOrgao === 'CPD') {
		return true;
	}
	return false;
}

function FilterTramicaoSenado(tramitacao) {
	if (tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.CodigoLocal === '3'
		|| tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.CodigoLocal === '110'
		|| tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.CodigoLocal === '133'
		|| tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.CodigoLocal === '142'
		|| tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.CodigoLocal === '152'
		|| tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.CodigoLocal === '153'
		|| tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.CodigoLocal === '165'
		|| tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.CodigoLocal === '184'
		|| tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.CodigoLocal === '197'
		|| tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.CodigoLocal === '176'
		|| tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.CodigoLocal === '236'
		|| tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.CodigoLocal === '271'
		|| tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.CodigoLocal === '354'
		|| tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.CodigoLocal === '434'
		|| tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.CodigoLocal === '436'
		|| tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.CodigoLocal === '439'
		|| tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.CodigoLocal === '440'
		|| tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.CodigoLocal === '442'
		|| tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.CodigoLocal === '443'
		|| tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.CodigoLocal === '444'
		|| tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.CodigoLocal === '446'
		|| tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.CodigoLocal === '543'
		|| tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.CodigoLocal === '544'
		|| tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.CodigoLocal === '545'
		|| tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.CodigoLocal === '547'
		|| tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.CodigoLocal === '548'
		|| tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.CodigoLocal === '549'
		|| tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.CodigoLocal === '550'
		|| tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.CodigoLocal === '551'
		|| tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.CodigoLocal === '552'
		|| tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.CodigoLocal === '553'
		|| tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.CodigoLocal === '554'
		|| tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.CodigoLocal === '556'
		|| tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.CodigoLocal === '557'
		|| tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.CodigoLocal === '559'
		|| tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.CodigoLocal === '560'
		|| tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.CodigoLocal === '561'
		|| tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.CodigoLocal === '1018'
		|| tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.CodigoLocal === '1019'
		|| tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.CodigoLocal === '1023'
		|| tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.CodigoLocal === '1530'
		|| tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.CodigoLocal === '1546'
		|| tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.CodigoLocal === '1616'
		|| tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.CodigoLocal === '1916'
		|| tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.CodigoLocal === '1969'
		|| tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.CodigoLocal === '2246') {
		return false;
	}
	return true;
}

function CompareTramitacaoCamaraBySequencia(a, b) {
	if (a.sequencia > b.sequencia)
		return 1;
	else if (a.sequencia < b.sequencia)
		return -1;
	return 0;
}

function IsComissaoExtraCamara(tramitacao) {
	if (tramitacao.siglaOrgao === 'PLEN'
		|| tramitacao.siglaOrgao === 'MESA'
		|| tramitacao.siglaOrgao === 'CCJC'
		|| tramitacao.siglaOrgao === 'COARQ')
		return false;
	return true;
}

async function GetNomeLocalCamara(tramitacao) {
	let response = await axios.get(tramitacao.uriOrgao);
	try {
		return response.data.dados.nome;
	} catch (error) {
		return '';
	}
}

function CompareTramitacaoSenadoByDate(a, b) {
	let dateA = util.GetIntFromDate(a.IdentificacaoTramitacao.DataTramitacao);
	let dateB = util.GetIntFromDate(b.IdentificacaoTramitacao.DataTramitacao);
	let ordemA = a.IdentificacaoTramitacao.NumeroOrdemTramitacao;
	let ordemB = b.IdentificacaoTramitacao.NumeroOrdemTramitacao;
	if (dateA > dateB)
		return 1;
	else if (dateA < dateB)
		return -1;
	else if (ordemA > ordemB)
		return 1;
	else if (ordemA < ordemB)
		return -1;
	return 0;
}

function IsComissaoExtraSenado(tramitacao) {
	if (tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.SiglaLocal === 'PLEN'
		|| tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.SiglaLocal === 'CCJ'
		|| tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.SiglaLocal === 'COARQ')
		return false;
	return true;
}

function IsApensadaSenado(tramitacoes) {
	// TODO
	return { isApensada: false, propostaPrincipal: 0 }
}

function IsApensadaCamara(tramitacoes) {
	// TODO
	let isApensada = false;
	for (const tramitacao of tramitacoes) {
		if (tramitacao.codSituacao === "925") {// Codigo 925 == Apensado
			isApensada = true;
		}
	}
	return { isApensada, propostaPrincipal: 0 }
}

async function GetTramitacaoSenado(id) {
	let response = await axios.get(URL_API_TramitacaoSenado + id);
	try {
		if (!util.IsNull(response.data.MovimentacaoMateria.Materia.Tramitacoes.Tramitacao))
			return response.data.MovimentacaoMateria.Materia;
	} catch (error) {
		return [];
	}
}

async function GetTramitacaoCamara(codigo) {
	let response = await axios.get(URL_API_TramitacaoCamara + codigo + "/tramitacoes");
	try {
		if (!util.IsNull(response.data.dados))
			return response.data.dados;
	} catch (error) {
		return [];
	}
}


// TODO -> apensado e remetido a camara
function GetStatusSenado(movimentacaoMateria) {
	let isCCJAprovado = false;	// Quando CCJ Aprova - Acabou o papel da Comissao de Cconstituição de Justiça e cidadania
	let isPlenAprovado = false;	// Quando Plenario Aprova - Vai para o Presidente Aprovar ou Vetar
	let isDecisaoTerminativa = false;	// Quando a Comissao Extra aprova sem necessidade de voto no plenario
	let comissoesExtra = [];
	let status = NewStatus();

	isCCJAprovado = movimentacaoMateria.IdentificacaoMateria.SiglaSubtipoMateria === 'MPV';

	let tramitacoes = movimentacaoMateria.Tramitacoes.Tramitacao;
	tramitacoes = tramitacoes.sort(CompareTramitacaoSenadoByDate);
	tramitacoes = tramitacoes.filter(tramitacao => FilterTramicaoSenado(tramitacao));

	let firstTramitacao = tramitacoes[0];
	let lastTramitacao = tramitacoes[tramitacoes.length - 1];

	status.dataInicio = firstTramitacao.IdentificacaoTramitacao.DataTramitacao;
	status.dataUltimaMovimentacao = lastTramitacao.IdentificacaoTramitacao.DataTramitacao;
	status.local = lastTramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.NomeLocal;
	status.siglaLocal = lastTramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.SiglaLocal;
	let atuacoes_size = movimentacaoMateria.SituacaoAtual.Autuacoes.Autuacao.length;
	status.situacao = util.GetSafe(() => movimentacaoMateria.SituacaoAtual.Autuacoes.Autuacao[atuacoes_size - 1].Situacao.DescricaoSituacao, '');

	for (let i = 0; i < tramitacoes.length; i++) {
		let tramitacao = tramitacoes[i];

		if (IsComissaoExtraSenado(tramitacao)) {
			let comissaoExtra = {};

			comissaoExtra.dataInicio = tramitacao.IdentificacaoTramitacao.DataTramitacao;
			comissaoExtra.local = tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.NomeLocal;
			comissaoExtra.siglaLocal = tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.SiglaLocal;
			let existComissao = comissoesExtra.some(comissao => comissao.siglaLocal === comissaoExtra.siglaLocal);
			if (!existComissao)
				comissoesExtra.push(comissaoExtra);
			if (util.GetSafe(() => tramitacao.IdentificacaoTramitacao.Situacao.CodigoSituacao, '0') === '146')	// Codigo 146 == APRECIADA EM DECISÃO TERMINATIVA PELAS COMISSÕES
				isDecisaoTerminativa = true;

		} else if (tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.SiglaLocal === 'CCJ') {
			if (status.CCJC.dataInicio === '')
				status.CCJC.dataInicio = tramitacao.IdentificacaoTramitacao.DataTramitacao;
			if (util.GetSafe(() => tramitacao.IdentificacaoTramitacao.Situacao.CodigoSituacao, '0') === '89') // Codigo 89  == APROVADO PARECER NA COMISSÃO
				isCCJAprovado = true;
			if (util.GetSafe(() => tramitacao.IdentificacaoTramitacao.Situacao.CodigoSituacao, '0') === '146')	// Codigo 146 == APRECIADA EM DECISÃO TERMINATIVA PELAS COMISSÕES
				isDecisaoTerminativa = true;

		} else if (tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.SiglaLocal === 'PLEN') {
			if (util.GetSafe(() => tramitacao.IdentificacaoTramitacao.Situacao.CodigoSituacao, '') === '25') // Codigo 25 == APROVADO
				isPlenAprovado = true;
			if ((isCCJAprovado || isDecisaoTerminativa) && status.plenario.dataInicio === '')
				status.plenario.dataInicio = tramitacao.IdentificacaoTramitacao.DataTramitacao;
		}
	}

	if (lastTramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.SiglaLocal === 'COARQ' || isDecisaoTerminativa)
		status.dataFinalizada = lastTramitacao.IdentificacaoTramitacao.DataTramitacao;

	if (util.GetSafe(() => movimentacaoMateria.SituacaoAtual.Autuacoes.Autuacao[atuacoes_size - 1].Situacao.CodigoSituacao, '') === '64') {// Codigo 64 == TRANSFORMADA EM NORMA JURÍDICA"
		status.aprovado = true;
		status.dataFinalizada = movimentacaoMateria.SituacaoAtual.Autuacoes.Autuacao[atuacoes_size - 1].Situacao.DataSituacao;
	}

	if (status.situacao === 'PREJUDICADA') {
		status.local = movimentacaoMateria.SituacaoAtual.Autuacoes.Autuacao[atuacoes_size - 1].Local.NomeLocal;
		status.siglaLocal = movimentacaoMateria.SituacaoAtual.Autuacoes.Autuacao[atuacoes_size - 1].Local.SiglaLocal;
		status.dataFinalizada = movimentacaoMateria.SituacaoAtual.Autuacoes.Autuacao[atuacoes_size - 1].Situacao.DataSituacao;
		status.dataUltimaMovimentacao = movimentacaoMateria.SituacaoAtual.Autuacoes.Autuacao[atuacoes_size - 1].Local.DataLocal;
	}

	let tramitacaoCE = [];
	for (let i = 0; i < comissoesExtra.length; i++) {
		let ce = comissoesExtra[i];
		tramitacaoCE[i] = tramitacoes.filter(tramitacao => tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.SiglaLocal == ce.siglaLocal);
		let lastTramitCE = {};
		for (let x = tramitacaoCE[i].length - 1; x >= 0; x--) {
			if (util.GetSafe(() => tramitacaoCE[i][x].IdentificacaoTramitacao.Situacao.DescricaoSituacao, '') !== '') {
				lastTramitCE.siglaLocal = tramitacaoCE[i][x].IdentificacaoTramitacao.OrigemTramitacao.Local.SiglaLocal;
				lastTramitCE.situacao = tramitacaoCE[i][x].IdentificacaoTramitacao.Situacao.DescricaoSituacao;
				if (util.GetSafe(() => tramitacaoCE[i][x].IdentificacaoTramitacao.Situacao.CodigoSituacao, '') === '89' 	// Codigo 89  == APROVADO PARECER NA COMISSÃO
					|| util.GetSafe(() => tramitacaoCE[i][x].IdentificacaoTramitacao.Situacao.CodigoSituacao, '') === '146' 	// Codigo 146 == APRECIADA EM DECISÃO TERMINATIVA PELAS COMISSÕES
					|| util.GetSafe(() => tramitacaoCE[i][x].IdentificacaoTramitacao.Situacao.DescricaoSituacao, '') === 'PREJUDICADA')
					lastTramitCE.dataFim = tramitacaoCE[i][x].IdentificacaoTramitacao.DataTramitacao;
				else
					lastTramitCE.dataFim = '';
				break;
			}
		}

		for (let z = 0; z < comissoesExtra.length; z++) {
			if (comissoesExtra[z].siglaLocal === lastTramitCE.siglaLocal) {
				comissoesExtra[z].situacao = lastTramitCE.situacao;
				comissoesExtra[z].dataFim = lastTramitCE.dataFim;
				break;
			}
		}
	}

	status.comissaoExtra = comissoesExtra;

	let tramitacaoCCJ = tramitacoes.filter(tramitacao => tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.SiglaLocal === 'CCJ');
	for (i = tramitacaoCCJ.length - 1; i >= 0; i--) {
		if (util.GetSafe(() => tramitacaoCCJ[i].IdentificacaoTramitacao.Situacao.DescricaoSituacao, '') !== '') {
			if (status.CCJC.dataInicio !== '')
				status.CCJC.situacao = tramitacaoCCJ[i].IdentificacaoTramitacao.Situacao.DescricaoSituacao;
			if (isCCJAprovado || status.situacao === 'PREJUDICADA')
				status.CCJC.dataFim = tramitacaoCCJ[i].IdentificacaoTramitacao.DataTramitacao;
			break;
		}
	}

	let tramitacaoPLEN = tramitacoes.filter(tramitacao => tramitacao.IdentificacaoTramitacao.OrigemTramitacao.Local.SiglaLocal === 'PLEN');
	for (i = tramitacaoPLEN.length - 1; i >= 0; i--) {
		if (util.GetSafe(() => tramitacaoPLEN[i].IdentificacaoTramitacao.Situacao.DescricaoSituacao, '') !== '') {
			if (status.plenario.dataInicio !== '')
				if (status.situacao === 'PREJUDICADA')
					status.plenario.situacao = 'PREJUDICADA';
				else
					status.plenario.situacao = tramitacaoPLEN[i].IdentificacaoTramitacao.Situacao.DescricaoSituacao;
			if (isPlenAprovado || status.situacao === 'PREJUDICADA')
				status.plenario.dataFim = tramitacaoPLEN[i].IdentificacaoTramitacao.DataTramitacao;
			break;
		}
	}

	return status;
}

async function GetStatusCamara(tramitacoes) {
	let isCCJAprovodo = false;	// Quando CCJ Aprova - Acabou o papel da Comissao de Cconstituição de Justiça e cidadania
	let isPlenAprovado = false;	// Quando Plenario Aprova - Vai para o Presidente Aprovar ou Vetar
	let isDecisaoTerminativa = false;	// Quando a Comissao Extra aprova sem necessidade de voto no plenario
	let comissoesExtra = [];
	let status = NewStatus();

	status.sequencia = tramitacoes.length;
	tramitacoes = tramitacoes.sort(CompareTramitacaoCamaraBySequencia);
	tramitacoes = tramitacoes.filter(tramitacao => FilterTramicaoCamara(tramitacao));

	status.apensada = IsApensadaCamara(tramitacoes);
	let firstTramitacao = tramitacoes[0];
	let lastTramitacao = tramitacoes[tramitacoes.length - 1];

	status.dataInicio = util.ParseDate(firstTramitacao.dataHora);
	status.dataUltimaMovimentacao = util.ParseDate(lastTramitacao.dataHora);
	status.local = await GetNomeLocalCamara(lastTramitacao);
	status.siglaLocal = lastTramitacao.siglaOrgao;
	status.situacao = lastTramitacao.descricaoSituacao ? lastTramitacao.descricaoSituacao : lastTramitacao.descricaoTramitacao;

	for (let i = 0; i < tramitacoes.length; i++) {
		let tramitacao = tramitacoes[i];

		if (IsComissaoExtraCamara(tramitacao)) {
			let comissaoExtra = {};

			comissaoExtra.dataInicio = util.ParseDate(tramitacao.dataHora);
			comissaoExtra.local = await GetNomeLocalCamara(tramitacao);
			comissaoExtra.siglaLocal = tramitacao.siglaOrgao;
			let existComissao = comissoesExtra.some(comissao => comissao.siglaLocal === comissaoExtra.siglaLocal);
			if (!existComissao)
				comissoesExtra.push(comissaoExtra);
			//TODO -> DECISAO TERMINATIVA
			if (tramitacao.codTipoTramitacao === 'xx')	// Codigo xx == APRECIADA EM DECISÃO TERMINATIVA PELAS COMISSÕES
				isDecisaoTerminativa = true;

		} else if (tramitacao.siglaOrgao === 'CCJC') {
			if (status.CCJC.dataInicio === '')
				status.CCJC.dataInicio = util.ParseDate(tramitacao.dataHora);
			if (tramitacao.codTipoTramitacao === '240') // Codigo 240 == Aprovação
				isCCJAprovodo = true;
			//TODO -> CCJC Decisao terminativa
		} else if (tramitacao.siglaOrgao === 'PLEN' || tramitacao.siglaOrgao === 'MESA') {
			//TODO -> Aprovado no PLEN
			if (tramitacao.codTipoTramitacao === '244') // Codigo 244 == APROVACAO DE PROPOSICAO EM PLENARIO
				isPlenAprovado = true;
			if ((isCCJAprovodo || isDecisaoTerminativa) && status.plenario.dataInicio === '')
				status.plenario.dataInicio = util.ParseDate(tramitacao.dataHora);
		}

		// TODO -> TRATAR CODIGO 128 REMESSA AO SENADO

		if (tramitacao.codTipoTramitacao === '251') { // Codigo 251 == TRANSFORMADA EM NORMA JURÍDICA
			status.aprovado = true;
			status.dataFinalizada = util.ParseDate(tramitacao.dataHora);
		}

		if (tramitacao.codTipoTramitacao === '200') { // Codigo 200 == RETIRADA PELO AUTOR - REJEITADO
			status.aprovado = false;
			status.dataFinalizada = util.ParseDate(tramitacao.dataHora);
		}

	}

	//TODO ve se ta certo
	if (lastTramitacao.codTipoTramitacao === '502' || isDecisaoTerminativa) // Codigo 251 == ARQUIVAMENTO
		status.dataFinalizada = lutil.ParseDate(lastTramitacao.dataHora);

	let tramitacaoCE = [];
	for (let i = 0; i < comissoesExtra.length; i++) {
		let comissaoExtra = comissoesExtra[i];
		tramitacaoCE[i] = tramitacoes.filter(tramitacao => tramitacao.siglaOrgao == comissaoExtra.siglaLocal);
		let lastTramitCE = {};
		for (let x = tramitacaoCE[i].length - 1; x >= 0; x--) {
			lastTramitCE.situacao = util.GetSafe(() => tramitacaoCE[i][x].descricaoSituacao, tramitacaoCE[i][x].descricaoTramitacao);
			lastTramitCE.siglaLocal = tramitacaoCE[i][x].siglaOrgao;
			if (tramitacaoCE[i][x].codTipoTramitacao === '240' 	// Codigo 240 == APROVADO
				|| tramitacaoCE[i][x].codTipoTramitacao === 'XX' 	// Codigo xx == APRECIADA EM DECISÃO TERMINATIVA PELAS COMISSÕES
				|| tramitacaoCE[i][x].codTipoTramitacao === 'XX')	// Codigo xx == PREJUDICADA --- ACHO QUE NAO TEM, PRECISA PESQUISAR MELHOR
				lastTramitCE.dataFim = tramitacaoCE[i][x].IdentificacaoTramitacao.DataTramitacao;
			else
				lastTramitCE.dataFim = '';
			break;
		}
		for (let z = 0; z < comissoesExtra.length; z++) {
			if (comissoesExtra[z].siglaLocal === lastTramitCE.siglaLocal) {
				comissoesExtra[z].situacao = lastTramitCE.situacao;
				comissoesExtra[z].dataFim = lastTramitCE.dataFim;
				break;
			}
		}
	}

	status.comissaoExtra = comissoesExtra;
	return status;
}

module.exports.NewStatus = NewStatus;
module.exports.GetStatusSenado = GetStatusSenado;
module.exports.GetStatusCamara = GetStatusCamara;
module.exports.FilterTramicaoCamara = FilterTramicaoCamara;
module.exports.FilterTramicaoSenado = FilterTramicaoSenado;
module.exports.GetTramitacaoSenado = GetTramitacaoSenado;
module.exports.GetTramitacaoCamara = GetTramitacaoCamara;