// nossovoto

// verify weather the object is empty or not
function isEmpty(obj) {
	for (var key in obj) {
		if (obj.hasOwnProperty(key))
			return false;
	}
	return true;
}

function getTimeFrame(req) {

	let dataInicio = "";
	let dataFim = "";
	
	if(req.query.dataInicio === "" || typeof req.query.dataInicio === "undefined")
		dataInicio = "2019-01-01";
	else if (parseInt(req.query.dataInicio.replace(/-/g,'')) 
			<= 
			19880922)
			dataInicio = "1988-09-22"
	else
		dataInicio = req.query.dataInicio;

	if (req.query.dataFim === "" || typeof req.query.dataFim === "undefined") 
		dataFim = new Date().toISOString().substring(0,10);
	else if (parseInt(req.query.dataFim.replace(/-/g,'')) 
			>= 
			parseInt(new Date().toISOString().substring(0,10).replace(/-/g,'')))
        	dataFim = new Date().toISOString().substring(0,10);
	else 
		dataFim = req.query.dataFim;

	if (parseInt(dataFim.replace(/-/g,'')) < parseInt(dataInicio.replace(/-/g,'')))
		return date = { begin: "2019-01-01", end: new Date().toISOString().substring(0,10), years: [2019]};
	else
		return date = { begin: dataInicio, end: dataFim, years: getYearsTimeframe(dataInicio, dataFim)};
	
}

function getYearsTimeframe(begin, end){
	let beginyear = parseInt(begin.substring(0,4));
	let endyear = parseInt(end.substring(0,4));
	let yearsArr = []
	while (beginyear != endyear) {
		yearsArr.push(beginyear);
		beginyear++;
	}
	yearsArr.push(endyear);
	return yearsArr;
}
// exports the variables and functions above so that other modules can use them
module.exports.isEmpty = isEmpty;
module.exports.getTimeFrame = getTimeFrame