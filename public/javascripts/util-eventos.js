// nossovoto

function listDescricaoEvento(eventos) {

	let listDescricao = [];
	let listDescricaoTipo = [];
	for (let i = 0; i < eventos.length; i++) {
		let descricao = eventos[i].descricao;
		let descricaoTipo = eventos[i].descricaoTipo;
		listDescricao.push(descricao);
		listDescricaoTipo.push(descricaoTipo);
	}
	let setDescricao = [...new Set(listDescricao)];
	let setDescricaoTipo = [...new Set(listDescricaoTipo)];

	let list = [];
	for (let i = 0; i < listDescricao.length; i++) {
		list.push({ descricao: setDescricao[i], descricaoTipo: setDescricaoTipo[i] });
	}
	console.log(list);
	return listSubTipo;
}

module.exports.listDescricaoEvento = listDescricaoEvento;
