
function resolvStyle(obj) { 
	// var html = '';
	var keys = Object.keys(obj);

	// return keys.map(k => k + ':' + obj[k] + ';').join('');
	return keys.map(function(k) { return k + ':' + obj[k] + ';'; }).join('');

	// for (var i = 0; i < keys.length; i++)
	// 	html += keys[i] + ':' + obj[keys[i]] + ';';
	// return html;
}
