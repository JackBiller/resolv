
function resolvLabel(options, tab=0) {
	/*
		options: {
			text: '' 		-- Conteúdo da label
		}
	*/
	var html = ''
		+t(tab) 	+ 	"<label>"
		+t(tab+1) 	+ 		(options.text || '')
		+t(tab) 	+ 	"</label>"
	return html;
}
