
function resolvDiv(options, tab=0) { 
	/*
		options: {
			class: '' 		-- Class da div
			id: '' 			-- Id da div
			ctx: '' 		-- Conteudo div
			style: obj 		-- Objeto CSS
			text: '' 		-- Conteudo Padrão
		}
	*/
	var html = ''
		+t(tab)		+ 	"<div"
					+ 		" class='" + (options.class || '') + "'"
					+ 		((options.id || '') == '' ? '' : " id='" + options.id + "'")
					+ 		((options.style || '') == '' ? '' : " style='" + resolvStyle(options.style) + "'")
					+ 	">"
					+ 		((options.text || "") == '' ? '' : t(tab+1)+options.text)
					+ 		resolvConfig((options.ctx || {}),tab+1)
		+t(tab)		+ 	"</div>"

	return html;
}
