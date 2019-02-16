// nossovoto

// verify weather the object is empty or not
function isEmpty(obj) {
	for (var key in obj) {
		if (obj.hasOwnProperty(key))
			return false;
	}
	return true;
}

// exports the variables and functions above so that other modules can use them
module.exports.isEmpty = isEmpty;