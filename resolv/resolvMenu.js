
function resolvMenu(options={}, tab=0) { 
	/*
		options: {
			descForm: '' 		-- Identificador
			no_link: (0|1) 		-- Não linqua no menu para redirecionar o conteudo
			abas: [
				{
					text: '' 	-- Descricao Menu
					icon: '' 	-- icone para acompanha a descricao
					click: '' 	-- Função para chamar quando clicar na aba do menu
					ctx: {} 	-- Conteudo Referente
				}
			]
		}
	*/
	if ((options.descForm || '') == '') return '';

	var html = ''
		+t(tab)		+ 	'<ul class="nav nav-tabs"'
					+ 		' style="display:' + ((options.abas || []).length < 2 ? 'none' : 'block' ) + '"'
					+ 	'>'
	for (var i = 0; i < (options.abas || []).length; i++) { 
		html += ''
		+t(tab+1)	+ 	"<li name='" + options.descForm + "' id='" + options.descForm + i + "'"
					+ 		" onclick='"
					+ 			"mudarPagina("
					+ 				"this,"
					+ 				"\"" + options.descForm + "Ctx" + i + "\","
					+ 				"\"" + options.descForm + "\","
					+ 				"\"" + options.descForm + "Ctx\""
					+ 			");"
					+ 			(options.abas[i].click || '')
					+ 		"'"
					+ 		" class='" + (i == 0 ? 'active' : '') + "'"
					+ 	">"
		+t(tab+2)	
		+ ((options.no_link || '') == '' 
			? 				"<a href=\"#" + options.descForm + "Ctx" + i + "\""
			: 				"<a href=\"javascript:void(0)\""
		)
		// +t(tab+2)	+ 		"<a href=\"javascript:void(0)\""
					+ ((options.abas[i].accesskey || '') == ''  ? '' : ''
						+ 		" accesskey='" + options.abas[i].accesskey + "'"
						+ 		" title='Alt + " + options.abas[i].accesskey + "'"
					)
					+ 		">"
		+t(tab+3)	+ 			((options.abas[i].icon || '') != '' ? "<i class=\"fa fa-"+options.abas[i].icon+"\"></i> " : '')
					+ 			(options.abas[i].text || '')
		+t(tab+2)	+ 		"</a>"
		+t(tab+1)	+ 	"</li>"
	}
	html += ''
		+t(tab)		+ '</ul>'

	for (var i = 0; i < (options.abas || []).length; i++) { 
		html += ""
		+t(tab)		+ 	"<div"
					+ 		" id='" + options.descForm + "Ctx" + i + "'"
					+ 		" name='" + options.descForm + "Ctx'"
					+ 		" style='"
					+ 			(i == 0 ? '' : "display:none;")
					+ 		"'"
					+ 	">"
					+ 		resolvConfig(options.abas[i].ctx || {},tab+1)
		+t(tab)		+ 	"</div>"
	}
	return html;
}

