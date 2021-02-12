
function resolvHr(options) { 
	return resolvBr( $.extend({}, options, { hr: true }) ,(arguments[1] || 0));
}

function resolvBr(options) { 
	var tab = (arguments[1] || 0);
	/*
		options: {
			num: 1 			-- Numero de br que vai montar
			hr: (0|1) 		-- Se for hr ou não
			style: {} 		-- Objeto CSS
		}
	*/

	var style = (options.style || '') == '' ? '' : ' style="' + resolvStyle(options.style) + '"',
		num = (options.num || 1);

	var html = t(tab) + ''

	if (num < 0 || isNaN(num)) num = 1;

	for (var i = 0; i < parseInt(num); i++) 
		html += "<" + ((options.hr || false) ? 'h' : 'b') + "r " + style + ">";
	return html;
}