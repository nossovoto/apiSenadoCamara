// nossovoto

// return a empty Materia
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
		veryfied: false
	}
}

function listSubTipoMateria(listMateria) {

	let listSubTipo = [];
	let listDescricaoSubTipo = [];
	for (let i = 0; i < listMateria.length; i++) {
		let subTipo = listMateria[i].IdentificacaoMateria.SiglaSubtipoMateria;
		let descricao = listMateria[i].IdentificacaoMateria.DescricaoSubtipoMateria;
		listSubTipo.push(subTipo);
		listDescricaoSubTipo.push(descricao);
	}
	let listTipo = [...new Set(listSubTipo)];
	let listDescricao = [...new Set(listDescricaoSubTipo)];

	let list = [];
	for (let i = 0; i < listTipo.length; i++) {
		list.push({ tipo: listTipo[i], descricao: listDescricao[i] });
	}
	return list;
}

function listNomeLocalMateria(listMateria) {
	let listSiglaLocal = [];
	let listNomeLocal = [];
	for (let i = 0; i < listMateria.length; i++) {
		if (listMateria[i].SituacaoAtual != null){
			let siglaLocal = listMateria[i].SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal;
			let nomeLocal = listMateria[i].SituacaoAtual.Autuacoes.Autuacao.Local.NomeLocal;
			listSiglaLocal.push(siglaLocal);
			listNomeLocal.push(nomeLocal);
		}
	}
	let listSigla = [...new Set(listSiglaLocal)];
	let listNome = [...new Set(listNomeLocal)];

	let list = [];
	for (let i = 0; i < listSigla.length; i++) {
		list.push({ Sigla: listSigla[i], Local: listNome[i] });
	}
	return listNomeLocal;
}

function filterSiglaSubtipoMateria(materia) {
    if (materia.IdentificacaoMateria.SiglaSubtipoMateria === 'ECD' ||
        materia.IdentificacaoMateria.SiglaSubtipoMateria === 'ECD' ||
        materia.IdentificacaoMateria.SiglaSubtipoMateria === 'MPV' ||
        materia.IdentificacaoMateria.SiglaSubtipoMateria === 'PDN' ||
        materia.IdentificacaoMateria.SiglaSubtipoMateria === 'PDS' ||
        materia.IdentificacaoMateria.SiglaSubtipoMateria === 'PEC' ||
        materia.IdentificacaoMateria.SiglaSubtipoMateria === 'PLC' ||
        materia.IdentificacaoMateria.SiglaSubtipoMateria === 'PLN' ||
        materia.IdentificacaoMateria.SiglaSubtipoMateria === 'PLS' ||
        materia.IdentificacaoMateria.SiglaSubtipoMateria === 'SCD' ||
        materia.IdentificacaoMateria.SiglaSubtipoMateria === 'VET' ||
        materia.IdentificacaoMateria.SiglaSubtipoMateria === 'PL')
            return true;
    else return false;
}

function filterNomeLocalMateria(materia) {
    if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'CE') return 'Educação, Cultura e Esporte';
    if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'SLCN') return 'Legislação Interna';
    if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'CMO') return 'Orçamentos do Governo';
    if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'SACTFC') return 'Transparência, Fiscalização e Defesa ao Consumidor';
    if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'SACE') return 'Educação, Cultura e Esporte';
    if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'CRA') return 'Agricultura';
    if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'CAE') return 'Políticas Econômicas';
    if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'CAS') return 'Políticas Sociais';
    if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'CRE') return 'Relações Exteriores';
    if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'SACIFR') return 'Infraestrutura';
    if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'CDR') return 'Desenvolvimento Regional e Turismo';
    if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'SACRE') return 'Relações Exteriores';
    if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'SACCJ') return 'Constituição, Justiça e Cidadania';
    if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'SACCT') return 'Ciência, Tecnologia e Inovação';
    if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'SACDH') return 'Direitos Humanos';
    if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'CEDP') return 'Ética';
    if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'CCS') return 'Comunicação Social';
    if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'CCT') return 'Ciência, Tecnologia e Inovação';
    if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'CCJ') return 'Constituição, Justiça e Cidadania';
    if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'SACAE') return 'Políticas Econômicas';
    if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'CTFC') return 'Transparência, Fiscalização e Defesa ao Consumidor';
    if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'SACMA') return 'Meio Ambiente';
    if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'CDH') return 'Direitos Humanos';
    if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'SACAS') return 'Políticas Sociais';
    if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'SACDR') return 'Desenvolvimento Regional e Turismo';
    if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'SACRA') return 'Agricultura';
    if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'CMA') return 'Meio Ambiente';
    if (materia.IdentificacaoMateria.SiglaSubtipoMateria === 'MPV' || materia.IdentificacaoMateria.SiglaSubtipoMateria === 'VET') return 'Decreto Presidêncial';
    return '';
}

function setMateria(materia) {

	let newMateria = cleanMateria();

	newMateria.id = materia.IdentificacaoMateria.CodigoMateria;
	newMateria.ano = materia.IdentificacaoMateria.AnoMateria;
	newMateria.titulo = materia.IdentificacaoMateria.DescricaoIdentificacaoMateria;
	if (materia.SituacaoAtual != null) {
		newMateria.tema = filterNomeLocalMateria(materia);
		if (materia.SituacaoAtual.Autuacoes.Autuacao.Situacao != null)
			newMateria.status = materia.SituacaoAtual.Autuacoes.Autuacao.Situacao.DescricaoSituacao;
		else newMateria.status = "";
	} else {
		newMateria.tema = "";
	}
	newMateria.materia = materia.IdentificacaoMateria.CodigoMateria;
	newMateria.dataPublicacao = materia.DadosBasicosMateria.DataApresentacao;
	newMateria.siglaSubTipo = materia.IdentificacaoMateria.SiglaCasaIdentificacaoMateria;
	newMateria.numeroMateria = materia.IdentificacaoMateria.NumeroMateria;
	newMateria.ementa = materia.DadosBasicosMateria.EmentaMateria;
	if (materia.DadosBasicosMateria.ExplicacaoEmentaMateria != null)
		newMateria.resumo = materia.DadosBasicosMateria.ExplicacaoEmentaMateria;
	else
		newMateria.resumo = "";
	if (materia.AutoresPrincipais != null)
		newMateria.autoria = materia.AutoresPrincipais.AutorPrincipal.NomeAutor;
	else
		newMateria.autoria = "";
	newMateria.local = "Senado";

	return newMateria;
}

module.exports.cleanMateria = cleanMateria;
module.exports.listSubTipoMateria = listSubTipoMateria;
module.exports.listNomeLocalMateria = listNomeLocalMateria;
module.exports.filterSiglaSubtipoMateria = filterSiglaSubtipoMateria;
module.exports.filterNomeLocalMateria = filterNomeLocalMateria;
module.exports.setMateria = setMateria;