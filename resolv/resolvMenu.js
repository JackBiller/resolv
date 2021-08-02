
function resolvMenu(options={}, tab=0) {
	/*
		options: {
			descForm: '' 					-- Identificador
			no_link: (0|1) 					-- Não linca no menu para redirecionar o conteúdo
			isLateral: (0|1) 				-- Caso quera resolver um menu lateral
			selected: index 				-- Escolher qual aba vai começar ativa, padrão 0
			abas: [
				{
					text: '' 				-- Descrição Menu
					icon: '' 				-- ícone para acompanha a descrição
					click: '' / function 	-- Função para chamar quando clicar na aba do menu
					ctx: {} 				-- Conteúdo Referente
				}
			]
			xs / sm / md / lg: '3-9' 		-- Class bootstrap, referencia disposição dos componentes (isLateral == true)
		}
	*/

	if ((options.descForm || '') == '') return '';

	var random;
	do {
		random = parseInt(Math.random() * 100000);
	} while (registerRandom_Global.indexOf(random) != -1);
	registerRandom_Global.push(random);

	options = $.extend({}, {
		xs: '3-9',
	}, options);

	var isLateral = (options.isLateral || '') != '';
	var TA = isLateral ? 1 : 0;

	var selected = options.selected || 0;
	var bootstrap = $.fn.tooltip.Constructor.VERSION.slice(0,1);

	var html = ''
		+ (!isLateral || (options.abas || []).length < 2 ? '' : ''
			+t(tab)	+ 	'<div'
					+ 		` class="`
					+ 			((options.xs || '') == '' ? '' : ' col-xs-' + options.xs.split('-')[0] )
					+ 			((options.sm || '') == '' ? '' : ' col-sm-' + options.sm.split('-')[0] )
					+ 			((options.md || '') == '' ? '' : ' col-md-' + options.md.split('-')[0] )
					+ 			((options.lg || '') == '' ? '' : ' col-lg-' + options.lg.split('-')[0] )
					+ 		`"`
					+	'>'
		)
		+t(tab+TA)	+ 	'<ul class="nav nav-tabs"' // body-tabs-animated body-tabs body-tabs-layout tabs-animated
					+ 		' id="' + options.descForm + '"'
					+ 		((options.abas || []).length < 2 ? 'style="display:none"' : '' )
					+ 	'>'

	for (var i = 0; i < (options.abas || []).length; i++) {
		html += ''
		+ (!isLateral || i == 0 ? '' : ''
			+t(tab+TA+1) + '<br>'
		)
		+t(tab+TA+1)	+ 	"<li name='" + options.descForm + "' id='" + options.descForm + i + "'"
					+ (!isLateral ? '' : ''
						+ 	" style=\"width: 100%;\""
					)
					+ 		" onclick='"
					+ 			"mudarPagina("
					+ 				"this,"
					+ 				"\"" + options.descForm + "Ctx" + i + "\","
					+ 				"\"" + options.descForm + "\","
					+ 				"\"" + options.descForm + "Ctx\""
					+ 			");"
					+ 			"clickMenu" + random + i + '(this);'
					+ 			(typeof(options.abas[i].click) == 'string' ? options.abas[i].click : '')
					+ 		"'"
					+ 		" class='nav-item" + (i == selected && bootstrap != '4' ? ' active' : '') + "'"
					+ 	">"
		+t(tab+TA+2)
		+ ((options.no_link || '') == ''
			? 				"<a href=\"#" + options.descForm + "Ctx" + i + "\""
			: 				"<a href=\"javascript:void(0)\""
		)
		// +t(tab+2)	+ 		"<a href=\"javascript:void(0)\""
		+ 						" class='nav-link" + (i == selected && bootstrap == '4' ? ' active' : '') + "'"
					+ ((options.abas[i].accesskey || '') == ''  ? '' : ''
						+ 		" accesskey='" + options.abas[i].accesskey + "'"
						+ 		" title='Alt + " + options.abas[i].accesskey + "'"
					)
						+ 		">"
		+t(tab+TA+3)	+ 		((options.abas[i].icon || '') == '' ? '' : ''
									+ "<i class=\"" + resolvIcon(options.abas[i].icon) + "\"></i>"
								)
						+ 			((options.abas[i].icon || '') == '' || (options.abas[i].text || '') == '' ? '' : '&nbsp;')
						+ 			(options.abas[i].text || '')
		+t(tab+TA+2)	+ 		"</a>"
		+t(tab+TA+1)	+ 	"</li>"
	}
	html += ''
		+t(tab+TA)		+ '</ul>'
		+ (!isLateral || (options.abas || []).length < 2 ? '' : ''
			+t(tab+0) 	+ 	'</div>'
			+t(tab+0) 	+ 	'<style>'
			+t(tab+1) 	+ 		'#' + options.descForm + ' .active a {'
			+t(tab+2) 	+ 			'border-bottom: 1px solid #ddd !important;'
			+t(tab+2) 	+ 			'border-bottom-left-radius: 5px;'
			+t(tab+2) 	+ 			'border-bottom-right-radius: 5px;'
			+t(tab+1) 	+ 		'}'
			+t(tab+1) 	+ 		'#' + options.descForm + ' {'
			+t(tab+2) 	+ 			'border-bottom: none;'
			+t(tab+2) 	+ 			'border-right: 1px solid #ddd;'
			+t(tab+1) 	+ 		'}'
			+t(tab+0) 	+ 	'</style>'
			+t(tab)	+ 	'<div'
					+ 		` class="`
					+ 			((options.xs || '') == '' ? '' : ' col-xs-' + options.xs.split('-')[1] )
					+ 			((options.sm || '') == '' ? '' : ' col-sm-' + options.sm.split('-')[1] )
					+ 			((options.md || '') == '' ? '' : ' col-md-' + options.md.split('-')[1] )
					+ 			((options.lg || '') == '' ? '' : ' col-lg-' + options.lg.split('-')[1] )
					+ 		`"`
					+	'>'
		)
		+t(tab+TA)		+ '<script>'
		+ (options.abas || []).map(function(aba, i) { return ''
			+t(tab+TA+1)	+ 	`function clickMenu${random}${i}(el) {`
			+t(tab+TA+2)	+ 		`resolvEvento('click','${options.descForm}');`
			+t(tab+TA+2)	+ (typeof(aba.click) != 'function' ? '' : ''
							+ `var func = ${String(aba.click)};`
							+ `func(el);`
						)
			+t(tab+TA+1)	+ 	`}`
		}).join('')
		+t(tab+TA)		+ '</'+'script>'

	for (var i = 0; i < (options.abas || []).length; i++) { 
		html += ""
		+t(tab+TA)	+ 	"<div"
					+ 		" id='" + options.descForm + "Ctx" + i + "'"
					+ 		" name='" + options.descForm + "Ctx'"
					+ 		" style='"
					+ 			(i == selected ? '' : "display:none;")
					+ 			(options.isLateral || false ? '' : "margin-top:10px;")
					+ 		"'"
					+ 	">"
					+ 		resolvConfig(options.abas[i].ctx || {},tab+TA+1)
		+t(tab+TA)	+ 	"</div>"
	}
	html += ''
		+ (!isLateral || (options.abas || []).length < 2 ? '' : ''
			+t(tab) 	+ 	'</div>'
		)

	return html;
}

