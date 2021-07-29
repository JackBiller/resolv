
function resolvStyle(obj) { 
	if (typeof obj == 'string') return obj;

	var keys = Object.keys(obj);
	return keys.map(function(k) { return k + ':' + obj[k] + ';'; }).join('');
}
