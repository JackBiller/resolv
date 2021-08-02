

function resolvButton(options, tab=0) {
	/*
		options: {
			class: ''					-- Classe do botão
			desc: ''					-- descrição do botão
			id: ''						-- ID do botão
			name: '' 					-- Atributo Name do Button
			disable: (0|1)				-- Desabilita o botão
			icon: ''					-- ícone
			onclick: function(el){}		-- evento de click
			onchange: function(el){}	-- evento de mudar
			onfocus: function(el){}		-- evento de focar
			onblur: function(el){}		-- evento de desfocar
			compensador: (0|1) 			-- Cria um compensador para alinha o botão
			title: '' 					-- Texto que aparece quando passa o mouse encima
			style: objStyle 			-- Resolve o estilo do botão
			accesskey: ''				-- tecla de atalho
			data: { 					-- Parâmetro do objeto data
				key: value
			}
		}
	*/

	var random;
	do {
		random = parseInt(Math.random() * 100000);
	} while (registerRandom_Global.indexOf(random) != -1);
	registerRandom_Global.push(random);

	if ((options.click || '') != '' && (options.onclick || '') == '') options.onclick = options.click;

	var accesskey = (options.accesskey || '') == '' || options.accesskey.length > 1 ? '' : options.accesskey;

	var classBtn = (options.class || '') == '' ? '' : options.class
	, 	classBootstrap = [
		'primary','success','danger','warning','info','default',	// v3
		'secondary','light','dark','link', 							// v4
		'outline-primary','outline-secondary','outline-info', 		// v4 outline
		'outline-success','outline-danger','outline-warning',
		'outline-light','outline-dark','outline-link',
	].find(function(i) {
		return (classBtn == i || classBtn.indexOf(i+' ') == 0);
	}) || '';

	classBtn = classBootstrap != '' ? 'btn btn-' + classBtn : classBtn;

	var bootstrap = $.fn.tooltip.Constructor.VERSION.slice(0,1);
	if (bootstrap == '4') {
		if (classBtn.indexOf('btn-default') >= 0) {
			classBtn = classBtn.replace('btn-default', 'btn-light');
		}
	}
	if (bootstrap == '3') {
		if (classBtn.indexOf('btn-outline') >= 0) {
			classBtn = classBtn.replace(/btn-outline/gi, 'btn');
		}
		if (classBtn.search(/btn-(secondary|light|dark)/) > -1) {
			classBtn = classBtn.replace(/btn-(secondary|light|dark)/gi, 'btn-default');
		}
	}


	var html = ''
		+ ((options.preText || '') == '' ? '' : t(tab) + options.preText)
		+ ((options.compensador || '') == '' ? '' : ''
			+ 	"<label>&nbsp;</label>"
		)
		+t(tab)		+ 	"<button"
					+ 		" data-customerid='btn" + random + "'"
					+ 		((classBtn 			|| '') == '' ? '' : " class='" + classBtn      + "'")
					+ 		((options.id 		|| '') == '' ? '' : " id='"    + options.id    + "'")
					+ 		((options.name  	|| '') == '' ? '' : " name='"  + options.name  + "'")
					+ 		((options.disabled 	|| '') == '' ? '' : " disabled")
					+ 		((options.style 	|| '') == '' ? '' : " style='" + resolvStyle(options.style) + "'")
					// + 		(accesskey 				   == '' ? '' : " accesskey='" + accesskey + "'")
					+ 		((options.title 	|| '') == '' && accesskey == '' ? '' : ''
								+ 	" title='"
								+ 		(options.title || '') 
								+ 		((options.title || '') == '' || accesskey == '' ? '' : '\n') 
								+ 		(accesskey == '' ? '' : 'Alt + ' + accesskey)
								+ 	"'"
							)
					+ (Object.keys(options.data || {})).map(function(key) {
						return " data-" + key + "='" + String(options.data[key]) + "'"
					}).join('')
					// + 		((options.click || '') == '' ? '' : " onclick='" + options.class + "'")


					// ** Evento do botão ****************************** //
					+	(function(opt) {
						var html = '';
						for (var i = 0; i < opt.length; i++) {
							html += ((options[opt[i]] || '') == '' ? '' : ' ' + opt[i] + '="' + opt[i] + random + '(this);"')
						}
						return html;
					}(['onchange','onclick','onfocus','onblur']))
					// ************************************************* //


					+ 	">"
					+ ((options.icon || '') == '' ? '' : ''
						+t(tab+1) + '<i class="' + resolvIcon(options.icon) + '"></i>'
					)
					+ ((options.icon || '') == '' || (options.desc || '') == '' ? '' : '&nbsp;')
					+ ((options.desc || '') == '' ? '' : ''
						+t(tab+1) + (accesskey == '' ? options.desc : returnDescAccesskey(options.desc, options))
					)
		+t(tab)		+ 	"</button>"
		+t(tab)		+ 	"<script>"
					+	(function(opt) {
						var html = '';
						for (var i = 0; i < opt.length; i++) {
							html += ((options[opt[i]] 	|| '') == '' ? '' : ''
							+t(tab+1)	+ 	"function " + opt[i] + random + "(el) {"
							+t(tab+2)	+ (
											(typeof(options[opt[i]]) == 'string')
											? options[opt[i]]
											// : "(" + String(options[opt[i]]) + "(el));"
											: "var func = " + String(options[opt[i]]) + ';'
											+ "func(el);"
										)
							+t(tab+1)	+ 	"}"
							)
						}
						return html;
					}(['onchange','onclick','onfocus','onblur']))
					+ (accesskey == '' ? '' : ''
						+t(tab+1)	+ 	`function btnClickAccesskey${random}(e) {`
						+t(tab+2)	+ 		`if (e.altKey && e.key == "${accesskey}".toLowerCase()) {`
						+t(tab+3)	+ 			`e.preventDefault();`
						+t(tab+3)	+ 			`$("button[data-customerid='btn${random}']").click();`
						+t(tab+2)	+ 		`}`
						+t(tab+1)	+ 	`}`
						+t(tab+1)	+ 	`registerEventKeyboard.push("btnClickAccesskey${random}");`
					)
		+t(tab)		+ 	"</"+"script>"

	return html;
}
