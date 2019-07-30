// nossovoto - orgaos

const axios = require('axios');
const util =  require('./util');


const URL_API_TramitacaoSenado = "http://legis.senado.leg.br/dadosabertos/materia/movimentacoes/";
const URL_API_TramitacaoCamara = "https://dadosabertos.camara.leg.br/api/v2/proposicoes/";

const comissoesPermanentesAtual = [
	{"id":"4", 		"nome": "Mesa Diretora da Câmara dos Deputados", "sigla":"MESA"},
	{"id":"180", 	"nome": "PLENÁRIO", "sigla":"PLEN"},
	{"id":"2001", 	"nome": "Comissão de Agricultura, Pecuária, Abastecimento e Desenvolvimento Rural", "sigla":"CAPADR"},
	{"id":"2002", 	"nome": "Comissão de Ciência e Tecnologia, Comunicação e Informática", "sigla":"CCTCI"},
	{"id":"2003", 	"nome": "Comissão de Constituição e Justiça e de Cidadania", "sigla":"CCJC"},
	{"id":"2004", 	"nome": "Comissão de Defesa do Consumidor", "sigla":"CDC"},
	{"id":"2006", 	"nome": "Comissão de Desenvolvimento Urbano", "sigla":"CDU"},
	{"id":"2007", 	"nome": "Comissão de Direitos Humanos e Minorias", "sigla":"CDHM"},
	{"id":"2008", 	"nome": "Comissão de Desenvolvimento Econômico, Indústria, Comércio e Serviços", "sigla":"CDEICS"},
	{"id":"2009", 	"nome": "Comissão de Educação", "sigla":"CE"},
	{"id":"2010", 	"nome": "Comissão de Finanças e Tributação", "sigla":"CFT"},
	{"id":"2011", 	"nome": "Comissão de Fiscalização Financeira e Controle", "sigla":"CFFC"},
	{"id":"2012", 	"nome": "Comissão de Minas e Energia", "sigla":"CME"},
	{"id":"2014", 	"nome": "Comissão de Seguridade Social e Família", "sigla":"CSSF"},
	{"id":"2015", 	"nome": "Comissão de Trabalho, de Administração e Serviço Público", "sigla":"CTASP"},
	{"id":"2016", 	"nome": "Comissão de Viação e Transportes", "sigla":"CVT"},
	{"id":"2017", 	"nome": "Comissão de Integração Nacional, Desenvolvimento Regional e da Amazônia", "sigla":"CINDRA"},
	{"id":"2018", 	"nome": "Comissão de Relações Exteriores e de Defesa Nacional", "sigla":"CREDN"},
	{"id":"5438", 	"nome": "Comissão de Legislação Participativa", "sigla": "CLP"},
	{"id":"5503", 	"nome": "Comissão de Segurança Pública e Combate ao Crime Organizado", "sigla": "CSPCCO"},
	{"id":"6066", 	"nome": "Comissão de Turismo", "sigla": "CTUR"},
	{"id":"6174", 	"nome": "Comissão de Meio Ambiente e Desenvolvimento Sustentável", "sigla": "CMADS"},
	{"id":"536996", "nome": "Comissão de Cultura", "sigla": "CCULT"},
	{"id":"537236", "nome": "Comissão do Esporte", "sigla": "CESPO"},
	{"id":"537870", "nome": "Comissão de Defesa dos Direitos da Mulher", "sigla": "CMULHER"},
	{"id":"537871", "nome": "Comissão de Defesa dos Direitos da Pessoa Idosa", "sigla": "CIDOSO"},
	{"id":"537480", "nome": "Comissão de Defesa dos Direitos das Pessoas com Deficiência", "sigla": "CPD"}
]

