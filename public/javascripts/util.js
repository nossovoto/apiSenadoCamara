// nossovoto
const defaultDataInicio = 	"2019-01-01";
const defaultYears = 		[2019]

// verify weather the object is empty or not
function IsEmpty(obj) {
	for (var key in obj) {
		if (obj.hasOwnProperty(key))
			return false;
	}
	return true;
}
function EmptyResponse(req){
	responseData = {
		title:          "API - @nossovoto",
		description:    req.baseUrl + req.path + " is empty",
		data:           {},
		length:         0,
		errors:         "",
	}
	return responseData;
}

function GetSafe(fn, defaultVal) {
    try {
        return fn();
    } catch (e) {
        return defaultVal;
    }
}

function ReplaceUndefined(object){
	Object.keys(object).forEach(key => {
		if (object[key] === undefined) {
			object[key] = '';
		}
	});
	return object;
}

function IsAnyValueEmpty(object){
	for (const [key, value] of Object.entries(object)) {
		if( value === ""){
			return true;
		}
	}
	return false;
}

function IsNull(value){
	if (value == null) {
		return true;
	}
	return false;
}

function GetTimeFrame(req) {

	let dataInicio = "";
	let dataFim = "";
	
	if(req.query.dataInicio === "" || typeof req.query.dataInicio === "undefined")
		dataInicio = defaultDataInicio;
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
		return date = { begin: dataInicio, end: new Date().toISOString().substring(0,10), years: defaultYears};
	else
		return date = { begin: dataInicio, end: dataFim, years: GetYearsTimeframe(dataInicio, dataFim)};
}

function GetYearsTimeframe(begin, end){
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

function ReturnError(e, res){
    console.error(e); // 💩 - SHIT - Remove it on production
    let title = IsNull(e.response) ? e.message : e.response.statusText;
    responseData = {
        title:          title,
        description:    "Failed to GET " + res.req.originalUrl,
        data:           {},
        length:         0,
        errors:         e.message,
    }
    res.send(responseData);
}

// exports the variables and functions above so that other modules can use them
module.exports.ReturnError = 		ReturnError;
module.exports.IsEmpty = 			IsEmpty;
module.exports.IsNull = 			IsNull;
module.exports.EmptyResponse = 		EmptyResponse;
module.exports.GetSafe = 			GetSafe;
module.exports.ReplaceUndefined = 	ReplaceUndefined;
module.exports.IsAnyValueEmpty = 	IsAnyValueEmpty;
module.exports.GetTimeFrame = 		GetTimeFrame;