

function resolvButton(options, tab=0) { 
	/*
		options: {
			class: ''					-- Classe do botao
			desc: ''					-- descrição do botão
			id: ''						-- ID do botao
			name: '' 					-- Atributo Name do Button
			disable: (0|1)				-- Desabilita o botão
			icon: ''					-- icone
			onclick: function(el){}		-- enveto de click
			onchange: function(el){}	-- enveto de mudar
			onfocus: function(el){}		-- enveto de focar
			onblur: function(el){}		-- enveto de desfocar
			compensador: (0|1) 			-- Cria um compensador para alinha o botão
			title: '' 					-- Texto que aparece quando passa o mouse emcima
			style: objStyle 			-- Resolve o estilo do botão
			accesskey: ''				-- tecla de atalho
		}
	*/

	var random;
	do { 
		random = parseInt( Math.random() * 100000 );
	} while (registerRandom_Global.indexOf(random) != -1);
	registerRandom_Global.push(random);

	if ((options.click || '') != '' && (options.onclick || '') == '') options.onclick = options.click;

	var accesskey = (options.accesskey || '') == '' || options.accesskey.length > 1 ? '' : options.accesskey;

	var classBtn = (options.class || '') == '' ? '' : options.class
	, 	classBootstrap = [ 
		'primary','success','danger','warning','info','default',	// v3
		'secondary','light','dark','link', 							// v4
	].find(function(i) { 
		return (classBtn == i || classBtn.indexOf(i+' ') == 0);
	}) || '';

	classBtn = classBootstrap != '' ? 'btn btn-' + classBtn : classBtn;

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
					// + 		((options.click || '') == '' ? '' : " onclick='" + options.class + "'")


					// ** Enveto do botão ****************************** //
					+	(function(opt){
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
							+t(tab+1)	+ 	"function " + opt[i] + random + "(el) { "
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
						+t(tab+1)	+ 	`function btnClickAccesskey${random}(e) { `
						+t(tab+2)	+ 		`if (e.altKey && e.key == "${accesskey}".toLowerCase()) { `
						+t(tab+3)	+ 			`e.preventDefault();`
						+t(tab+3)	+ 			`$("button[data-customerid='btn${random}']").click();`
						+t(tab+2)	+ 		`}`
						+t(tab+1)	+ 	`}`
						+t(tab+1)	+ 	`registerEventKeyboard.push("btnClickAccesskey${random}");`
					)
		+t(tab)		+ 	"</"+"script>"

	return html;
}