const nomeLocalNaoAparecer = [
	{"CodigoLocal": "3",	"SiglaLocal": "ADVOSF",	"NomeLocal": "Advocacia do Senado Federal","TipoLocal": "A","DescricaoTipoLocal": "Unidade Administrativa","SiglaCasaLocal": "SF","NomeCasaLocal": "Senado Federal","DataCriacaoLocal": "1900-01-01"},
	{"CodigoLocal": "434",	"SiglaLocal": "ATRSGM",	"NomeLocal": "Assessoria Técnica","TipoLocal": "A","DescricaoTipoLocal": "Unidade Administrativa","SiglaCasaLocal": "SF","NomeCasaLocal": "Senado Federal","DataCriacaoLocal": "2016-01-04"},
	{"CodigoLocal": "1018",	"SiglaLocal": "COALSGM","NomeLocal": "Coordenação de Apoio Logístico","TipoLocal": "A","DescricaoTipoLocal": "Unidade Administrativa","SiglaCasaLocal": "SF","NomeCasaLocal": "Senado Federal","DataCriacaoLocal": "2014-07-08"},
	{"CodigoLocal": "559",	"SiglaLocal": "COAME",	"NomeLocal": "Coordenação de Apoio à Mesa","TipoLocal": "A","DescricaoTipoLocal": "Unidade Administrativa","SiglaCasaLocal": "SF","NomeCasaLocal": "Senado Federal","DataCriacaoLocal": "2016-01-04"},
	{"CodigoLocal": "438",	"SiglaLocal": "COARQ",	"NomeLocal": "Coordenação de Arquivo","TipoLocal": "A","DescricaoTipoLocal": "Unidade Administrativa","SiglaCasaLocal": "SF","NomeCasaLocal": "Senado Federal","DataCriacaoLocal": "2016-01-04"},
	{"CodigoLocal": "561",	"SiglaLocal": "COCETI",	"NomeLocal": "Coordenação de Comissões Especiais, Temporárias e Parlamentares de Inquérito","TipoLocal": "A","DescricaoTipoLocal": "Unidade Administrativa","SiglaCasaLocal": "SF","NomeCasaLocal": "Senado Federal","DataCriacaoLocal": "2016-01-04"},
	{"CodigoLocal": "554",	"SiglaLocal": "COCM",	"NomeLocal": "Coordenação de Comissões Mistas","TipoLocal": "A","DescricaoTipoLocal": "Unidade Administrativa","SiglaCasaLocal": "SF","NomeCasaLocal": "Senado Federal","DataCriacaoLocal": "2016-01-04"},
	{"CodigoLocal": "110",	"SiglaLocal": "CONLEG",	"NomeLocal": "Consultoria Legislativa","TipoLocal": "A","DescricaoTipoLocal": "Unidade Administrativa","SiglaCasaLocal": "SF","NomeCasaLocal": "Senado Federal","DataCriacaoLocal": "1900-01-01"},
	{"CodigoLocal": "271",	"SiglaLocal": "CONORF",	"NomeLocal": "Consultoria de Orçamentos, Fiscalização e Controle","TipoLocal": "A","DescricaoTipoLocal": "Unidade Administrativa","SiglaCasaLocal": "SF","NomeCasaLocal": "Senado Federal","DataCriacaoLocal": "2001-01-01"},
	{"CodigoLocal": "1019", "SiglaLocal": "CORELE",	"NomeLocal": "Coordenação de Redação Legislativa","TipoLocal": "A","DescricaoTipoLocal": "Unidade Administrativa","SiglaCasaLocal": "SF","NomeCasaLocal": "Senado Federal","DataCriacaoLocal": "2017-02-01"},
	{"CodigoLocal": "446",  "SiglaLocal": "CORREG",	"NomeLocal": "Corregedoria Parlamentar","TipoLocal": "C","DescricaoTipoLocal": "Colegiado","SiglaCasaLocal": "SF","NomeCasaLocal": "Senado Federal","DataCriacaoLocal": "1993-03-17"},
	{"CodigoLocal": "1916", "SiglaLocal": "CPCMS",	"NomeLocal": "Representação Brasileira no Parlamento do Mercosul","TipoLocal": "C","DescricaoTipoLocal": "Colegiado","SiglaCasaLocal": "CN","NomeCasaLocal": "Congresso Nacional","DataCriacaoLocal": "2015-02-02"},
	{"CodigoLocal": "2246", "SiglaLocal": "CPIBRUM","NomeLocal": "CPI de Brumadinho","TipoLocal": "C","DescricaoTipoLocal": "Colegiado","SiglaCasaLocal": "SF","NomeCasaLocal": "Senado Federal","DataCriacaoLocal": "2019-02-13"},
	{"CodigoLocal": "133",  "SiglaLocal": "DGER",	"NomeLocal": "Diretoria-Geral","TipoLocal": "A","DescricaoTipoLocal": "Unidade Administrativa","SiglaCasaLocal": "SF","NomeCasaLocal": "Senado Federal","DataCriacaoLocal": "1900-01-01"},
	{"CodigoLocal": "1546",	"SiglaLocal": "PJS",	"NomeLocal": "Conselho do Projeto Jovem Senador","TipoLocal": "C","DescricaoTipoLocal": "Colegiado","SiglaCasaLocal": "SF","NomeCasaLocal": "Senado Federal","DataCriacaoLocal": "2010-08-12"},
	{"CodigoLocal": "1530",	"SiglaLocal": "DJEM",	"NomeLocal": "Conselho do Diploma José Ermírio de Moraes","TipoLocal": "C","DescricaoTipoLocal": "Colegiado","SiglaCasaLocal": "SF","NomeCasaLocal": "Senado Federal","DataCriacaoLocal": "2009-10-31","CodigoLocal": "437","SiglaLocal": "PRSECR","NomeLocal": "Primeira Secretaria","TipoLocal": "A","DescricaoTipoLocal": "Unidade Administrativa","SiglaCasaLocal": "SF","NomeCasaLocal": "Senado Federal","DataCriacaoLocal": "2016-01-04"},
	{"CodigoLocal": "560",	"SiglaLocal": "RPBMER",	"NomeLocal": "Representação Brasileira No Parlamento do Mercosul","TipoLocal": "A","DescricaoTipoLocal": "Unidade Administrativa","SiglaCasaLocal": "SF","NomeCasaLocal": "Senado Federal","DataCriacaoLocal": "2016-01-04"},
	{"CodigoLocal": "544",	"SiglaLocal": "SACAE",	"NomeLocal": "Secretaria de Apoio à Comissão de Assuntos Econômicos","TipoLocal": "A","DescricaoTipoLocal": "Unidade Administrativa","SiglaCasaLocal": "SF","NomeCasaLocal": "Senado Federal","DataCriacaoLocal": "2016-01-04"},
	{"CodigoLocal": "545",	"SiglaLocal": "SACAS",	"NomeLocal": "Secretaria de Apoio à Comissão de Assuntos Sociais","TipoLocal": "A","DescricaoTipoLocal": "Unidade Administrativa","SiglaCasaLocal": "SF","NomeCasaLocal": "Senado Federal","DataCriacaoLocal": "2016-01-04"},
	{"CodigoLocal": "547",	"SiglaLocal": "SACCJ",	"NomeLocal": "Secretaria de Apoio à Comissão de Constituição, Justiça e Cidadania","TipoLocal": "A","DescricaoTipoLocal": "Unidade Administrativa","SiglaCasaLocal": "SF","NomeCasaLocal": "Senado Federal","DataCriacaoLocal": "2016-01-04"},
	{"CodigoLocal": "548",	"SiglaLocal": "SACCT",	"NomeLocal": "Secretaria de Apoio à Comissão de Ciência, Tecnologia, Inovação, Comunicação e Informática","TipoLocal": "A","DescricaoTipoLocal": "Unidade Administrativa","SiglaCasaLocal": "SF","NomeCasaLocal": "Senado Federal","DataCriacaoLocal": "2016-01-04"},
	{"CodigoLocal": "549",	"SiglaLocal": "SACDH",	"NomeLocal": "Secretaria de Apoio à Comissão de Direitos Humanos e Legislação Participativa","TipoLocal": "A","DescricaoTipoLocal": "Unidade Administrativa","SiglaCasaLocal": "SF","NomeCasaLocal": "Senado Federal","DataCriacaoLocal": "2016-01-04"},
	{"CodigoLocal": "550",	"SiglaLocal": "SACDR",	"NomeLocal": "Secretaria de Apoio à Comissão de Desenvolvimento Regional e Turismo","TipoLocal": "A","DescricaoTipoLocal": "Unidade Administrativa","SiglaCasaLocal": "SF","NomeCasaLocal": "Senado Federal","DataCriacaoLocal": "2016-01-04"},
	{"CodigoLocal": "551",	"SiglaLocal": "SACE",	"NomeLocal": "Secretaria de Apoio à Comissão de Educação, Cultura e Esporte","TipoLocal": "A","DescricaoTipoLocal": "Unidade Administrativa","SiglaCasaLocal": "SF","NomeCasaLocal": "Senado Federal","DataCriacaoLocal": "2016-01-04"},
	{"CodigoLocal": "552",	"SiglaLocal": "SACIFR",	"NomeLocal": "Secretaria de Apoio à Comissão de Serviços de Infraestrutura","TipoLocal": "A","DescricaoTipoLocal": "Unidade Administrativa","SiglaCasaLocal": "SF","NomeCasaLocal": "Senado Federal","DataCriacaoLocal": "2016-01-04"},
	{"CodigoLocal": "553",	"SiglaLocal": "SACMA",	"NomeLocal": "Secretaria de Apoio à Comissão de Meio Ambiente","TipoLocal": "A","DescricaoTipoLocal": "Unidade Administrativa","SiglaCasaLocal": "SF","NomeCasaLocal": "Senado Federal","DataCriacaoLocal": "2016-01-04"},
	{"CodigoLocal": "556",	"SiglaLocal": "SACRA",	"NomeLocal": "Secretaria de Apoio à Comissão de Agricultura e Reforma Agrária","TipoLocal": "A","DescricaoTipoLocal": "Unidade Administrativa","SiglaCasaLocal": "SF","NomeCasaLocal": "Senado Federal","DataCriacaoLocal": "2016-01-04"},
	{"CodigoLocal": "557",	"SiglaLocal": "SACRE",	"NomeLocal": "Secretaria de Apoio à Comissão de Relações Exteriores e Defesa Nacional","TipoLocal": "A","DescricaoTipoLocal": "Unidade Administrativa","SiglaCasaLocal": "SF","NomeCasaLocal": "Senado Federal","DataCriacaoLocal": "2016-01-04"},
	{"CodigoLocal": "1023",	"SiglaLocal": "SACTFC",	"NomeLocal": "Secretaria de Apoio à Comissão de Transparência, Governança, Fiscalização e Controle e Defesa do Consumidor","TipoLocal": "A","DescricaoTipoLocal": "Unidade Administrativa","SiglaCasaLocal": "SF","NomeCasaLocal": "Senado Federal","DataCriacaoLocal": "2017-04-05"},
	{"CodigoLocal": "439",	"SiglaLocal": "SAOP",	"NomeLocal": "Secretaria de Apoio a Órgãos do Parlamento","TipoLocal": "A","DescricaoTipoLocal": "Unidade Administrativa","SiglaCasaLocal": "SF","NomeCasaLocal": "Senado Federal","DataCriacaoLocal": "2016-01-04"},
	{"CodigoLocal": "444",	"SiglaLocal": "SCOM",	"NomeLocal": "Secretaria de Comissões","TipoLocal": "A","DescricaoTipoLocal": "Unidade Administrativa","SiglaCasaLocal": "SF","NomeCasaLocal": "Senado Federal","DataCriacaoLocal": "2016-01-04"},
	{"CodigoLocal": "543",	"SiglaLocal": "SEADI",	"NomeLocal": "Secretaria de Atas e Diários","TipoLocal": "A","DescricaoTipoLocal": "Unidade Administrativa","SiglaCasaLocal": "SF","NomeCasaLocal": "Senado Federal","DataCriacaoLocal": "2016-01-04"},
	{"CodigoLocal": "236",	"SiglaLocal": "SESINO",	"NomeLocal": "Serviço de Sinopse","TipoLocal": "A","DescricaoTipoLocal": "Unidade Administrativa","SiglaCasaLocal": "SF","NomeCasaLocal": "Senado Federal","DataCriacaoLocal": "1970-01-01"},
	{"CodigoLocal": "440",	"SiglaLocal": "SEXPE",	"NomeLocal": "Secretaria de Expediente","TipoLocal": "A","DescricaoTipoLocal": "Unidade Administrativa","SiglaCasaLocal": "SF","NomeCasaLocal": "Senado Federal","DataCriacaoLocal": "2016-01-04"},
	{"CodigoLocal": "176",	"SiglaLocal": "SGM",	"NomeLocal": "Secretaria Geral da Mesa","TipoLocal": "A","DescricaoTipoLocal": "Unidade Administrativa","SiglaCasaLocal": "SF","NomeCasaLocal": "Senado Federal","DataCriacaoLocal": "1900-01-01"},
	{"CodigoLocal": "442",	"SiglaLocal": "SLCN",	"NomeLocal": "Secretaria Legislativa do Congresso Nacional","TipoLocal": "A","DescricaoTipoLocal": "Unidade Administrativa","SiglaCasaLocal": "SF","NomeCasaLocal": "Senado Federal","DataCriacaoLocal": "2016-01-04"},
	{"CodigoLocal": "443",	"SiglaLocal": "SLSF",	"NomeLocal": "Secretaria Legislativa do Senado Federal","TipoLocal": "A","DescricaoTipoLocal": "Unidade Administrativa","SiglaCasaLocal": "SF","NomeCasaLocal": "Senado Federal","DataCriacaoLocal": "2016-01-04"}
]

function NewStatus() {
	status = {
		inicio:             false,
		comissaoEspecial:   false,
		ccjc:               false,
		plenario:           false,
		apensada:           {isApensada: false, propostaPrincipal: 0},
		finalizada:         false
	}
	return status;
}

async function GetTramitacaoSenado(id){
	let response = await axios.get(URL_API_TramitacaoSenado + id);
	let tramitacoes = response.data.MovimentacaoMateria.Materia;
	if (util.isNull(tramitacoes)){
		return {};
	}
	return tramitacoes;
}

async function GetTramitacaoCamara(codigo){
	let response = await axios.get(URL_API_TramitacaoCamara + codigo + "/tramitacoes");
	let tramitacoes = response.data.dados;
	if (util.isNull(tramitacoes)){
		return {};
	}
	return tramitacoes;
}

const GetStatus = async(camara, senando, id) => {
	let status = NewStatus();
    return status;
}

module.exports.NewStatus = 					NewStatus;
module.exports.GetStatus = 					GetStatus;
module.exports.GetTramitacaoSenado = 		GetTramitacaoSenado;
module.exports.GetTramitacaoCamara = 		GetTramitacaoCamara;