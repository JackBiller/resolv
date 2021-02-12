
function resolvH1(options){ return resolvH($.extend({}, options, { num: 1 }),(arguments[1] || 0)); }
function resolvH2(options){ return resolvH($.extend({}, options, { num: 2 }),(arguments[1] || 0)); }
function resolvH3(options){ return resolvH($.extend({}, options, { num: 3 }),(arguments[1] || 0)); }
function resolvH4(options){ return resolvH($.extend({}, options, { num: 4 }),(arguments[1] || 0)); }
function resolvH5(options){ return resolvH($.extend({}, options, { num: 5 }),(arguments[1] || 0)); }
function resolvH6(options){ return resolvH($.extend({}, options, { num: 6 }),(arguments[1] || 0)); }
function resolvH(options){
	var tab = (arguments[1] || 0);
	/*
		options: {
			text: '' 		-- Descricao da Tag HN
			num: 1 			-- Num da tag (default = 1)
			style: obj 		-- Objeto CSS
		}
	*/
	var html = ''
		+t(tab)		+ 	"<h" + (options.num || 1) 
					+ 		((options.style || '') == '' ? '' : " style='" + resolvStyle(options.style) + "'")
					+ 	">"
		+t(tab+1)	+ 		(options.text || '')
		+t(tab)		+ 	"</h" + (options.num || 1) + ">";

	return html;
}
