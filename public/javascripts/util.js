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
        veryfied: false
    }
}

// verify weather the object is empty or not

function isEmpty(obj){
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function listSubTipo(listMateria){

    let listSubTipo = [];
    let listDescricaoSubTipo = [];
    let subTipo = "";
    for (let i =0; i < listMateria.length; i++) {
        subTipo = listMateria[i].IdentificacaoMateria.SiglaSubtipoMateria;
        descricao = listMateria[i].IdentificacaoMateria.DescricaoSubtipoMateria;
        listSubTipo.push(subTipo);
        listDescricaoSubTipo.push(descricao);
    }
    let listTipo = [...new Set(listSubTipo)];
    let listDescricao = [...new Set(listDescricaoSubTipo)];

    let list = [];
    for (let i =0; i < listTipo.length; i++) {
        list.push({tipo: listTipo[i], descricao: listDescricao[i]});
    }
    console.log(list);
    return listSubTipo;
}

function setMateria(materia){

    let filterMateria = cleanMateria();

    filterMateria.id = materia.IdentificacaoMateria.CodigoMateria;
    filterMateria.ano = materia.IdentificacaoMateria.AnoMateria;
    filterMateria.titulo = materia.IdentificacaoMateria.DescricaoIdentificacaoMateria;
    if (materia.SituacaoAtual != null){
      filterMateria.tema = materia.SituacaoAtual.Autuacoes.Autuacao.Local.NomeLocal;
      if (materia.SituacaoAtual.Autuacoes.Autuacao.Situacao != null)
        filterMateria.status = materia.SituacaoAtual.Autuacoes.Autuacao.Situacao.DescricaoSituacao;
      else filterMateria.status = "";
    } else {
      filterMateria.tema = "";
    }
    filterMateria.materia = materia.IdentificacaoMateria.CodigoMateria;
    filterMateria.dataPublicacao = materia.DadosBasicosMateria.DataApresentacao;
    filterMateria.siglaSubTipo = materia.IdentificacaoMateria.SiglaCasaIdentificacaoMateria;
    filterMateria.numeroMateria = materia.IdentificacaoMateria.NumeroMateria;
    filterMateria.ementa = materia.DadosBasicosMateria.EmentaMateria;
    if (materia.DadosBasicosMateria.ExplicacaoEmentaMateria != null)
      filterMateria.resumo = materia.DadosBasicosMateria.ExplicacaoEmentaMateria;
    else
      filterMateria.resumo = "";
    if (materia.AutoresPrincipais != null)
      filterMateria.autoria = materia.AutoresPrincipais.AutorPrincipal.NomeAutor;
    else
      filterMateria.autoria = "";

    return filterMateria;
}

// exports the variables and functions above so that other modules can use them
module.exports.cleanMateria = cleanMateria;
module.exports.isEmpty = isEmpty;
module.exports.setMateria = setMateria;
module.exports.listSubTipo = listSubTipo;
