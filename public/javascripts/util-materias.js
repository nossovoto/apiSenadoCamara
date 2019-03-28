// nossovoto

const util = require('./util');

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
        materia.IdentificacaoMateria.SiglaSubtipoMateria === 'MPV' ||
        materia.IdentificacaoMateria.SiglaSubtipoMateria === 'PDN' ||
        materia.IdentificacaoMateria.SiglaSubtipoMateria === 'PDS' ||
        materia.IdentificacaoMateria.SiglaSubtipoMateria === 'PEC' ||
        materia.IdentificacaoMateria.SiglaSubtipoMateria === 'PLC' ||
        materia.IdentificacaoMateria.SiglaSubtipoMateria === 'PLN' ||
        materia.IdentificacaoMateria.SiglaSubtipoMateria === 'PLS' ||
        // materia.IdentificacaoMateria.SiglaSubtipoMateria === 'SCD' ||
		materia.IdentificacaoMateria.SiglaSubtipoMateria === 'VET' ||
		materia.IdentificacaoMateria.SiglaSubtipoMateria === 'PRS' ||
        materia.IdentificacaoMateria.SiglaSubtipoMateria === 'PL')
            return true;
    else return false;
}

function filterAssunto(materia) {
	if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'CE') 	return 'Educação, Cultura e Esporte';
	if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'SLCN') 	return 'Legislação Interna';
	if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'CMO') 	return 'Orçamentos do Governo';
	if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'SACTFC')	return 'Transparência, Fiscalização e Defesa ao Consumidor';
	if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'SACE') 	return 'Educação, Cultura e Esporte';
	if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'CRA') 	return 'Agricultura';
	if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'CAE') 	return 'Econômia';
	if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'CAS') 	return 'Assuntos Sociais';
	if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'CRE') 	return 'Relações Exteriores e Defesa';
	if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'SACIFR')	return 'Infraestrutura';
	if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'CDR') 	return 'Desenvolvimento Regional e Turismo';
	if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'SACRE') 	return 'Relações Exteriores e Defesa';
	if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'SACCJ') 	return 'Constituição, Justiça e Cidadania';
	if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'SACCT') 	return 'Ciência, Tecnologia e Inovação';
	if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'SACDH') 	return 'Direitos Humanos';
	if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'CEDP') 	return 'Ética';
	if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'CCS') 	return 'Comunicação';
	if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'CCT') 	return 'Ciência, Tecnologia e Inovação';
	if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'CCJ') 	return 'Constituição, Justiça e Cidadania';
	if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'SACAE') 	return 'Econômia';
	if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'CTFC') 	return 'Transparência, Fiscalização e Defesa ao Consumidor';
	if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'SACMA') 	return 'Meio Ambiente';
	if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'CDH') 	return 'Direitos Humanos';
	if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'SACAS') 	return 'Assuntos Sociais';
	if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'SACDR') 	return 'Desenvolvimento Regional e Turismo';
	if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'SACRA') 	return 'Agricultura';
	if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'CMA') 	return 'Meio Ambiente';
	if (materia.SituacaoAtual.Autuacoes.Autuacao.Local.SiglaLocal === 'CI') 	return 'Insfraestrutura';	
	if (materia.IdentificacaoMateria.SiglaSubtipoMateria === 'MPV' || 		
		materia.IdentificacaoMateria.SiglaSubtipoMateria === 'VET') 			return 'Decreto Presidêncial';
    return '';
}

function filterAssuntoOld(materia){
	if (materia.Assunto.AssuntoEspecifico.Codigo === "101") return "Administração Pública";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "102") return "Administração Pública";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "103") return "Administração Pública";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "104") return "Administração Pública";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "105") return "Administração Pública";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "106") return "Agricultura, Pecuária, Pesca e Extrativismo";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "107") return "Cidades e Desenvolvimento Urbano";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "108") return "Administração Pública";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "109") return "Indústria, Comércio e Serviços";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "110") return "Energia, Recursos Hídricos e Minerais";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "111") return "Agricultura, Pecuária, Pesca e Extrativismo";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "112") return "Finanças Públicas e Orçamento";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "113") return "Economia";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "114") return "Estrutura Fundiária";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "115") return "Cidades e Desenvolvimento Urbano";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "116") return "Energia, Recursos Hídricos e Minerais";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "117") return "Finanças Públicas e Orçamento";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "118") return "Turismo";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "119") return "Viação, Transporte e Mobilidade";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "120") return "Relações Internacionais e Comércio Exterior";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "121") return "Homenagens e Datas Comemorativas";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "122") return "Homenagens e Datas Comemorativas";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "123") return "Direito e Defesa do Consumidor";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "124") return "Defesa e Segurança";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "125") return "Ciência, Tecnologia e Inovação";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "126") return "Direito Civil e Processual Civil";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "127") return "Economia";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "128") return "Direto Constitucional";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "129") return "Política, Partidos e Eleições";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "130") return "Viação, Transporte e Mobilidade";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "131") return "Direito Penal e Processual Penal";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "132") return "Direto Constitucional";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "133") return "Processo Legislativo e Atuação Parlamentar";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "134") return "Processo Legislativo e Atuação Parlamentar";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "135") return "Defesa e Segurança";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "136") return "Viação, Transporte e Mobilidade";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "137") return "Arte, Cultura e Religião";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "138") return "Previdência e Assistência Social";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "139") return "Ciência, Tecnologia e Inovação";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "140") return "Comunicações";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "141") return "Esporte e Lazer";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "142") return "Previdência e Assistência Social";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "143") return "Direitos Humanos e Minorias";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "144") return "Educação";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "145") return "Direito Constitucional";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "146") return "Meio Ambiente e Desenvolvimento Sustentável";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "147") return "Previdência e Assistência Social";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "148") return "Trabalho e Emprego";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "149") return "Saúde";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "161") return "Finanças Públicas e Orçamento";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "162") return "Finanças Públicas e Orçamento";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "163") return "Finanças Públicas e Orçamento";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "164") return "Finanças Públicas e Orçamento";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "165") return "Finanças Públicas e Orçamento";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "166") return "Finanças Públicas e Orçamento";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "167") return "Finanças Públicas e Orçamento";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "168") return "Finanças Públicas e Orçamento";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "169") return "Finanças Públicas e Orçamento";
	if (materia.Assunto.AssuntoEspecifico.Codigo === "181") return "Finanças Públicas e Orçamento";
	return "";
}

function setMateria(materia) {

	let newMateria = cleanMateria();

	newMateria.id = materia.IdentificacaoMateria.CodigoMateria;
	newMateria.ano = materia.IdentificacaoMateria.AnoMateria;
	newMateria.titulo = materia.IdentificacaoMateria.DescricaoIdentificacaoMateria;
	if (materia.SituacaoAtual != null) {
		newMateria.tema = filterAssunto(materia);
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
	newMateria.url = "https://www25.senado.leg.br/web/atividade/materias/-/materia/" + materia.IdentificacaoMateria.CodigoMateria;
	newMateria.verified = !util.IsAnyValueEmpty(newMateria);

	return newMateria;
}

module.exports.cleanMateria = cleanMateria;
module.exports.listSubTipoMateria = listSubTipoMateria;
module.exports.listNomeLocalMateria = listNomeLocalMateria;
module.exports.filterSiglaSubtipoMateria = filterSiglaSubtipoMateria;
module.exports.filterAssunto = filterAssunto;
module.exports.setMateria = setMateria;