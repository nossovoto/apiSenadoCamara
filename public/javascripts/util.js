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
        anoMateria: "",
        resumo: "",
        ementa: "",
        status: "",
        url: "",
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

function setMateria(materiaArray){

    let materia = cleanMateria();

    materia.id = materiaArray.IdentificacaoMateria.CodigoMateria;
    materia.ano = materiaArray.IdentificacaoMateria.AnoMateria;
    materia.titulo = materiaArray.IdentificacaoMateria.DescricaoSubtipoMateria;
    materia.tema = materiaArray.IdentificacaoMateria.DescricaoIdentificacaoMateria;
    materia.materia = materiaArray.IdentificacaoMateria.CodigoMateria;
    materia.dataPublicacao = materiaArray.DadosBasicosMateria.DataApresentacao;
    materia.siglaSubTipo = materiaArray.IdentificacaoMateria.SiglaCasaIdentificacaoMateria;
    materia.numeroMateria = materiaArray.IdentificacaoMateria.NumeroMateria;
    materia.ementa = materiaArray.DadosBasicosMateria.EmentaMateria;
    materia.anoMateria = materiaArray.IdentificacaoMateria.AnoMateria;

    return materia;
}

// exports the variables and functions above so that other modules can use them
module.exports.cleanMateria = cleanMateria;
module.exports.isEmpty = isEmpty;
module.exports.setMateria = setMateria;